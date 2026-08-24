"use server";
import {
  ApplicationResponseDataFromApiV1,
  ApplicationResponseDataFromNewApi,
} from "../lib/types/index";
import { API_URL, AUTH_BACKEND_API_URL, BACKEND_ORIGIN } from "../lib/api";
import { getAuthentication } from "./auth";
import { AUTHENTICATION_COOKIE, basePath } from "@/lib/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function fetchApplication() {
  const authToken = (await getAuthentication())?.value;

  const getApplicationDataFromApiV1 = async () => {
    try {
      const responseFromGWV1 = await fetch(`${AUTH_BACKEND_API_URL}/api/loan`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!responseFromGWV1.ok) {
        if (responseFromGWV1.status === 401) {
          cookies().delete(AUTHENTICATION_COOKIE);
          redirect(`${basePath}/login`);
        }

        if (responseFromGWV1.status === 404) {
          return null;
        }

        throw new Error(
          `Request for an application to Realestate V1 API failed with status: ${responseFromGWV1.status}`
        );
      }

      const { data } = await responseFromGWV1.json();

      return data as unknown as ApplicationResponseDataFromApiV1;
    } catch (error) {
      console.error("Error fetching application from V1:", error);
      return null;
    }
  };

  const getApplicationDataFromNewApi = async (applicationId: number) => {
    try {
      const responseFromNewAPI = await fetch(
        `${API_URL}/applications?externalId=${applicationId}`,
        {
          cache: "no-store",
          headers: {
            Origin: BACKEND_ORIGIN,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!responseFromNewAPI.ok && responseFromNewAPI.status === 404) {
        throw new Error(
          `Request for an application to Realestate NEW API failed with status: ${responseFromNewAPI.status}`
        );
      }
      const { data } = await responseFromNewAPI.json();

      return Array.isArray(data) ? data[0] : data;
    } catch (error) {
      console.error("Error fetching application from Realestate NEW API:", error);
      return null;
    }
  };

  const applicationDataFromApiV1 = await getApplicationDataFromApiV1();
  const applicationDataFromNewApi: ApplicationResponseDataFromNewApi =
    applicationDataFromApiV1
      ? await getApplicationDataFromNewApi(applicationDataFromApiV1.id)
      : null;

  return {
    applicationDataFromApiV1,
    applicationDataFromNewApi,
  };
}
