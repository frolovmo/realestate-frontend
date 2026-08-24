import { Button } from "@/components/ui/button";
import FilterByInput from "@/components/filterByInput/filterByInput";
import { Input } from "../ui/input";
import { ChangeEvent, useState } from "react";

const typeOptions = [
  {
    value: "detached",
    label: "Detached",
  },
  {
    value: "apartment",
    label: "Apartment",
  },
  {
    value: "townhouse",
    label: "Townhouse",
  },
];

const statusOptions = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "underConstruction",
    label: "Under Construction",
  },
];

interface IFilter {
  developmentStage?: string;
  unitType?: string;
  identifier?: string;
}

interface FilterSearchProps {
  defaultFilter?: IFilter;
  onSearch: (filters: IFilter) => void;
}

export default function FilterSearch({ defaultFilter, onSearch }: FilterSearchProps) {
  const [status, setStatus] = useState(defaultFilter?.developmentStage || "");
  const [type, setType] = useState(defaultFilter?.unitType || "");
  const [identifier, setIdentifier] = useState(defaultFilter?.identifier || "");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdentifier(event.target.value);
  };

  const reset = () => {
    setStatus("");
    setType("");
    setIdentifier("");
    onSearch({}); // Clear filters
  };

  const search = () => {
    onSearch({ unitType: type, developmentStage: status, identifier });
  };

  return (
    <div className="flex md:flex-row flex-col justify-between gap-2 py-4">
      <FilterByInput
        type="Status"
        placeholder="Filter status"
        options={statusOptions}
        value={status}
        setValue={setStatus}
      />
      <FilterByInput
        type="Type"
        placeholder="Filter type"
        options={typeOptions}
        value={type}
        setValue={setType}
      />
      <div className="flex w-full">
        <span className="inline-flex justify-center items-center text-sm leading-5 px-3 p-1.5 text-gray-foreground bg-lightgray h-full rounded-l-sm border-2 border-r-0 border-grayborder">
          ID
        </span>
        <Input
          placeholder="Filter ID"
          className="flex justify-between rounded-l-none border-2 border-grayborder w-full"
          value={identifier}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-1">
        <Button
          type="button"
          variant="outline"
          className="w-[117px]"
          onClick={reset}
        >
          Clear
        </Button>
        <Button
          type="button"
          variant="default"
          className="w-[117px]"
          onClick={search}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
