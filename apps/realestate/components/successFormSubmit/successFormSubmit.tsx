import { SuccessIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface SuccessFormSubmitProps {
  onNext: () => void;
  typeOfSubmition: "property" | "unit" | "application";
}

export default function SuccessFormSubmit({
  onNext,
  typeOfSubmition,
}: SuccessFormSubmitProps) {
  const isPropertySubmitted = typeOfSubmition === "property";
  return (
    <div>
      <div className="flex flex-col gap-6 justify-center items-center pt-12 pb-6 bg-success text-white">
        <SuccessIcon />
        <p className="text-2xl font-semibold">
          {`${
            isPropertySubmitted ? "Property" : "Unit"
          } Submitted Successfully`}
        </p>
      </div>

      <div className="flex flex-col justify-center gap-11 py-11 px-14 bg-white">
        <p className="self-center text-center font-light text-black text-base w-[810px]">
          Thank you for submitting your{" "}
          {isPropertySubmitted ? "property" : "unit"}! Your listing is now under
          review by our team. We will notify you once it has been approved and
          is live on the platform.
        </p>

        <div>
          <p className="font-semibold text-black text-lg">What&apos;s next</p>
          <ul className="list-disc">
            <li>
              You can track the status of your submission from your dashboard.
            </li>
            <li>
              Feel free to add more{" "}
              {isPropertySubmitted ? "properties" : "units"} or explore other
              features in the meantime.
            </li>
          </ul>
        </div>

        <p>Need help? Our support team is just a click away.</p>

        <div className="flex justify-around">
          <Button variant="secondary" size="lg">
            Return to Dashboard
          </Button>

          <Button variant="default" size="lg" onClick={onNext}>
            Add Another {isPropertySubmitted ? "Property" : "Unit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
