import { authenticatedApiRequest } from "./authenticatedApi";
import { PropertyData } from "../lib/types/index";

export default async function fetchPropertyById(
  id: string
): Promise<PropertyData | null> {
  try {
    const response = await authenticatedApiRequest<any>(`/properties/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties.");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching property data:", error);
    return null;
  }
}
