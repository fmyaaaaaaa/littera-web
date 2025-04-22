"use server";

import type { ReportDetail, ReportDetailResponse } from "@/types";

export const getReportDetail = async (id: string): Promise<ReportDetailResponse> => {
  const apiUsername = process.env.BASIC_API_USERNAME;
  const apiPassword = process.env.BASIC_API_KEY;

  const authString =
    apiUsername && apiPassword ? `Basic ${Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64")}` : undefined;

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/reports/detail?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        ...(authString && { Authorization: authString }),
      },
    });

    if (!response.ok) {
      console.error("Failed to get report detail", response);
      return { success: false, error: "Failed to get report detail" };
    }

    const data = await response.json();
    return { success: true, data: data as ReportDetail };
  } catch (error) {
    console.error("Failed to get report detail", error);
    return { success: false, error: "Failed to get report detail" };
  }
};
