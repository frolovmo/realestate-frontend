import { getUserData } from "../../actions/auth";
import ResponsiveLayout from "./ResponsiveLayout";
import { UserData } from "@/lib/types";

interface LayoutProps {
  user?: UserData;
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const user = await getUserData();
  return <ResponsiveLayout user={user}>{children}</ResponsiveLayout>;
}
