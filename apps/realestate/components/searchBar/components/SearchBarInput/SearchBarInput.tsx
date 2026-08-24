"use client";

import { useCallback, useEffect, useState } from "react";

import { Command, CommandInput } from "@/components/ui/command";

import {
  MIN_PATTERN_LENGTH,
  SEARCH_DEBOUNCE_DELAY,
} from "@/lib/constants/search";
import useDebounce from "@/lib/hooks/useDebounce";

import { ISearchBarInputProps } from "./SearchBarInput.types";

const SearchBarInput = ({
  value,
  loading,
  delay = SEARCH_DEBOUNCE_DELAY,
  minSearchLength = MIN_PATTERN_LENGTH,
  onOpen,
  onChange,
  onSearch,
}: ISearchBarInputProps) => {
  const [initialSearch, setInitialSearch] = useState("");

  const debouncedSearch = useDebounce(value, delay);

  const handleSearch = useCallback(
    async (search: string) => {
      await onSearch(search);

      setInitialSearch(debouncedSearch);
    },
    [debouncedSearch, onSearch]
  );

  const handleDebouncedSearch = useCallback(() => {
    const isInputEmpty = debouncedSearch.length === 0;
    const isInputNotTouched = isInputEmpty && initialSearch.length === 0;
    const isValidLength = debouncedSearch.length >= minSearchLength;

    if (isInputNotTouched || debouncedSearch === initialSearch) {
      return;
    }

    if (isValidLength || isInputEmpty) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch, initialSearch, minSearchLength, handleSearch]);

  useEffect(() => {
    handleDebouncedSearch();
  }, [handleDebouncedSearch]);

  return (
    <Command className="rounded-lg border shadow-md w-full">
      <CommandInput
        disabled={loading}
        value={value}
        onFocus={onOpen}
        onValueChange={onChange}
        placeholder="Search Anything Here..."
        className="w-full text-sm md:text-base"
      />
    </Command>
  );
};

export default SearchBarInput;
