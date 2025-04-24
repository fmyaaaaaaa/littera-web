import type { Pagination } from "./common";

export enum ReportStatus {
  REPORTING = 0,
  COLLECTED_SUCCESS = 2,
}

export interface LitterCategory {
  id: number;
  jp: string;
  en: string;
}

export interface Report {
  id: string;
  latitude: number;
  longitude: number;
  report_date: string;
  status: ReportStatus;
  main_category_id: number;
  litter_categories: LitterCategory[];
}

export interface ReportsResponse {
  success: boolean;
  data?: {
    reports: Report[];
  };
  error?: string;
}

export interface ReportDetail {
  report_id: string;
  latitude: number;
  longitude: number;
  report_date: string;
  status: ReportStatus;
  litter_categories: LitterCategory[];
  photo_url: string;
}

export interface ReportDetailResponse {
  success: boolean;
  data?: ReportDetail;
  error?: string;
}

export interface ReportWithImage extends Report {
  photo_url: string;
}

export interface ReportsWithImageResponse {
  success: boolean;
  data?: {
    reports: ReportWithImage[];
    pagination: Pagination;
  };
  error?: string;
}
