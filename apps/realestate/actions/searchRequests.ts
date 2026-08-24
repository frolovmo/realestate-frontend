import { UnitsListResponseData } from "../lib/types/index";
import createQueryParams from "@/lib/utils/createQueryParams";
import { authenticatedApiRequest } from "./authenticatedApi";

export enum SearchRequestsField {
  NAME = "name",
  DESCRIPTION = "description",
}

export interface ISearchRequestsParams {
  text: string;
  fields: SearchRequestsField[];
  page?: number;
  limit?: number;
}

export async function searchRequests({
  text,
  fields,
  page,
  limit,
}: ISearchRequestsParams): Promise<UnitsListResponseData> {
  const query = createQueryParams({ page, limit, text, fields });

  const response = await authenticatedApiRequest<any>(
    `/requests/search-by-fields?${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch requests data");
  }
  return response.data.data;
}
