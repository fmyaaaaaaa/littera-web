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
  reportDate: string;
  status: ReportStatus;
  mainCategoryId: number;
  litterCategories: LitterCategory[];
}

export interface ReportsResponse {
  success: boolean;
  data?: {
    reports: Report[];
  };
  error?: string;
}

export interface ReportDetail {
  reportId: string;
  latitude: number;
  longitude: number;
  reportDate: string;
  status: ReportStatus;
  litterCategories: LitterCategory[];
  photoUrl: string;
}

export interface ReportDetailResponse {
  success: boolean;
  data?: ReportDetail;
  error?: string;
}

export interface ReportWithImage extends Report {
  photoUrl: string;
}

export interface ReportsWithImageResponse {
  success: boolean;
  data?: {
    reports: ReportWithImage[];
    pagination: Pagination;
  };
  error?: string;
}
