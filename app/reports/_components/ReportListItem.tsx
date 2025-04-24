"use client";

import { LitterCategoryChips } from "@/app/map/_components/LitterCategoryChip";
import { ReportStatusChip } from "@/app/reports/_components/ReportStatusChip";
import { useSearch } from "@/contexts/SearchContext";
import { formatDate } from "@/lib/date";
import { calculateDistanceInKm } from "@/lib/distance";
import { cn } from "@/lib/utils";
import type { ReportWithImage } from "@/types";
import { type Variants, motion } from "framer-motion";
import Image from "next/image";
import { DistanceText } from "./DistanceText";

interface ReportListItemProps {
  report: ReportWithImage;
  selectedReportId: string | null;
  setSelectedReportId: (id: string) => void;
  itemVariants: Variants;
}

export default function ReportListItem({
  report,
  selectedReportId,
  setSelectedReportId,
  itemVariants,
}: ReportListItemProps) {
  const { searchParams } = useSearch();
  const distance = calculateDistanceInKm(
    Number(searchParams.latitude),
    Number(searchParams.longitude),
    report.latitude,
    report.longitude
  );

  return (
    <motion.div
      key={report.id}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedReportId(report.id)}
      className={cn(
        "p-4 rounded-xl cursor-pointer transition-all hover:shadow-md",
        selectedReportId === report.id
          ? "bg-gradient-to-r from-primary-500/10 to-primary-700/10 border border-primary-500/20"
          : "bg-card/50 backdrop-blur-sm border border-border/30 hover:border-border/50"
      )}
    >
      <div className="flex gap-3">
        <div className="relative w-28 h-28 rounded-xl overflow-hidden">
          <Image src={report.photo_url} alt={report.id} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-caption-lg">{formatDate(report.report_date)}</p>
          <ReportStatusChip status={report.status} />
          <DistanceText distance={distance} />
          <LitterCategoryChips categories={report.litter_categories} size="sm" variant="green" />
        </div>
      </div>
    </motion.div>
  );
}
