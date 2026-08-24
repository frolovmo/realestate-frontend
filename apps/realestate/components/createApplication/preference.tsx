import React from "react";
import { HousingTypology, HousingTypologyLabels } from "@/lib/constants/units";
import { BaseComponentProps } from "@/lib/types";

interface IPreferenceProps extends BaseComponentProps {
  index: number;
  typology: string;
  location: string;
}

const OrdinalNumberEnd: Record<number, string> = {
  1: "st",
  2: "nd",
};

const Preference = ({
  index,
  typology,
  location,
  className = "",
  ...props
}: IPreferenceProps) => {
  return (
    <div className={`${className}`} {...props}>
      <div className="mb-1 text-sm font-semibold text-secondary">
        <span>{index}</span>
        <sup>{OrdinalNumberEnd[index] || ""}</sup>
        <span> Preference</span>
      </div>

      <div className="border border-grayborder rounded-sm p-3 flex flex-col gap-[10px]">
        {typology && (
          <div className="flex align-middle justify-between gap-2 text-sm">
            <p>House Typology</p>
            <b>
              {HousingTypologyLabels[typology as HousingTypology] ||
                typology ||
                ""}
            </b>
          </div>
        )}

        {location && (
          <div className="flex align-middle justify-between gap-2 text-sm">
            <p>Preferred Location</p>
            <b>{location}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preference;
