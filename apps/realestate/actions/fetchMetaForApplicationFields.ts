"use server";

import { AUTH_BACKEND_API_URL } from "@/lib/api";
import {
  BankResponse,
  HouseCategoryResponse,
  MetaForApplicationFields,
} from "@/lib/types/applicationFieldsMeta";
import { getAuthentication } from "./auth";
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE, basePath } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function fetchMetaForApplicationFields(): Promise<MetaForApplicationFields> {
  const token = (await getAuthentication())?.value;

  try {
    const [banksRes, houseCategoriesRes] = await Promise.all([
      fetch(`${AUTH_BACKEND_API_URL}/api/banks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          cookies().delete(AUTHENTICATION_COOKIE);
          redirect(`${basePath}/login`);
        }
        return res.json() as Promise<BankResponse>;
      }),
      fetch(`${AUTH_BACKEND_API_URL}/api/house-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          cookies().delete(AUTHENTICATION_COOKIE);
          redirect(`${basePath}/login`);
        }
        return res.json() as Promise<HouseCategoryResponse>;
      }),
    ]);

    return {
      banks: banksRes.data.Banks,
      houseCategories: houseCategoriesRes.data.categories,
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return { banks: null, houseCategories: null };
  }
}
