import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { ReportWithImage } from "@/types";
import { type Variants, motion } from "framer-motion";
import type { RefObject } from "react";
import ReportListItem from "./ReportListItem";

interface ReportListProps {
  reports: ReportWithImage[];
  selectedReportId: string | null;
  setSelectedReportId: (id: string) => void;
  isLoading: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  loaderRef?: RefObject<HTMLDivElement | null>;
}

export function ReportList({
  reports,
  selectedReportId,
  setSelectedReportId,
  isLoading,
  hasMore,
  isLoadingMore,
  loaderRef,
}: ReportListProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="md:col-span-2 lg:col-span-2">
        <Card className="h-full backdrop-blur-lg bg-background/50 border-border/50 shadow-lg">
          <CardContent className="p-4">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-38 w-full rounded-xl" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="md:col-span-2 lg:col-span-2">
      <Card className="h-full backdrop-blur-lg bg-background/50 border-border/50 shadow-lg">
        <CardContent className="p-4">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <motion.div className="space-y-3" initial="hidden" animate="show" variants={container}>
              {reports.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No report found</p>
              ) : (
                <>
                  {reports.map((report) => (
                    <ReportListItem
                      key={report.id}
                      report={report}
                      selectedReportId={selectedReportId}
                      setSelectedReportId={setSelectedReportId}
                      itemVariants={item}
                    />
                  ))}
                  {hasMore && (
                    <div ref={loaderRef} className="py-2 text-center">
                      {isLoadingMore ? (
                        <div className="flex justify-center">
                          <div className="w-5 h-5 border-2 border-t-transparent border-green-600 rounded-full animate-spin" />
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Scroll for more</p>
                      )}
                    </div>
                  )}

                  {/* すべてのレポートが読み込まれた場合のメッセージ */}
                  {!hasMore && reports.length > 0 && (
                    <div className="py-2 text-center">
                      <p className="text-xs text-muted-foreground">All reports loaded</p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
