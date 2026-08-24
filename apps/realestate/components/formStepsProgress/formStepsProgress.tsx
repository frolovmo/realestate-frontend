import { cn } from "@/lib/utils";
import { CheckMarkIcon } from "../icons";

interface FormStep {
  id: number;
  name: string;
  description: string;
}

interface FormStepsProgressProps {
  formSteps: FormStep[];
  stepStatus: (null | "completed")[];
  currentStep: number;
}

export default function FormStepsProgress({
  formSteps,
  stepStatus,
  currentStep,
}: FormStepsProgressProps) {
  return (
    <div className="flex flex-col gap-6 w-[247px] h-fit p-6 bg-white border border-primary rounded-md">
      {formSteps.map((step, index) => {
        const isActive = currentStep === index + 1;
        const isCompleted = stepStatus[index] === "completed";

        return (
          <div key={step.name} className="flex items-center gap-[10px]">
            <div
              className={cn(
                "flex items-center justify-center rounded-full w-6 h-6 text-white self-start",
                isActive || isCompleted ? "bg-primary" : "bg-gray"
              )}
            >
              {isCompleted ? <CheckMarkIcon /> : index + 1}
            </div>
            <div>
              <div className="text-base text-black">{step.name}</div>
              <div className="w-[164px] text-[10px] text-lightdark">
                {step.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
