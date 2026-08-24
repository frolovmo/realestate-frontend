export interface FileMetadata {
  url: string;
  type: string;
  size: number;
  originalName: string;
  altText: string;
}

export interface Application {
  applicantName: string;
  avatar: string;
  jobOccupation: string;
  appliedUnit: string;
  priceInfo: {
    cost: string;
    currency: string;
  };
  applignmentDate: string;
  status: string;
}

export type PropertyData = {
  _id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  images: FileMetadata[];
  address: string;
  province: string;
  district: string;
  cell: string;
  sector: string;
  village: string;
  identifier: string;
  status: string;
  units: UnitData[];
  totalUnits: number;
  occupiedUnits: number;
  applications: Application[];
  createdAt: string;
  updatedAt: string;
};

export type UnitData = {
  _id: string;
  name: string;
  description: string;
  images: FileMetadata[];
  floorPlan: FileMetadata[];
  tourVideo: FileMetadata[];
  availableUnits: number;
  unitType: string;
  developmentStage: string;
  square: number;
  bedrooms: number;
  bathrooms: number;
  cost: number;
  identifier: string;
  status: string;
  facilities: string[];
};

export interface PropertiesListResponseData {
  data: PropertyData[];
  total: number;
}

export interface UnitResponseData {
  availableUnits: number;
  bathrooms: number;
  bedrooms: number;
  cost: number;
  createdAt: string;
  description: string;
  developmentStage: string;
  floorPlan: FileMetadata[];
  views: number;
  identifier: string;
  images: FileMetadata[];
  name: string;
  facilities: string[];
  property: PropertyData;
  _id: string;
  square: number;
  status: string;
  statusHistory: {
    userId: string;
    name: string;
    date: string;
    status: string;
    message: string | null;
  }[];
  tourVideo: FileMetadata[];
  unitType: string;
  updatedAt: string;
}

export interface UnitsListResponseData {
  data: UnitResponseData[];
  total: number;
}

export interface ApplicationResponseDataFromApiV1 {
  id: number;
  referenceId: string;
  applicantId: number;
  houseCategoryId1: number;
  houseCategoryId2: null;
  bankProviderId1: number;
  bankProviderId2: null;
  houseRangeId: number;
  district1: string;
  district2: string;
  backEndStatus: string;
  bankStatus: string;
  statusComment: null;
  insured: string;
  meetDownCapacity: string;
  interestRate: number;
  years: number;
  deductableIncome: number;
  propertyValueLimit: number;
  presentValue: number;
  level: string;
  editable: false;
  adminStatusChangeDate: null;
  bankStatusChangeDate: null;
  backEndStatusChangedBy: null;
  bankStatusChangedBy: null;
  approvedLoanAmount: number;
  approvedLoanAmountCurrency: null;
  loanType: string;
  rraCombinedHouseHoldIncomeCurrency: string;
  rraCombinedHouseHoldIncome: number;
  purchaseDate: null;
  disbursedDate: null;
  housePurchaseAmount: null;
  tenorMeasurementUnit: null;
  tenorValue: null;
  houseUpi: null;
  houseUpiRawData: null;
  processingBankId: null;
  fireInsuranceExpiryDate: null;
  perfectionStatus: null;
  maturityDate: null;
  loanAccountNumber: null;
  monthlyInstallment: null;
  district: null;
  sector: null;
  cell: null;
  village: null;
  perfectionTerminationDate: null;
  processingBanks: null;
  bankInterestRate: null;
  createdAt: string;
  updatedAt: string;
  applicant: {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    nationalId: string;
    gender: string;
    dob: string;
    phone: string;
    homeAddress: string;
    householdDisability: string;
    isGuardian: string;
    employerName: string;
    profession: string;
    employerId: null;
    employmentType: string;
    salarynet: number;
    maritalStatus: string;
    ownResidentialUnit: string;
    rraEmployerName: string;
    rraEmployerTin: string;
    rraGrossIncome: number;
    rraNetIncome: null;
    createdAt: string;
    updatedAt: string;
    spouse: null;
    user: [object];
    upis: [];
  };
  bankProvider1: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  bankProvider2: null;
  houseCategory1: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  houseCategory2: null;
  houseRange: {
    id: number;
    name: "Below 10 Million Frw";
    rangeFloor: number;
    rangeCeiling: number;
    currency: string;
    incomeCapFloor: number;
    incomeCapCeiling: number;
    createdAt: string;
    updatedAt: string;
  };
  backEndStatusChangedByUser: null;
  bankStatusChangedByUser: null;
  views: { total: number };
  lastView: { lastViewDate: null };
  documents: [];
}

