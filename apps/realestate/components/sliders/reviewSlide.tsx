import Image from "next/image";

export default function ReviewSlide() {
  return (
    <div className="max-w-[800px] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] m-auto p-5 sm:p-7 shadow-lg rounded-2xl bg-primaryneutral text-black font-poppins">
      {/* Review Text */}
      <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-8 italic font-normal mb-4">
        Thanks to BRD Realestate, I now own an affordable house in Kiga, Rwanda!
        The entire process was simple, transparent, and stress-free. Their team
        supported me every step of the way, making my dream of homeownership a
        reality. I am so grateful for the opportunity to provide a safe and
        comfortable home for my family without breaking the bank. BRD Realestate
        truly makes homeownership possible for everyone!
      </p>

      {/* Reviewer Info */}
      <div className="flex flex-col justify-center sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        {/* Reviewer Image */}
        <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px]">
          <Image
            src="/images/reviewer.png"
            alt="picture of reviewer"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>

        {/* Reviewer Details */}
        <div className="text-center md:text-start">
          <p className="font-bold text-lg sm:text-xl leading-6 sm:leading-8">
            Linda Kamanzi
          </p>
          <p className="font-light italic text-sm sm:text-base leading-6 text-lightdark">
            Homeowner, Bwiza Riverside City
          </p>
        </div>
      </div>
    </div>
  );
}
