import { UnitsListResponseData } from "../lib/types/index";
import createQueryParams from "@/lib/utils/createQueryParams";
import { authenticatedApiRequest } from "./authenticatedApi";

export enum SearchUnitsField {
  NAME = "name",
  DESCRIPTION = "description",
}

export interface ISearchUnitsParams {
  text: string;
  fields: SearchUnitsField[];
  page?: number;
  limit?: number;
}

export async function searchUnits({
  text,
  fields,
  page,
  limit,
}: ISearchUnitsParams): Promise<UnitsListResponseData> {
  const query = createQueryParams({ page, limit, text, fields });

  const response = await authenticatedApiRequest<any>(
    `/units/search-by-fields?${query}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch units data");
  }
  return response.data.data;
}
