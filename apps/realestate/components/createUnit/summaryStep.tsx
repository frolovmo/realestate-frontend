"use client";
import { MarkIcon } from "@/components/icons";
import { Button } from "../ui/button";
import UploadThumbnail from "@/components/uploadThumbnail/uploadThumbnail";
import { useFormContext } from "react-hook-form";
import { Inputs } from "./createUnitForm";
import { DEFAULT_FACILITIES, DEVELOPMENT_STAGES } from "../../lib/constants";
import UnitPreview from "./unitPreview";
import UnitCard from "../unitCard/unitCard";
import { AttachmentType } from "@/lib/constants/attachments";

const developmentStageTextMap = {
  available: {
    text: "Available",
    name: DEVELOPMENT_STAGES.available,
  },
  underConstruction: {
    text: "Under construction",
    name: DEVELOPMENT_STAGES.underConstruction,
  },
} as const;

const facilitiesTextMap = {
  balcony: {
    text: "Balcony/Terrace",
    name: DEFAULT_FACILITIES.balcony,
  },
  elevator: {
    text: "Elevator Access",
    name: DEFAULT_FACILITIES.elevator,
  },
  garden: {
    text: "Garden/Yard",
    name: DEFAULT_FACILITIES.garden,
  },
  smartHome: {
    text: "Smart Home Technology",
    name: DEFAULT_FACILITIES.smartHome,
  },
  solar: {
    text: "Solar Panels",
    name: DEFAULT_FACILITIES.solar,
  },
  wheelChair: {
    text: "Wheelchair Accessibility",
    name: DEFAULT_FACILITIES.balcony,
  },
};

interface SummaryStepProps {
  backToStep: (step: number) => void;
  onPrevStep: () => void;
  isSubmitting: boolean;
}

export default function SummaryStep({
  backToStep,
  onPrevStep,
  isSubmitting,
}: SummaryStepProps) {
  const { getValues } = useFormContext<Inputs>();
  const {
    name,
    description,
    unitType,
    developmentStage,
    images,
    floorPlan,
    tourVideo,
    availableUnits,
    square,
    bedrooms,
    bathrooms,
    cost,
    facilities,
    location,
    customFacilities,
  } = getValues();
  const selectedCheckboxOptions = Object.keys(facilities).filter(
    (key) => facilities[key as keyof typeof facilities] === true
  );
  return isSubmitting ? (
    <div>Submitting the form</div>
  ) : (
    <div className="flex gap-12">
      <div className="flex-1">
        <div className="flex gap-2 text-base text-lightdark mb-3.5">
          Basic Info
          <MarkIcon
            width={23}
            height={23}
            onClick={() => backToStep(1)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-7 bg-white py-5 px-10 mb-5 shadow-xl rounded-sm">
          <div className="flex">
            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Unit name</p>
              <p className="font-medium text-base text-black">{name}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Unit type</p>
              <p className="font-medium text-base text-black">{unitType}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">
                Development stage
              </p>
              <p className="font-medium text-base text-black">
                {
                  developmentStageTextMap[
                    developmentStage as keyof typeof developmentStageTextMap
                  ].text
                }
              </p>
            </div>
          </div>

          <div>
            <p className="text-lightdark text-sm font-light">Description</p>
            <p className="font-medium text-base text-black">{description}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">
                Featuring pictures
              </p>
              <div className="flex gap-2 flex-wrap">
                {images.map(({ fileId, preview, type }) => (
                  <UploadThumbnail
                    key={fileId}
                    src={preview}
                    type={type as AttachmentType}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div>
                <p className="text-lightdark text-sm font-light">Floor Plan</p>
                <div className="flex gap-2 flex-wrap">
                  {floorPlan.map(({ fileId, preview, type }) => (
                    <UploadThumbnail
                      key={fileId}
                      src={preview}
                      type={type as AttachmentType}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-lightdark text-sm font-light">Tour Video</p>
            <div className="flex gap-2 flex-wrap">
              {tourVideo.map(({ fileId, preview, type }) => (
                <UploadThumbnail
                  key={fileId}
                  src={preview}
                  type={type as AttachmentType}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-lightdark text-sm font-light">Number of Units</p>
            <p className="font-medium text-base text-black">{availableUnits}</p>
          </div>
        </div>

        <div className="flex gap-2 text-base text-lightdark mb-3.5">
          Unit Info
          <MarkIcon
            width={23}
            height={23}
            onClick={() => backToStep(2)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-7 bg-white py-5 px-10 mb-11 shadow-xl">
          <div className="flex">
            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Size</p>
              <p className="font-medium text-base text-black">{square} Sqm</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">
                No. of bedrooms
              </p>
              <p className="font-medium text-base text-black">{bedrooms}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">
                No. of bathrooms
              </p>
              <p className="font-medium text-base text-black">{bathrooms}</p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Unit Price</p>
              <p className="font-medium text-base text-black">RWF {cost}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Unit Address</p>
              <p className="font-medium text-base text-black">
                Nyamata, Bugesera, East, Rwanda
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-base text-lightdark mb-3.5">
          Additional Info/Amenities
          <MarkIcon
            width={23}
            height={23}
            onClick={() => backToStep(2)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-7 bg-white py-5 px-10 mb-11 shadow-xl">
          <p className="text-lightdark text-sm font-light">
            The following are the features/facilities that client will see:
          </p>
          <ul>
            {selectedCheckboxOptions.map((item, index) => (
              <li key={item} className="font-medium text-base text-black">
                {index + 1}.{" "}
                {facilitiesTextMap[item as keyof typeof facilitiesTextMap].text}
              </li>
            ))}
          </ul>
          <p className="text-lightdark text-sm font-light">Extra:</p>
          <ul>
            {customFacilities.map((item, index) => (
              <li key={item} className="font-medium text-base text-black">
                {index + 1}. {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mt-8 gap-[160px]">
          <Button variant="secondary" size="lg" onClick={onPrevStep}>
            Back
          </Button>
          <Button type="submit" variant="default" size="lg">
            Submit
          </Button>
        </div>
      </div>

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
  );
}
