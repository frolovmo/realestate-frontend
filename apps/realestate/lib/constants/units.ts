export enum HousingTypology {
  ONE_BEDROOM = "one",
  TWO_BEDROOMS = "two",
  THREE_BEDROOMS = "three",
  MORE_BEDROOMS = "more",
}

export const HousingTypologyLabels: Record<HousingTypology, string> = {
  [HousingTypology.ONE_BEDROOM]: "1 Bedroom",
  [HousingTypology.TWO_BEDROOMS]: "2 Bedrooms",
  [HousingTypology.THREE_BEDROOMS]: "3 Bedrooms",
  [HousingTypology.MORE_BEDROOMS]: "More Bedrooms",
};

export enum UnitStatus {
  APPROVED = "approved",
  DRAFT = "draft",
  PENDING = "pending",
  REQUESTED_MORE_INFO = "requestedMoreInfo",
  REJECTED = "rejected",
}

export const UnitStatusLabel = {
  [UnitStatus.APPROVED]: "Approved",
  [UnitStatus.DRAFT]: "Draft",
  [UnitStatus.PENDING]: "Pending",
  [UnitStatus.REQUESTED_MORE_INFO]: "Requested Info",
  [UnitStatus.REJECTED]: "Rejected",
};

export const UnitStatusBadgetOptions = {
  [UnitStatus.APPROVED]: {
    label: UnitStatusLabel[UnitStatus.APPROVED],
    variant: "primary",
  },
  [UnitStatus.DRAFT]: {
    label: UnitStatusLabel[UnitStatus.DRAFT],
    variant: "default",
  },
  [UnitStatus.PENDING]: {
    label: UnitStatusLabel[UnitStatus.PENDING],
    variant: "secondary",
  },
  [UnitStatus.REQUESTED_MORE_INFO]: {
    label: UnitStatusLabel[UnitStatus.REQUESTED_MORE_INFO],
    variant: "tertiary",
  },
  [UnitStatus.REJECTED]: {
    label: UnitStatusLabel[UnitStatus.REJECTED],
    variant: "destructive",
  },
};

export const EditUnitStatuses = [
  UnitStatus.PENDING,
  UnitStatus.REQUESTED_MORE_INFO,
];
