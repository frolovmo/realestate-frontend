"use client";

import { PointerIcon } from "@/components/icons";
import PriceFormat from "@/components/priceFormat/priceFormat";
import { UnitData } from "../../lib/types/index";
import Image from "next/image";
import { basePath, unitStatus } from "../../lib/constants";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import NoCacheLink from "../NoCacheLink";
import { Badge } from "../ui/badge";
import { UnitStatus, UnitStatusBadgetOptions } from "@/lib/constants/units";

interface AvailableUnitsProps {
  units: UnitData[];
  propertyId: string;
}

export default function AvailableUnits({
  units,
  propertyId,
}: AvailableUnitsProps) {
  const swiperRef = useRef<SwiperRef | null>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const getUnitHref = (unit: UnitData) => {
    if (unit.status === unitStatus.DRAFT) {
      return `${basePath}/properties/${propertyId}/create-unit?unitid=${unit.identifier}`;
    }

    return `${basePath}/unit/${unit.identifier}?from=propertypage`;
  };

  return (
    <div className="flex-1 p-4 pb-10 border border-grayborder rounded-extra">
      <div className="flex justify-between items-center py-1 mb-3">
        <p className="font-medium text-black text-2xl">Available Units</p>
        <button onClick={handleNext}>
          <PointerIcon />
        </button>
      </div>

      {units?.length ? (
        <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          slidesPerView={"auto"}
          spaceBetween={20}
          loop={true}
          className="rounded-extra"
        >
          {units.map((unit) => {
            const statusOptions =
              UnitStatusBadgetOptions[unit.status as UnitStatus] || {};

            return (
              <SwiperSlide
                key={unit.identifier}
                className="max-w-[150px] max-h-[150px]"
              >
                <NoCacheLink
                  href={getUnitHref(unit)}
                  className="flex border-r border-grayborder"
                >
                  <div className="flex flex-col justify-start mr-5 font-poppins text-black">
                    <Image
                      src={unit.images[0]?.url}
                      alt={unit._id}
                      width={100}
                      height={100}
                      className="w-[100px] min-h-[100px] rounded-extra"
                    />
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-medium text-xs mt-1 text-left break-all">
                        {unit.name}
                      </p>

                      <Badge
                        variant={(statusOptions.variant as any) || "default"}
                        className="text-[10px] py-0 px-1 w-fit mt-1"
                      >
                        {statusOptions.label}
                      </Badge>
                    </div>
                    <PriceFormat currency={"RWF"} cost={unit.cost} />
                    <p className="text-[7px] leading-[14px] text-left">
                      {unit.square} Sqm
                    </p>
                  </div>
                </NoCacheLink>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="flex justify-center font-poppins text-base font-normal p-2">
          No units yet
        </div>
      )}
    </div>
  );
}
