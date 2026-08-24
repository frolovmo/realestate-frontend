import { BaseComponentProps } from "@/lib/types";

export interface ISearchBarInputProps extends BaseComponentProps {
  value: string;
  delay?: number;
  loading?: boolean;
  minSearchLength?: number;
  onOpen: () => void;
  onChange: (value: string) => void;
  onSearch: (search: string) => Promise<void>;
}
