import { UnitResponseData } from "../../lib/types/index";

interface UnitInfoProps {
  unit: UnitResponseData;
}

export default function UnitInfo({ unit }: UnitInfoProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold leading-9">{unit.name}</h2>
      <div className="flex text-base text-lightdark">
        <p>{unit.bedrooms} bedrooms</p>
        <div className="flex justify-center items-center w-6 h-6">
          <div className="w-1 h-1 bg-lightdark rounded-full" />
        </div>
        <p>{unit.bathrooms} Washrooms</p>
        <div className="flex justify-center items-center w-6 h-6">
          <div className="w-1 h-1 bg-lightdark rounded-full" />
        </div>
        <p>{unit.square} sqm</p>
      </div>
    </div>
  );
}
