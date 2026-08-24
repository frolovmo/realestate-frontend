"use client";

import { CubeIcon, OccupiedIcon } from "@/components/icons";
import InputName from "@/components/inputName/inputName";
import QuantityInput from "@/components/quantityInput/quantityInput";
import { Button } from "../ui/button";
import { PropertyData } from "../../lib/types/index";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateProperty } from "./updateProperty";

interface AvailabilityUnitsModal {
  property: PropertyData;
  onUpdate: () => void;
}

export default function AvailabilityUnitsModal({
  property,
  onUpdate,
}: AvailabilityUnitsModal) {
  const [totalUnits, setTotalUnits] = useState(property.totalUnits);
  const [occupiedUnits, setOccupiedUnits] = useState(property.occupiedUnits);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = () => {
    setError("");

    startTransition(async () => {
      try {
        await updateProperty(property.identifier, totalUnits, occupiedUnits);
        onUpdate();
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    });
  };
  return (
    <div className="flex flex-col gap-[34px] p-4 items-center rounded-md bg-white font-poppins">
      <p className="text-lg	text-black font-semibold text-left self-start">
        Units Availability
      </p>

      <div className="border rounded-md border-grayborder py-6 px-9">
        <div className="flex flex-col gap-[30px]">
          <div className="flex">
            <div className="flex items-center justify-center w-[45px] h-[45px] mr-6 mt-6">
              <CubeIcon width={38} height={38} />
            </div>
            <div>
              <InputName isRequired>Total Units</InputName>
              <QuantityInput value={totalUnits} onChange={setTotalUnits} />
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center w-[45px] h-[45px] mr-6 mt-6">
              <OccupiedIcon width={38} height={38} />
            </div>
            <div>
              <InputName isRequired>Occupied Units</InputName>
              <QuantityInput
                value={occupiedUnits}
                onChange={setOccupiedUnits}
              />
            </div>
          </div>

          <div>{error && error}</div>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        variant="default"
        size="lg"
        disabled={isPending}
      >
        {isPending ? "Updating..." : "Update"}
      </Button>
    </div>
  );
}
