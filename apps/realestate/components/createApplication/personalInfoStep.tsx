"use client";

import { Controller, useFormContext } from "react-hook-form";
import InputName from "@/components/inputName/inputName";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { CloudIcon } from "@/components/icons";
import UploadFileField from "@/components/uploadFileField/uploadFileField";
import locationMetadata from "../../lib/rwanda.json";
import { useRouter } from "next/navigation";
import { NumericFormat } from "react-number-format";
import { LocationData } from "../../lib/hooks/useLocation";
import {
  EMPLOYMENT_STATUS,
  MARITAL_STATUS,
  UPLOAD_IMAGES_MAX_SIZE,
} from "../../lib/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface PersonalInfoStepProps {
  onNextStep: () => void;
  onPrevStep?: () => void;
  locationData: LocationData;
}

export default function PersonalInfoStep({
  onNextStep,
  locationData,
}: PersonalInfoStepProps) {
  const router = useRouter();
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const employmentStatus = watch("employmentStatus");

  const {
    districts,
    sectors,
    cells,
    villages,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedSector,
    setSelectedCell,
  } = locationData;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-[18px]">
      <div className="flex-[30%] bg-white px-12 py-7 rounded-md border border-primary">
        <h3 className="font-poppins mb-5 font-medium text-base text-black ">
          Applicant Personal Info
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col mb-6">
            <label className="text-softblack text-base">
              What is your marital status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  className="flex mt-2.5 gap-11"
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem
                      value={MARITAL_STATUS.single}
                      id="status-single"
                    />
                    <Label
                      htmlFor="status-single"
                      className={cn(
                        "cursor-pointer text-softblack text-base font-normal",
                        field.value === MARITAL_STATUS.single
                          ? "text-primary"
                          : ""
                      )}
                    >
                      Single
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={MARITAL_STATUS.married}
                      id="status-married"
                    />
                    <Label
                      htmlFor="status-married"
                      className={cn(
                        "cursor-pointer text-softblack text-base font-normal",
                        field.value === MARITAL_STATUS.married
                          ? "text-primary"
                          : ""
                      )}
                    >
                      Married
                    </Label>
                  </div>
                  {/* <div className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem
                      value={MARITAL_STATUS.divorced}
                      id="status-divorced"
                    />
                    <Label
                      htmlFor="status-divorced"
                      className={cn(
                        "cursor-pointer text-softblack text-base font-normal",
                        field.value === MARITAL_STATUS.divorced
                          ? "text-primary"
                          : ""
                      )}
                    >
                      Divorced
                    </Label>
                  </div> */}
                </RadioGroup>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            <div className="w-full">
              <InputName htmlFor="streetAddress">Street Address</InputName>
              <Input
                type="text"
                id="streetAddress"
                placeholder="Enter the street address"
                className="border border-grayborder2"
                {...register("address")}
              />
              {errors.address?.message && (
                <div className="text-red-600 text-xs">
                  {`${errors.address.message}`}
                </div>
              )}
            </div>

            <div className="w-full">
              <InputName>Province</InputName>
              <Controller
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedProvince(value);
                      setValue("district", ""); // Reset dependent fields
                      setValue("sector", "");
                      setValue("cell", "");
                      setValue("village", "");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border border-grayborder2">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {locationMetadata.data.provinces.map((p) => (
                          <SelectItem key={p.name} value={p.name}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                control={control}
                name="province"
              />
              {errors.province?.message && (
                <div className="text-red-600 text-xs">
                  {`${errors.province.message}`}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            <div className="w-full">
              <InputName>District</InputName>
              <Controller
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedDistrict(value);
                      setValue("sector", "");
                      setValue("cell", "");
                      setValue("village", "");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border border-grayborder2">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {districts.map((d) => (
                          <SelectItem key={d.name} value={d.name}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                control={control}
                name="district"
              />
              {errors.district?.message && (
                <div className="text-red-600 text-xs">
                  {`${errors.district.message}`}
                </div>
              )}
            </div>

            <div className="w-full">
              <InputName>Sector</InputName>
              <Controller
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedSector(value);
                      setValue("cell", "");
                      setValue("village", "");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border border-grayborder2">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sectors.map((d) => (
                          <SelectItem key={d.name} value={d.name}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                control={control}
                name="sector"
              />
              {errors.sector?.message && (
                <div className="text-red-600 text-xs">
                  {`${errors.sector.message}`}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-5">
            <div className="w-full">
              <InputName>Cell</InputName>
              <Controller
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCell(value);
                      setValue("village", "");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border border-grayborder2">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {cells.map((d) => (
                          <SelectItem key={d.name} value={d.name}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                control={control}
                name="cell"
              />
              {errors.cell?.message && (
                <div className="text-red-600 text-xs">{`${errors.cell.message}`}</div>
              )}
            </div>

            <div className="w-full">
              <InputName>Village</InputName>
              <Controller
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border border-grayborder2">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {villages.map((v: string) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                control={control}
                name="village"
              />
              {errors.village?.message && (
                <div className="text-red-600 text-xs">
                  {`${errors.village.message}`}
                </div>
              )}
            </div>
          </div>

          <div className="my-5 border border-grayborder"></div>

          <div>
            <InputName>Employment Status</InputName>
            <Controller
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="border border-grayborder2">
                    <SelectValue placeholder="Select item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(EMPLOYMENT_STATUS).map((key) => (
                        <SelectItem
                          key={key}
                          value={
                            EMPLOYMENT_STATUS[
                              key as keyof typeof EMPLOYMENT_STATUS
                            ]
                          }
                        >
                          {
                            EMPLOYMENT_STATUS[
                              key as keyof typeof EMPLOYMENT_STATUS
                            ]
                          }
                        </SelectItem>
                      ))}
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
            <div>
              <InputName isRequired>Employer Name</InputName>
              <Controller
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Enter Employer Name"
                    className="border border-grayborder2"
                    {...field}
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

          <div>
            <InputName htmlFor="profession">Profession</InputName>
            <Input
              type="text"
              id="profession"
              placeholder="Enter your profession"
              className="border border-grayborder2"
              {...register("profession")}
            />
            {errors.profession?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.profession.message}`}
              </div>
            )}
          </div>

          <div>
            <InputName>Monthly Income</InputName>
            <Controller
              name="monthlyIncome"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  placeholder="Enter your monthly income"
                  customInput={Input}
                  thousandSeparator={true}
                  onValueChange={(e) => field.onChange(e.floatValue)}
                  value={field.value}
                />
              )}
            />
            {errors.monthlyIncome?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.monthlyIncome.message}`}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <UploadFileField
              fieldName="proofOfIncome"
              fieldTitle="Proof of income for the last 6 months"
              modalTitle="Upload proof of income"
              modalHint="JPG, PNG, or PDF file size no more than 10MB"
              maxSize={UPLOAD_IMAGES_MAX_SIZE}
              showModalInput={false}
              dialogTriggerComponent={
                <Button
                  type="button"
                  variant="secondary"
                  className="flex gap-1.5"
                >
                  <CloudIcon
                    width={23}
                    height={23}
                    className="text-secondary inline"
                  />
                  Upload
                </Button>
              }
            />
          </div>

          <div className="flex flex-col">
            <UploadFileField
              fieldName="maritalStatus"
              fieldTitle="Marital Status Certificate"
              modalTitle="Upload Marital Status Certificate"
              modalHint="JPG, PNG, or PDF file size no more than 10MB"
              showModalInput={false}
              maxSize={UPLOAD_IMAGES_MAX_SIZE}
              dialogTriggerComponent={
                <Button
                  type="button"
                  variant="secondary"
                  className="flex gap-1.5"
                >
                  <CloudIcon
                    width={23}
                    height={23}
                    className="text-secondary inline"
                  />
                  Upload
                </Button>
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="secondary"
            size="lg"
            className="w-[200px]"
            onClick={() => router.back()}
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

      <div className="flex-1 border border-primary px-6 py-7 font-poppins self-start rounded-md bg-white">
        <h3 className="mb-4 text-lg font-semibold text-secondary">Important</h3>
        <p className="text-black text-sm">
          Please ensure all information provided is accurate and complete.
          Inaccurate or incomplete information may delay your application.
        </p>
      </div>
    </div>
  );
}
