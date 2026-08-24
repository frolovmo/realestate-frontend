"use client";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormStepsProgress from "../formStepsProgress/formStepsProgress";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateApplicationSchema } from "../../lib/schemas/createApplicationSchema";
import CurrentResidenceStep from "./currentResidenceStep";
import SummaryStep from "./summaryStep";
import PersonalInfoStep from "./personalInfoStep";
import {
  AUTHENTICATION_COOKIE,
  basePath,
  HOUSE_PREFERENCE,
  MARITAL_STATUS,
} from "../../lib/constants";
import SuccessFormApplicationSubmit from "../successFormSubmit/successFormApplicationSubmit";
import {
  JwtDecodedData,
  PropertiesListResponseData,
} from "../../lib/types/index";
import {
  API_URL,
  AUTH_BACKEND_API_URL,
  BACKEND_ORIGIN,
  logoutUnauthorized,
} from "../../lib/api";
import { useRouter } from "next/navigation";
import { useLocationData } from "../../lib/hooks/useLocation";
import SpouseInfoStep from "./spouseInfoStep";
import { MetaForApplicationFields } from "@/lib/types/applicationFieldsMeta";
import { prepareFormData, prepareMetadataObject } from "./utils";
import { CreateApplicationResponse } from "./types";
import { authenticatedApiRequest } from "@/actions/authenticatedApi";

export type Inputs = z.infer<typeof CreateApplicationSchema>;
type FieldName = keyof Inputs;

const baseFormSteps = [
  {
    id: 1,
    name: "Personal info",
    description:
      "Please provide your personal details, including your address, employment information, and related documents.",
    fields: [
      "address",
      "province",
      "district",
      "sector",
      "cell",
      "village",
      "employmentStatus",
      "profession",
      "monthlyIncome",
      "proofOfIncome",
      "maritalStatus",
    ],
  },
  {
    id: 2,
    name: "House Loan Info",
    description:
      "Please provide your personal details, including your address, employment information, and related documents.",
    fields: [
      "housePreference",
      "propertyName",
      "unitName",
      "typology",
      "location",
      "secondTypology",
      "secondLocation",
      "loanProvider",
    ],
  },
  {
    id: 3,
    name: "Summary",
    description:
      "Review all the information you've provided. Ensure it's complete and correct before submitting your application.",
    fields: [],
  },
];

const spouseStep = {
  id: 2.5, // Assign an in-between ID to maintain order
  name: "Spouse Info",
  description:
    "Please provide your spouse’s details, including your address, employment information, and related documents.",
  fields: [
    "spouseAddress",
    "spouseProvince",
    "spouseDistrict",
    "spouseSector",
    "spouseCell",
    "spouseVillage",
    "spouseEmploymentStatus",
    "spouseProfession",
    "spouseMonthlyIncome",
    "spouseProofOfIncome",
  ],
};

async function submitApplicationToApiV1(formData: FormData, authToken: string) {
  const response = await fetch(`${AUTH_BACKEND_API_URL}/api/loan/application`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      logoutUnauthorized();
    }

    throw new Error(
      `Failed to submit to GW_V1. Status code: ${response.status}`
    );
  }

  const { data } = await response.json();
  return data as CreateApplicationResponse;
}

