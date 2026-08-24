import { ComponentType } from "react";
import { usePermissions } from "../context/PermissionContext";
import PermissionFallback from "./permissionFallback";

interface WithPermissionProps {
  requiredPermission: {
    path: string;
    method: string;
  };
  fallback?: React.ReactNode;
}

export function withPermission<T extends object>(
  WrappedComponent: ComponentType<T>,
  { requiredPermission, fallback = <PermissionFallback/>}: WithPermissionProps
) {
  return function WithPermissionWrapper(props: T) {
    const { permissions, loading } = usePermissions();

    if (loading) {
      return <div>Loading...</div>;
    }

    const hasPermission = permissions.some(
      (permission) =>
        permission.path === requiredPermission.path &&
        permission.method === requiredPermission.method &&
        !permission.isAccessRemoved
    );

    if (!hasPermission) {
      return fallback;
    }

    return <WrappedComponent {...props} />;
  };
}
