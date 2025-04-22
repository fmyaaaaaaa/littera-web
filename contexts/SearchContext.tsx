"use client";

import { type ReactNode, createContext, useCallback, useContext, useState } from "react";

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
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useState<LocationSearch>({
    latitude: "",
    longitude: "",
  });

  const [activeSearchHandler, setActiveSearchHandler] = useState<SearchHandler<unknown> | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  const setLatitude = useCallback((value: string) => {
    setSearchParams((prev) => ({ ...prev, latitude: value }));
  }, []);

  const setLongitude = useCallback((value: string) => {
    setSearchParams((prev) => ({ ...prev, longitude: value }));
  }, []);

  const registerSearchHandler = useCallback(<T,>(handler: SearchHandler<T> | null) => {
    setActiveSearchHandler(handler as SearchHandler<unknown> | null);
  }, []);

  const executeSearch = useCallback(async <T,>(): Promise<T | null> => {
    if (!activeSearchHandler) {
      console.warn("No search handler registered");
      return null;
    }

    try {
      setIsSearching(true);
      const results = await activeSearchHandler(searchParams);
      return results as T;
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, [activeSearchHandler, searchParams]);

  const value: SearchContextType = {
    searchParams,
    setLatitude,
    setLongitude,
    registerSearchHandler,
    executeSearch,
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
