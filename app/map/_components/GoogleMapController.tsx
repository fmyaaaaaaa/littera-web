"use client";

import type { Report } from "@/types";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

interface GoogleMapControllerProps {
  reports: Report[];
  center?: { lat: number; lng: number } | null;
}

export function GoogleMapController({ reports, center }: GoogleMapControllerProps) {
  const map = useMap();
  const isInitialAdjustmentRef = useRef(true);
  const lastReportsCountRef = useRef(0);
  const lastCenterRef = useRef<{ lat: number; lng: number } | null>(null);
  const isAdjustingRef = useRef(false);

  useEffect(() => {
    if (!map) return;

    // If the adjustment is already in progress, prevent duplicate execution.
    if (isAdjustingRef.current) return;

    // If there is an explicit center specified in the search parameters, move to that location.
    if (
      center &&
      (!lastCenterRef.current || lastCenterRef.current.lat !== center.lat || lastCenterRef.current.lng !== center.lng)
    ) {
      // Save the center position so that if the next time it is the same position, it is not processed.
      lastCenterRef.current = center;
      isAdjustingRef.current = true;

      // Move the camera and set the appropriate zoom level.
      map.panTo(center);
      map.setZoom(15); // Set a fixed zoom level for stability.

      // Set the completion of the adjustment with a delay.
      setTimeout(() => {
        isAdjustingRef.current = false;
        // Reset the initial adjustment flag (so that if reports come later, they can be adjusted again).
        isInitialAdjustmentRef.current = true;
      }, 500);

      return;
    }

    // If there are no reports, do nothing.
    if (reports.length === 0) return;

    // If the number of reports is the same as the last time and the initial adjustment is not needed, return.
    if (reports.length === lastReportsCountRef.current && !isInitialAdjustmentRef.current) return;

    // Save the number of reports.
    lastReportsCountRef.current = reports.length;

    // If it is an initial adjustment or if the number of reports has changed, execute.
    if (isInitialAdjustmentRef.current) {
      isAdjustingRef.current = true;

      // If there are multiple markers, display all of them.
      if (reports.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        for (const report of reports) {
          bounds.extend({ lat: report.latitude, lng: report.longitude });
        }

        // Adjust the bounds once (since the animation cannot be controlled, it is handled with a delay).
        map.fitBounds(bounds, 50); // Add padding to ensure space.

        // If the zoom needs to be adjusted, adjust it after fitBounds.
        setTimeout(() => {
          // If the zoom is too close, limit it.
          // biome-ignore lint/style/noNonNullAssertion: Biome reports this as an error as long as the getZoom() is not null
          if (map.getZoom() && map.getZoom()! > 16) {
            map.setZoom(16);
          }

          // Adjustment completed.
          isAdjustingRef.current = false;
          isInitialAdjustmentRef.current = false;
        }, 300);
      } else {
        // If there is only one marker.
        const report = reports[0];
        map.panTo({ lat: report.latitude, lng: report.longitude });
        map.setZoom(15);

        // Adjustment completed.
        setTimeout(() => {
          isAdjustingRef.current = false;
          isInitialAdjustmentRef.current = false;
        }, 300);
      }
    }
  }, [map, reports, center]);

  return null;
}