async function submitApplication(data: any) {
  const response = await authenticatedApiRequest("/applications", {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Failed to submit application metadata");
  }
}

const prepareMetadata = (
  data: Inputs,
  applicantId: number,
  applicationId: number
) => {
  const getPropertiesData = () =>
    data.housePreference === HOUSE_PREFERENCE.fromDeveloper
      ? {
          property: data.propertyName,
          unit: data.unitName,
        }
      : {};
  return {
    applicantId,
    applicationId,
    appliedByTypology: data.housePreference === HOUSE_PREFERENCE.typology,
    ...getPropertiesData(),
  };
};

const defaultFormStateStatus = Array(baseFormSteps.length).fill(null);

interface CreateApplicationFormProps {
  profileInfo: JwtDecodedData | null;
  properties: PropertiesListResponseData;
  metadataForFields: MetaForApplicationFields;
  authToken: string;
  unitId?: string;
  propertyId?: string;
}

export default function CreateApplicationForm({
  profileInfo,
  properties,
  metadataForFields,
  authToken,
  unitId,
  propertyId,
}: CreateApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatus, setStepStatus] = useState<(null | "completed")[]>(
    defaultFormStateStatus
  );
  const [isUploading, setIsUploading] = useState(false);
  const locationData = useLocationData();
  const spouseLocationData = useLocationData();
  const router = useRouter();
  const methods = useForm<Inputs>({
    resolver: zodResolver(CreateApplicationSchema),
    defaultValues: {
      status: MARITAL_STATUS.single,
      address: "",
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
      proofOfIncome: [],
      maritalStatus: [],
      isSameLocationForSpouse: false,
      spouseProofOfIncome: [],
      employmentStatus: "",
      monthlyIncome: 0,
      spouseMonthlyIncome: 0,
      housePreference: HOUSE_PREFERENCE.fromDeveloper,
      downPayment: true,
      insuranceCover: false,
      unitName: unitId,
      propertyName: propertyId,
    },
    shouldUnregister: false,
  });
  const { register, handleSubmit, trigger, reset, watch, setValue } = methods;

  const activeUnitId = watch("unitName");
  const activePropertyId = watch("propertyName");
  const userMaritalStatus = watch("status");

  const activeProperty = properties?.data?.find(
    (property) => property._id === activePropertyId
  );

  const activeUnit = activeProperty?.units?.find(
    (unit) => unit._id === activeUnitId
  );

  const activePropertyName = activeProperty?.name;

  useEffect(() => {
    if (!activeProperty) {
      setValue("propertyName", "");
    }
  }, [activeProperty, setValue]);

  useEffect(() => {
    if (!activeUnit) {
      setValue("unitName", "");
    }
  }, [activeUnit, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (formFields) => {
    try {
      setIsUploading(true);
      const metadataObject = prepareMetadataObject(formFields);
      const formDataForApiV1 = prepareFormData(metadataObject);
      const responseData = await submitApplicationToApiV1(
        formDataForApiV1,
        authToken
      );
      const metadata = prepareMetadata(
        formFields,
        responseData.applicant.userId,
        responseData.id
      );

      await submitApplication(metadata);
      nextStep();
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const dynamicFormSteps =
    userMaritalStatus === MARITAL_STATUS.married
      ? [
          baseFormSteps[0], // Personal Info
          spouseStep, // Spouse Info (inserted at step 2)
          ...baseFormSteps.slice(1), // Remaining steps shift down
        ]
      : baseFormSteps;

  const nextStep = async () => {
    const fields = dynamicFormSteps[currentStep - 1].fields;
    const isValid = await trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (isValid) {
      setStepStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[currentStep - 1] = "completed";
        return updatedStatus;
      });
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    register("proofOfIncome");
    register("maritalStatus");
    register("spouseProofOfIncome");
    register("housePreference");
  }, [register]);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-[18px] w-full">
      <FormStepsProgress
        formSteps={dynamicFormSteps}
        stepStatus={stepStatus}
        currentStep={currentStep}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
          className="w-full"
        >
          {currentStep === 1 && (
            <PersonalInfoStep
              onNextStep={nextStep}
              onPrevStep={prevStep}
              locationData={locationData}
            />
          )}
          {userMaritalStatus === MARITAL_STATUS.married &&
            currentStep === 2 && (
              <SpouseInfoStep
                onNextStep={nextStep}
                onPrevStep={prevStep}
                locationData={spouseLocationData}
              />
            )}
          {currentStep ===
            (userMaritalStatus === MARITAL_STATUS.married ? 3 : 2) && (
            <CurrentResidenceStep
              onNextStep={nextStep}
              onPrevStep={prevStep}
              properties={properties}
              metadataForFields={metadataForFields}
            />
          )}
          {currentStep ===
            (userMaritalStatus === MARITAL_STATUS.married ? 4 : 3) && (
            <SummaryStep
              profileInfo={profileInfo}
              unit={activeUnit}
              property={activeProperty}
              metadataForFields={metadataForFields}
              onNextStep={nextStep}
              onPrevStep={prevStep}
              isSubmitting={isUploading}
            />
          )}
          {currentStep > dynamicFormSteps.length && (
            <SuccessFormApplicationSubmit
              propertyName={activePropertyName}
              onNext={() => {
                reset();
                setStepStatus(defaultFormStateStatus);
                router.push(`${basePath}/application`);
              }}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
}
