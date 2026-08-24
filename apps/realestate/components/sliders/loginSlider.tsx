"use client";

import {
  BadgeCheck,
  Handshake,
  House,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

import LoginSlideBackground from "./loginSlideBackground";
import IzeTechLogo from "../brand/IzeTechLogo";

const slides = [
  {
    icon: BadgeCheck,
    title: "Personalized home recommendations",
    description:
      "Discover verified homes that match your budget, needs, and preferences.",
  },
  {
    icon: Handshake,
    title: "Flexible financing options",
    description:
      "Explore payment plans designed to make homeownership more accessible.",
  },
  {
    icon: ShieldCheck,
    title: "Secure expert guidance",
    description:
      "Move through each step with trusted information and protected account access.",
  },
  {
    icon: House,
    title: "A simpler application process",
    description:
      "Submit and track your housing application from one convenient platform.",
  },
  {
    icon: MapPin,
    title: "Homes in connected locations",
    description:
      "Find communities close to the services and amenities that matter to you.",
  },
  {
    icon: Users,
    title: "Community-focused living",
    description:
      "Choose homes designed to support stronger, more connected neighborhoods.",
  },
];

export default function LoginSlider() {
  return (
    <Swiper
      slidesPerView={1}
      loop
      pagination={{ clickable: true }}
      navigation
      modules={[Pagination, Navigation]}
      className="auth-swiper"
    >
      {slides.map(({ icon: Icon, title, description }) => (
        <SwiperSlide key={title}>
          <LoginSlideBackground>
            <div className="flex h-full flex-col p-12 text-white">
              <IzeTechLogo inverse className="text-[46px]" />
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <span className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/30 bg-primary/10 text-primary shadow-[0_20px_50px_-22px_rgba(40,203,234,0.8)]">
                  <Icon size={38} strokeWidth={1.6} />
                </span>
                <h2 className="mb-4 max-w-md text-3xl font-semibold leading-tight">
                  {title}
                </h2>
                <p className="max-w-md text-sm leading-7 text-white/65">
                  {description}
                </p>
              </div>
              <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/80">
                Building secure digital systems
              </p>
            </div>
          </LoginSlideBackground>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