export interface ApplicationResponseDataFromNewApi {
  _id: string;
  applicantId: number;
  applicationId: number;
  property?: PropertyData;
  unit?: UnitResponseData;
  status: string;
  identifier: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApplicationOldGwResponseData {
  id: number;
  referenceId: string;
  applicantId: number;
  houseCategoryId1: number;
  houseCategoryId2?: number;
  bankProviderId1: number;
  bankProviderId2?: number;
  houseRangeId: number;
  district1: string;
  district2: string;
  backEndStatus: string;
  bankStatus: string;
  statusComment?: string;
  insured: "Yes" | "No";
  meetDownCapacity: "Yes" | "No";
  interestRate: number;
  years: number;
  deductableIncome: number;
  propertyValueLimit: number;
  presentValue: number;
  level: string;
  editable: boolean;
  adminStatusChangeDate?: string;
  bankStatusChangeDate?: string;
  backEndStatusChangedBy?: string;
  bankStatusChangedBy?: string;
  approvedLoanAmount?: number;
  approvedLoanAmountCurrency?: string;
  loanType?: string;
  rraCombinedHouseHoldIncomeCurrency?: string;
  rraCombinedHouseHoldIncome: number;
  purchaseDate?: string;
  disbursedDate?: string;
  housePurchaseAmount?: number;
  tenorMeasurementUnit?: string;
  tenorValue?: string;
  houseUpi?: string;
  houseUpiRawData?: string;
  processingBankId?: number;
  fireInsuranceExpiryDate?: string;
  perfectionStatus?: string;
  maturityDate?: string;
  loanAccountNumber?: number;
  monthlyInstallment?: number;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  perfectionTerminationDate?: string;
  processingBanks?: string;
  bankInterestRate?: number;
  createdAt: string;
  updatedAt: string;
  applicant: {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    nationalId: string;
    gender: string;
    dob: string;
    phone: string;
    homeAddress: string;
    householdDisability: "Yes" | "No";
    isGuardian: "Yes" | "No";
    employerName: string;
    profession: string;
    employerId?: number;
    employmentType: string;
    salarynet: number;
    maritalStatus: string;
    ownResidentialUnit: "Yes" | "No";
    rraEmployerName?: string;
    rraEmployerTin?: string;
    rraGrossIncome?: number;
    rraNetIncome?: number;
    createdAt: string;
    updatedAt: string;
    spouse: number;
    user: {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      preferredLanguage: string;
    };
    upis: string[];
  };
  bankProvider1: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  bankProvider2?: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  houseCategory1: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  houseCategory2?: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  houseRange: {
    id: number;
    name: string;
    rangeFloor: number;
    rangeCeiling: number;
    currency: string;
    incomeCapFloor: number;
    incomeCapCeiling: number;
    createdAt: string;
    updatedAt: string;
  };
  backEndStatusChangedByUser?: string;
  bankStatusChangedByUser?: string;
  views: {
    total?: number;
  };
  lastView?: {
    lastViewDate: string;
  };
  documents: string[];
  maxLoanValue: number;
  propertyLoanValue: number;
}

export interface JwtDecodedData {
  id: number;
  nationalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  resetToken: null | string;
  confirmationsSent: number;
  confirmationSentAt: string;
  confirmationApproved: boolean;
  confirmationApprovedAt: string;
  isSuperAdmin: boolean;
  adminApproval: boolean;
  createdAt: string;
  updatedAt: string;
  preferredLanguage: null | string;
  lastSignedInIpAddress: string;
  lastSignedInDate: string;
  loginCount: number;
  emailChangeToken: null | string;
  emailChangeNewEmail: null | string;
  emailChangedLastDate: null | string;
  role: number;
  applicant: null | string;
  userRole: {
    id: number;
    RoleName:
      | "Applicant"
      | "Super Admin"
      | "Back-End Officer"
      | "Bank Officer"
      | "Developer";
    createdAt: string;
    updatedAt: string;
  };
  adminProfile: null;
  iat: number;
  exp: number;
}

export interface JwtDecodedDataNewAPI {
  user: string;
  iat: number;
  exp: number;
}

type Role = {
  id: number;
  projectId: number | null;
  name: RoleName;
};

type RoleName =
  | "Property Developer"
  | "Representative"
  | "Admin";

export interface DecryptedUser {
  encrypt: {
    identificationNumber: string;
    identificationType: string;
    fullname: string;
    phone: string;
    email: string;
    autenticatorQrCode: string;
    accountToken: string;
    isActive: boolean;
    isDeleted: boolean;
    id: number;
    roles: Role[];
  };
}

export type UserData = {
  userId: string | number;
  fullName: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  nationalId: string;
  roleName: string;
  identificationType?: string;
  profileImage?: string; // base64 string (data URL)
  createdAt?: string;
  updatedAt?: string;
} | null;

export interface BaseComponentProps {
  style?: React.CSSProperties;
  className?: string;
}

export enum UserRole {
  APPLICANT = "Applicant",
  DEVELOPER = "Property Developer",
  STAFF = "Admin",
}

export interface PropertyViews {
  labels: string[];
  data: number[];
}
