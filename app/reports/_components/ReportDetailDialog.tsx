"use client";

import { getLocationName } from "@/app/actions/getLocationName";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/date";
import type { ReportWithImage } from "@/types";
import { Clock, IdCard, MapPin, Tags, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ReportStatusChip } from "./ReportStatusChip";

interface ReportDetailDialogProps {
  report: ReportWithImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const API_KEY = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) ?? globalThis.GOOGLE_MAPS_API_KEY;

/**
 * This component is used to display the details of a report in SP.
 */
export function ReportDetailDialog({ report, isOpen, onClose }: ReportDetailDialogProps) {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (report?.latitude && report?.longitude) {
      const fetchLocationName = async () => {
        const result = await getLocationName(report.latitude, report.longitude);
        if (result.success) {
          setLocationName(result.locationName);
        }
      };
      fetchLocationName();
    }
    setImageLoaded(false);
  }, [report]);

  if (!report) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-auto max-h-[80vh] sm:max-w-md">
        <DialogTitle className="sr-only">Report Details</DialogTitle>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-50 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="flex flex-col">
          {/* 画像部分 */}
          <div className="relative w-full h-[40vh]">
            {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
            <Image
              src={report.photo_url}
              alt={report.photo_url}
              fill
              className="object-cover"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>

          {/* 情報セクション */}
          <div className="p-4 space-y-4">
            {/* 基本情報 */}
            <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-medium mb-2 text-foreground">Information</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1.5 flex-shrink-0">
                    <IdCard className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-caption-lg">{report.id.substring(0, 8)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1.5 flex-shrink-0">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-caption-lg">{formatDate(report.report_date)}</p>
                </div>

                <ReportStatusChip status={report.status} />
              </div>
            </div>

            {/* カテゴリ */}
            <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-medium mb-2 text-foreground">Category</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1.5 flex-shrink-0">
                    <Tags className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-caption-lg">
                    {report.litter_categories.map((category) => category.en).join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* 位置情報 */}
            <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
              <h3 className="text-sm font-medium mb-2 text-foreground">Location</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-1.5 flex-shrink-0">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  {locationName ? <p className="text-caption-lg">{locationName}</p> : <Skeleton className="h-4 w-40" />}
                </div>
              </div>
            </div>

            {/* マップ */}
            {report.latitude && report.longitude && (
              <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
                <h3 className="text-sm font-medium mb-2 text-foreground">Map</h3>
                <div className="relative w-full h-[160px] rounded-md overflow-hidden border border-border/50 shadow-sm">
                  <Image
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${report.latitude},${report.longitude}&zoom=15&size=400x200&markers=color:green%7C${report.latitude},${report.longitude}&key=${API_KEY}`}
                    alt="Location"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <a
                    href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                  >
                    <span className="text-white bg-black/50 px-2 py-1 rounded text-sm">Open in Maps</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
