"use client";
import { Controller, useFormContext } from "react-hook-form";
import InputName from "@/components/inputName/inputName";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  AUTHENTICATION_COOKIE,
  basePath,
  HOUSE_PREFERENCE,
} from "../../lib/constants";
import { DetachedIcon, TypologyIcon } from "../icons";
import districts from "@/lib/districts";
import { PropertiesListResponseData } from "../../lib/types/index";
import { useEffect, useState } from "react";
import { AUTH_BACKEND_API_URL, logoutUnauthorized } from "@/lib/api";
import {
  HouseRangeResponse,
  MetaForApplicationFields,
} from "@/lib/types/applicationFieldsMeta";
import JsCookie from "js-cookie";
import { LoanCalculations } from "../../lib/utils/loanCalculation";

interface LoanSummary {
  title: string;
  value: string;
}

interface SelectableButton {
  type: string;
  text: string;
  icon: (isActive: boolean) => React.ReactNode;
}

interface HouseRange {
  id: number;
  name: string;
  rangeFloor: number;
  rangeCeiling: number;
  currency: string;
}

const getActiveIcon = (isActive: boolean): string =>
  isActive ? "text-googlelink" : "text-lightdark";

const housePreference: SelectableButton[] = [
  {
    type: HOUSE_PREFERENCE.fromDeveloper,
    text: "From Property Developer",
    icon: (isActive) => <DetachedIcon className={getActiveIcon(isActive)} />,
  },
  {
    type: HOUSE_PREFERENCE.typology,
    text: "House Typology",
    icon: (isActive) => <TypologyIcon className={getActiveIcon(isActive)} />,
  },
];

interface CurrentResidenceStepProps {
  properties: PropertiesListResponseData;
  metadataForFields: MetaForApplicationFields;
  onNextStep: () => void;
  onPrevStep?: () => void;
}

