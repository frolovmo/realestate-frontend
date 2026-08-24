import { UnitResponseData, UserData } from "../../lib/types/index";
import Rating from "../rating/rating";

interface DeveloperCardProps {
  unit: UnitResponseData;
  user: UserData;
}

export default function DeveloperCard({ unit, user }: DeveloperCardProps) {
  return (
    <div className="border border-grayborder rounded-md p-10 min-w-[295px] self-start flex flex-col justify-center items-center">
      <div className="rounded-full w-[77px] h-[77px] flex justify-center items-center bg-white text-black border border-black">
        <span className="text-lg">{user?.fullName[0]}</span>
      </div>

      <p className="mt-4 text-base text-lightdark font-medium">
        {user?.fullName}
      </p>

      <p className="text-base text-black font-semibold">{unit.property.name}</p>

      <div className="flex gap-2.5 items-center">
        <Rating showCount={false} />
        <p className="text-xs leading-4 mt-0.5">38 reviews</p>
      </div>
    </div>
  );
}
