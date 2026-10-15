import { getUserData } from "@/actions/auth";
import { AUTHENTICATION_COOKIE } from "@/lib/constants";
import { AUTH_BACKEND_API_URL } from "@/lib/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserData();
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const token = cookies().get(AUTHENTICATION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Authentication is required" },
      { status: 401 }
    );
  }

  const response = await fetch(`${AUTH_BACKEND_API_URL}/api/auth/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(await request.json()),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  const freshToken = data?.data?.token;
  const nextResponse = NextResponse.json(data);

  if (freshToken) {
    nextResponse.cookies.set(AUTHENTICATION_COOKIE, freshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return nextResponse;
}
