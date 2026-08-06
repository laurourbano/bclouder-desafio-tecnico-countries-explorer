// Loose type for v3.1 and v5 responses — keep optional fields and allow extra properties
export interface RestCountryApiResponse {
  name?: any; // v3: { common, official } | v5: might differ
  cca3?: string;
  cca2?: string;
  ccn3?: string | number;
  capital?: string[];
  capitalCity?: string;
  population?: number;
  region?: string;
  subregion?: string;
  borders?: string[];
  flags?: any;
  flag?: string;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  area?: number;
  translations?: Record<string, { official: string; common: string }>;
  [key: string]: any;
}
