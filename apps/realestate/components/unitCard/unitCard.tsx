"use client";
import Image from "next/image";
import {
  BathIcon,
  FloorPlanIcon,
  Locator2Icon,
  SofaIcon,
} from "@/components/icons";
import { formatPrice } from "../../lib/utils";
import Rating from "../rating/rating";

interface UnitCardProps {
  imageUrl: string;
  name: string;
  cost: number;
  square?: number;
  bedrooms?: number;
  bathrooms?: number;
  location?: string;
}

export default function UnitCard({
  imageUrl,
  name,
  cost,
  square,
  bedrooms,
  bathrooms,
  location,
}: UnitCardProps) {
  return (
    <div className="shadow-xl rounded-b-lg w-[346px]">
      <div className="relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="preview"
            width={346}
            height={285}
            className="w-[346px] h-[285px] object-cover object-center rounded-t-lg"
          />
        ) : (
          <div className="flex justify-center items-center w-[346px] h-[285px] bg-primary rounded-t-lg text-white">
            No images added yet
          </div>
        )}
        <div className="absolute bottom-1 left-1 right-1 w-[98%] p-2 backdrop-blur rounded-md border border-white flex gap-1 justify-between items-center text-white">
          <div>
            <p className="text-base  font-extrabold">{name}</p>
            <div className="flex items-center gap-1.5">
              <Locator2Icon width={10} height={13} />
              <p className="text-xs font-light">{location}</p>
            </div>
          </div>

          <div>
            <p className="text-white font-semibold text-xs">{`RWF ${formatPrice(
              cost
            )}`}</p>
            <Rating showCount />
          </div>
        </div>
      </div>
      <div className="flex justify-between px-2 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <FloorPlanIcon width={20} height={20} className="text-white" />
          <p className="text-xs font-light text-black">{`${
            square || "-"
          } sqm`}</p>
        </div>
        <div className="flex items-center gap-2">
          <SofaIcon width={27} height={16} className="text-black" />
          <p className="text-xs font-light text-black">{`${
            bedrooms || "-"
          } bedrooms`}</p>
        </div>
        <div className="flex items-center gap-2">
          <BathIcon width={20} height={20} className="text-black" />
          <p className="text-xs font-light text-black">{`${
            bathrooms || "-"
          } bathrooms`}</p>
        </div>
      </div>
    </div>
  );
}
