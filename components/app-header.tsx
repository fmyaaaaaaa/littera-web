"use client";

import { useSearch } from "@/contexts/SearchContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { MapPin, Search } from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { SearchInfo } from "./search-info";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type SearchInputsProps = {
  searchParams: {
    placeName: string;
    latitude: string;
    longitude: string;
  };
  setPlaceName: (placeName: string) => void;
  setLatitude: (latitude: string) => void;
  setLongitude: (longitude: string) => void;
  getCurrentLocation: () => void;
};

// Make sure to avoid hydration errors
const SearchInputs = dynamic(
  () =>
    Promise.resolve(
      ({ searchParams, setPlaceName, setLatitude, setLongitude, getCurrentLocation }: SearchInputsProps) => {
        return (
          <>
            <TabsContent value="place">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Place name..."
                  value={searchParams.placeName}
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
          </>
        );
      }
    ),
  { ssr: false }
);

const APP_HEADER_PATHS = ["/map", "/reports"];

export function AppHeader() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { searchParams, setPlaceName, setLatitude, setLongitude, executeSearch, searchByPlaceName, isSearching } =
    useSearch();
  const [searchMode, setSearchMode] = useState<"coordinates" | "place">("place");

  const isDisabled =
    isSearching ||
    (searchMode === "coordinates" && (!searchParams.latitude || !searchParams.longitude)) ||
    (searchMode === "place" && !searchParams.placeName);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast.dismiss();
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          toast.success("Location successfully acquired");
        },
        (error) => {
          toast.dismiss();
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error("Location permission denied. Please enable it in your browser settings.");
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error("Location information unavailable. Please try again.");
              break;
            case error.TIMEOUT:
              toast.error("Location request timed out. Please check your network connection.");
              break;
            default:
              toast.error("Failed to get your location.");
          }
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async () => {
    if (searchMode === "place") {
      await searchByPlaceName(searchParams.placeName);
    } else {
      await executeSearch();
    }
  };

  if (!APP_HEADER_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <header className="w-full h-24 md:h-12 absolute top-0 left-0 right-0 z-50">
      <div className="flex h-full items-center gap-2 px-1 md:px-4">
        <SidebarTrigger className="-ml-1" />
        <Tabs value={searchMode} onValueChange={(value) => setSearchMode(value as "coordinates" | "place")}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <div className="flex items-center gap-2">
              <TabsList>
                <TabsTrigger value="place" className="cursor-pointer">
                  Place
                </TabsTrigger>
                <TabsTrigger value="coordinates" className="cursor-pointer">
                  Coordinates
                </TabsTrigger>
              </TabsList>
              <div className="block md:hidden">
                <SearchInfo />
              </div>
            </div>

            <SearchInputs
              searchParams={searchParams}
              setPlaceName={setPlaceName}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              getCurrentLocation={getCurrentLocation}
            />
          </div>
        </Tabs>

        <Button
          size="sm"
          variant={isMobile ? "ghost" : "default"}
          disabled={isDisabled}
          onClick={handleSearch}
          className="cursor-pointer ml-auto md:ml-0"
        >
          {isMobile ? <Search /> : "Search"}
        </Button>
        <div className="hidden md:flex">
          <SearchInfo />
        </div>
      </div>
    </header>
  );
}
