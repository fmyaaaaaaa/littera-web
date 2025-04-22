"use client";

import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

export function GoogleMapView() {
  const API_KEY = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) ?? globalThis.GOOGLE_MAPS_API_KEY;

  if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set");
  }

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={API_KEY}>
        <GoogleMap
          defaultZoom={5}
          defaultCenter={{ lat: 53, lng: 10 }}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        />
      </APIProvider>
    </div>
  );
}
