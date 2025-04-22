"use client";

import { type ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type LocationSearch = {
  latitude: string;
  longitude: string;
};

type SearchHandler<T = unknown> = (params: LocationSearch) => Promise<T>;

interface SearchContextType {
  searchParams: LocationSearch;
  setLatitude: (value: string) => void;
  setLongitude: (value: string) => void;
  registerSearchHandler: <T>(handler: SearchHandler<T> | null) => void;
  executeSearch: <T>() => Promise<T | null>;
  executeSearchWithCoordinates: <T>(latitude: string, longitude: string) => Promise<T | null>;
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useState<LocationSearch>({
    latitude: "",
    longitude: "",
  });

  const handlerRef = useRef<SearchHandler<unknown> | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  const setLatitude = useCallback((value: string) => {
    setSearchParams((prev) => ({ ...prev, latitude: value }));
  }, []);

  const setLongitude = useCallback((value: string) => {
    setSearchParams((prev) => ({ ...prev, longitude: value }));
  }, []);

  const registerSearchHandler = useCallback(<T,>(handler: SearchHandler<T> | null) => {
    handlerRef.current = handler as SearchHandler<unknown> | null;
    console.log("Registered search handler:", typeof handlerRef.current);
  }, []);

  const executeSearch = useCallback(async <T,>(): Promise<T | null> => {
    const handler = handlerRef.current;
    if (!handler) {
      console.warn("No search handler registered");
      return null;
    }

    try {
      setIsSearching(true);
      const results = await handler(searchParams);
      return results as T;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, [searchParams]);

  /**
   * Use this function to execute a search with parameters.
   * Reason: After getting a geocoodination from API and updating this context, it will not be reffered correctly by executeSearch()
   */
  const executeSearchWithCoordinates = useCallback(
    async <T,>(latitude: string, longitude: string): Promise<T | null> => {
      const handler = handlerRef.current;
      if (!handler) {
        console.warn("No search handler registered");
        return null;
      }

      try {
        setIsSearching(true);
        const results = await handler({ latitude, longitude });
        return results as T;
      } catch (error) {
        console.error("Search error:", error);
        throw error;
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  const value: SearchContextType = {
    searchParams,
    setLatitude,
    setLongitude,
    registerSearchHandler,
    executeSearch,
    executeSearchWithCoordinates,
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
