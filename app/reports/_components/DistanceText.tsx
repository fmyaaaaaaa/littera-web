import { MapPinIcon } from "lucide-react";

interface DistanceTextProps {
  distance: number;
}

export function DistanceText({ distance }: DistanceTextProps) {
  return (
    <div className="flex items-center gap-1">
      <MapPinIcon className="w-4 h-4 text-muted-foreground" />
      <p className="text-caption-md">{distance.toFixed(2)} km</p>
    </div>
  );
}
