import { Locator2Icon, MarkIcon } from "@/components/icons";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { UploadFileMetadata } from "../uploadModal/uploadModal";
import UploadThumbnail from "@/components/uploadThumbnail/uploadThumbnail";
import { encodeUrlLocation } from "../../lib/utils";

interface SummaryStepProps {
  backToStep: (step: number) => void;
  onPrevStep: () => void;
  isSubmitting: boolean;
}

export default function SummaryStep({
  backToStep,
  onPrevStep,
  isSubmitting,
}: SummaryStepProps) {
  const { getValues } = useFormContext();
  const {
    name,
    phone,
    description,
    email,
    images,
    address,
    province,
    district,
    sector,
    cell,
    village,
  } = getValues();

  const encodedAddress = encodeUrlLocation({
    address,
    province,
    district,
    sector,
    cell,
    village,
  });
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  return isSubmitting ? (
    <div>Submitting the form</div>
  ) : (
    <div className="flex flex-col xl:flex-row gap-6 xl:gap-12">
      <div className="w-full xl:flex-1">
        <div className="flex gap-2 text-base text-lightdark mb-3.5">
          Basic Info
          <MarkIcon
            width={23}
            height={23}
            onClick={() => backToStep(1)}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-7 bg-white py-5 px-5 md:px-10 mb-5 shadow-xl rounded-sm">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Property name</p>
              <p className="font-medium text-base text-black">{name}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Phone address</p>
              <p className="font-medium text-base text-black">{phone}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Email address</p>
              <p className="font-medium text-base text-black">{email}</p>
            </div>
          </div>

          <div>
            <p className="text-lightdark text-sm font-light">Description</p>
            <p className="font-medium text-base text-black text-wrap">
              {description}
            </p>
          </div>

          <div>
            <p className="text-lightdark text-sm font-light">
              Featuring pictures
            </p>
            <div className="flex gap-2">
              {images.map(({ preview, fileId, type }: UploadFileMetadata) => (
                <UploadThumbnail key={fileId} src={preview} type={type} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 text-base text-lightdark mb-3.5">
          Address Info
          <MarkIcon
            width={23}
            height={23}
            onClick={onPrevStep}
            className="cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-7 bg-white py-5 px-5 md:px-10 mb-11 shadow-xl rounded-sm">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Province</p>
              <p className="font-medium text-base text-black">{province}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Sector</p>
              <p className="font-medium text-base text-black">{sector}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Village</p>
              <p className="font-medium text-base text-black">{village}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">District</p>
              <p className="font-medium text-base text-black">{district}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">Cell</p>
              <p className="font-medium text-base text-black">{cell}</p>
            </div>

            <div className="flex-1">
              <p className="text-lightdark text-sm font-light">
                Street Address
              </p>
              <p className="font-medium text-base text-black">{address}</p>
            </div>
          </div>

          <div>
            <p className="text-lightdark text-sm font-light">Google Map Link</p>
            <p className="font-medium text-base text-googlelink underline">
              <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Google Maps Link
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 gap-[160px]">
          <Button variant="secondary" size="lg" onClick={onPrevStep}>
            Back
          </Button>
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="w-full xl:w-[400px] h-fit bg-white mt-9 pt-5 pb-12 px-5 md:px-7 rounded-sm">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl	text-black font-semibold mb-7 text-center">
            This is how the client will see it
            <span className="text-lightdark"> (Preview)</span>
          </p>

          <div className="shadow-xl rounded-b-lg">
            <Image
              src={images[0]?.preview}
              alt="preview"
              width={346}
              height={285}
              className="w-full max-w-[346px] h-[285px] object-cover object-center rounded-t-lg"
            />
            <div className="flex flex-col gap-2 sm:flex-row justify-between px-3 pb-2 mt-2">
              <div>
                <p className="text-base text-black font-extrabold">{name}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Locator2Icon className="w-[14px] h-[14px] text-black" />

                  <p className="text-xs font-extralight text-black">
                    {cell}, {sector}, {district}, {province}
                  </p>
                </div>
              </div>

              <div className="text-black font-semibold text-[13px] pt-2">
                {address}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
