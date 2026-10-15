"use server";

import { authenticatedApiRequest } from "./authenticatedApi";

async function getDashboard(path: string) {
  const response = await authenticatedApiRequest<any>(path);
  if (!response.ok) {
    const message =
      response.data?.message ||
      response.data?.error ||
      `Dashboard request failed with status ${response.status}`;

    throw new Error(message);
  }
  return response.data;
}

export const fetchDashboardSummary = async (_identity?: string): Promise<any> =>
  getDashboard("/dashboard/summary");

export const fetchDashboardMonthlySalesPerformance = async (
  _identity?: string
): Promise<any> => getDashboard("/dashboard/monthly-sales-performance");

export const fetchDashboardRecentlyUpdatedProperties = async (
  _identity?: string,
  limit = 2
): Promise<any> =>
  getDashboard(`/dashboard/recently-updated-properties?limit=${limit}`);
