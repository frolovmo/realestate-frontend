import {
  EMPLOYMENT_STATUS,
  HOUSE_PREFERENCE,
  MARITAL_STATUS,
  RWANDAN_DISTRICTS,
} from "@/lib/constants";
import { Inputs } from "./createApplicationForm";

export const prepareMetadataObject = (data: Inputs) => {
  const getEmploymentData = () => {
    if (data.employmentStatus === "Employed") {
      return {
        employerName: "any",
        profession: data.profession,
      };
    }
    return {};
  };

  const getDistrictsData = () => {
    if (data.housePreference === HOUSE_PREFERENCE.typology) {
      return {
        district1: data.location,
        district2:
          data.secondLocation ||
          RWANDAN_DISTRICTS.find((d) => d !== data.location),
      };
    }

    // default if user not uses "typology"
    return {
      district1: "Gasabo",
      district2: "Gatsibo",
    };
  };

  const constructAddress = ({
    address,
    village,
    cell,
    sector,
    district,
    province,
  }: {
    address: string;
    village: string;
    cell: string;
    sector: string;
    district: string;
    province: string;
  }): string => {
    return `${address}, ${village}, ${cell}, ${sector}, ${district}, ${province}`;
  };

  const getSpouseAddress = () => {
    if (data.isSameLocationForSpouse) {
      return constructAddress({
        address: data.address,
        village: data.village,
        cell: data.cell,
        sector: data.sector,
        district: data.district,
        province: data.province,
      });
    }

    return constructAddress({
      address: data.spouseAddress ?? "",
      village: data.spouseVillage ?? "",
      cell: data.spouseCell ?? "",
      sector: data.spouseSector ?? "",
      district: data.spouseDistrict ?? "",
      province: data.spouseProvince ?? "",
    });
  };

  const getSpouseProofOfIncome = () => {
    if (
      data.spouseEmploymentStatus === EMPLOYMENT_STATUS.employed ||
      data.spouseEmploymentStatus === EMPLOYMENT_STATUS.selfEmployed
    ) {
      return {
        spouseWorkCertificate: data.spouseProofOfIncome
          ? data.spouseProofOfIncome[0].file
          : "",
      };
    }

    return {};
  };

  const getSpouseProfession = () => {
    if (
      data.spouseEmploymentStatus === EMPLOYMENT_STATUS.employed ||
      data.spouseEmploymentStatus === EMPLOYMENT_STATUS.selfEmployed
    ) {
      return {
        profession: data.spouseProfession,
      };
    }

    return {};
  };

  const getSpouseEmployerName = () =>
    data.spouseEmploymentStatus === EMPLOYMENT_STATUS.employed
      ? { employerName: "any" }
      : {}; // TODO: Add field in UI

  const getSpouseData = () => {
    if (data.status === MARITAL_STATUS.married) {
      return {
        spouse: {
          // firstName: "Jane", // Field not presented
          // lastName: "Doe", // Field not presented
          nationalId: data.spouseIdentificationNumber,
          phone: data.spousePhoneNumber,
          // dateOfBirth: "1990-01-01",
          // gender: "Female", // Must be Male, Female; Field not presented
          employmentType: data.spouseEmploymentStatus,
          homeAddress: getSpouseAddress(),
          ...getSpouseEmployerName(),
          ...getSpouseProfession(),
        },
        ...getSpouseProofOfIncome(),
      };
    }
    return {};
  };

  const getProofOfIncome = () =>
    data.employmentStatus === EMPLOYMENT_STATUS.unemployed
      ? {}
      : { workCertificate: data.proofOfIncome[0].file };

  const getProfession = () =>
    data.employmentStatus === EMPLOYMENT_STATUS.unemployed
      ? {}
      : { profession: data.profession };

  const metadata = {
    homeAddress: `${data.address}, ${data.village}, ${data.cell}, ${data.sector}, ${data.district}, ${data.province}`,
    employmentType: data.employmentStatus,
    salarynet: data.monthlyIncome,
    maritalStatus: data.status,
    maritalStatusCertificate: data.maritalStatus[0].file,
    bankProviderId1: data.loanProvider,
    houseCategoryId1: data.housePreference === "typology" ? data.typology : "1",
    houseRangeId: data.houseRange,
    insured: data.insuranceCover ? "Yes" : "No",
    meetDownCapacity: data.downPayment ? "Yes" : "No",
    isGuardian: "No",
    householdDisability: "No",
    ownResidentialUnit: "No",
    ...getProofOfIncome(),
    ...getSpouseData(),
    ...getDistrictsData(),
    ...getEmploymentData(),
    ...getProfession(),
  };

  return metadata;
};

export const prepareFormData = (
  data: ReturnType<typeof prepareMetadataObject>
): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof typeof data];

    // Handle spouse nested object
    if (key === "spouse" && typeof value === "object" && value !== null) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        if (nestedValue !== undefined && nestedValue !== null) {
          formData.append(`spouse[${nestedKey}]`, String(nestedValue));
        }
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};
