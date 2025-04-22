"use client";

import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface CustomMarkerProps {
  position: { lat: number; lng: number };
  color: string;
  onClick?: () => void;
}

export function CustomMarker({ position, color, onClick }: CustomMarkerProps) {
  return <AdvancedMarker position={position} onClick={onClick} style={{ backgroundColor: color }} />;
}
