import { BaseComponentProps } from "@/lib/types";

export interface ISearchBarDropdownCategoryItem {
  name: string;
  path: string;
}

export interface ISearchBarDropdownCategory {
  categoryName: string;
  categoryItems: ISearchBarDropdownCategoryItem[];
}

export interface ISearchBarDropdownProps extends BaseComponentProps {
  open: boolean;
  loading?: boolean;
  items: ISearchBarDropdownCategory[];
}
