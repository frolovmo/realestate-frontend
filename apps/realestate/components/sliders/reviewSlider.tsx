"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import ReviewSlide from "./reviewSlide";

export default function ReviewSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="review-swiper"
      >
        <SwiperSlide>
          <ReviewSlide />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewSlide />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewSlide />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
