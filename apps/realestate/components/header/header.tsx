import SearchBar from "@/components/searchBar/searchBar";
import User from "@/components/user/user";
import Notifications from "../Notifications";
import { UserData } from "../../lib/types/index";
import { Menu } from "lucide-react";

interface HeaderProps {
  user: UserData;
  onMenuClick?: () => void;
}

export default function Header({ user, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center border-b border-border/80 bg-white/90 px-4 py-3 shadow-[0_8px_30px_-24px_rgba(22,8,59,0.6)] backdrop-blur-xl md:px-6">
      <div className="md:hidden mr-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg border border-border p-2 hover:border-primary hover:bg-primaryneutral"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5 text-secondary" />
        </button>
      </div>

      <div className="flex justify-between w-full">
        <SearchBar user={user} />
        <Notifications />
      </div>

      <div className="ml-auto">
        <User user={user} />
      </div>
    </header>
  );
}
