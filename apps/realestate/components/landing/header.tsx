"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { HiMiniBars3BottomRight } from "react-icons/hi2";

import IzeTechLogo from "../brand/IzeTechLogo";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { UserData } from "../../lib/types/index";
import { basePath } from "../../lib/constants";

const getNavigationLinks = ({
  isAuth,
  pathname,
}: {
  isAuth: boolean;
  pathname: string;
}) => {
  const isLanding = pathname === basePath || pathname === "/";

  return [
    {
      path: isLanding ? "#home" : `${basePath}/`,
      text: "Home",
      isExternalPath: !isLanding,
    },
    { path: "#about", text: "About" },
    {
      path: isAuth ? `${basePath}/explore` : `${basePath}/login`,
      text: "Properties",
      isExternalPath: true,
    },
    { path: "#faq", text: "FAQ" },
  ];
};

interface HeaderProps {
  user: UserData;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigationLinks = getNavigationLinks({ isAuth: !!user, pathname });

  const handleLogout = useCallback(() => {
    document.cookie =
      "Authentication=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push(`${basePath}/login`);
    router.refresh();
  }, [router]);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    isExternalPath?: boolean
  ) => {
    if (isExternalPath) {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();
    if (pathname !== basePath && pathname !== "/") {
      setScrollTarget(path);
      router.push(`${basePath}/`);
    } else {
      document.querySelector(path)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!scrollTarget) return;
    document.querySelector(scrollTarget)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setScrollTarget(null);
  }, [scrollTarget]);

  useEffect(() => {
    if (!user) return;

    const inactivityLimit = 15 * 60 * 1000;
    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleLogout, inactivityLimit);
    };
    const activityEvents = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );
    resetTimer();

    return () => {
      clearTimeout(timeout);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [handleLogout, user]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 shadow-[0_10px_35px_-28px_rgba(22,8,59,0.75)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-[1600px] items-center justify-between gap-5 px-5 md:px-8">
        <Link href={`${basePath}/`} className="shrink-0">
          <IzeTechLogo
            productLabel="Real Estate"
            className="text-[32px] md:text-[36px]"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-12">
            {navigationLinks.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.path}
                  scroll={false}
                  className={cn(
                    "relative py-3 text-sm font-medium text-secondary/65 hover:text-secondary",
                    item.path === pathname &&
                      "font-semibold text-secondary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary"
                  )}
                  onClick={(event) =>
                    handleNavigation(event, item.path, item.isExternalPath)
                  }
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          {user ? (
            <div className="relative">
              <button
                className="flex min-w-[235px] items-center gap-3 rounded-full border border-border bg-background px-1.5 py-1.5 pr-5 text-left hover:border-primary"
                onClick={() => setShowDropdown((previous) => !previous)}
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-semibold text-white ring-2 ring-primary/40">
                    {user.fullName?.[0]}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-secondary">
                    {user.fullName}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {user.roleName}
                  </span>
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-[56px] z-50 w-52 overflow-hidden rounded-xl border bg-white shadow-xl">
                  <Link
                    href={`${basePath}/profile`}
                    className="block px-4 py-3 text-sm font-medium text-secondary hover:bg-primaryneutral"
                  >
                    View profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full border-t px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="active"
              onClick={() => router.push(`${basePath}/login`)}
              className="h-11 px-7"
            >
              Login / Sign Up
            </Button>
          )}
        </div>

        <button
          className="rounded-lg border border-border p-2 text-secondary hover:border-primary hover:bg-primaryneutral md:hidden"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <FaTimes size={22} /> : <HiMiniBars3BottomRight size={25} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-t bg-white p-4 shadow-xl md:hidden">
          <ul className="overflow-hidden rounded-xl border">
            {navigationLinks.map((item) => (
              <li key={item.text} className="border-b last:border-b-0">
                <Link
                  href={item.path}
                  className="block px-5 py-3.5 text-center font-medium text-secondary hover:bg-primaryneutral"
                  onClick={(event) =>
                    handleNavigation(event, item.path, item.isExternalPath)
                  }
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            {user ? (
              <div className="flex items-center justify-between rounded-xl bg-secondary p-3 text-white">
                <span className="truncate text-sm font-medium">
                  {user.fullName}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Button
                variant="active"
                onClick={() => router.push(`${basePath}/login`)}
                className="w-full"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
