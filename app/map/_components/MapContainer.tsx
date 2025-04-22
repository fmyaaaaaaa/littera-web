"use client";

import { useSearch } from "@/contexts/SearchContext";
import { GoogleMapView } from "./GoogleMapView";

export function MapContainer() {
  const { searchParams } = useSearch();

  return (
    <div className="h-full w-full">
      <GoogleMapView />
    </div>
  );
}
