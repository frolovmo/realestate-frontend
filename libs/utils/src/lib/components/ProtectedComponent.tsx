import { ReactNode } from "react";
import { withPermission } from "../Hoc/withPermission";

interface ProtectedComponentProps {
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  children: ReactNode;
  fallback?: ReactNode;
}

const ProtectedComponent = ({
  path,
  method = "GET",
  children,
  fallback = null,
  ...rest
}: ProtectedComponentProps) => {
  const Wrapper = () => <>{children}</>;

  if (!path) {
    return <Wrapper />;
  }

  return withPermission(Wrapper, {
    requiredPermission: {
      path,
      method,
    },
    fallback,
  })(rest);
};

export default ProtectedComponent;
