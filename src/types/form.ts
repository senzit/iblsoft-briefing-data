export enum ReportTypes {
  METAR = "METAR",
  TAF = "TAF_LONGTAF",
  SIGMET = "SIGMET"
}

export interface BriefingFormData {
  reportTypes: ReportTypes[];
  stations: string;
  countries: string;
}

export enum BriefingErrorTypes {
  REPORT_TYPES = "REPORT_TYPES",
  STATIONS = "STATIONS",
  COUNTRIES = "COUNTRIES"
}

export enum LocalizationType {
  STATIONS = "stations",
  COUNTRIES = "countries",
}