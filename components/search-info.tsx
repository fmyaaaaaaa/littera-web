"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarIcon, CircleIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const radius = Number(process.env.NEXT_PUBLIC_LITTER_LOCATION_RADIUS) / 1000;
const period = process.env.NEXT_PUBLIC_LITTER_LOCATION_TIME_LENGTH || "1 month";

export function SearchInfo() {
  const isMobile = useIsMobile();
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Badge variant="outline" className="flex items-center gap-1 cursor-pointer">
            <CircleIcon className="h-3 w-3" />
            {!isMobile && <span>{radius} km</span>}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <p className="text-sm">Search radius: {radius} km</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Badge variant="outline" className="flex items-center gap-1 cursor-pointer">
            <CalendarIcon className="h-3 w-3" />
            {!isMobile && <span>{period}</span>}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <p className="text-sm">Search period: {period}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
