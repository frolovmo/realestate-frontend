export interface CreateApplicationResponse {
  adminStatusChangeDate: null;
  applicant: {
    createdAt: string;
    dob: string;
    employerId: null | number;
    employerName: string;
    employmentType: string;
    firstName: string;
    gender: string;
    homeAddress: string;
    householdDisability: string;
    id: number;
    isGuardian: string; // "Yes" or "No"
    lastName: string;
    maritalStatus: string; // "Single" or "Married"
    nationalId: string;
    ownResidentialUnit: string; // "Yes" or "No"
    phone: string;
    profession: string;
    rraEmployerName: string;
    rraEmployerTin: string;
    rraGrossIncome: number;
    rraNetIncome: null | number;
    salarynet: number;
    spouse: null;
    updatedAt: string;
    upis: [];
    user: {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      preferredLanguage: null;
    };
    userId: number;
  };
  applicantId: number;
  approvedLoanAmount: number;
  approvedLoanAmountCurrency: null;
  backEndStatus: string; // "Pending" etc.
  backEndStatusChangedBy: null;
  backEndStatusChangedByUser: null;
  bankInterestRate: null;
  bankProvider1: {
    createdAt: string; // "2023-11-17T09:50:44.040Z"
    id: number;
    name: "I&M Bank";
    updatedAt: string; // "2023-11-17T09:50:44.040Z"
  };
  bankProvider2: null;
  bankProviderId1: number;
  bankProviderId2: null;
  bankStatus: string; // "Pending"
  bankStatusChangeDate: null;
  bankStatusChangedBy: null;
  bankStatusChangedByUser: null;
  cell: null;
  createdAt: string;
  deductableIncome: number;
  disbursedDate: null;
  district: null;
  district1: string; // Valid Rwandan district
  district2: string; // Valid Rwandan district
  documents: [];
  editable: boolean;
  fireInsuranceExpiryDate: null;
  houseCategory1: {
    createdAt: string;
    currency: string; // "RWF"
    id: number;
    incomeCapCeiling: number;
    incomeCapFloor: number;
    name: string;
    rangeCeiling: number;
    rangeFloor: number;
    updatedAt: string;
  };
  houseRangeId: number;
  houseUpi: null;
  houseUpiRawData: null;
  id: number;
  insured: string; // "No" or "Yes"
  interestRate: number;
  lastView: {
    lastViewDate: null;
  };
  level: string;
  loanAccountNumber: null;
  loanType: string;
  maturityDate: null;
  meetDownCapacity: string; // "No" or "Yes";
  monthlyInstallment: null;
  perfectionStatus: null;
  perfectionTerminationDate: null;
  presentValue: number;
  processingBankId: null;
  processingBanks: null;
  propertyValueLimit: number;
  purchaseDate: null;
  referenceId: string;
  rraCombinedHouseHoldIncome: number;
  rraCombinedHouseHoldIncomeCurrency: string; // "RWF";
  sector: null;
  statusComment: null;
  tenorMeasurementUnit: null;
  tenorValue: null;
  updatedAt: string;
  views: {
    total: null;
  };

  village: null;
  years: number;
}
