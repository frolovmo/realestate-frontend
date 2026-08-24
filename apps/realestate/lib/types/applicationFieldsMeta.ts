interface Bank {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankResponse {
  status: number;
  message: string;
  data: {
    Banks: Bank[];
  };
}

export interface HouseCategory {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HouseCategoryResponse {
  status: number;
  message: string;
  data: {
    categories: HouseCategory[];
  };
}

// House Range Type
interface HouseRange {
  id: number;
  name: string;
  rangeFloor: number;
  rangeCeiling: number;
  currency: string;
  incomeCapFloor: number;
  incomeCapCeiling: number;
  createdAt: string;
  updatedAt: string;
}

export interface HouseRangeResponse {
  status: number;
  message: string;
  data: {
    ranges: HouseRange[];
  };
}

export interface MetaForApplicationFields {
  banks: Bank[] | null;
  houseCategories: HouseCategory[] | null;
}
