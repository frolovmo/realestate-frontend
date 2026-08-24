"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UnionIcon } from "../../components/icons";
import { Dispatch, SetStateAction } from "react";

interface FilterByInputProps {
  type: string;
  placeholder: string;
  value: string;
  options?: { value: string; label: string }[];
  setValue: Dispatch<SetStateAction<string>>;
}

export default function FilterByInput({
  type,
  placeholder,
  options,
  value,
  setValue,
}: FilterByInputProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex w-full">
      <span className="inline-flex justify-center items-center text-sm leading-5 px-3  md:p-1.5 p-2 text-gray-foreground bg-lightgray h-full rounded-l-sm border-2 border-r-0 border-grayborder">
        {type}
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex justify-between rounded-l-none border-2 border-grayborder w-[220px]"
          >
            {value ? (
              options?.find((option) => option.value === value)?.label
            ) : (
              <span className="text-gray">{placeholder}</span>
            )}
            <UnionIcon className="ml-2 h-2 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{`No ${type} found.`}</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
