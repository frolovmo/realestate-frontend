"use client";

import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import Home from "../icons/HomeIcon";
import Person from "../icons/PersonIcon";
import Logout from "../icons/LogoutIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { UserData } from "../../lib/types/index";
import { basePath } from "../../lib/constants";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";


interface NavigationProps {
  user: UserData;
}

export default function Navigation({ user }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (path: string) => pathname === `${basePath}/${path}`;
  const itemClass = (path: string) =>
    cn(
      "mb-1 flex cursor-pointer rounded-xl p-3 text-white/70 transition-all hover:bg-white/10 hover:text-white",
      isActive(path) && "bg-primary text-secondary shadow-sm hover:bg-primary"
    );
  const iconClass = (path: string) =>
    cn(
      "rounded-lg p-2 text-primary",
      isActive(path) && "bg-secondary text-primary"
    );

  const signOut = useCallback(() => {
    document.cookie =
      "Authentication=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push(`${basePath}/login`);
    router.refresh();
  }, [router]);

  // Inactivity logout logic
  useEffect(() => {
    const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minute
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        signOut();
      }, INACTIVITY_LIMIT);
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
  }, [signOut]);
  return (
    <Command className="bg-transparent text-white">
      <CommandList>
        {user?.roleName === "Property Developer" && (
          <CommandGroup
            heading={""}
            className="font-poppins text-xs font-semibold text-white [&_[cmdk-group-heading]]:text-white/40"
          >
            <Link href={`${basePath}/dashboard`}>
              <CommandItem
                className={itemClass("dashboard")}
              >
                <div className={iconClass("dashboard")}>
                  <Home />
                </div>
                <div className="ml-3 font-poppins font-normal	text-base">
                  Dashboard
                </div>
              </CommandItem>
            </Link>

            <Link href={`${basePath}/properties`}>
              <CommandItem
                className={itemClass("properties")}
              >
                <div className={iconClass("properties")}>
                  <Home />
                </div>
                <div className="ml-3 font-poppins font-normal	text-base">
                  Properties
                </div>
              </CommandItem>
            </Link>
          </CommandGroup>
        )}

        {user?.roleName === "Admin" && (
          <CommandGroup
            heading={""}
            className="font-poppins text-xs font-semibold text-white [&_[cmdk-group-heading]]:text-white/40"
          >
            <Link href={`${basePath}/requests`}>
              <CommandItem
                className={itemClass("requests")}
              >
                <div className={iconClass("requests")}>
                  <Home />
                </div>
                <div className="ml-3 font-poppins font-normal	text-base">
                  Requests
                </div>
              </CommandItem>
            </Link>
          </CommandGroup>
        )}

        {user?.roleName === "Applicant" && (
          <CommandGroup
            heading={""}
            className="font-poppins text-xs font-semibold text-white [&_[cmdk-group-heading]]:text-white/40"
          >
            <Link href={`${basePath}/application`}>
              <CommandItem
                className={itemClass("application")}
              >
                <div className={iconClass("application")}>
                  <Home />
                </div>
                <div className="ml-3 font-poppins font-normal	text-base">
                  My Application
                </div>
              </CommandItem>
            </Link>
          </CommandGroup>
        )}

        <CommandGroup
          heading={"Account"}
          className="font-poppins text-xs font-semibold text-white [&_[cmdk-group-heading]]:text-white/40"
        >
          <Link href={`${basePath}/profile`}>
            <CommandItem
              className={itemClass("profile")}
            >
              <div className={iconClass("profile")}>
                <Person />
              </div>
              <div className="ml-3 font-poppins font-normal	text-base">
                Profile
              </div>
            </CommandItem>
          </Link>

          <button type="submit" className="p-0 w-full" onClick={signOut}>
            <CommandItem
              className="mb-1 flex cursor-pointer rounded-xl p-3 text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <div className="rounded-lg p-2 text-primary">
                <Logout />
              </div>
              <div className="ml-3 font-poppins font-normal	text-base">
                Log Out
              </div>
            </CommandItem>
          </button>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
