import { jwtDecode } from "jwt-decode";
import { auth } from "@uno/utils";

const { decrypt } = auth;

interface IProps {
  permission: string;
  children: React.ReactNode;
}

const ProtectedComponent = ({ permission, children }: IProps) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const decoded: { user: string } = jwtDecode(token);
  const userDecodedToken = decrypt(decoded.user);

  if (!userDecodedToken || !userDecodedToken.permissions.includes(permission)) {
    return null;
  }

  return children;
};

export default ProtectedComponent;
