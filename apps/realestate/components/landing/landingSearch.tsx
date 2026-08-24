"use client";

import { useState, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { basePath } from "../../lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Magnifier2Icon } from "../icons";

export default function LandingSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push(
        `${basePath}/explore?search=${encodeURIComponent(search.trim())}`
      );
    }
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative inline-flex w-full max-w-[510px]">
      <Input
        placeholder="Search properties by name, district, or by developer"
        className="w-full h-[54px] pr-12 text-base rounded-xl placeholder:font-poppins placeholder:text-xs md:placeholder:text-base"
        onChange={handleChange}
        onKeyDown={handleEnterPress}
        value={search}
      />
      <Button
        type="button"
        variant="active"
        className="absolute right-3 top-2 p-0 border-none"
        onClick={handleSearch}
      >
        <Magnifier2Icon className="text-primary" width={28} height={28} />
      </Button>
    </div>
  );
}
