"use client";
import {
  ApartmentIcon,
  AvailableIcon,
  DetachedIcon,
  NotAllowedIcon,
  TownhouseIcon,
} from "@/components/icons";
import InputHint from "@/components/inputHint/inputHint";
import InputName from "@/components/inputName/inputName";
import QuantityInput from "@/components/quantityInput/quantityInput";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import { Controller, useFormContext } from "react-hook-form";
import UploadFileField from "@/components/uploadFileField/uploadFileField";
import {
  basePath,
  DEVELOPMENT_STAGES,
  UNIT_TYPES,
  UPLOAD_IMAGES_MAX_SIZE,
  UPLOAD_PDF_MAX_SIZE,
  UPLOAD_VIDEOS_MAX_SIZE,
} from "@/lib/constants";
import UploadButton from "../uploadButton/uploadButton";
import UnitPreview from "./unitPreview";
import UnitCard from "../unitCard/unitCard";
import VideoPreview from "../VideoPreview";

interface SelectableButton {
  type: string;
  text: string;
  icon: (isActive: boolean) => React.ReactNode;
}

const getActiveIcon = (isActive: boolean): string =>
  isActive ? "text-googlelink" : "text-lightdark";

const unitTypes: SelectableButton[] = [
  {
    type: UNIT_TYPES.detached,
    text: "Detached",
    icon: (isActive) => <DetachedIcon className={getActiveIcon(isActive)} />,
  },
  {
    type: UNIT_TYPES.apartment,
    text: "Apartment",
    icon: (isActive) => <ApartmentIcon className={getActiveIcon(isActive)} />,
  },
  {
    type: UNIT_TYPES.townhouse,
    text: "Townhouse",
    icon: (isActive) => <TownhouseIcon className={getActiveIcon(isActive)} />,
  },
];

const developmentStages: SelectableButton[] = [
  {
    type: DEVELOPMENT_STAGES.available,
    text: "Available",
    icon: (isActive) => <AvailableIcon className={getActiveIcon(isActive)} />,
  },
  {
    type: DEVELOPMENT_STAGES.underConstruction,
    text: "Under construction",
    icon: (isActive) => <NotAllowedIcon className={getActiveIcon(isActive)} />,
  },
];

interface AboutUnitStepProps {
  onNextStep: () => void;
  onPrevStep?: () => void;
}

export default function AboutUnitStep({ onNextStep }: AboutUnitStepProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useFormContext();
  const { name, images, cost, square, bedrooms, bathrooms, location } = watch();

  const updateActiveButton = (fieldName: string, value: string) => {
    setValue(fieldName, value);
  };

  const currentUnitType = watch("unitType");
  const currentDevelopmentStage = watch("developmentStage");

  return (
    <div className="flex gap-8">
      <div className="w-2/3 pt-9 pl-7 pb-12 pr-24 bg-white rounded-md font-poppins text-black">
        <p className="font-semibold	text-xl mb-5">We’d like to know your Unit</p>
        <div className="text-base mb-2">Basic Information</div>

        <div className="flex flex-col gap-3">
          <div>
            <InputName isRequired htmlFor="propertyName">
              Unit name
            </InputName>
            <Input
              type="text"
              id="propertyName"
              placeholder="Unit name"
              {...register("name")}
            />
            <InputHint>30 characaters available</InputHint>
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
              <div className="text-red-600 text-xs">{`${errors.description.message}`}</div>
            )}
          </div>

          <UploadFileField
            fieldName="images"
            fieldTitle="Featuring Photos"
            fieldHint="Min: 3, Max: 10"
            modalTitle="Upload featuring pictures"
            modalHint="JPG or PNG file size no more than 10MB"
            dialogTriggerComponent={<UploadButton />}
            maxSize={UPLOAD_IMAGES_MAX_SIZE}
            acceptedFileTypes={{
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
            }}
          />

          <div className="flex gap-10 w-full">
            <div className="flex-1">
              <UploadFileField
                fieldName="floorPlan"
                fieldTitle="Floor plan"
                fieldHint="Min: 1, Max: 3"
                modalTitle="Upload featuring documents"
                modalHint="PDF file size no more than 10MB"
                maxSize={UPLOAD_PDF_MAX_SIZE}
                dialogTriggerComponent={<UploadButton />}
                acceptedFileTypes={{
                  "image/pdf": [".pdf"],
                }}
              />
            </div>

            <div className="flex-1">
              <UploadFileField
                fieldName="tourVideo"
                fieldTitle="Tour video"
                fieldHint="Min: 1, Max: 1"
                modalTitle="Upload featuring video"
                modalHint="MP4 file size no more than 10MB"
                maxSize={UPLOAD_VIDEOS_MAX_SIZE}
                dialogTriggerComponent={<UploadButton />}
                acceptedFileTypes={{
                  "video/mp4": [".mp4"],
                }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <InputName isRequired>Available Units</InputName>
            <Controller
              name="availableUnits"
              control={control}
              render={({ field }) => (
                <QuantityInput value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.availableUnits?.message && (
              <div className="text-red-600 text-xs">{`${errors.availableUnits.message}`}</div>
            )}
          </div>

          <div className="flex flex-col">
            <InputName isRequired>Unit type</InputName>
            <div className="flex gap-[34px] mt-3.5">
              {unitTypes.map((entity) => (
                <div key={entity.type}>
                  <Button
                    type="button"
                    variant={
                      currentUnitType === entity.type ? "active" : "disabled"
                    }
                    size="lg"
                    onClick={() => updateActiveButton("unitType", entity.type)}
                  >
                    <div className="flex items-center justify-center h-6 w-7">
                      {entity.icon(currentUnitType === entity.type)}
                    </div>
                    {entity.text}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <InputName isRequired>Development Stage</InputName>
            <div className="flex gap-[34px] mt-3.5">
              {developmentStages.map((entity) => (
                <span key={entity.type}>
                  <Button
                    type="button"
                    variant={
                      currentDevelopmentStage === entity.type
                        ? "active"
                        : "disabled"
                    }
                    size="lg"
                    onClick={() =>
                      updateActiveButton("developmentStage", entity.type)
                    }
                  >
                    <div className="flex items-center justify-center h-6 w-7">
                      {entity.icon(currentDevelopmentStage === entity.type)}
                    </div>
                    {entity.text}
                  </Button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border border-lightgray"></div>

        <div className="flex items-center justify-between mt-8">
          <Link href={`${basePath}/properties`}>
            <Button type="button" variant="secondary" size="lg">
              Back
            </Button>
          </Link>
          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={onNextStep}
          >
            Continue
          </Button>
        </div>
      </div>

      <div>
        <UnitPreview>
          <UnitCard
            imageUrl={images[0]?.preview}
            name={name}
            cost={cost}
            square={square}
            bathrooms={bathrooms}
            bedrooms={bedrooms}
            location={location}
          />
        </UnitPreview>
      </div>
    </div>
  );
}
