import { PropertiesListResponseData } from "../lib/types/index";
import { PointerIcon, QuotesIcon } from "../components/icons";
import Advantage from "../components/landing/advantage";
import MainLayout from "../components/layouts/main";
import LandingSlider from "../components/sliders/landingSlider";
import ReviewSlider from "../components/sliders/reviewSlider";
import { Button } from "../components/ui/button";
import UnitCard from "../components/unitCard/unitCard";
import Image from "next/image";
import Link from "next/link";
import { fetchTopProperties } from "../actions/fetchTopProperties";
import FAQSection from "@/components/faq/faq";
import { basePath } from "../lib/constants";
import { getUserData, isApplicantRole } from "../actions/auth";
import LandingSearch from "@/components/landing/landingSearch";
import fetchApplication from "@/actions/fetchApplication";
import NoCacheLink from "@/components/NoCacheLink";

export default async function Home() {
  const user = await getUserData();
  const isApplicant = await isApplicantRole();
  const application = isApplicant ? await fetchApplication() : null;

  const properties: PropertiesListResponseData = await fetchTopProperties({
    excludedApplicationId: application?.applicationDataFromApiV1?.id,
  });
  const { data } = properties;
  const units = data?.flatMap((property) => property.units);

  return (
    <MainLayout>
      <div>
        <div
          id="home"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(22, 8, 59, 0.96) 0%, rgba(22, 8, 59, 0.78) 52%, rgba(22, 8, 59, 0.48) 100%), url(${basePath}/images/landingBackground.png)`,
          }}
          className="brand-grid bg-cover bg-center px-6 pb-8 pt-8 md:px-10"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="mt-10 mb-16 font-poppins text-[42px] font-extrabold leading-[1.04] text-white sm:mt-16 sm:text-[58px] lg:mt-[87px] lg:text-[76px]">
                <span className="brand-kicker mb-6 border-white/20 bg-white/10 text-primary">
                  Rwanda housing platform
                </span>
                <h1>Own an affordable</h1>
                <h1>
                  <span className="text-primary">dream home.</span>
                </h1>
              </div>

              <div>
                <LandingSearch />
                <div className="mt-5 mb-[60px] sm:mb-[67px] lg:mb-[67px]">
                  <Link
                    href={`${basePath}/explore`}
                    className="inline-flex items-center"
                  >
                    <span className="mr-1 text-base text-white/80 underline decoration-primary underline-offset-4 hover:text-primary">
                      Browse more properties
                    </span>
                    <PointerIcon
                      className="text-white fill-white"
                      width={25}
                      height={18}
                    />
                  </Link>
                </div>

                <Link
                  href={`${user ? `${basePath}/explore` : `${basePath}/login`}`}
                >
                  <Button
                    type="button"
                    variant="active"
                    className="h-[48px] w-[190px] sm:w-[210px] lg:w-[220px]"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-0 self-start">
              {!!units.length && <LandingSlider properties={properties} />}
            </div>
          </div>
        </div>

        <div id="explore" className="bg-background px-6 py-16 md:px-9">
          {units.length ? (
            <div>
              <h2 className="text-3xl font-bold leading-[45px] text-secondary">
                Start your journey
              </h2>
              <h2 className="text-3xl font-bold leading-[45px] text-secondary">
                Affordable homeownership here!
              </h2>
              <p className="text-lightdark text-lg mb-11 mt-3">
                Discover affordable housing options designed to fit your needs
                and budget. Start your path to homeownership with us today!
              </p>
              <div className="surface-panel flex flex-wrap justify-center gap-14 px-6 py-16 md:px-14 md:py-[88px]">
                {units.map((unit) => (
                  <NoCacheLink
                    key={unit.identifier}
                    href={`${basePath}/unit/${unit.identifier}`}
                  >
                    <UnitCard
                      key={unit._id}
                      imageUrl={unit?.images[0]?.url}
                      name={unit.name}
                      cost={unit.cost}
                      bedrooms={unit.bedrooms}
                      bathrooms={unit.bathrooms}
                      square={unit.square}
                    />
                  </NoCacheLink>
                ))}
              </div>
            </div>
          ) : null}

          <div
            id="about"
            className="flex flex-col md:flex-row items-center justify-around gap-y-16 w-[90%] mx-auto py-16"
          >
            {/* Image Wrapper with Background */}
            <div className="relative w-full md:w-[36%]">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-2xl bg-primary" />
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/about-house.jpeg"
                  alt="House"
                  width={800}
                  height={800}
                  className="rounded-2xl object-cover md:h-[55vh]"
                />
              </div>
            </div>

            {/* About Us Text section */}
            <div className="w-full md:w-1/2">
              <span className="brand-kicker mb-4">About the platform</span>
              <h2 className="mb-4 text-3xl font-bold text-secondary">
                About Us
              </h2>
              <p className="leading-relaxed text-lightdark">
                The Real Estate platform, powered by IZE Tech, is dedicated to
                making homeownership accessible and affordable for everyone in
                Rwanda. Our platform connects
                aspiring homeowners with verified, high-quality properties and
                flexible financing options, ensuring a seamless and stress-free
                journey to owning your dream home. With a focus on transparency,
                affordability, and convenience, we aim to turn your
                homeownership aspirations into reality. We believe that
                everyone deserves a safe, comfortable, and affordable home. The
                platform is designed to simplify the home-buying process by
                offering a wide selection of quality homes, flexible financing
                solutions, and expert guidance. Whether you&rsquo;re a
                first-time buyer or looking for a new place to call home, we
                make the journey seamless and stress-free. With a commitment to
                transparency and affordability, we are transforming
                homeownership in Rwanda, one family at a time.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-bold leading-[45px] text-secondary">
              See what our happy homeowners are saying!
            </h2>
            <p className="text-lightdark text-lg mb-11 mt-3">
              Read real stories from our satisfied clients who have made their
              dream of owning an affordable home a reality with us.
            </p>

            <div className="surface-panel relative flex justify-center px-8 py-14 md:px-14">
              <div className="absolute flex justify-center items-center w-[65] h-[65] top-5 left-5 z-10">
                <QuotesIcon className="text-primary" />
              </div>
              <ReviewSlider />
            </div>
          </div>
        </div>

        <div className="brand-glow brand-grid flex flex-col items-center p-10 text-white md:p-20">
          <h3 className="text-3xl  leading-[45px] font-bold mb-5 text-center">
            Why Choose Us for Your Affordable Home
          </h3>
          <p className="text-lg lg:text-xl text-center">
            Affordable homes made easy with flexible financing and expert
            support. Choose us to make your homeownership dream come true.
          </p>

          <div className="flex flex-col md:flex-row justify-center mt-[40px] md:mt-[60px] lg:mt-[88px] gap-8 md:gap-0">
            {/* Column 1 */}
            <div className="flex flex-col space-y-6 border-b md:border-b-0 md:border-r border-white pb-6 md:pb-0 ">
              <Advantage
                title="Flexible Financing Options"
                description="Customized payment plans that make homeownership accessible for every budget."
              />
              <Advantage
                title="Affordable Solutions"
                description="Competitive pricing and financial assistance to help you find a home within your means."
              />
            </div>

            {/* Column 2 */}
            <div className="flex flex-col space-y-6 border-b md:border-b-0 md:border-r border-white pb-6 md:pb-0 ">
              <Advantage
                title="Simplified Application Process"
                description="Streamlined procedures to get you into your new home quickly and efficiently."
              />
              <Advantage
                title="Prime Locations"
                description="Conveniently located properties that offer easy access to essential services and amenities."
              />
            </div>

            {/* Column 3 */}
            <div className="flex flex-col space-y-6 ">
              <Advantage
                title="Expert Guidance"
                description="Dedicated support to navigate every step of your home-buying journey with confidence."
              />
              <Advantage
                title="Community Focused"
                description="Homes in vibrant, growing communities designed to enhance your lifestyle and connect with neighbors."
              />
            </div>
          </div>
        </div>

        <div className="px-10 pb-10 pt-14">
          <h2 className="text-3xl font-bold leading-[45px] text-secondary">
            Our Partners
          </h2>

          <div className="flex md:flex-row items-center md:justify-center flex-col md:gap-10 gap-4">
            <Image
              src="/images/Partner1.png"
              width={406}
              height={52}
              alt="partner"
            />
            <Image
              src="/images/Partner2.png"
              width={188}
              height={70}
              alt="partner"
            />
            <Image
              src="/images/Partner3.png"
              width={202}
              height={60}
              alt="partner"
            />
          </div>
        </div>
        <FAQSection />
      </div>
    </MainLayout>
  );
}
