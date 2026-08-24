import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import React, { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import { FileMetadata } from "../../lib/types/index";
import { cn } from "../../lib/utils";

interface UnitDetailsSliderProps {
  images: FileMetadata[];
}

const UnitDetailsSlider: React.FC<UnitDetailsSliderProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsPerView = 5;

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    thumbsSwiper?.slideTo(Math.max(0, index - Math.floor(thumbsPerView / 2))); // Center selected thumbnail
  };
  return (
    <div className="relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        loop
        modules={[Thumbs]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={`Slide ${index}`}
                width={1120}
                height={796}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 w-full bg-black/30 p-9 z-50">
        <div>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={20}
            slidesPerView={thumbsPerView}
            modules={[Thumbs]}
            // className="w-[120px] h-[120px]"
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="rounded-md"
                onClick={() => handleThumbnailClick(index)}
              >
                <div
                  className={cn(
                    "cursor-pointer bg-inherit rounded-md",
                    activeIndex === index ? "border-4 border-primary " : ""
                  )}
                >
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index}`}
                    width={120}
                    height={120}
                    className={cn(
                      "object-cover ",
                      activeIndex === index
                        ? "h-[170px] w-[127px]"
                        : "h-[120px] w-[120px]"
                    )}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailsSlider;
