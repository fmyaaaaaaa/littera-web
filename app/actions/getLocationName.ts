"use server";

export async function getLocationName(latitude: number, longitude: number) {
  if (!latitude || !longitude) {
    return {
      success: false,
      error: "Latitude and longitude are required",
    };
  }
  if (!process.env.GEOLOCATION_API_URL || !process.env.GEOLOCATION_USER_AGENT) {
    return {
      success: false,
      error: "Geolocation API URL or user agent is not set",
    };
  }
  try {
    const response = await fetch(
      `${process.env.GEOLOCATION_API_URL}/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          "User-Agent": process.env.GEOLOCATION_USER_AGENT,
        },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      return {
        success: false,
        error: "Failed to get location name",
      };
    }
    const data = await response.json();
    if (data.length === 0) {
      return {
        success: false,
        error: "No location name found",
      };
    }
    return {
      success: true,
      locationName: data.display_name,
    };
  } catch (error) {
    console.error("Failed to get location name", error);
    return {
      success: false,
      error: "Failed to get location name",
    };
  }
}
