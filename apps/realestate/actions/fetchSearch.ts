import { API_URL, BACKEND_ORIGIN } from "../lib/api";

export interface SearchQuery {
  query: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  excludedApplicationId?: number;
}

export const fetchSearch = async ({
  query,
  province,
  district,
  sector,
  cell,
  excludedApplicationId,
}: SearchQuery) => {
  try {
    const response = await fetch(
      `${API_URL}/properties/full-text-search?search=${query}&province=${province}&district=${district}&sector=${sector}&cell=${cell}&excludedApplicationId=${excludedApplicationId}`,
      {
        headers: {
          Origin: BACKEND_ORIGIN,
        },
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
