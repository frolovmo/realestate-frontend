"use client";
import { useCallback, useState } from "react";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import { fetchSearch, SearchQuery } from "../../actions/fetchSearch";
import { LocationSelectOptions } from "./extractLocationUnits";
import { PropertiesListResponseData } from "../../lib/types/index";

export type SearchFilter =
  | "all"
  | "detached"
  | "townhouse"
  | "apartment"
  | "triplex";

interface SearchMainProps {
  applicationId?: number;
  locationSelectOptions: LocationSelectOptions;
}

export default function SearchMain({
  applicationId,
  locationSelectOptions,
}: SearchMainProps) {
  const [results, setResults] = useState<PropertiesListResponseData>({
    data: [],
    total: 0,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState<SearchFilter>("all");
  const onSearch = useCallback(
    async (data: SearchQuery) => {
      setIsFetching(true);
      const responseData = await fetchSearch({
        ...data,
        excludedApplicationId: applicationId,
      });
      setResults(responseData);
      setIsFetching(false);
    },
    [applicationId]
  );

  return (
    <div>
      <SearchBar
        onSearch={onSearch}
        filter={filter}
        onFilterChange={setFilter}
        locationSelectOptions={locationSelectOptions}
      />
      {isFetching ? (
        <div className="flex items-center justify-center p-8 font-poppins text-base">
          Loading...
        </div>
      ) : (
        <SearchResults results={results} filter={filter} />
      )}
    </div>
  );
}
