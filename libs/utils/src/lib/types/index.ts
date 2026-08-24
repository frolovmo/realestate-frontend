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

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  occupation: string;
  employer: string;
  income: number;
  phoneNumber: string;
  email: string;
  address: string;
  dateOfBirth: Date;
  gender: string;
  maritalStatus: string;
  customerId: string;
}

export interface User {
  identificationType: string;
  identificationNumber: string;
  phone: string;
  email: string;
}

export interface  Role {
  name: string;
}

export interface RoutePermission {
  id: number;
  routeId: number;
  projectId: number;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  formattedName: string;
  roleName: string;
  createdById: number;
  isAccessRemoved: boolean;
  createdAt: string;
  updatedAt: string;
} 