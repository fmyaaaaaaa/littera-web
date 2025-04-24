"use client";

import { geocodeLocationAction } from "@/app/actions/geocodeLocationAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { type ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type LocationSearch = {
  latitude: string;
  longitude: string;
  placeName: string;
  page?: number;
  pageSize?: number;
};

type SearchHandler<T = unknown> = (params: LocationSearch) => Promise<T>;

interface SearchContextType {
  searchParams: LocationSearch;
  setLatitude: (value: string) => void;
  setLongitude: (value: string) => void;
  setPlaceName: (value: string) => void;
  setPage: (value: number) => void;
  registerSearchHandler: <T>(handler: SearchHandler<T> | null) => void;
  executeSearch: <T>() => Promise<T | null>;
  executeSearchWithCoordinates: <T>(latitude: string, longitude: string, placeName: string) => Promise<T | null>;
  searchByPlaceName: <T>(placeName: string) => Promise<T | null>;
  buildQueryParams: () => string;
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const nextSearchParams = useSearchParams();

  const initialSearchParams: LocationSearch = {
    latitude: nextSearchParams?.get("latitude") || "",
    longitude: nextSearchParams?.get("longitude") || "",
    placeName: nextSearchParams?.get("placeName") || "",
  };

  const [searchParams, setSearchParams] = useState<LocationSearch>(initialSearchParams);

  const handlerRef = useRef<SearchHandler<unknown> | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  const setLatitude = useCallback((value: string) => {
    setSearchParams((prev) => ({ ...prev, latitude: value }));
  }, []);

  const setLongitude = useCallback((value: string) => {
    setSearchParams((prev) => ({ ...prev, longitude: value }));
  }, []);

  const setPlaceName = useCallback((value: string) => {
    setSearchParams((prev) => ({ ...prev, placeName: value }));
  }, []);

  const setPage = useCallback((value: number) => {
    setSearchParams((prev) => ({ ...prev, page: value }));
  }, []);

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchParams.latitude !== "") {
      params.set("latitude", searchParams.latitude);
    }
    if (searchParams.longitude !== "") {
      params.set("longitude", searchParams.longitude);
    }
    if (searchParams.placeName !== "") {
      params.set("placeName", searchParams.placeName);
    }
    return params.toString();
  }, [searchParams]);

  const registerSearchHandler = useCallback(<T,>(handler: SearchHandler<T> | null) => {
    handlerRef.current = handler as SearchHandler<unknown> | null;
  }, []);

  const syncWithQueryParams = useCallback(() => {
    const url = new URL(window.location.href);
    const params = buildQueryParams();
    router.push(`${url.pathname}?${params}`);
  }, [router, buildQueryParams]);

  const executeSearch = useCallback(async <T,>(): Promise<T | null> => {
    const handler = handlerRef.current;
    if (!handler) {
      console.warn("No search handler registered");
      return null;
    }

    try {
      setIsSearching(true);
      syncWithQueryParams();
      const results = await handler(searchParams);
      return results as T;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, [searchParams, syncWithQueryParams]);

  /**
   * Use this function to execute a search with parameters.
   * Reason: After getting a geocoodination from API and updating this context, it will not be reffered correctly by executeSearch()
   */
  const executeSearchWithCoordinates = useCallback(
    async <T,>(latitude: string, longitude: string, placeName: string): Promise<T | null> => {
      const handler = handlerRef.current;
      if (!handler) {
        console.warn("No search handler registered");
        return null;
      }

      try {
        setIsSearching(true);
        const results = await handler({ latitude, longitude, placeName });

        // Update the URL with the new coordinates
        const url = new URL(window.location.href);
        url.searchParams.set("latitude", latitude);
        url.searchParams.set("longitude", longitude);
        url.searchParams.set("placeName", placeName);
        router.replace(url.pathname + url.search);

        return results as T;
      } catch (error) {
        console.error("Search error:", error);
        throw error;
      } finally {
        setIsSearching(false);
      }
    },
    [router]
  );

  const searchByPlaceName = useCallback(
    async <T,>(placeName: string): Promise<T | null> => {
      if (!placeName.trim()) {
        toast.error("Place name is required");
        return null;
      }

      try {
        setIsSearching(true);
        const results = await geocodeLocationAction(placeName);
        if (!results.success || !results.data) {
          toast.error("Cannot find location for the place name. \nPlease try again or use coordinates.", {
            position: "top-right",
            style: { whiteSpace: "pre-line" },
          });
          return null;
        }
        setLatitude(results.data.latitude);
        setLongitude(results.data.longitude);
        setPlaceName(placeName);
        return await executeSearchWithCoordinates<T>(results.data.latitude, results.data.longitude, placeName);
      } catch {
        toast.error("Error searching by place name");
        return null;
      } finally {
        setIsSearching(false);
      }
    },
    [executeSearchWithCoordinates, setLatitude, setLongitude, setPlaceName]
  );

  const value: SearchContextType = {
    searchParams,
    setLatitude,
    setLongitude,
    setPlaceName,
    setPage,
    registerSearchHandler,
    executeSearch,
    executeSearchWithCoordinates,
    searchByPlaceName,
    buildQueryParams,
    isSearching,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
