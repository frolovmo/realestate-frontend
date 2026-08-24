/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import GeolocationStep from "@/components/createProperty/geolocationStep";
import SummaryStep from "@/components/createProperty/summaryStep";
import BasicInfoStep from "@/components/createProperty/basicInfoStep";
import SuccessFormPropertySubmit from "@/components/successFormSubmit/successFormPropertySubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { CreatePropertySchema } from "../../lib/schemas/createPropertySchema";
import FormNavigation from "@/components/formNavigation/formNavigation";
import { authenticatedApiRequest } from "@/actions/authenticatedApi";
import ConfirmSubmit from "../modals/confirmSubmit";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import uploadToFileStorage from "@/actions/uploadFileToStorage";
import { useLocationData } from "../../lib/hooks/useLocation";
import { FileMetadata, PropertyData, UserData } from "../../lib/types/index";
import { useRouter, useSearchParams } from "next/navigation";
import { basePath } from "../../lib/constants";
import { PropertyStatus } from "@/lib/types/properties";

export type Inputs = z.infer<typeof CreatePropertySchema>;
type FieldName = keyof Inputs;

interface CreatePropertyMetadata {
  name: string;
  description: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  address?: string;
  images: FileMetadata[];
  status: string;
  userId: string | number | undefined;
}

type EditPropertyMetadata = Partial<CreatePropertyMetadata>;

enum CreatePropertyStep {
  STEP_1 = "step-1",
  STEP_2 = "step-2",
  SUBMIT_DRAFT = "submit-draft",
  SUBMIT_NEW = "submit-new",
}

interface CreatePropertyDraftMetadata extends CreatePropertyMetadata {
  propertyId?: string | null;
  step: CreatePropertyStep;
}

const formSteps = [
  {
    id: 1,
    name: "Basic info",
    fields: ["name", "description", "phone", "email", "images"],
  },
  {
    id: 2,
    name: "Geo-Location",
    fields: ["address", "province", "district", "sector", "cell", "village"],
  },
  { id: 3, name: "Summary" },
];

const defaultFormStateStatus = Array(formSteps.length).fill(null);

enum FormStep {
  FIRST = 1,
  SECOND = 2,
  SUBMIT = 3,
}

const StepMapping = {
  [FormStep.FIRST]: CreatePropertyStep.STEP_1,
  [FormStep.SECOND]: CreatePropertyStep.STEP_2,
  [FormStep.SUBMIT]: CreatePropertyStep.SUBMIT_DRAFT,
};

