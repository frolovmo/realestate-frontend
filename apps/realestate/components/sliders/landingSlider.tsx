"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper/modules";
import Image from "next/image";
import { PropertiesListResponseData, UnitData } from "../../lib/types/index";
import { cn, formatPrice } from "../../lib/utils";
import { Locator2Icon } from "../icons";
import { Swiper as SwiperType } from "swiper/types";
import Rating from "../rating/rating";
import SliderTabs from "./sliderTabs";

interface LandingSliderProps {
  properties: PropertiesListResponseData;
}

export default function LandingSlider({ properties }: LandingSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const thumbsPerView = 5;

  const data = properties.data.filter(
    (property) => property.status === "active"
  );

  const handleThumbnailClick = (index: number) => {
    setActiveThumbIndex(index);
    setActiveTabIndex(0);
    thumbsSwiper?.slideTo(Math.max(0, index - Math.floor(thumbsPerView / 2))); // Center selected thumbnail
  };

  const findUnitWithLowPrice = (units: UnitData[]) => {
    return units.reduce((lowest, unit) => {
      return unit.cost < lowest.cost ? unit : lowest;
    }, units[0]); // Initialize with the first unit
  };

  return (
    <div className="rounded-[50px]">
      <Swiper
        // spaceBetween={10}
        loop={true}
        effect={"fade"}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[EffectFade, FreeMode, Navigation, Thumbs]}
        className="rounded-[50px] bg-transparent"
      >
        {data.map((property) => (
          <SwiperSlide key={property._id} className="bg-transparent">
            <div className="relative bg-transparent">
              <div className="w-[774px] h-[495px] bg-transparent">
                <Image
                  src={property.images[activeTabIndex].url}
                  alt="unit image"
                  fill
                  priority
                  className="rounded-[50px] "
                />
              </div>
              <div className="absolute top-8 left-0 w-full">
                <SliderTabs
                  property={property}
                  activeTabIndex={activeTabIndex}
                  onActiveTabClick={(index) => setActiveTabIndex(index)}
                />
              </div>
              <div className="absolute flex justify-between w-full bottom-0 right-0 bg-black bg-opacity-40 rounded-b-3xl text-white font-poppins">
                <div className="pl-7 py-1.5">
                  <p className="font-semibold	text-2xl leading-9">
                    {property.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <Locator2Icon
                      className="text-white"
                      width={14}
                      height={17}
                    />
                    <p className="text-white text-base">{`${property.province}, Rwanda`}</p>
                  </div>
                </div>

                <div className="pr-7 py-1.5">
                  <p>
                    <span className="text-xs font-semibold">
                      Starting from{" "}
                    </span>
                    <span className="text-base font-semibold">{`RWF ${formatPrice(
                      findUnitWithLowPrice(property.units)?.cost
                    )}`}</span>
                  </p>
                  <Rating showCount />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbs */}
      <div className="mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={30}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="!h-[170px] !w-full"
        >
          {data.map((property, index) => (
            <SwiperSlide
              key={property._id}
              className="rounded-md !bg-transparent !flex !justify-center !items-center"
              onClick={() => handleThumbnailClick(index)}
            >
              <div
                className={cn(
                  "relative cursor-pointer rounded-md w-[120px] h-[120px]",
                  activeThumbIndex === index
                    ? "border-[3px] border-primary scale-120 transition-transform duration-300 ease-in-out"
                    : ""
                )}
              >
                <Image
                  src={property.images[0].url}
                  alt="property image"
                  fill
                  objectFit="cover"
                  className="rounded-sm bg-white"
                />
                <div className="absolute bottom-0 left-0 w-full p-1 bg-white text-black text-[10px] font-extrabold rounded-b-sm">
                  {property.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
