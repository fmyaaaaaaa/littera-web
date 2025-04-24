import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";

interface TotalReportCountProps {
  totalReportCount: number;
}

export const TotalReportCount = ({ totalReportCount }: TotalReportCountProps) => {
  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 opacity-80">
              <Flag className="h-6 w-6 text-primary-900" />
            </div>
            <div>
              <p className="text-body-md text-black-600">Total Report Count</p>
              <p className="text-display-sm font-bold">{totalReportCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