async function submitMetadata(data: CreatePropertyMetadata) {
  const response = await authenticatedApiRequest<any>("/properties", {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    throw new Error("Failed to submit metadata");
  }

  return response.data;
}

async function saveDraftProperty(data: CreatePropertyMetadata) {
  const response = await authenticatedApiRequest<any>("/properties/draft", {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    throw new Error("Failed to submit metadata");
  }

  return response.data;
}

async function editProperty(id: string, data: EditPropertyMetadata) {
  const response = await authenticatedApiRequest<any>(
    `/properties/edit/${id}`,
    {
    method: "PUT",
      body: data,
    },
  );
  if (!response.ok) {
    throw new Error("Failed to submit metadata");
  }

  return response.data;
}

interface CreatePropertyFormProps {
  user: UserData;
  property?: PropertyData | null;
  isEditMode?: boolean;
}

export default function CreatePropertyForm({
  user,
  property,
  isEditMode,
}: CreatePropertyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatus, setStepStatus] = useState<(null | "completed")[]>(
    defaultFormStateStatus
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newProperty, setNewProperty] = useState<PropertyData | null>(null);
  const locationData = useLocationData({ initialData: property });
  const router = useRouter();
  const searchParams = useSearchParams();

  const getInitialImages = (images: FileMetadata[] = []) => {
    return images.map((image) => {
      const fileId = crypto.randomUUID();

      return {
        ...image,
        fileId,
        preview: image.url,
        altText: image.altText,
        isInit: true,
      };
    });
  };

  const getInitialImagesMetadata = (
    images: FileMetadata[] = []
  ): FileMetadata[] => {
    return images.map((image) => {
      return {
        url: image?.url,
        type: image?.type,
        size: image?.size,
        originalName: image?.originalName,
        altText: image?.altText,
      };
    });
  };

  const uploadImages = async (data: Inputs) => {
    const newImages = (data.images || []).filter((image) => !image.isInit);
    const initImages = (data.images || []).filter((image) => !!image.isInit);

    const newImagesMetadata = await uploadToFileStorage(newImages as any[]);

    const initImagesMetadata = getInitialImagesMetadata(initImages as any[]);

    return [...initImagesMetadata, ...newImagesMetadata];
  };

  const methods = useForm<Inputs>({
    resolver: zodResolver(CreatePropertySchema),
    defaultValues: {
      address: "",
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: "",
      ...property,
      images: getInitialImages(property?.images || []),
    },
    shouldUnregister: false,
  });
  const { register, handleSubmit, trigger, reset, setValue } = methods;
  const onSubmit: SubmitHandler<Inputs> = async () => {
    setIsModalOpen(true);
  };

  const handleCreateProperty = async (data: Inputs) => {
    try {
      setIsUploading(true);

      const images = await uploadImages(data);

      const metadata: CreatePropertyMetadata = {
        ...data,
        status: "pending",
        images,
        userId: user?.userId,
      };

      const newProperty = await submitMetadata(metadata);
      const newPropertyImages = getInitialImages(
        (newProperty.data?.images as FileMetadata[]) || []
      );

      setValue("images", newPropertyImages as any);
      setNewProperty(newProperty.data);
      nextStep();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveDraft = async (data: Inputs) => {
    try {
      setIsUploading(true);

      const images = await uploadImages(data);

      const propertyId = searchParams.get("propertyId");

      const metadata: CreatePropertyDraftMetadata = {
        ...data,
        status: PropertyStatus.DRAFT,
        // TODO: change after new uploader
        images,
        userId: user?.userId,
        propertyId: property?._id || propertyId,
        step: StepMapping[currentStep as FormStep],
      };

      const newProperty = await saveDraftProperty(metadata);
      const newPropertyImages = getInitialImages(
        (newProperty.data?.images as FileMetadata[]) || []
      );

      setValue("images", newPropertyImages as any);
      setNewProperty(newProperty.data);
      nextStep();

      if (!propertyId) {
        router.replace(
          `${basePath}/properties/create-property?propertyId=${newProperty.data?.identifier}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = async (data: Inputs) => {
    try {
      setIsUploading(true);

      const images = await uploadImages(data);
      const propertyId = property?._id || "";
      const propertyIdentifier = property?.identifier || "";

      const metadata: EditPropertyMetadata = {
        ...property,
        ...data,
        status: property?.status as PropertyStatus,
        images,
        userId: user?.userId,
      };

      const newProperty = await editProperty(propertyId, metadata);
      const newPropertyImages = getInitialImages(
        (newProperty.data?.images as FileMetadata[]) || []
      );

      setValue("images", newPropertyImages as any);
      setNewProperty(newProperty.data);

      if (currentStep === FormStep.SUBMIT) {
        router.push(`${basePath}/properties/${propertyIdentifier}`);
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

  const handleConfirm = async () => {
    const fields = formSteps[currentStep - 1].fields;
    const isValid = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!isValid) {
      return;
    }

    const data = methods.getValues();

    if (property && isEditMode) {
      handleEdit(data);
      setIsModalOpen(false);
      return;
    }

    if (property || newProperty || currentStep !== FormStep.SUBMIT) {
      handleSaveDraft(data);
    } else {
      handleCreateProperty(data);
    }
    setIsModalOpen(false);
  };

  const nextStep = async () => {
    const fields = formSteps[currentStep - 1].fields;
    const isValid = await trigger(fields as FieldName[], {
      shouldFocus: true,
    });

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

  const addAnotherNewProperty = () => {
    reset();
    setStepStatus(defaultFormStateStatus);
    setCurrentStep(1);
  };

  useEffect(() => {
    register("images");
  }, [register]);

  return (
    <>
      <FormNavigation
        formSteps={formSteps}
        stepStatus={stepStatus}
        currentStep={currentStep}
        saveLoading={isUploading}
        onSaveAndContinue={
          currentStep === FormStep.SUBMIT && !isEditMode
            ? handleSubmit(onSubmit)
            : handleConfirm
        }
        createAnotherNewEntity={addAnotherNewProperty}
        entityType="property"
      />

      <div className="h-auto rounded-b-3xl bg-white py-9 pl-12 pr-6">
        <FormProvider {...methods}>
          <form onSubmit={!isEditMode ? handleSubmit(onSubmit) : handleConfirm}>
            <>
              {currentStep === 1 && (
                <BasicInfoStep onNextStep={nextStep} onPrevStep={prevStep} />
              )}
              {currentStep === 2 && (
                <GeolocationStep
                  onNextStep={nextStep}
                  onPrevStep={prevStep}
                  locationData={locationData}
                />
              )}
              {currentStep === 3 && (
                <SummaryStep
                  backToStep={(step: number) => setCurrentStep(step)}
                  onPrevStep={prevStep}
                  isSubmitting={isUploading}
                />
              )}
              {currentStep > formSteps.length && (
                <SuccessFormPropertySubmit // TODO: distinct this common component
                  addAnotherProperty={addAnotherNewProperty}
                  createNewUnit={() => {
                    router.push(
                      `${basePath}/properties/${newProperty?.identifier}/create-unit`
                    );
                  }}
                />
              )}
            </>
          </form>
        </FormProvider>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="[&>button]:hidden">
          <ConfirmSubmit
            onConfirm={handleConfirm}
            onAbort={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
