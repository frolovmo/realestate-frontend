import { SuccessIcon } from "@/components/icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { basePath } from "../../lib/constants";

interface SuccessFormUnitSubmit {
  addAnotherNewUnit: () => void;
}

export default function SuccessFormUnitSubmit({
  addAnotherNewUnit,
}: SuccessFormUnitSubmit) {
  return (
    <div className="max-w-[920px] mx-auto rounded-sm">
      <div className="flex flex-col gap-6 justify-center items-center pt-12 pb-6 bg-success text-white rounded-t-sm">
        <SuccessIcon />
        <p className="text-2xl font-semibold">Unit Submitted Successfully</p>
      </div>

      <div className="flex flex-col justify-center gap-11 py-11 px-14 bg-white rounded-b-sm">
        <p className="self-center text-center font-light text-black text-base w-[810px]">
          Thank you for submitting your unit! Your listing is now under review
          by our team. We will notify you once it has been approved and is live
          on the platform.
        </p>

        <div>
          <p className="font-semibold text-black text-lg">What&apos;s next</p>
          <ul className="list-disc text-black ml-9 mt-3">
            <li>
              You can track the status of your submission from your dashboard.
            </li>
            <li>
              Feel free to add more properties or explore other features in the
              meantime.
            </li>
          </ul>
        </div>

        <div className="text-black">
          <p>
            <b>Need help?</b> Our support team is just a click away.
          </p>
        </div>

        <div className="flex justify-around">
          <Link href={`${basePath}/dashboard`}>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-[200px]"
            >
              Return to Dashboard
            </Button>
          </Link>

          <Button
            type="button"
            variant="default"
            size="lg"
            className="w-[200px]"
            onClick={addAnotherNewUnit}
          >
            Add Another Unit
          </Button>
        </div>
      </div>
    </div>
  );
}
