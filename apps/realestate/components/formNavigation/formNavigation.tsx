import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { CheckMarkIcon } from "@/components/icons";
import { useParams } from "next/navigation";
import { basePath } from "../../lib/constants";

interface FormStep {
  id: number;
  name: string;
}

interface FormNavigationProps {
  formSteps: FormStep[];
  stepStatus: (null | "completed")[];
  currentStep: number;
  onSaveAndContinue: () => void;
  createAnotherNewEntity: () => void;
  entityType: "unit" | "property";
  saveLoading?: boolean;
}

export default function FormNavigation({
  formSteps,
  stepStatus,
  currentStep,
  onSaveAndContinue,
  createAnotherNewEntity,
  entityType = "property",
  saveLoading,
}: FormNavigationProps) {
  const params = useParams();
  const id = params.id;
  const isProperty = entityType === "property";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 md:py-6 border gap-4">
      {currentStep === 4 ? (
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={createAnotherNewEntity}
        >
          {isProperty ? "New Property" : "New Unit"}
        </Button>
      ) : (
        <Link
          href={
            isProperty
              ? `${basePath}/properties`
              : `${basePath}/properties/${id}`
          }
        >
          <Button type="button" variant="secondary" size="lg">
            Cancel
          </Button>
        </Link>
      )}

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 px-4 py-2 border border-grayborder rounded-full min-h-[48px]">
        {formSteps.map((step, index) => (
          <div key={step.name} className="flex items-center relative">
            <span
              className={cn(
                "flex items-center justify-center rounded-full w-7 h-7 text-xs font-semibold text-white",
                currentStep === step.id || stepStatus[index] === "completed"
                  ? "bg-primary"
                  : "bg-gray"
              )}
            >
              {stepStatus[index] === "completed" ? <CheckMarkIcon className="w-4 h-4" /> : step.id}
            </span>
            <div className="ml-2 text-sm text-black hidden md:block">{step.name}</div>

            {index < formSteps.length - 1 && (
              <div className="mx-2 h-10 w-10 border-t border-r border-grayborder rotate-45" />
            )}
          </div>
        ))}
      </div>

      {currentStep !== 4 ? (
        <Button
          type="button"
          variant="default"
          size="lg"
          loading={saveLoading}
          onClick={onSaveAndContinue}
          className="min-w-[200px]"
        >
          {currentStep === 3 ? "Submit" : "Save & Continue"}
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
