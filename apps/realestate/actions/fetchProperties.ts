"use server";
import createQueryParams from "@/lib/utils/createQueryParams";
import { authenticatedApiRequest } from "./authenticatedApi";

interface IFetchPropertiesParams {
  page?: number;
  limit?: number;
  userId?: number;
  unitType?: string;
  unitStatus?: string;
  unitIdentifier?: string;
  developmentStage?: string;
}

export default async function fetchProperties({
  page,
  limit,
  userId,
  unitType,
  unitStatus,
  unitIdentifier,
  developmentStage,
}: IFetchPropertiesParams) {
  const query = createQueryParams({
    page,
    limit,
    userid: userId,
    unitstatus: unitStatus,
    unitType,
    identifier: unitIdentifier,
    developmentStage,
  });

  const response = await authenticatedApiRequest<any>(
    `/properties?${query}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch properties.");
  }
  return (response.data as any).data;
}
