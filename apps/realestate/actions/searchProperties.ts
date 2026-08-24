import { PropertiesListResponseData } from "../lib/types/index";
import createQueryParams from "@/lib/utils/createQueryParams";
import { authenticatedApiRequest } from "./authenticatedApi";

export enum SearchPropertiesField {
  NAME = "name",
  DESCRIPTION = "description",
}

export interface ISearchPropertiesParams {
  text: string;
  fields: SearchPropertiesField[];
  page?: number;
  limit?: number;
}

export async function searchProperties({
  text,
  fields,
  page,
  limit,
}: ISearchPropertiesParams): Promise<PropertiesListResponseData> {
  const query = createQueryParams({ page, limit, text, fields });

  const response = await authenticatedApiRequest<any>(
    `/properties/search-by-fields?${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties data");
  }
  return response.data.data;
}
