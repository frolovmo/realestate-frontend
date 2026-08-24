import { AxiosRequestConfig } from "axios";

// --------- API Request/Response Types ---------
export type Methods =
  | "head"
  | "options"
  | "put"
  | "post"
  | "patch"
  | "delete"
  | "get";

export interface ApiRequestTypes {
  reqType: Methods;
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}