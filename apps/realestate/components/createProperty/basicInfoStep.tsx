"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import InputHint from "@/components/inputHint/inputHint";
import InputName from "@/components/inputName/inputName";
import UploadFileField from "@/components/uploadFileField/uploadFileField";
import UploadButton from "../uploadButton/uploadButton";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import { basePath, UPLOAD_IMAGES_MAX_SIZE } from "@/lib/constants";

interface BasicInfoStepProps {
  onNextStep: () => void;
  onPrevStep?: () => void;
}

export default function BasicInfoStep({ onNextStep }: BasicInfoStepProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white w-full max-w-4xl mx-auto px-4 md:px-10 py-8 md:py-12">
      <div className="text-base text-black font-poppins mb-2">
        Basic Information
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <InputName isRequired htmlFor="name">
            Property name
          </InputName>
          <Input
            type="text"
            id="name"
            placeholder="Property name"
            {...register("name")}
          />
          <InputHint>50 characaters available</InputHint>
          {errors.name?.message && (
            <div className="text-red-600 text-xs">{`${errors.name.message}`}</div>
          )}
        </div>

        <div>
          <InputName isRequired htmlFor="description">
            Description
          </InputName>
          <Textarea
            id="description"
            placeholder="Description"
            {...register("description")}
          />
          <InputHint>200 characaters available</InputHint>
          {errors.description?.message && (
            <div className="text-red-600 text-xs">
              {`${errors.description.message}`}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <InputName htmlFor="phone" isRequired>
              Phone Contact
            </InputName>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  country="RW"
                  international
                  withCountryCallingCode
                  placeholder="Phone number"
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value || "")}
                  onBlur={field.onBlur}
                  className="w-full p-2 border border-grayborder rounded-md"
                />
              )}
            />

            {errors.phone?.message && (
              <div className="text-red-600 text-xs">{`${errors.phone.message}`}</div>
            )}
          </div>

          <div className="flex-1">
            <InputName isRequired htmlFor="email">
              Email Address
            </InputName>
            <Input
              type="email"
              id="email"
              placeholder="Property email address"
              {...register("email")}
            />
            {errors.email?.message && (
              <div className="text-red-600 text-xs">{`${errors.email.message}`}</div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <UploadFileField
            fieldName="images"
            fieldTitle="Featuring Photos"
            fieldHint="Min: 5, Max: 10"
            modalTitle="Upload featuring pictures"
            modalHint="JPG or PNG file size no more than 10MB"
            maxSize={UPLOAD_IMAGES_MAX_SIZE}
            dialogTriggerComponent={<UploadButton />}
            acceptedFileTypes={{
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
            }}
          />
        </div>
      </div>

      <div className="mt-16 border border-lightgray"></div>

      <div className="flex items-center justify-between mt-8">
        <Link href={`${basePath}/properties`}>
          <Button variant="secondary" size="lg">
            Back
          </Button>
        </Link>
        <Button type="button" variant="default" size="lg" onClick={onNextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}
