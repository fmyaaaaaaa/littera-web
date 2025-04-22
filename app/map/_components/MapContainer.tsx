"use client";

import { getReportsByLocation } from "@/app/actions/getReportsByLocation";
import { useSearch } from "@/contexts/SearchContext";
import type { Report } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { GoogleMapView } from "./GoogleMapView";

export function MapContainer() {
  const { registerSearchHandler, searchParams } = useSearch();
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);

  const searchHandler = useCallback(async (params: { latitude: string; longitude: string }) => {
    if (!params) {
      return null;
    }
    if (!params.latitude || !params.longitude) {
      toast.error("Location is required");
      return null;
    }

    setLoading(true);
    try {
      const response = await getReportsByLocation(Number(params.latitude), Number(params.longitude));

      if (!response.success) {
        toast.error("Report data not found");
        return null;
      }

      setReports(response.data?.reports || []);
      return response.data;
    } catch (error) {
      toast.error("Failed to get report data");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    registerSearchHandler(searchHandler);

    if (searchParams.latitude && searchParams.longitude) {
      searchHandler(searchParams);
    }

    return () => {
      registerSearchHandler(null);
    };
  }, [registerSearchHandler, searchHandler, searchParams]);

  return (
    <div className="h-full w-full">
      <GoogleMapView reports={reports} />
      {loading && (
        <div className="absolute top-16 right-4 bg-white p-2 rounded shadow text-sm">Loading Location...</div>
      )}
    </div>
  );
}
