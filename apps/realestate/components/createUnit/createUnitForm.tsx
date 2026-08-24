/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import SuccessFormUnitSubmit from "@/components/successFormSubmit/successFormUnitSubmit";
import SummaryStep from "@/components/createUnit/summaryStep";
import SpecificationsStep from "@/components/createUnit/specificationsStep";
import FormNavigation from "@/components/formNavigation/formNavigation";
import AboutUnitStep from "./aboutUnitStep";
import { CreateUnitSchema } from "../../lib/schemas/createUnitSchema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEVELOPMENT_STAGES, UNIT_TYPES, basePath } from "../../lib/constants";
import { authenticatedApiRequest } from "@/actions/authenticatedApi";
import { FileMetadata, PropertyData, UnitData } from "../../lib/types/index";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ConfirmSubmit from "../modals/confirmSubmit";
import uploadToFileStorage from "@/actions/uploadFileToStorage";
import { AttachmentType } from "@/lib/constants/attachments";
import { useRouter, useSearchParams } from "next/navigation";

export const formSteps = [
  {
    id: 1,
    name: "About unit",
    fields: [
      "name",
      "description",
      "images",
      "floorPlan",
      "tourVideo",
      "availableUnits",
      "unitType",
      "developmentStage",
    ],
  },
  {
    id: 2,
    name: "Specification",
    fields: ["square", "bedrooms", "bathrooms", "cost"],
  },
  { id: 3, name: "Summary" },
];
const defaultFormStateStatus = Array(formSteps.length).fill(null);

export type Inputs = z.infer<typeof CreateUnitSchema>;
export type FieldName = keyof Inputs;

enum CreateUnitStep {
  STEP_1 = "step-1",
  STEP_2 = "step-2",
  SUBMIT_DRAFT = "submit-draft",
  SUBMIT_NEW = "submit-new",
}

enum FormStep {
  FIRST = 1,
  SECOND = 2,
  SUBMIT = 3,
}

type CreateUnitMetadata = {
  name: string;
  description: string;
  images: FileMetadata[];
  floorPlan: FileMetadata[];
  tourVideo: FileMetadata[];
  availableUnits: number;
  unitType: string;
  developmentStage: string;
  square: number;
  bedrooms: number;
  bathrooms: number;
  cost: number;
  facilities: string[];
};

interface CreateUnitDraftMetadata extends CreateUnitMetadata {
  unitId?: string;
  step?: CreateUnitStep;
}

type EditUnitMetadata = Partial<CreateUnitMetadata>;

interface IFilesMetadata {
  images: FileMetadata[];
  tourVideo: FileMetadata[];
  floorPlan: FileMetadata[];
}

const prepareMetadata = async (
  data: Inputs,
  files: IFilesMetadata
): Promise<CreateUnitMetadata> => {
  const facilities = Object.entries(data.facilities)
    .filter(([, value]) => value)
    .map(([key]) => key);

  return {
    name: data.name,
    description: data.description,
    availableUnits: data.availableUnits,
    unitType: data.unitType,
    developmentStage: data.developmentStage,
    square: data.square,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    cost: data.cost,
    facilities: [...facilities, ...data.customFacilities],
    ...files,
  };
};

