"use client";

import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "primereact/hooks";

import SearchBarInput from "./components/SearchBarInput/SearchBarInput";
import SearchBarDropdown from "./components/SearchBarDropdown/SearchBarDropdown";

import searchItemsByRole from "./utils/searchItemsByRole";

import { UserData, UserRole } from "@/lib/types";
import { ISearchBarDropdownCategory } from "./components/SearchBarDropdown/SearchBarDropdown.types";

export default function SearchBar({ user }: { user: UserData }) {
  const [items, setItems] = useState<ISearchBarDropdownCategory[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const ref = useRef(null);

  const onChange = (value: string) => {
    setSearch(value);
  };

  const onSearch = useCallback(
    async (value: string) => {
      if (!user) {
        return;
      }

      setLoading(true);

      const newItems = await searchItemsByRole({
        text: value,
        role: user.roleName as UserRole,
      });

      setItems(newItems);

      setLoading(false);
    },
    [user]
  );

  useClickOutside(ref, () => setOpenDropdown(false));

  return (
    <div ref={ref} className="relative w-full max-w-[600px]">
      <SearchBarInput
        value={search}
        onOpen={() => setOpenDropdown(true)}
        onChange={onChange}
        onSearch={onSearch}
      />

      <SearchBarDropdown open={openDropdown} loading={loading} items={items} />
    </div>
  );
}
