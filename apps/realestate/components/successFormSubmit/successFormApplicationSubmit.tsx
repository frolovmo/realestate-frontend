"use client";
import { SuccessIcon } from "@/components/icons";
import { Button } from "../ui/button";

interface SuccessFormApplicationSubmitProps {
  propertyName?: string;
  onNext: () => void;
}

export default function SuccessFormApplicationSubmit({
  propertyName,
  onNext,
}: SuccessFormApplicationSubmitProps) {
  const renderTitle = () => {
    if (propertyName) {
      return (
        <>
          Thank you for applying to <b>{propertyName}</b>
        </>
      );
    }

    return "Thank you for applying";
  };

  return (
    <div className="max-w-[920px] mx-auto rounded-sm">
      <div className="flex flex-col gap-6 justify-center items-center pt-12 pb-6 bg-success text-white rounded-t-sm">
        <SuccessIcon />
        <p className="text-2xl font-semibold">
          Application Submitted Successfully
        </p>
      </div>

      <div className="flex flex-col justify-center gap-11 py-11 px-14 bg-white rounded-b-sm">
        <p className="self-center text-center font-light text-black text-base w-[810px]">
          {renderTitle()}
        </p>

        <div>
          <p className="font-semibold text-black text-lg">What&apos;s next</p>
          <ul className="list-disc text-black ml-9 mt-3">
            <li>
              You can track the status of your submission from your dashboard.
            </li>
            <li>
              You’ll receive an email confirmation shortly with all the
              application details.
            </li>
          </ul>
        </div>

        <div className="text-black">
          <p>
            <b>Need help?</b> Our support team is just a click away.
          </p>
        </div>

        <div className="flex justify-around">
          <Button type="button" size="lg" onClick={onNext}>
            Go To Application
          </Button>
        </div>
      </div>
    </div>
  );
}
