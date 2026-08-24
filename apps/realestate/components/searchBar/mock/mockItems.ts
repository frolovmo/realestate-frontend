import { ISearchBarDropdownCategory } from "../components/SearchBarDropdown/SearchBarDropdown.types";

export const mockItems: ISearchBarDropdownCategory[] = [
  {
    categoryName: "Pages",
    categoryItems: [
      { name: "View Properties", path: "#" },
      { name: "View My Profile", path: "#" },
    ],
  },
  {
    categoryName: "Properties",
    categoryItems: [
      { name: "Prata Village", path: "#" },
      { name: "Home Villa Pros", path: "#" },
    ],
  },
  {
    categoryName: "Units",
    categoryItems: [
      { name: "Unit I Prana", path: "#" },
      { name: "Prius Homes", path: "#" },
    ],
  },
];
