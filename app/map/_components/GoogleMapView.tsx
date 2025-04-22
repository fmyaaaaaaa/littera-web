"use client";

import { getReportDetail } from "@/app/actions/getReportDetail";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useSearch } from "@/contexts/SearchContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDate } from "@/lib/date";
import type { Report, ReportDetail } from "@/types";
import { APIProvider, Map as GoogleMap, InfoWindow } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CustomMarker } from "./CustomMarker";
import { GoogleMapController } from "./GoogleMapController";
import { LitterCategoryChips } from "./LitterCategoryChip";

interface GoogleMapViewProps {
  reports: Report[];
}

const API_KEY = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) ?? globalThis.GOOGLE_MAPS_API_KEY;
const MAP_ID = (process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string) ?? globalThis.GOOGLE_MAP_ID;

export function GoogleMapView({ reports }: GoogleMapViewProps) {
  const { searchParams, isSearching } = useSearch();
  const isMobile = useIsMobile();
  const [reportDetail, setReportDetail] = useState<ReportDetail | null>(null);

  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set");
  }

  const hasReports = reports.length > 0;
  const mapCenter = hasReports ? { lat: reports[0].latitude, lng: reports[0].longitude } : { lat: 53, lng: 10 };
  const searchParamsCenter =
    searchParams.latitude && searchParams.longitude
      ? { lat: Number(searchParams.latitude), lng: Number(searchParams.longitude) }
      : undefined;

  const onClickMarker = async (report: Report) => {
    const reportDetail = await getReportDetail(report.id);
    if (reportDetail.success && reportDetail.data) {
      setReportDetail(reportDetail.data);
    }
  };

  useEffect(() => {
    if (reportDetail) {
      console.log(reportDetail);
    }
  }, [reportDetail]);

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={API_KEY}>
        {isSearching && <LoadingSpinner />}
        <GoogleMap
          mapId={MAP_ID}
          defaultZoom={5}
          defaultCenter={mapCenter}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          streetViewControl={false}
        >
          <GoogleMapController reports={reports} center={searchParamsCenter} />
          {reports.map((report) => (
            <CustomMarker
              key={report.id}
              position={{ lat: report.latitude, lng: report.longitude }}
              onClick={() => onClickMarker(report)}
              color="#4CAF00"
            />
          ))}

          {reportDetail && (
            <InfoWindow
              position={{ lat: reportDetail.latitude, lng: reportDetail.longitude }}
              onCloseClick={() => setReportDetail(null)}
              headerContent={<p className="text-caption-lg text-center">{formatDate(reportDetail.report_date)}</p>}
            >
              <div className="flex flex-col gap-2">
                <Image
                  src={reportDetail.photo_url}
                  alt={reportDetail.report_date}
                  width={isMobile ? 230 : 500}
                  height={isMobile ? 230 : 500}
                  className="rounded-sm"
                />
                <LitterCategoryChips categories={reportDetail.litter_categories} size="sm" />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}
