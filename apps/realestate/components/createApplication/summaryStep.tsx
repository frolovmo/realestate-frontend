"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { JwtDecodedData, UnitData, PropertyData } from "../../lib/types/index";
import { Inputs } from "./createApplicationForm";
import { HOUSE_PREFERENCE } from "@/lib/constants";
import UnitPreview from "../createUnit/unitPreview";
import UnitCard from "../unitCard/unitCard";
import Preference from "./preference";
import { HousingTypology } from "@/lib/constants/units";
import { MetaForApplicationFields } from "@/lib/types/applicationFieldsMeta";
import { LoanCalculations } from "@/lib/utils/loanCalculation";

interface SummaryListIem {
  title: string;
  value: string;
}

const getPersonalInfo = (
  profileInfo: JwtDecodedData | null,
  values: Inputs
): SummaryListIem[] => [
  {
    title: "Applicant",
    value: `${profileInfo?.firstName} ${profileInfo?.lastName}`,
  },
  {
    title: "NID",
    value: `${profileInfo?.nationalId}`,
  },
  {
    title: "Marital Status",
    value: values.status,
  },
  {
    title: "Marital status cert.",
    value: values.maritalStatus[0].file.name,
  },
  {
    title: "Disability of household member",
    value: "No",
  },
];

const getAddressInfo = (values: Inputs): SummaryListIem[] => [
  {
    title: "Province",
    value: values.province,
  },
  {
    title: "District",
    value: values.district,
  },
  {
    title: "Sector",
    value: values.sector,
  },
  {
    title: "Cell",
    value: values.cell,
  },
  {
    title: "Village",
    value: values.village,
  },
];

const getEmploymentInfo = (values: Inputs): SummaryListIem[] => [
  {
    title: "Employment Status",
    value: values.employmentStatus,
  },
  {
    title: "Monthly Income (RWF)",
    value: values.monthlyIncome.toString(),
  },
  {
    title: "Employer",
    value: values.employmentStatus === "Employed" && values.employerName
      ? values.employerName
      : "Not provided",
  },
  {
    title: "Profession",
    value: values.profession,
  },
  {
    title: "Proof of income",
    value: values.proofOfIncome[0].file.name,
  },
];

interface SummaryStepProps {
  onNextStep: () => void;
  onPrevStep: () => void;
  profileInfo: JwtDecodedData | null;
  isSubmitting: boolean;
  unit?: UnitData;
  property?: PropertyData;
  metadataForFields: MetaForApplicationFields;
}

export default function SummaryStep({
  onNextStep,
  onPrevStep,
  unit,
  property,
  profileInfo,
  isSubmitting,
  metadataForFields,
}: SummaryStepProps) {
  const { getValues } = useFormContext<Inputs>();
  const values = getValues();
  const totalIncome = values.monthlyIncome + (values.spouseMonthlyIncome ?? 0);
  const { houseCategories } = metadataForFields || {};

  const housePreference = values.housePreference;

  const unitLocation = [property?.province, property?.district]
    .filter(Boolean)
    .join(", ");

  const hasFirstPreferency = values?.typology && values?.location;
  const hasSecondPreferency = values?.secondTypology || values?.secondLocation;

  const firstTypology =
    houseCategories?.find((house) => house.id === Number(values?.typology))
      ?.name || "";

  const firstPreference = {
    index: 1,
    typology: firstTypology,
    location: values?.location || "",
  };

  const secondPreference = {
    index: 2,
    typology: values?.secondTypology as HousingTypology,
    location: values?.secondLocation || "",
  };

  const loanSummaryList: SummaryListIem[] = (() => {
    const loanData = LoanCalculations.incomeBreakDown(totalIncome);
    return [
      {
        title: "House Loan",
        value: `Rwf ${loanData.maximumLoanAmount.toLocaleString()}`,
      },
      {
        title: "Max Loan Value",
        value: `Rwf ${loanData.propertyValueLimit.toLocaleString()}`,
      },
      {
        title: "Maximum Deductible Income",
        value: `Rwf ${loanData.deductableIncome.toLocaleString()}`,
      },
      {
        title: "Interest Rate",
        value: `${(loanData.interest * 100).toFixed(0)}%`,
      },
      {
        title: "Period",
        value: `${loanData.years} years`,
      },
    ];
  })();

  return isSubmitting ? (
    <div>Submitting the form</div>
  ) : (
    <div className="flex flex-col lg:flex-row gap-6 text-black font-poppins">
      <div className="w-full lg:w-[60%] bg-white px-4 sm:px-8 py-6 sm:py-7 rounded-md border border-primary">
        <div className="text-base font-semibold mb-6">Applicant Details</div>
        <div className="mb-5 border border-grayborder"></div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-lightdark mb-4">
            Personal Info
          </h3>
          <div className="border border-grayborder rounded-sm px-[10px] py-5">
            {getPersonalInfo(profileInfo, values).map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-center border-b border-grayborder pt-4 last:border-none last:pb-0 first:pt-0"
              >
                <p>{item.title}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-lightdark mb-4">
            Address
          </h3>
          <div className="border border-grayborder rounded-sm px-[10px] py-5">
            {getAddressInfo(values).map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-center border-b border-grayborder pt-4 last:border-none last:pb-0 first:pt-0"
              >
                <p>{item.title}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-base font-semibold text-lightdark mb-4">
            Employment
          </h3>
          <div className="border border-grayborder rounded-sm px-[10px] py-5">
            {getEmploymentInfo(values).map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-center border-b border-grayborder pt-4 last:border-none last:pb-0 first:pt-0"
              >
                <p>{item.title}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-[200px]"
            onClick={onPrevStep}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-[200px]"
          >
            Confirm & Submit
          </Button>
        </div>
      </div>

      <div className="min-w-[40%] border border-primary px-6 py-7 font-poppins self-start rounded-md bg-white text-black ">
        <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>

        <div>
          {housePreference === HOUSE_PREFERENCE.fromDeveloper && unit ? (
            <UnitPreview noTitle className="mt-0">
              <UnitCard
                imageUrl={unit?.images[0]?.url}
                name={unit?.name}
                cost={unit?.cost}
                square={unit?.square}
                bathrooms={unit?.bathrooms}
                bedrooms={unit?.bedrooms}
                location={unitLocation}
              />
            </UnitPreview>
          ) : (
            <div className="flex flex-col gap-[54px] mb-[54px]">
              {hasFirstPreferency && <Preference {...firstPreference} />}
              {hasSecondPreferency && <Preference {...secondPreference} />}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {loanSummaryList.map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-center border-b border-grayborder pb-4 last:border-none last:pb-0"
              >
                <p>{item.title}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}