import { UnitData } from "../../lib/types/index";
import UnitCard from "../unitCard/unitCard";
import { basePath } from "../../lib/constants";
import NoCacheLink from "../NoCacheLink";

interface RecommendatonListProps {
  units: UnitData[];
}

export default function RecommendatonList({ units }: RecommendatonListProps) {
  return (
    <div className="flex flex-wrap gap-12 p-5 bg-white">
      {units.map((unit) => (
        <NoCacheLink
          key={unit.identifier}
          href={`${basePath}/unit/${unit.identifier}`}
        >
          <UnitCard
            key={unit._id}
            imageUrl={unit?.images[0]?.url}
            name={unit.name}
            cost={unit.cost}
            bedrooms={unit.bedrooms}
            bathrooms={unit.bathrooms}
            square={unit.square}
          />
        </NoCacheLink>
      ))}
    </div>
  );
}