async function submitMetadata(data: CreateUnitMetadata, propertyId: string) {
  const response = await authenticatedApiRequest(
    `/properties/${propertyId}/create-unit`,
    {
      method: "POST",
      body: data,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to submit metadata");
  }
}

async function saveDraftUnit(data: CreateUnitMetadata, propertyId: string) {
  const response = await authenticatedApiRequest<any>(
    `/properties/${propertyId}/create-unit/draft`,
    {
      method: "POST",
      body: data,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to save draft unit");
  }

  return response.data;
}

async function editUnit(data: EditUnitMetadata, unitId: string) {
  const response = await authenticatedApiRequest<any>(`/units/${unitId}`, {
    method: "PUT",
    body: data,
  });
  if (!response.ok) {
    throw new Error("Failed to save draft unit");
  }

  return (response.data as any).data;
}

interface CreateUnitFormProps {
  propertyId: string;
  property: PropertyData;
  unit?: UnitData;
  isEditMode?: boolean;
}

export default function CreateUnitForm({
  propertyId,
  property,
  unit,
  isEditMode,
}: CreateUnitFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatus, setStepStatus] = useState<(null | "completed")[]>(
    defaultFormStateStatus
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isUploading, setIsUploading] = useState(false);
  const [newUnit, setNewUnit] = useState<UnitData | null>(null);
  const { province, district, sector, cell, village } = property;
  const location = `${village}, ${cell}, ${sector}, ${district}, ${province}`;

  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialFiles = (
    files: FileMetadata[] = [],
    type: AttachmentType = AttachmentType.IMAGE
  ) => {
    const newfiles = files.map((file) => {
      const fileId = crypto.randomUUID();
      const notImage = type !== AttachmentType.IMAGE;

      const preview = notImage
        ? `${basePath}/bucket/pdf/${encodeURIComponent(file.originalName)}`
        : file.url;

      return {
        ...file,
        fileId,
        preview,
        altText: file.altText,
        isInit: true,
        type,
      };
    });

    return newfiles;
  };

  const getInitialFilesMetadata = (
    files: FileMetadata[] = []
  ): FileMetadata[] => {
    return files.map((file) => {
      return {
        url: file?.url,
        type: file?.type,
        size: file?.size,
        originalName: file?.originalName,
        altText: file?.altText,
      };
    });
  };

  const uploadFiles = async (data: Inputs) => {
    const initImages = (data.images || []).filter((file) => !!file.isInit);
    const initFloorPlan = (data.floorPlan || []).filter(
      (file) => !!file.isInit
    );
    const initTourVideo = (data.tourVideo || []).filter(
      (file) => !!file.isInit
    );

    const newImages = (data.images || []).filter((file) => !file.isInit);
    const newFloorPlan = (data.floorPlan || []).filter((file) => !file.isInit);
    const newTourVideo = (data.tourVideo || []).filter((file) => !file.isInit);

    const [newImagesMetadata, newFloorPlanMetadata, newTourVideoMetadata] =
      await Promise.all([
        uploadToFileStorage(newImages as any[]),
        uploadToFileStorage(newFloorPlan as any[]),
        uploadToFileStorage(newTourVideo as any[]),
      ]);

    const initImagesMetadata = getInitialFilesMetadata(initImages as any[]);
    const initFloorPlanMetadata = getInitialFilesMetadata(
      initFloorPlan as any[]
    );
    const initTourVideoMetadata = getInitialFilesMetadata(
      initTourVideo as any[]
    );

    return {
      images: [...initImagesMetadata, ...newImagesMetadata],
      tourVideo: [...initTourVideoMetadata, ...newTourVideoMetadata],
      floorPlan: [...initFloorPlanMetadata, ...newFloorPlanMetadata],
    };
  };

  const DEFAULT_FACILITIES = [
    "balcony",
    "elevator",
    "garden",
    "smartHome",
    "solar",
    "wheelChair",
  ];

  const allFacilities = unit?.facilities || [];
  const customFacilities = allFacilities.filter(
    (facility: string) => !DEFAULT_FACILITIES.includes(facility)
  );
  const methods = useForm<Inputs>({
    resolver: zodResolver(CreateUnitSchema),
    defaultValues: {
      name: unit?.name ?? "",
      description: unit?.description ?? "",
      location: location,
      availableUnits: unit?.availableUnits ?? 0,
      unitType: unit?.unitType ?? UNIT_TYPES.detached,
      developmentStage: unit?.developmentStage ?? DEVELOPMENT_STAGES.available,
      square: unit?.square ?? 0,
      bedrooms: unit?.bedrooms ?? 0,
      bathrooms: unit?.bathrooms ?? 0,
      cost: unit?.cost ?? 0,
      facilities: {
        balcony: allFacilities.includes("balcony"),
        elevator: allFacilities.includes("elevator"),
        garden: allFacilities.includes("garden"),
        smartHome: allFacilities.includes("smartHome"),
        solar: allFacilities.includes("solar"),
        wheelChair: allFacilities.includes("wheelChair"),
      },
      customFacilities: customFacilities,
      images: getInitialFiles(unit?.images ?? [], AttachmentType.IMAGE) || [],
      floorPlan:
        getInitialFiles(unit?.floorPlan ?? [], AttachmentType.PDF) || [],
      tourVideo:
        getInitialFiles(unit?.tourVideo ?? [], AttachmentType.VIDEO) || [],
    },
  });
  const { register, handleSubmit, trigger, reset, setValue } = methods;
  const onSubmit: SubmitHandler<Inputs> = async () => {
    setIsModalOpen(true);
  };

  const handleSaveDraft = async (data: Inputs) => {
    try {
      setIsUploading(true);

      const files = await uploadFiles(data);
      const metadata = await prepareMetadata(data, files);

      const unitIdentifier = searchParams.get("unitid") || "";

      const draftMetadata: CreateUnitDraftMetadata = {
        ...metadata,
        unitId: unit?.identifier || unitIdentifier,
        step: StepMapping[currentStep],
      };

      const newUnit = await saveDraftUnit(draftMetadata, propertyId);

      const newUnitImages = getInitialFiles(
        (newUnit.data?.images as FileMetadata[]) || [],
        AttachmentType.IMAGE
      );

      const newUnitFloorPlan = getInitialFiles(
        (newUnit.data?.floorPlan as FileMetadata[]) || [],
        AttachmentType.PDF
      );

      const newUnitTourVideo = getInitialFiles(
        (newUnit.data?.tourVideo as FileMetadata[]) || [],
        AttachmentType.VIDEO
      );

      setValue("images", newUnitImages as any);
      setValue("floorPlan", newUnitFloorPlan as any);
      setValue("tourVideo", newUnitTourVideo as any);

      setNewUnit(newUnit.data);

      if (!unitIdentifier) {
        router.replace(
          `${basePath}/properties/${propertyId}/create-unit?unitid=${newUnit.data?.identifier}`
        );
      }

      nextStep();
    } catch (error) {
      console.error("Error saving draft unit:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = async (data: Inputs) => {
    try {
      setIsUploading(true);

      const files = await uploadFiles(data);
      const metadata = await prepareMetadata(data, files);

      const unitIdentifier = unit?.identifier || "";

      const editMetadata: EditUnitMetadata = {
        ...metadata,
      };

      const newUnit = await editUnit(editMetadata, unitIdentifier);

      const newUnitImages = getInitialFiles(
        (newUnit?.images as FileMetadata[]) || [],
        AttachmentType.IMAGE
      );

      const newUnitFloorPlan = getInitialFiles(
        (newUnit?.floorPlan as FileMetadata[]) || [],
        AttachmentType.PDF
      );

      const newUnitTourVideo = getInitialFiles(
        (newUnit?.tourVideo as FileMetadata[]) || [],
        AttachmentType.VIDEO
      );

      setValue("images", newUnitImages as any);
      setValue("floorPlan", newUnitFloorPlan as any);
      setValue("tourVideo", newUnitTourVideo as any);

      setNewUnit(newUnit);
      console.log("currentStep", currentStep);

      if (currentStep === FormStep.SUBMIT) {
        router.push(`${basePath}/properties/${propertyId}`);
        router.refresh();
      } else {
        nextStep();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateUnit = async (data: Inputs) => {
    try {
      setIsUploading(true);

      const files = await uploadFiles(data);
      const metadata = await prepareMetadata(data, files);

      await submitMetadata(metadata, propertyId);
      nextStep();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const nextStep = async () => {
    const fields = formSteps[currentStep - 1].fields;
    const isValid = await trigger(fields as FieldName[], { shouldFocus: true });

    if (isValid) {
      setStepStatus((prevStatus) => {
        const updatedStatus = [...prevStatus];
        updatedStatus[currentStep - 1] = "completed";
        return updatedStatus;
      });
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const addAnotherNewUnit = () => {
    reset();
    setStepStatus(defaultFormStateStatus);
    setCurrentStep(FormStep.FIRST);
  };

  useEffect(() => {
    register("images");
    register("floorPlan");
    register("tourVideo");
    register("unitType");
    register("developmentStage");
  }, [register]);

  const StepMapping: Record<number, CreateUnitStep> = {
    [FormStep.FIRST]: CreateUnitStep.STEP_1,
    [FormStep.SECOND]: CreateUnitStep.STEP_2,
    [FormStep.SUBMIT]: CreateUnitStep.SUBMIT_DRAFT,
  };

  const handleConfirm = async () => {
    const fields = formSteps[currentStep - 1].fields;
    const isValid = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!isValid) {
      return;
    }

    const data = methods.getValues();

    if (unit && isEditMode) {
      handleEdit(data);
      setIsModalOpen(false);
      return;
    }

    if (unit || newUnit || currentStep !== FormStep.SUBMIT) {
      handleSaveDraft(data);
    } else {
      handleCreateUnit(data);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <FormNavigation
        formSteps={formSteps}
        stepStatus={stepStatus}
        currentStep={currentStep}
        onSaveAndContinue={
          currentStep === FormStep.SUBMIT && !isEditMode
            ? handleSubmit(onSubmit)
            : handleConfirm
        }
        saveLoading={isUploading}
        createAnotherNewEntity={addAnotherNewUnit}
        entityType={"unit"}
      />
      <div className="h-full w-full rounded-b-3xl bg-white py-9 pl-12 pr-6">
        <FormProvider {...methods}>
          <form onSubmit={!isEditMode ? handleSubmit(onSubmit) : handleConfirm}>
            <div>
              {currentStep === FormStep.FIRST && (
                <AboutUnitStep onNextStep={nextStep} onPrevStep={prevStep} />
              )}
              {currentStep === FormStep.SECOND && (
                <SpecificationsStep
                  onNextStep={nextStep}
                  onPrevStep={prevStep}
                />
              )}
              {currentStep === FormStep.SUBMIT && (
                <SummaryStep
                  backToStep={(step: number) => setCurrentStep(step)}
                  onPrevStep={prevStep}
                  isSubmitting={isUploading}
                />
              )}
              {currentStep > formSteps.length && (
                <SuccessFormUnitSubmit addAnotherNewUnit={addAnotherNewUnit} />
              )}
            </div>
          </form>
        </FormProvider>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <ConfirmSubmit
            onConfirm={handleConfirm}
            onAbort={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
