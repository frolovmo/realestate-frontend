"use client";
import { RatingStarIcon } from "@/components/icons";
import { cn } from "../../lib/utils";
import { Rating as RatingComponent } from "react-simple-star-rating";

interface RatingProps {
  showCount: boolean;
}

export default function Rating({ showCount }: RatingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        showCount ? "gap-0.5" : ""
      )}
    >
      <RatingComponent
        readonly
        initialValue={0}
        allowFraction
        emptyIcon={
          <RatingStarIcon
            className="fill-slate-300"
            style={{ display: "inline" }}
          />
        }
        fillIcon={<RatingStarIcon style={{ display: "inline" }} />}
      />
      {showCount && <div className="text-xs">(0)</div>}
    </div>
  );
}
