"use server";

import createQueryParams from "@/lib/utils/createQueryParams";
import { API_URL, BACKEND_ORIGIN } from "../lib/api";
import { unitStatus as status } from "../lib/constants";

interface IPetchApprovedPropertiesParams {
  page?: number;
  limit?: number;
  userId?: number;
}

export default async function fetchPropertiesWithApprovedUnits(
  params?: IPetchApprovedPropertiesParams
) {
  const { page, limit, userId } = params || {};

  const query = createQueryParams({ page, limit, userid: userId, unitstatus: status.APPROVED });

  const response = await fetch(`${API_URL}/properties/public?${query}`, {
    cache: "no-store", // Ensures fresh data for each request
    headers: {
      Origin: BACKEND_ORIGIN,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch properties.");
  }
  const { data } = await response.json();
  return data;
}
