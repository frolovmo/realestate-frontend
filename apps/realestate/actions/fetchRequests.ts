import { UnitResponseData } from "../lib/types/index";
import { authenticatedApiRequest } from "./authenticatedApi";

export default async function fetchRequests(): Promise<UnitResponseData[]> {
  const response = await authenticatedApiRequest<any>("/requests");
  if (!response.ok) throw new Error("Failed to fetch requests");
  return response.data.data;
}
