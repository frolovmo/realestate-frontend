import { AUTHENTICATION_COOKIE, basePath } from "./constants";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL! + process.env.NEXT_PUBLIC_API_PREFIX!;
export const BACKEND_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_ORIGIN!;
export const AUTH_BACKEND_API_URL =
  process.env.NEXT_PUBLIC_AUTH_BACKEND_API_URL!;
export const AUTH_LOGIN_PATH =
  process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH || "/api/auth/login";
export const FILE_STORAGE_API = process.env.NEXT_PUBLIC_FILE_STORAGE_API_URL!;
export const NEXT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

export async function logoutUnauthorized() {
  document.cookie = `${AUTHENTICATION_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  const currentPath = window.location.pathname;
  window.location.href = `${basePath}/login?redirectTo=${encodeURIComponent(
    currentPath
  )}`;
}
