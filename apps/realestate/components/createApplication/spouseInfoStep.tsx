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
import { NumericFormat } from "react-number-format";
import { LocationData } from "../../lib/hooks/useLocation";
import { EMPLOYMENT_STATUS, UPLOAD_IMAGES_MAX_SIZE } from "../../lib/constants";
import { Switch } from "../ui/switch";
import { InputMask } from "primereact/inputmask";
import PhoneInput from "react-phone-number-input/input";

interface SpouseInfoStepProps {
  onNextStep: () => void;
  onPrevStep?: () => void;
  locationData: LocationData;
}

export default function SpouseInfoStep({
  onPrevStep,
  onNextStep,
  locationData,
}: SpouseInfoStepProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

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

  const isSameLocationForSpouse = watch("isSameLocationForSpouse");

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-[18px]">
      <div className="flex-[30%] bg-white px-12 py-7 rounded-md border border-primary">
        <h3 className="font-poppins mb-5 font-medium text-base text-black ">
          Spouse Info
        </h3>
        <div className="flex flex-col mb-7">
          <InputName htmlFor="spouseIdentificationNumber" isRequired>
            National ID
          </InputName>
          <Controller
            name="spouseIdentificationNumber"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="9 9999 99999999 999"
                placeholder="Enter your spouse’s national ID"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            )}
          />
          {errors.spouseIdentificationNumber?.message && (
            <div className="text-red-600 text-xs">
              {`${errors.spouseIdentificationNumber.message}`}
            </div>
          )}
        </div>

        <div className="mb-7">
          <InputName htmlFor="spousePhoneNumber" isRequired>
            Phone Number
          </InputName>
          <Controller
            control={control}
            name="spousePhoneNumber"
            render={({ field }) => (
              <PhoneInput
                country="RW"
                international
                withCountryCallingCode
                placeholder="Enter your spouse’s phone number"
                value={field.value}
                onChange={field.onChange}
                className="w-full p-2 border border-grayborder rounded-md"
              />
            )}
          />
          {errors.spousePhoneNumber?.message && (
            <div className="text-red-600 text-xs">
              {`${errors.spousePhoneNumber.message}`}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col mb-2">
            <label className="text-softblack text-base">
              Use same physical address as mine
            </label>
            <Controller
              control={control}
              name="isSameLocationForSpouse"
              render={({ field }) => (
                <Switch
                  className="mt-2"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {isSameLocationForSpouse ? null : (
            <div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                <div className="w-full mb-5">
                  <InputName htmlFor="spouseAddress">Street Address</InputName>
                  <Input
                    type="text"
                    id="spouseAddress"
                    placeholder="Enter the street address"
                    className="border border-grayborder2"
                    {...register("spouseAddress")}
                  />
                  {errors.spouseAddress?.message && (
                    <div className="text-red-600 text-xs">
                      {`${errors.spouseAddress.message}`}
                    </div>
                  )}
                </div>

                <div className="w-full mb-5">
                  <InputName>Province</InputName>
                  <Controller
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedProvince(value);
                          setValue("spouseDistrict", ""); // Reset dependent fields
                          setValue("spouseSector", "");
                          setValue("spouseCell", "");
                          setValue("spouseVillage", "");
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
                    name="spouseProvince"
                  />
                  {errors.spouseProvince?.message && (
                    <div className="text-red-600 text-xs">
                      {`${errors.spouseProvince.message}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-5">
                <div className="w-full mb-5">
                  <InputName>District</InputName>
                  <Controller
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDistrict(value);
                          setValue("spouseSector", "");
                          setValue("spouseCell", "");
                          setValue("spouseVillage", "");
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
                    name="spouseDistrict"
                  />
                  {errors.spouseDistrict?.message && (
                    <div className="text-red-600 text-xs">
                      {`${errors.spouseDistrict.message}`}
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
                          setValue("spouseCell", "");
                          setValue("spouseVillage", "");
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
                    name="spouseSector"
                  />
                  {errors.spouseSector?.message && (
                    <div className="text-red-600 text-xs">
                      {`${errors.spouseSector.message}`}
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
                          setValue("spouseVillage", "");
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
                    name="spouseCell"
                  />
                  {errors.spouseCell?.message && (
                    <div className="text-red-600 text-xs">{`${errors.spouseCell.message}`}</div>
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
                    name="spouseVillage"
                  />
                  {errors.spouseVillage?.message && (
                    <div className="text-red-600 text-xs">
                      {`${errors.spouseVillage.message}`}
                    </div>
                  )}
                </div>
              </div>
              <div className="my-5 border border-grayborder"></div>
            </div>
          )}

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
              name="spouseEmploymentStatus"
            />
            {errors.spouseEmploymentStatus?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.spouseEmploymentStatus.message}`}
              </div>
            )}
          </div>

          <div>
            <InputName htmlFor="profession">Profession</InputName>
            <Input
              type="text"
              id="profession"
              placeholder="Enter your profession"
              className="border border-grayborder2"
              {...register("spouseProfession")}
            />
            {errors.spouseProfession?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.spouseProfession.message}`}
              </div>
            )}
          </div>

          <div>
            <InputName>Monthly Income</InputName>
            <Controller
              name="spouseMonthlyIncome"
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
            {errors.spouseMonthlyIncome?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.spouseMonthlyIncome.message}`}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <UploadFileField
              fieldName="spouseProofOfIncome"
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
