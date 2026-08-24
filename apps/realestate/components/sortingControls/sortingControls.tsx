import { SortingDownIcon, SortingUpIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SortDirection } from "@tanstack/react-table";

interface SortingControlsProps {
  isSorted: boolean | SortDirection;
}

export default function SortingControls({ isSorted }: SortingControlsProps) {
  return (
    <div className="flex flex-col gap-0.5 ml-1">
      <SortingUpIcon
        className={cn(
          isSorted === "asc" ? "text-black" : "text-grayvariant",
          isSorted ? "" : "text-grayvariant"
        )}
      />
      <SortingDownIcon
        className={cn(
          isSorted === "desc" ? "text-black" : "text-grayvariant",
          isSorted ? "" : "text-grayvariant"
        )}
      />
    </div>
  );
}
