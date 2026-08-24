"use client";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import FilterByInput from "../../components/filterByInput/filterByInput";
import FilterMenu from "../../components/filterMenu/filterMenu";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import { Magnifier2Icon, MagnifierIcon } from "../../components/icons";
import { SearchQuery } from "../../actions/fetchSearch";
import { useSearchParams } from "next/navigation";
import { SearchFilter } from "./searchMain";
import { LocationSelectOptions } from "./extractLocationUnits";
import { basePath } from "../../lib/constants";

interface SearchBarProps {
  onSearch: (data: SearchQuery) => void;
  filter: SearchFilter;
  onFilterChange: (activeFilter: SearchFilter) => void;
  locationSelectOptions: LocationSelectOptions;
}

export default function SearchBar({
  onSearch,
  filter,
  onFilterChange,
  locationSelectOptions,
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const reset = () => {
    setProvince("");
    setDistrict("");
    setSector("");
    setCell("");
  };

  const handleSearch = () => {
    onSearch({
      query,
      province,
      district,
      sector,
      cell,
    });
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, district, sector, cell]);

  const { provincesOptions, districtsOptions, sectorsOptions, cellsOptions } =
    locationSelectOptions;

  return (
    <div className="px-4 sm:px-[88px] pt-9 shadow-md">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex justify-center w-full sm:w-2/3">
          <div className="relative w-full">
            <div className="absolute left-3 top-2">
              <MagnifierIcon className="text-lightdark" />
            </div>
            <Input
              placeholder="Search properties by name, district, or by developer"
              className="w-full pl-10 pr-16 py-4"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="button"
              className="absolute right-0 top-0 p-3 bg-primary rounded-xl"
              onClick={handleSearch}
            >
              <Magnifier2Icon className="text-white" width={19} height={19} />
            </Button>
          </div>
        </div>
        <div className="flex md:flex-row flex-col py-4 gap-2 mb-8">
          <FilterByInput
            type="Province"
            placeholder="Select province"
            options={provincesOptions}
            value={province}
            setValue={setProvince}
          />
          <FilterByInput
            type="District"
            placeholder="Select district"
            options={districtsOptions}
            value={district}
            setValue={setDistrict}
          />
          <FilterByInput
            type="Sector"
            placeholder="Select sector"
            options={sectorsOptions}
            value={sector}
            setValue={setSector}
          />
          <FilterByInput
            type="Cell"
            placeholder="Select cell"
            options={cellsOptions}
            value={cell}
            setValue={setCell}
          />
          <Button type="button" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <FilterMenu filter={filter} onFilterChange={onFilterChange} />
        <Link
          href={`${basePath}/application/create-application`}
          className="underline text-googlelink text-sm"
        >
          I Prefer House Typologies instead
        </Link>
      </div>
    </div>
  );
}
