"use client";

import { getReportsWithImageByLocation } from "@/app/actions/getReportsWithImageByLocation";
import { useSearch } from "@/contexts/SearchContext";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ReportWithImage } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CategorySelection } from "./CategorySelection";
import { ReportDetail } from "./ReportDetail";
import { ReportDetailDialog } from "./ReportDetailDialog";
import { ReportLayout } from "./ReportLayout";
import { ReportList } from "./ReportList";

export function ReportContainer() {
  const isMobile = useIsMobile();
  const { registerSearchHandler, setPage, isSearching } = useSearch();
  const [reports, setReports] = useState<ReportWithImage[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredReports = useMemo(() => {
    if (!selectedCategoryId) {
      return reports;
    }
    return reports.filter((report) => report.litter_categories.some((category) => category.id === selectedCategoryId));
  }, [reports, selectedCategoryId]);

  const selectedReport = filteredReports.find((report) => report.id === selectedReportId) || null;

  const searchHandler = useCallback(
    async (params: { latitude: string; longitude: string; page?: number; pageSize?: number }) => {
      if (!params) {
        return null;
      }
      if (!params.latitude || !params.longitude) {
        toast.error("Location is required");
        return null;
      }
      try {
        const response = await getReportsWithImageByLocation({
          latitude: Number(params.latitude),
          longitude: Number(params.longitude),
          page: Number(params.page || 1),
        });
        if (!response.success) {
          toast.error("Failed to get reports");
          return null;
        }
        if (response.data) {
          setReports(response.data.reports);
          setSelectedReportId(response.data.reports[0]?.id || null);
          setPage(response.data.pagination.current_page + 1);
        }
      } catch (error) {
        toast.error("Failed to get reports");
      }
    },
    [setPage]
  );

  useEffect(() => {
    registerSearchHandler(searchHandler);
    return () => {
      registerSearchHandler(null);
    };
  }, [registerSearchHandler, searchHandler]);

  const handleFilterByCategory = (id: number | null) => {
    setSelectedCategoryId(id);
    if (id) {
      const firstReportInCategory = reports.find((report) =>
        report.litter_categories.some((category) => category.id === id)
      );
      if (firstReportInCategory) {
        setSelectedReportId(firstReportInCategory.id);
      }
    } else {
      setSelectedReportId(reports[0]?.id || null);
    }
  };

  const handleSelectReport = (id: string) => {
    setSelectedReportId(id);
    if (isMobile) {
      setIsOpen(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <CategorySelection selectedCategoryId={selectedCategoryId} onSelectCategoryId={handleFilterByCategory} />
      <ReportLayout>
        <ReportList
          reports={filteredReports}
          selectedReportId={selectedReportId}
          setSelectedReportId={handleSelectReport}
          isLoading={isSearching}
        />
        {!isMobile && <ReportDetail report={selectedReport} isLoading={isSearching} />}
      </ReportLayout>

      {isMobile && <ReportDetailDialog report={selectedReport} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
