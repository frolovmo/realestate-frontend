"use client";
import {
  BathIcon,
  CashIcon,
  FloorPlanIcon,
  SofaIcon,
} from "@/components/icons";
import InputName from "@/components/inputName/inputName";
import QuantityInput from "@/components/quantityInput/quantityInput";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { DEFAULT_FACILITIES } from "../../lib/constants";
import { NumericFormat } from "react-number-format";
import { useFormContext, Controller } from "react-hook-form";
import UnitPreview from "./unitPreview";
import UnitCard from "../unitCard/unitCard";
import CustomFacilities from "./customFacilites";

const checkboxesInputNames = [
  {
    text: "Smart Home Technology",
    lableId: DEFAULT_FACILITIES.smartHome,
  },
  {
    text: "Wheelchair Accessibility",
    lableId: DEFAULT_FACILITIES.wheelChair,
  },
  {
    text: "Elevator Access",
    lableId: DEFAULT_FACILITIES.elevator,
  },
  {
    text: "Garden/Yard",
    lableId: DEFAULT_FACILITIES.garden,
  },
  {
    text: "Solar Panels",
    lableId: DEFAULT_FACILITIES.solar,
  },
  {
    text: "Balcony/Terrace",
    lableId: DEFAULT_FACILITIES.balcony,
  },
] as const;

interface SpecificationsStepProps {
  onNextStep: () => void;
  onPrevStep?: () => void;
}

export default function SpecificationsStep({
  onPrevStep,
  onNextStep,
}: SpecificationsStepProps) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const { name, images, cost, square, bedrooms, bathrooms, location } = watch();

  return (
    <div className="flex gap-8">
      <div className="w-2/3 pt-9 pl-7 pb-12 pr-24 bg-white rounded-md font-poppins text-black">
        <p className="font-semibold	text-xl mb-5">
          How would you describe a single unit?
        </p>

        <div className="flex flex-col gap-11">
          <div className="flex gap-4">
            <div className="flex pr-6">
              <div className="flex items-center justify-center w-[30px] h-[30px] mr-3 mt-9">
                <FloorPlanIcon width={28} height={28} className="text-white" />
              </div>
              <div>
                <InputName isRequired>
                  How large is this{" "}
                  <span className="font-semibold text-black">Unit (sqm)</span>
                </InputName>
                <Controller
                  name="square"
                  control={control}
                  render={({ field }) => (
                    <QuantityInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.square?.message && (
                  <div className="text-red-600 text-xs">{`${errors.square.message}`}</div>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center justify-center w-[30px] h-[30px] mr-3 mt-9">
                <SofaIcon width={28} height={28} />
              </div>
              <div>
                <InputName isRequired>
                  How many{" "}
                  <span className="font-semibold text-black">Bedrooms</span>
                </InputName>
                <Controller
                  name="bedrooms"
                  control={control}
                  render={({ field }) => (
                    <QuantityInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.bedrooms?.message && (
                  <div className="text-red-600 text-xs">{`${errors.bedrooms.message}`}</div>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center justify-center w-[30px] h-[30px] mr-3 mt-9">
                <BathIcon width={28} height={28} />
              </div>
              <div>
                <InputName isRequired>
                  How many{" "}
                  <span className="font-semibold text-black">Bathrooms</span>
                </InputName>
                <Controller
                  name="bathrooms"
                  control={control}
                  render={({ field }) => (
                    <QuantityInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.bathrooms?.message && (
                  <div className="text-red-600 text-xs">{`${errors.bathrooms.message}`}</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center w-[40px] h-[40px] mr-3 mt-6">
              <CashIcon width={40} height={40} />
            </div>
            <div className="w-[50%]">
              <InputName isRequired>
                How much each does it cost? (RWF)
              </InputName>
              <Controller
                name="cost"
                control={control}
                render={({ field }) => (
                  <NumericFormat
                    customInput={Input}
                    value={field.value}
                    thousandSeparator={true}
                    onValueChange={(e) => field.onChange(e.floatValue)}
                  />
                )}
              />
              {errors.cost?.message && (
                <div className="text-red-600 text-xs">{`${errors.cost.message}`}</div>
              )}
            </div>
          </div>

          <div className="font-poppins">
            <p className="text-base font-semibold mb-2">
              Additional Information
            </p>

            <div className="flex flex-wrap w-[50%]">
              {checkboxesInputNames.map((item) => (
                <Controller
                  key={item.text}
                  name={`facilities.${item.lableId}`}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2 w-[50%] mb-3">
                      <Checkbox
                        id={item.lableId}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor={item.lableId}
                        className="text-base peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.text}
                      </label>
                    </div>
                  )}
                />
              ))}
            </div>

            <CustomFacilities />
          </div>
        </div>

        <div className="mt-16 border border-lightgray"></div>

        <div className="flex items-center justify-between mt-8">
          <Button variant="secondary" size="lg" onClick={onPrevStep}>
            Back
          </Button>
          <Button variant="default" size="lg" onClick={onNextStep}>
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
