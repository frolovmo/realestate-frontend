import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTHENTICATION_COOKIE, basePath } from "./lib/constants";
import { ROLE_BASED_ROUTES, PUBLIC_ROUTES } from "./lib/accessControl";
import { jwtDecode } from "jwt-decode";
import {
  DecryptedUser,
  JwtDecodedData,
  JwtDecodedDataNewAPI,
} from "./lib/types";

const redirectToLogin = (req: NextRequest, pathname: string) => {
  const loginUrl = new URL(`${basePath}/login`, req.url);
  loginUrl.searchParams.set("redirectTo", pathname);
  return NextResponse.redirect(loginUrl);
};

async function fetchDecryptedUser(
  req: NextRequest,
  hash: string
): Promise<any> {
  try {
    const url = `${req.nextUrl.origin}/api/decrypt-user`; // Use absolute URL
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash }),
      next: { revalidate: 0 }, // Prevent caching issues
    });
    if (!res.ok) {
      throw new Error("Failed to fetch decrypted user");
    }
    const data = await res.json();
    return data.decryptedData;
  } catch (error) {
    console.error("Error fetching decrypted user:", error);
    return null;
  }
}

function getUserRoles(decryptedUser: DecryptedUser): string[] {
  const roleNames =
    decryptedUser?.encrypt?.roles?.map((role) => role.name) || [];

  return roleNames
    .map((roleName) => {
      if (roleName.includes("Property Developer")) {
        return "developer";
      }

      if (roleName === "Admin") {
        return "staff";
      }

      return undefined;
    })
    .filter(Boolean) as string[];
}

function getRouteRole(roleName?: string): string | null {
  if (roleName === "Applicant") return "applicant";
  if (roleName === "Property Developer") return "developer";
  if (roleName === "Admin") return "staff";
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(AUTHENTICATION_COOKIE);

  const filesRoute = "/bucket/pdf";

  // 🟢 Public Route Check (ignores query params)
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    typeof route === "string" ? route.includes(pathname) : route.test(pathname)
  );

  const isFileRoute = pathname.includes(filesRoute);

  if (isPublicRoute || isFileRoute) {
    return NextResponse.next();
  }

  // 🔒 Authentication Check
  if (!token?.value) {
    console.warn("No token found, redirecting to login");
    return redirectToLogin(req, pathname);
  }

  // 🪪 Decode JWT
  let userRoles: string[] = [];
  try {
    const data: JwtDecodedData & JwtDecodedDataNewAPI = jwtDecode(
      token?.value as string
    );

    // Check role from JWT if available
    const tokenRole = getRouteRole(
      data?.userRole?.RoleName ||
        (data as any).roleName ||
        (data as any).role
    );
    if (tokenRole) {
      userRoles = [tokenRole];
    }

    if (data?.user) {
      const decryptedUser = await fetchDecryptedUser(req, data.user);
      if (!decryptedUser) {
        console.error("Decrypted user is null, redirecting to login");
        return redirectToLogin(req, pathname);
      }

      userRoles = getUserRoles(decryptedUser);
      console.log("Resolved User Role from Decryption:", userRoles);
    }
  } catch {
    console.error("Error decoding JWT or fetching user roles:");
    return redirectToLogin(req, pathname);
  }

  // 🛑 Role-Based Check
  const allowedRoutes: (string | RegExp)[] =
    userRoles && userRoles.length
      ? userRoles.flatMap((role) => ROLE_BASED_ROUTES[role] ?? [])
      : [];
  const isAuthorized = allowedRoutes.some((route) =>
    typeof route === "string"
      ? (basePath + pathname).startsWith(route)
      : route.test(basePath + pathname)
  );

  if (!isAuthorized) {
    console.warn(
      `Role "${userRoles.toString()}" not authorized for ${pathname}, redirecting.`
    );
    return redirectToLogin(req, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico|sitemap.xml|robots.txt|.well-known).*)"],
};
