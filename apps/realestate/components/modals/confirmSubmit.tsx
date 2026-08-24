"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import { basePath } from "../../lib/constants";
import { CheckedState } from "@radix-ui/react-checkbox";

interface ConfirmSubmitProps {
  onConfirm: () => void;
  onAbort: () => void;
}

export default function ConfirmSubmit({
  onConfirm,
  onAbort,
}: ConfirmSubmitProps) {
  const [agreementChecked, setAgreementChecked] = useState(false);

  const isSubmitDisabled = !agreementChecked;

  const onChangeAgreement = (value: CheckedState) => {
    setAgreementChecked(!!value);
  };

  return (
    <div className="shadow-xl rounded-md">
      <div className="px-6 py-4 bg-primary font-poppins text-white font-semibold text-xl rounded-t-md">
        Confirm Submission
      </div>

      <div className="py-9 px-6 font-poppins text-sm text-black">
        <div className="mb-3.5">
          <p>Are you sure you want to submit this item for review?</p>
          <p>
            Once submitted, you won’t be able to make further changes until the
            review is complete.
          </p>
        </div>
        <div className="mb-10">
          <p className="text-base font-bold">Note:</p>
          <p>
            By submitting, you agree to our{" "}
            <Link
              href={`${basePath}/terms`}
              target="_blank"
              className="text-googlelink"
            >
              Terms & Conditions
            </Link>{" "}
            and acknowledge that your listing will be reviewed within 2 business
            days.
          </p>

          <div className="flex items-center gap-2 mt-8">
            <Checkbox
              id="terms_and_conditions"
              checked={agreementChecked}
              onCheckedChange={onChangeAgreement}
            />

            <label htmlFor="terms_and_conditions" className="text-sm">
              <span>I accept the </span>
              <Link
                href={`${basePath}/terms`}
                target="_blank"
                className="text-googlelink"
              >
                Terms & Conditions
              </Link>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-[87px]">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="text-xs"
            onClick={onAbort}
          >
            No, Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            size="lg"
            className="text-xs"
            disabled={isSubmitDisabled}
            onClick={onConfirm}
          >
            Yes, Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
