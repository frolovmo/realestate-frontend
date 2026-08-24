import { basePath } from "../../lib/constants";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ConfirmSubmit() {
  return (
    <div className="shadow-xl">
      <div className="px-6 py-4 bg-primary font-poppins text-white font-semibold text-xl">
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
            <Link href={`${basePath}/terms`} className="text-googlelink">
              Terms & Conditions
            </Link>{" "}
            and acknowledge that your listing will be reviewed within 2 business
            days.
          </p>
        </div>

        <div className="flex justify-end gap-[87px]">
          <Button variant="secondary" size="lg" className="text-xs">
            No, Cancel
          </Button>
          <Button variant="default" size="lg" className="text-xs">
            Yes, Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
