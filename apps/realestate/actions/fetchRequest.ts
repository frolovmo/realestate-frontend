import { UnitResponseData } from "../lib/types/index";
import { authenticatedApiRequest } from "./authenticatedApi";

export async function fetchRequest(id: string): Promise<UnitResponseData> {
  const response = await authenticatedApiRequest<any>(`/requests/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch unit data");
  }
  return response.data.data;
}
