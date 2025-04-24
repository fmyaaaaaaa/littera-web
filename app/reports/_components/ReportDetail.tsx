"use client";

import { getLocationName } from "@/app/actions/getLocationName";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/date";
import type { ReportWithImage } from "@/types";
import { motion } from "framer-motion";
import { Clock, FileText, IdCard, MapPin, Tags } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ReportStatusChip } from "./ReportStatusChip";

interface ReportDetailProps {
  report: ReportWithImage | null;
  isLoading: boolean;
}

const API_KEY = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) ?? globalThis.GOOGLE_MAPS_API_KEY;

/**
 * This component is used to display the details of a report in PC.
 */
export function ReportDetail({ report, isLoading }: ReportDetailProps) {
  const [locationName, setLocationName] = useState<string | null>(null);

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
  }, [report]);

  if (isLoading) {
    return (
      <div className="md:col-span-2 lg:col-span-5">
        <Card className="h-full min-h-[70vh] backdrop-blur-lg bg-background/50 border-border/50 shadow-lg">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 flex justify-center items-start">
                <Skeleton className="w-full h-[50vh] rounded-md" />
              </div>

              <div className="col-span-1 flex flex-col gap-4">
                <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                </div>

                <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>

                <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>

                <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <Skeleton className="h-[160px] w-full rounded-md" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="md:col-span-2 lg:col-span-5">
      <Card className="h-full min-h-[70vh] backdrop-blur-lg bg-background/50 border-border/50 shadow-lg">
        <CardContent className="p-3 sm:p-4 md:p-6 h-full">
          {!report ? (
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-muted-foreground"
              >
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">Please select a report</p>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full"
            >
              <div className="col-span-2 flex justify-center items-start">
                <Image
                  src={report.photo_url}
                  alt={report.photo_url}
                  width={650}
                  height={650}
                  className="rounded-md max-h-[80vh] object-contain"
                />
              </div>

              <div className="col-span-1 flex flex-col gap-4">
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

                <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
                  <h3 className="text-sm font-medium mb-2 text-foreground">Location</h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-100 p-1.5 flex-shrink-0">
                        <MapPin className="h-4 w-4 text-green-600" />
                      </div>
                      {locationName && <p className="text-caption-lg">{locationName}</p>}
                    </div>
                  </div>
                </div>

                {report.latitude && report.longitude && (
                  <div className="bg-background/80 border border-border/30 rounded-lg p-3 shadow-sm">
                    <h3 className="text-sm font-medium mb-2 text-foreground">Map</h3>
                    <div className="relative w-full h-[160px] rounded-md overflow-hidden border border-border/50 shadow-sm group">
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
                        className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <span className="text-white bg-black/50 px-2 py-1 rounded text-sm">Open in Maps</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
