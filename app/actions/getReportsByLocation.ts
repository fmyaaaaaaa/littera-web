"use server";

import type { Report, ReportsResponse } from "@/types";

export const getReportsByLocation = async (latitude: number, longitude: number): Promise<ReportsResponse> => {
  const apiUsername = process.env.BASIC_API_USERNAME;
  const apiPassword = process.env.BASIC_API_KEY;

  const authString =
    apiUsername && apiPassword ? `Basic ${Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64")}` : undefined;

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/reports/points/location?latitude=${latitude}&longitude=${longitude}&radius=100000&time_length=1 month`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(authString && { Authorization: authString }),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Failed to get reports by location", response);
      return { success: false, error: "Failed to get reports by location" };
    }

    const data = await response.json();
    const reports = data.reports as Report[];
    return { success: true, data: { reports } };
  } catch (error) {
    console.error("Failed to get reports by location", error);
    return { success: false, error: "Failed to get reports by location" };
  }
};
