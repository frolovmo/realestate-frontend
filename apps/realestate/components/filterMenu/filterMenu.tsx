"use client";
import {
  BuildingIcon,
  BurgerIcon,
  CameraIcon,
  TownhouseIcon,
  TriplexIcon,
} from "../../components/icons";
import { cn } from "../../lib/utils";
import { SearchFilter } from "@/app/explore/searchMain";
// import { SearchFilter } from "../../app/explore/page";

interface FilterMenu {
  text: string;
  name: SearchFilter;
  icon: (isActive: boolean) => React.ReactNode;
}

const getActiveIcon = (isActive: boolean): string =>
  isActive ? "text-googlelink" : "text-secondary";

const filterMenu: FilterMenu[] = [
  {
    text: "All Categories",
    name: "all",
    icon: (isActive) => <BurgerIcon className={getActiveIcon(isActive)} />,
  },
  {
    text: "Detached",
    name: "detached",
    icon: (isActive) => <CameraIcon className={getActiveIcon(isActive)} />,
  },
  {
    text: "Townhouse",
    name: "townhouse",
    icon: (isActive) => <TownhouseIcon className={getActiveIcon(isActive)} />,
  },
  {
    text: "Apartment",
    name: "apartment",
    icon: (isActive) => <BuildingIcon className={getActiveIcon(isActive)} />,
  },
  {
    text: "Triplex",
    name: "triplex",
    icon: (isActive) => <TriplexIcon className={getActiveIcon(isActive)} />,
  },
];

interface FilterMenuProps {
  filter: SearchFilter;
  onFilterChange: (activeFilter: SearchFilter) => void;
}

export default function FilterMenu({
  onFilterChange,
  filter,
}: FilterMenuProps) {
  return (
    <div className="grid md:grid-cols-5 grid-cols-3 md:w-[40%] gap-7 items-center">
      {filterMenu.map((item) => (
        <div
          key={item.text}
          onClick={() => onFilterChange(item.name)}
          className={cn(
            "flex flex-col justify-center items-center pb-2 cursor-pointer border-b-2 ",
            item.name === filter ? "border-primary" : "border-white"
          )}
        >
          <div className="flex items-center justify-center w-7 h-7">
            {item.icon(item.name === filter)}
          </div>
          <p
            className={cn(
              "text-sm font-poppins font-semibold",
              item.name === filter ? "text-googlelink" : "text-secondary"
            )}
          >
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
