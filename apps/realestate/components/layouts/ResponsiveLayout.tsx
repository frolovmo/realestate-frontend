'use client';

import { useState } from "react";
import Header from "@/components/header/header";
import Sidebar from "@/components/sideMenu/sideMenu";

export default function ResponsiveLayout({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-secondary shadow-2xl transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:w-64`}
      >
        <Sidebar user={user} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary/65 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Header user={user} onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
