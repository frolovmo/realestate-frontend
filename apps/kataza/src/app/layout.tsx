'use client'
import { Suspense, useEffect, useState } from 'react';
import './global.css';
import { DashboardLayout } from "@uno/layout";



const basePath = process.env.NODE_ENV === "production" ? "/kataza" : "";

const defaultMenuItems = [
  {
    label: "KATAZA",
    icon: "pi pi-home",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home px-4 py-2 text-green-500",
        to: `${basePath}`,
      },
      {
        label: "Applications",
        icon: "pi pi-fw pi-ticket px-4 py-2 text-green-500",
        to: `${basePath}/applications`,
      },
      {
        label: "Contacts",
        icon: "pi pi-fw pi-address-book px-4 py-2 text-green-500",
        items: [
          {
            label: "Contacts",
            icon: " px-4 py-2 text-green-500",
            to: `${basePath}/contact`,
          },
          {
            label: "List",
            icon: " px-4 py-2 text-green-500",
            to: `${basePath}/list`,
          },
          {
            label: "Campanies",
            icon: " px-4 py-2 text-green-500",
            to: `${basePath}/companies`,
          },
        ],
      },
      // {
      //   label: "Conversations",
      //   icon: "pi pi-fw pi-inbox px-4 py-2 text-green-500",
      //   to: `${basePath}/conversations`,
      // },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, [username]);
  return (
    <html lang="en">
      <body>
        <Suspense fallback="Loading...">
          <DashboardLayout 
            username={username || ""}
            menuModel={defaultMenuItems}
            options={{
              profileUrl: `${basePath}/kataza/profile`,
            }}
            >
            {children}
          </DashboardLayout>
        </Suspense>
      </body>
    </html>
  );
}
