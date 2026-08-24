import { PropertiesListResponseData } from "../../lib/types/index";
import UnitCard from "../../components/unitCard/unitCard";
import { SearchFilter } from "./searchMain";
import { basePath } from "../../lib/constants";
import NoCacheLink from "@/components/NoCacheLink";

interface SearchResultsProps {
  results: PropertiesListResponseData;
  filter: SearchFilter;
}

export default function SearchResults({ results, filter }: SearchResultsProps) {
  const units = results.data?.flatMap((property) => property.units)
    .filter((unit) => (filter !== "all" ? unit.unitType === filter : true));


  return (
    <div className="px-[88px] pt-14 pb-[218px]">
      <div className="flex flex-wrap gap-14">
        {units?.length ? (
          units.map((unit) => (
            <NoCacheLink
              key={unit.identifier}
              href={`${basePath}/unit/${unit.identifier}?from=searchpage`}
            >
              <UnitCard
                imageUrl={unit.images[0].url}
                name={unit.name}
                cost={unit.cost}
                bedrooms={unit.bedrooms}
                bathrooms={unit.bathrooms}
                square={unit.square}
              />
            </NoCacheLink>
          ))
        ) : (
          <div>No units found</div>
        )}
      </div>
    </div>
  );
}
