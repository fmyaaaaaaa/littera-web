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
  status: number;
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
  status: number;
  litter_categories: LitterCategory[];
  photo_url: string;
}

export interface ReportDetailResponse {
  success: boolean;
  data?: ReportDetail;
  error?: string;
}
