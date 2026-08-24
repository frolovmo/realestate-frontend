"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
/* eslint-disable @nx/enforce-module-boundaries */
import { auth } from "@uno/utils";

// Define a type for the WrappedComponent's props
export type WithAuthProps = {
  [key: string]: unknown; // Add any shared props if needed
};

// Define the HOC
export function withAuth<T extends WithAuthProps>(
  WrappedComponent: React.ComponentType<T>,
  AuthLayout?: React.ComponentType<{ children: React.ReactNode }>
): React.FC<T> {
  return function AuthenticatedComponent(props: T) {
    const router = useRouter();
    const pathname = usePathname();

    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const isAuthenticated = !!auth.isAuthenticated();
          const isAuthPath = auth.isAuthPath(pathname);
          const otherPublicPaths = ["/", "/mobile-app/terms"];
          const isPublicPath = otherPublicPaths.includes(pathname);
          const selectedDomain = localStorage.getItem("selectedDomain");

          // User is not authenticated and not on any auth page
          if (isPublicPath) {
            setIsLoading(false);
            return;
          }

          if (!isAuthenticated && !isAuthPath) {
            setIsLoading(false);
            router.push("/");
            return;
          }

          // User is authenticated and on any auth page (login, register, reset pswd etc)
          if (isAuthenticated && isAuthPath) {
            if (!selectedDomain) {
              router.push("/auth/domains");
              setIsLoading(false);
              return;
            }

            router.push(selectedDomain);
            return;
          }

          //User is authenticated and on a protected route
          if (isAuthenticated && !isAuthPath) {
            if (!selectedDomain) { // If no domain is selected, redirect to domain selection
              router.push("/auth/domains");
              setIsLoading(false);
              return;
            }

            setIsAuth(true);
          }
          setIsLoading(false);

        } catch (error) {
          console.error("Auth check failed:", error);
          router.push("/");
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [pathname, router]);

    if (isLoading) {
      // Show a loading spinner or blank screen while determining auth state
      return (
        <html lang="en">
          <body>
            <div className="flex items-center justify-center">
              <ProgressSpinner className="h-screen" />
            </div>
          </body>
        </html>
      );
    }

    // Render the wrapped component only if authenticated
    return (
      <html lang="en">
        <body>
          {isAuth ? (
            AuthLayout ? (
              <AuthLayout>
                <WrappedComponent {...props} />
              </AuthLayout>
            ) : (
              <WrappedComponent {...props} />
            )
          ) : (
            <WrappedComponent {...props} />
          )}
        </body>
      </html>
    );
  };
}
