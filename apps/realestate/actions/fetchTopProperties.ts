"use server";
import { unitStatus as status } from "../lib/constants";
import { API_URL, BACKEND_ORIGIN } from "../lib/api";

export const fetchTopProperties = async (options: {
  excludedApplicationId?: number;
}) => {
  const { excludedApplicationId } = options || {};

  const unitStatus = status.APPROVED;

  try {
    const response = await fetch(
      `${API_URL}/properties/public?limit=10&unitstatus=${unitStatus}&excludedApplicationId=${excludedApplicationId}`,
      {
        headers: {
          Origin: BACKEND_ORIGIN,
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || `Error: ${response.status} ${response.statusText}`
      );
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during the search request."
    );
  }
};
