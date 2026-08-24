import Image from "next/image";
import UnitStat from "./unitStat";
import { CubeIcon, OccupiedIcon, VacantIcon } from "../../components/icons";

import { PropertyData, PropertyViews } from "../../lib/types/index";
import AvailabilityUnitsDialog from "./availabilityUnitsDialog";
import dynamic from "next/dynamic";

const ImpressionsChart = dynamic(() => import("./impressionsChart"), {
  ssr: false,
});

interface PropertyCardProps {
  property: PropertyData;
  propertyViews: PropertyViews;
}

export default function PropertyCard({
  property,
  propertyViews,
}: PropertyCardProps) {
  const { totalUnits, occupiedUnits } = property;
  const occupiedPercentage =
    totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

  const vacantUnits =
    totalUnits >= occupiedUnits ? totalUnits - occupiedUnits : 0;
  const unitStats = [
    {
      quantity: totalUnits,
      statName: "Total units",
      renderIcon: () => <CubeIcon width={22} height={22} />,
    },
    {
      quantity: vacantUnits,
      statName: "Vacant units",
      renderIcon: () => <VacantIcon />,
    },
    {
      quantity: occupiedUnits,
      statName: "Occupied units",
      renderIcon: () => <OccupiedIcon width={23} height={22} />,
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Image
          src={property.images[0]?.url}
          alt="Property image"
          width={411}
          height={425}
          className="w-[411px] height-[425px] object-cover rounded-t-extra"
        />
        <div className="absolute bottom-0 right-0 left-0 px-6 py-2 bg-white opacity-85 font-poppins font-semibold">
          <p className="text-black text-xl leading-8">{property.name}</p>
          <p className="text-lightdark text-base italic">
            {property.identifier}
          </p>
        </div>
      </div>

      <div className="border border-grayborder">
        <div className="flex gap-5 justify-around px-3 py-6">
          {unitStats.map(({ quantity, statName, renderIcon }) => (
            <UnitStat key={statName} quantity={quantity} statName={statName}>
              {renderIcon()}
            </UnitStat>
          ))}
        </div>

        <div className="px-5">
          <div className="relative">
            <div className="h-5 w-full bg-grayborder border rounded-extra" />
            <div
              className="h-5 w-[60%] absolute top-0 z-10 bg-primary rounded-extra"
              style={{ width: `${occupiedPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-2 mb-4">
            <p className="font-poppins font-light	text-xs text-black">
              Leased by {occupiedPercentage.toFixed(0)}%
            </p>
            <AvailabilityUnitsDialog property={property} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 border border-grayborder rounded-b-extra">
        <p className="font-poppins font-medium text-black text-xs pt-3 pl-5">
          Impression
        </p>
        <div className="pl-5">
          <ImpressionsChart propertyViews={propertyViews} />
        </div>
      </div>
    </div>
  );
}
