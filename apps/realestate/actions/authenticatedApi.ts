"use server";

import { cookies } from "next/headers";

import { API_URL, BACKEND_ORIGIN } from "../lib/api";
import { AUTHENTICATION_COOKIE } from "../lib/constants";

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  cache?: RequestCache;
  headers?: Record<string, string>;
};

export type ApiActionResponse<T = unknown> = {
  ok: boolean;
  status: number;
  data: T;
};

export async function authenticatedApiRequest<T = unknown>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<ApiActionResponse<T>> {
  const token = cookies().get(AUTHENTICATION_COOKIE)?.value;

  if (!token) {
    return {
      ok: false,
      status: 401,
      data: { message: "Authentication is required" } as T,
    };
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    cache: options.cache || "no-store",
    headers: {
      Origin: BACKEND_ORIGIN,
      Authorization: `Bearer ${token}`,
      ...(options.body !== undefined
        ? { "Content-Type": "application/json" }
        : {}),
      ...options.headers,
    },
    ...(options.body !== undefined
      ? { body: JSON.stringify(options.body) }
      : {}),
  });

  const data = await response.json().catch(() => null);

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}
