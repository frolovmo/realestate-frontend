import Link from "next/link";
import { UserData } from "../../lib/types/index";
import Logo from "../logo/logo";
import Navigation from "../navigation/navigation";
import SidebarDivider from "../sidebarDivider/sidebarDivider";
import Support from "../support/support";
import { basePath } from "../../lib/constants";

interface SideMenuProps {
  user: UserData;
}

export default function SideMenu({ user }: SideMenuProps) {
  return (
    <div className="flex min-h-screen w-64 flex-col bg-secondary px-4 py-6 text-white">
      <div className="px-2">
        <Link href={`${basePath}/`}>
          <Logo inverse />
        </Link>
      </div>

      <SidebarDivider className="mb-7 mt-6" />

      <div className="grow">
        <Navigation user={user} />
      </div>
      <Support />
    </div>
  );
}
