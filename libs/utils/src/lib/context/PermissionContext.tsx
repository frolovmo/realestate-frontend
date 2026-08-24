'use client'
import { createContext, useContext, ReactNode } from "react";
import { RoutePermission } from "../types";

interface PermissionContextType {
  permissions: RoutePermission[];
  loading: boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined
);

export function PermissionProvider({
  children,
  permissions,
  loading,
}: PermissionContextType & { children: ReactNode }) {
  return (
    <PermissionContext.Provider value={{ permissions, loading }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return context;
}
