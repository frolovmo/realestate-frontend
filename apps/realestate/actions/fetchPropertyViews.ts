import { PropertyViews } from "@/lib/types";
import { authenticatedApiRequest } from "./authenticatedApi";

export default async function fetchPropertyViews(
  propertyId: string
): Promise<PropertyViews> {
  try {
    const response = await authenticatedApiRequest<any>(
      `/properties/${propertyId}/views`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch property views.");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching property views:", error);
    return {
      labels: [],
      data: [],
    };
  }
}
