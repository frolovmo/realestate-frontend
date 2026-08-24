"use client";
import InputHint from "@/components/inputHint/inputHint";
import InputName from "@/components/inputName/inputName";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UploadModal, { UploadFileMetadata } from "../uploadModal/uploadModal";
import UploadThumbnail from "@/components/uploadThumbnail/uploadThumbnail";
import { useState } from "react";
import { Accept } from "react-dropzone";
import { useFormContext } from "react-hook-form";

interface UploadFileFieldProps {
  fieldName: string;
  fieldTitle: string;
  fieldHint?: string;
  modalTitle: string;
  modalHint: string;
  showModalInput?: boolean;
  maxSize: number;
  acceptedFileTypes?: Accept;
  dialogTriggerComponent?: React.ReactNode;
}

export default function UploadFileField({
  fieldName,
  fieldTitle,
  fieldHint,
  modalTitle,
  modalHint,
  maxSize,
  acceptedFileTypes,
}: UploadFileFieldProps) {
  const {
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();
  const [openImagesUploadModal, setOpenImagesUploadModal] = useState(false);

  const filesArray = getValues(fieldName);
  const onSubmitFile = async (newFile: UploadFileMetadata) => {
    setValue(fieldName, filesArray.concat(newFile));
    setOpenImagesUploadModal(false);
    await trigger(fieldName);
  };
  const onCloseThumbnail = async (id: string) => {
    setValue(
      fieldName,
      filesArray.filter((file: UploadFileMetadata) => file.fileId !== id)
    );
    await trigger(fieldName);
  };

  return (
    <div className="flex flex-col">
      <InputName isRequired>{fieldTitle}</InputName>
      <InputHint>{fieldHint}</InputHint>
      <div className="flex gap-2 flex-wrap">
        {filesArray.map(({ preview, fileId, type }: UploadFileMetadata) => (
          <UploadThumbnail
            key={fileId}
            src={preview}
            removable
            type={type}
            onClose={() => onCloseThumbnail(fileId)}
          />
        ))}
        <Dialog
          open={openImagesUploadModal}
          onOpenChange={setOpenImagesUploadModal}
        >
          <DialogTrigger>
            <div className="flex justify-center items-center w-[73px] h-[73px] rounded-md border border-grayborder bg-lightgray font-poppins font-light text-xs cursor-pointer border-dashed">
              <span className="flex items-center px-0.5 mb-0.5">+</span>
              <span>Upload</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <UploadModal
              acceptedFileTypes={acceptedFileTypes}
              heading={modalTitle}
              hint={modalHint}
              maxSize={maxSize}
              onSave={onSubmitFile}
            />
          </DialogContent>
        </Dialog>
      </div>
      {errors[fieldName]?.message && (
        <div className="text-red-600 text-xs">{`${errors?.[fieldName]?.message}`}</div>
      )}
    </div>
  );
}
