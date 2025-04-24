"use server";

import type { ReportWithImage, ReportsWithImageResponse } from "@/types";
import type { Pagination } from "@/types/common";

export type GetReportsWithImageByLocationParams = {
  latitude: number;
  longitude: number;
  page: number;
  pageSize?: number;
};

export const getReportsWithImageByLocation = async (
  params: GetReportsWithImageByLocationParams
): Promise<ReportsWithImageResponse> => {
  const apiUsername = process.env.BASIC_API_USERNAME;
  const apiPassword = process.env.BASIC_API_KEY;
  const authString =
    apiUsername && apiPassword ? `Basic ${Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64")}` : undefined;

  const radius = process.env.LITTER_LOCATION_RADIUS;
  const timeLength = process.env.LITTER_LOCATION_TIME_LENGTH;
  const { latitude, longitude, page, pageSize = Number(process.env.API_DEFAULT_PAGE_SIZE) } = params;
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/reports/points/location/media?latitude=${latitude}&longitude=${longitude}&radius=${radius}&time_length=${timeLength}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(authString && { Authorization: authString }),
        },
      }
    );
    if (!response.ok) {
      return {
        success: false,
        error: "Failed to get reports with image by location",
      };
    }
    const data = await response.json();
    return {
      success: true,
      data: {
        reports: data.reports as ReportWithImage[],
        pagination: data.pagination as Pagination,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to get reports with image by location",
    };
  }
};
