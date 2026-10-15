import { NextRequest, NextResponse } from "next/server";

import { AUTHENTICATION_COOKIE, basePath } from "../../../../lib/constants";

const getSafeRedirect = (redirectTo: string | null) => {
  if (!redirectTo || !redirectTo.startsWith("/")) return "/";
  if (redirectTo.startsWith("//")) return "/";

  return redirectTo;
};

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const redirectTo = getSafeRedirect(request.nextUrl.searchParams.get("redirectTo"));
  const targetUrl = new URL(`${basePath}${redirectTo}`, request.url);

  if (!token) {
    targetUrl.pathname = `${basePath}/login`;
    targetUrl.searchParams.set("message", "Social sign-in did not return a token");
    return NextResponse.redirect(targetUrl);
  }

  const response = NextResponse.redirect(targetUrl);

  response.cookies.set(AUTHENTICATION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