export default function CurrentResidenceStep({
  onNextStep,
  onPrevStep,
  properties,
  metadataForFields,
}: CurrentResidenceStepProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [houseRanges, setHouseRanges] = useState<HouseRange[]>([]);
  const activeProperty = watch("propertyName");
  const currentHousePreference = watch("housePreference");
  const monthlyIncome = watch("monthlyIncome");
  const spouseMonthlyIncome = watch("spouseMonthlyIncome");
  const totalIncome = monthlyIncome + spouseMonthlyIncome;
  const employmentStatus = watch("employmentStatus");
  const { banks, houseCategories } = metadataForFields;
  const propertiesOptions = properties.data.map((property) => ({
    name: property.name,
    value: property._id,
  }));

  const selectedProperty = properties.data.find(
    (property) => property._id === activeProperty
  );
  const unitsOptions =
    selectedProperty?.units.map((unit) => ({
      name: unit.name,
      value: unit._id,
    })) || [];

  const loanSummaryList: LoanSummary[] = (() => {
    const loanData = LoanCalculations.incomeBreakDown(totalIncome);
    return [
      {
        title: "Value Limit",
        value: `Rwf ${loanData.propertyValueLimit.toLocaleString()}`,
      },
      {
        title: "Max Loan Value",
        value: `Rwf ${loanData.maximumLoanAmount.toLocaleString()}`,
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

  const updateActiveButton = (fieldName: string, value: string) => {
    setValue(fieldName, value);
  };

  useEffect(() => {
    async function fetchHouseRanges() {
      const token = JsCookie.get("Authentication");
      const response = await fetch(`${AUTH_BACKEND_API_URL}/api/house-ranges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ totalIncome }),
      });

      if (response.status === 401) {
        logoutUnauthorized();
        return;
      }

      const houseRangesRes = (await response.json()) as HouseRangeResponse;
      setHouseRanges(houseRangesRes.data.ranges);
    }
    if (totalIncome > 0) {
      fetchHouseRanges();
    }
  }, [totalIncome]);


  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1000px] mx-auto px-4">
      <div className="bg-white px-4 sm:px-8 md:px-12 py-6 sm:py-7 rounded-md border border-primary w-full">
        <div className="text-base text-black font-poppins mb-2">
          Applicant Current Residence
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <InputName isRequired>House Preference</InputName>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {housePreference.map((entity) => (
                <div key={entity.type}>
                  <Button
                    type="button"
                    variant={
                      currentHousePreference === entity.type
                        ? "active"
                        : "disabled"
                    }
                    size="lg"
                    onClick={() =>
                      updateActiveButton("housePreference", entity.type)
                    }
                  >
                    <div className="flex items-center justify-center h-6 w-7 mr-1.5">
                      {entity.icon(currentHousePreference === entity.type)}
                    </div>
                    {entity.text}
                  </Button>
                </div>
              ))}
            </div>
            {errors.housePreference?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.housePreference.message}`}
              </div>
            )}
          </div>

          {currentHousePreference === HOUSE_PREFERENCE.fromDeveloper ? (
            <>
              <div className="flex flex-col gap-1 mt-7">
                <InputName isRequired>Property Name</InputName>
                <Controller
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full border border-grayborder2">
                        <SelectValue placeholder="Select Property Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {propertiesOptions.map((option) => (
                            <SelectItem key={option.name} value={option.value}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  control={control}
                  name="propertyName"
                />
                {errors.propertyName?.message && (
                  <div className="text-red-600 text-xs">
                    {`${errors.propertyName.message}`}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-7">
                <InputName isRequired>Unit Name</InputName>
                <Controller
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-full border border-grayborder2"
                      >
                        <SelectValue placeholder="Select Unit Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {unitsOptions.map((option) => (
                            <SelectItem key={option.name} value={option.value}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  control={control}
                  name="unitName"
                />
                {errors.unitName?.message && (
                  <div className="text-red-600 text-xs">
                    {`${errors.unitName.message}`}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1 mt-7">
                <InputName isRequired>Preferred Housing typologies</InputName>
                <Controller
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!houseCategories || houseCategories.length === 0}
                    >
                      <SelectTrigger className="w-full border border-grayborder2">
                        <SelectValue
                          placeholder={
                            houseCategories && houseCategories.length > 0
                              ? "Select Preferred Housing typologies"
                              : "No housing typologies available"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {houseCategories && houseCategories.length > 0
                            ? houseCategories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={String(category.id)}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            : null}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  control={control}
                  name="typology"
                />
                {errors.typology?.message && (
                  <div className="text-red-600 text-xs">
                    {`${errors.typology.message}`}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <InputName isRequired>Preferred House Location</InputName>
                <Controller
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border border-grayborder2">
                        <SelectValue placeholder="Select Preferred House Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  control={control}
                  name="location"
                />
                {errors.location?.message && (
                  <div className="text-red-600 text-xs">
                    {`${errors.location.message}`}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-8">
                <InputName>
                  Second Preferred Housing typologies (Optional)
                </InputName>
                <Controller
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border border-grayborder2">
                        <SelectValue placeholder="Select Preferred Housing typologies" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="one">1 bedroom</SelectItem>
                          <SelectItem value="two">2 bedrooms</SelectItem>
                          <SelectItem value="three">3 bedrooms</SelectItem>
                          <SelectItem value="more">More Bedrooms</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  control={control}
                  name="secondTypology"
                />
                {errors.secondTypology?.message && (
                  <div className="text-red-600 text-xs">
                    {`${errors.secondTypology.message}`}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1 mt-8">
                <InputName>
                  Second Preferred House Location (Optional)
                </InputName>
                <Controller
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border border-grayborder2">
                        <SelectValue placeholder="Select Preferred House Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                  control={control}
                  name="secondLocation"
                />
                {errors.secondLocation?.message && (
                  <div className="text-red-600 text-xs">{`${errors.secondLocation.message}`}</div>
                )}
              </div>
            </>
          )}

          <div className="flex flex-col gap-1 mt-7">
            <InputName isRequired>House Range</InputName>
            <Controller
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border border-grayborder2">
                    <SelectValue placeholder="Select House Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {houseRanges.length
                        ? houseRanges.map((option) => (
                            <SelectItem
                              key={option.id}
                              value={String(option.id)}
                            >
                              {option.name}
                            </SelectItem>
                          ))
                        : null}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              control={control}
              name="houseRange"
            />
            {errors.unitName?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.unitName.message}`}
              </div>
            )}
          </div>

          <div className="flex flex-col mt-6">
            <label className="font-medium">
              Do you have the capacity to meet down payment of 10% (Rwf
              {LoanCalculations.incomeBreakDown(totalIncome).propertyValueLimit10PercentMeetDown.toLocaleString()}) for the house you are interested in?
            </label>
            <Controller
              name="downPayment"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  className="flex mt-2.5"
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={String(field.value)}
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value="true" id="down-yes" />
                    <Label htmlFor="down-yes" className="cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="down-no" />
                    <Label htmlFor="down-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="font-medium">
              If no, would you take an insurance cover for the loan?
            </label>
            <Controller
              name="insuranceCover"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  className="flex mt-2.5"
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={String(field.value)}
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value="true" id="insurance-yes" />
                    <Label htmlFor="insurance-yes" className="cursor-pointer">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="insurance-no" />
                    <Label htmlFor="insurance-no" className="cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <InputName isRequired>Employment Status</InputName>
            <Controller
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border border-grayborder2">
                    <SelectValue placeholder="Select Employment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Employed">Employed</SelectItem>
                      <SelectItem value="Self-Employed">Self-Employed</SelectItem>
                      <SelectItem value="Unemployed">Unemployed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              control={control}
              name="employmentStatus"
            />
            {errors.employmentStatus?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.employmentStatus.message}`}
              </div>
            )}
          </div>

          {employmentStatus === "Employed" && (
            <div className="flex flex-col gap-1 mt-4">
              <InputName isRequired>Employer Name</InputName>
              <Controller
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-grayborder2 p-2 rounded-md"
                    placeholder="Enter Employer Name"
                  />
                )}
                control={control}
                name="employerName"
              />
              {errors.employerName?.message && (
                <div className="text-red-600 text-xs">
                  {`${errors.employerName.message}`}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1 mt-4">
            <InputName isRequired>Monthly Income (RWF)</InputName>
            <Controller
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full border border-grayborder2 p-2 rounded-md"
                  placeholder="Enter Monthly Income"
                />
              )}
              control={control}
              name="monthlyIncome"
            />
            {errors.monthlyIncome?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.monthlyIncome.message}`}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <InputName>Spouse Monthly Income (RWF) (Optional)</InputName>
            <Controller
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="w-full border border-grayborder2 p-2 rounded-md"
                  placeholder="Enter Spouse Monthly Income"
                />
              )}
              control={control}
              name="spouseMonthlyIncome"
            />
            {errors.spouseMonthlyIncome?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.spouseMonthlyIncome.message}`}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <InputName isRequired>Loan Provider Bank</InputName>
            <Controller
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border border-grayborder2">
                    <SelectValue placeholder="Select bank name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {banks
                        ? banks.map((bank) => (
                            <SelectItem key={bank.id} value={String(bank.id)}>
                              {bank.name}
                            </SelectItem>
                          ))
                        : null}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              control={control}
              name="loanProvider"
            />
            {errors.loanProvider?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.loanProvider.message}`}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="secondary"
            size="lg"
            className="w-[200px]"
            onClick={onPrevStep}
          >
            Back
          </Button>
          <Button
            variant="default"
            size="lg"
            className="w-[200px]"
            onClick={onNextStep}
          >
            Continue
          </Button>
        </div>
      </div>

      <div className="w-full max-w-sm sm:w-[412px] border border-primary px-4 sm:px-6 py-6 sm:py-7 font-poppins rounded-md bg-white text-black">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Loan Summary</h3>
        <div className="flex flex-col gap-4">
          {loanSummaryList.map((item) => (
            <div
              key={item.title}
              className="flex justify-between items-center border-b border-grayborder pb-4 last:border-none last:pb-0"
            >
              <p className="text-sm sm:text-base">{item.title}</p>
              <p className="font-semibold text-sm sm:text-base">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
