import { ReportStatus } from "@/types";

interface ReportStatusChipProps {
  status: ReportStatus;
}

export function ReportStatusChip({ status }: ReportStatusChipProps) {
  if (status === ReportStatus.REPORTING) {
    return (
      <div className="flex items-center gap-1.5 pl-0.5">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
        <span className="text-caption-md font-medium text-gray-900">Reporting</span>
      </div>
    );
  }

  if (status === ReportStatus.COLLECTED_SUCCESS) {
    return (
      <div className="flex items-center gap-1.5 pl-0.5">
        <span className="relative flex h-3 w-3">
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400" />
        </span>
        <span className="text-caption-md font-medium text-gray-900">Collected</span>
      </div>
    );
  }

  return <div className="text-caption-md font-medium text-gray-900">{status}</div>;
}
