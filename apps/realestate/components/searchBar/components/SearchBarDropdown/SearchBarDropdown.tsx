import React from "react";
import Link from "next/link";
import { Loader } from "lucide-react";

import { ISearchBarDropdownProps } from "./SearchBarDropdown.types";

const SearchBarDropdown = ({
  open,
  loading,
  items = [],
}: ISearchBarDropdownProps) => {
  const noItems = !items.length;

  if (open && loading) {
    return (
      <div className="absolute z-50 top-[70px] w-full py-4 px-5 bg-white shadow-2xl rounded-sm">
        <Loader className="animate-spin m-auto" />
      </div>
    );
  }

  if (open && noItems) {
    return (
      <div className="absolute z-50 top-[70px] w-full py-4 px-5 bg-white shadow-2xl rounded-sm">
        <p className="text-black text-center text-sm">Not Found</p>
      </div>
    );
  }

  if (open) {
    return (
      <div className="absolute z-50 top-[70px] w-full flex flex-col gap-5">
        {items.map((categoryItem) => (
          <div
            key={categoryItem.categoryName}
            className="py-4 px-5 bg-white shadow-2xl rounded-sm"
          >
            <h3 className="text-sm font-semibold text-black mb-2">
              {categoryItem.categoryName}
            </h3>

            <div className="flex flex-col gap-3 pl-6">
              {categoryItem.categoryItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-xs text-[#E1A325] underline hover:no-underline"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default SearchBarDropdown;
