"use server";

export async function geocodeLocationAction(placeName: string) {
  if (!placeName.trim()) {
    return {
      success: false,
      error: "Place name is required",
    };
  }
  if (!process.env.GEOLOCATION_API_URL || !process.env.GEOLOCATION_USER_AGENT) {
    return {
      success: false,
      error: "Geolocation API URL or user agent is not set",
    };
  }

  try {
    const response = await fetch(`${process.env.GEOLOCATION_API_URL}/search?q=${placeName}&format=json&limit=1`, {
      headers: {
        "User-Agent": process.env.GEOLOCATION_USER_AGENT,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      return {
        success: false,
        error: "Failed to get location data from the place name",
      };
    }

    const data = await response.json();
    if (data.length === 0) {
      return {
        success: false,
        error: "No location data found for the place name",
      };
    }

    const result = data[0];
    return {
      success: true,
      data: {
        latitude: result.lat,
        longitude: result.lon,
        placeName: result.display_name,
      },
    };
  } catch (error) {
    console.error("Error geocoding location:", error);
    return {
      success: false,
      error: "Failed to geocode location",
    };
  }
}
