"use client";

import { geocodeLocationAction } from "@/app/actions/geocodeLocationAction";
import { useSearch } from "@/contexts/SearchContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function AppHeader() {
  const isMobile = useIsMobile();
  const { searchParams, setLatitude, setLongitude, executeSearch, executeSearchWithCoordinates, isSearching } =
    useSearch();
  const [placeName, setPlaceName] = useState("");
  const [searchMode, setSearchMode] = useState<"coordinates" | "place">("place");

  const isDisabled =
    isSearching ||
    (searchMode === "coordinates" && (!searchParams.latitude || !searchParams.longitude)) ||
    (searchMode === "place" && !placeName);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting current location:", error);
          toast.error("Error getting current location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async () => {
    if (searchMode === "place") {
      const results = await geocodeLocationAction(placeName);
      if (!results.success || !results.data) {
        toast.error("Cannot find location for the place name. \n Please try again or use coordinates.", {
          position: "top-right",
          style: { whiteSpace: "pre-line" },
        });
        return;
      }
      setLatitude(results.data.latitude);
      setLongitude(results.data.longitude);
      await executeSearchWithCoordinates(results.data.latitude, results.data.longitude);
    } else {
      await executeSearch();
    }
  };

  return (
    <header className="w-full h-24 md:h-12 absolute top-0 left-0 right-0 z-50">
      <div className="flex h-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        <Tabs value={searchMode} onValueChange={(value) => setSearchMode(value as "coordinates" | "place")}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <TabsList>
              <TabsTrigger value="place">Place</TabsTrigger>
              <TabsTrigger value="coordinates">Coordinates</TabsTrigger>
            </TabsList>

            <TabsContent value="place">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Place name..."
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="pr-8"
                />
              </div>
            </TabsContent>

            <TabsContent value="coordinates">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="latitude..."
                  value={searchParams.latitude}
                  type="number"
                  step="0.000001"
                  min="-90"
                  max="90"
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-32 md:w-43"
                />
                <Input
                  placeholder="longitude..."
                  value={searchParams.longitude}
                  type="number"
                  step="0.000001"
                  min="-180"
                  max="180"
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-32 md:w-46"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={getCurrentLocation}
                  title="Get current location"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <Button
          size="sm"
          variant={isMobile ? "ghost" : "outline"}
          disabled={isDisabled}
          onClick={handleSearch}
          className="cursor-pointer ml-auto md:ml-0"
        >
          {isMobile ? <Search /> : "Search"}
        </Button>
      </div>
    </header>
  );
}
