"use client";
import { Input } from "../ui/input";
import InputName from "@/components/inputName/inputName";
import Map from "@/components/map/map";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Controller, useFormContext } from "react-hook-form";
import locationMetadata from "@/lib/rwanda.json";
import { LocationData } from "../../lib/hooks/useLocation";

interface GeolocationStepProps {
  onNextStep: () => void;
  onPrevStep: () => void;
  locationData: LocationData;
}

export default function GeolocationStep({
  onNextStep,
  onPrevStep,
  locationData,
}: GeolocationStepProps) {
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

  const province = watch("province");
  const district = watch("district");
  const sector = watch("sector");
  const cell = watch("cell");
  const village = watch("village");
  const streetAddress = watch("address");

  const fullAddress = `${streetAddress || ""}, ${village || ""}, ${
    cell || ""
  }, ${sector || ""}, ${district || ""}, ${province || ""}`.trim();

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      <div className="bg-white w-full lg:w-1/2 px-4 md:px-8 py-6 rounded-md shadow-sm">
        <div className="text-base text-black font-poppins mb-2">
          Geographical Location
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <InputName htmlFor="streetAddress">Street Address</InputName>
            <Input
              type="text"
              id="streetAddress"
              placeholder="Enter the street address"
              {...register("address")}
            />
            {errors.address?.message && (
              <div className="text-red-600 text-xs">
                {`${errors.address.message}`}
              </div>
            )}
          </div>

          <div>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationMetadata.data.provinces.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
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

          <div>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d.name} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
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

          <div>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((s) => (
                      <SelectItem key={s.name} value={s.name}>
                        {s.name}
                      </SelectItem>
                    ))}
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

          <div>
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select Cell" />
                  </SelectTrigger>
                  <SelectContent>
                    {cells.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
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

          <div>
            <InputName>Village</InputName>
            <Controller
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Village" />
                  </SelectTrigger>
                  <SelectContent>
                    {villages.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
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

        <div className="mt-16 border border-lightgray"></div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <Button variant="secondary" size="lg" onClick={onPrevStep}>
            Back
          </Button>
          <Button variant="default" size="lg" onClick={onNextStep}>
            Continue
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto rounded-md overflow-hidden shadow-sm">
        <Map address={fullAddress} />
      </div>
    </div>
  );
}
