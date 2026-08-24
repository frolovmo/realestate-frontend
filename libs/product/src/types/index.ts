export interface Bundle {
  id: number;
  name: string;
  description: string;
  tag: string;
  ceiling: number;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  disbursementFrequency: string;
  disbursementFrequencyLimit?: number;
  currency: string;
  interestRate: number;
  hasGrant: boolean;
  grantPercentage?: number;
  type: string;
  isMandatory: boolean;
  ceillingAmountPerYear?: number;
  hasGracePeriod?: boolean;
  gracePeriod?: number;
  gracePeriodType?: string;
  gracePeriodDuration?: number;
  isAmountBasedOnFrequency: boolean;
  minimumAmount: number;
  maximumAmount?: number;
}

export interface ProductMapping {
  id: number;
  productId: number;
  bundleId: number;
}

export interface CreateFielsd {
  fieldName: string,
  fieldType: number, 
  fieldGroup: number,
  priority: number, 
  allowOther: boolean,
  dependOnFieldId: null,
  dependOnFieldValue: null,
  isMandatory: boolean,
  // options: []
}
