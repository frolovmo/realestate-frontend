import { UserData } from "../../lib/types/index";

interface UserProps {
  user: UserData;
}

export default function User({ user }: UserProps) {
  return (
    <div className="ml-4 flex min-w-[52px] items-center gap-3 border-l border-border pl-4 md:min-w-[235px]">
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt="Profile"
          className="rounded-full w-11 h-11 object-cover"
          />
          ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white ring-2 ring-primary/40">
          <span className="text-lg">{user?.fullName?.[0]}</span>
        </div>
      )}
      <div className="font-poppins flex-col text-base hidden md:block">
        <div className="font-semibold text-secondary">{user?.fullName}</div>
        <div className="text-xs text-muted-foreground">{user?.roleName}</div>
      </div>
    </div>
  );
}
