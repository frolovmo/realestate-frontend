"use client";
import FilterSearch from "@/components/filterBySearch/filterSearch";
import PropertiesList from "./propertiesList";
import { PropertiesListResponseData } from "../../lib/types/index";
import ListingMap from "../map/listingMap";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { basePath } from "@/lib/constants";

interface PropertiesMainProps {
  propertiesList: PropertiesListResponseData;
}

export default function PropertiesMain({
  propertiesList: initialPropertiesList,
}: PropertiesMainProps) {
  const searchParams = useSearchParams();

  const searchParamsEntries = Array.from(searchParams.entries());

  const defaultFilters: Record<string, string> = searchParamsEntries.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value || "" }),
    {}
  );

  const [propertiesList, setPropertiesList] = useState(initialPropertiesList);

  const handleSearch = async (filters: {
    unitType?: string;
    developmentStage?: string;
    identifier?: string;
  }) => {
    const filterKeys = ["unitType", "developmentStage", "unitIdentifier"];

    const { unitType, developmentStage, identifier } = filters || {};

    const newFilters = {
      ...(unitType ? { unitType } : {}),
      ...(developmentStage ? { developmentStage } : {}),
      ...(identifier ? { unitIdentifier: identifier } : {}),
    };

    const oldSearchParamsEntries = Array.from(searchParams.entries());

    const oldFilterEntries = oldSearchParamsEntries.filter(([key]) =>
      filterKeys.includes(key)
    );

    const oldFilters = oldFilterEntries.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );

    const isFilterChanged =
      JSON.stringify(newFilters) !== JSON.stringify(oldFilters);

    console.log(isFilterChanged, newFilters, oldFilters);

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (isFilterChanged) {
      newSearchParams.set("page", "1");
    }

    newSearchParams.set("unitType", unitType || "");
    newSearchParams.set("unitIdentifier", identifier || "");
    newSearchParams.set("developmentStage", developmentStage || "");

    window.location.href = `${basePath}/properties?${newSearchParams.toString()}`;
  };

  return (
    <div className="h-full bg-white rounded-md pr-4 pl-10 border">
      <FilterSearch
        defaultFilter={{
          ...defaultFilters,
          identifier: defaultFilters?.unitIdentifier || "",
        }}
        onSearch={handleSearch}
      />
      <div className="flex md:flex-row flex-col gap-12">
        <PropertiesList propertiesList={propertiesList} />
        <div className="w-full md:h-[835px] h-[635px]">
          <ListingMap propertiesList={propertiesList} />
        </div>
      </div>
    </div>
  );
}
