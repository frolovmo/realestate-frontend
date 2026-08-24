"use client";

import { CloudIcon } from "@/components/icons";
import { Button } from "../ui/button";
import InputName from "@/components/inputName/inputName";
import { Input } from "../ui/input";
import { useDropzone, Accept } from "react-dropzone";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import UploadThumbnail from "@/components/uploadThumbnail/uploadThumbnail";
import { v4 as uuidv4 } from "uuid";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { AttachmentType } from "@/lib/constants/attachments";
export interface UploadFileMetadata {
  fileId: string;
  file: File;
  preview: string;
  altText: string;
  type?: AttachmentType;
}

interface UploadModalProps {
  heading: string;
  hint: string;
  acceptedFileTypes?: Accept;
  maxSize: number;
  onSave: (data: UploadFileMetadata) => void;
}

export default function UploadModal({
  heading,
  hint,
  acceptedFileTypes,
  onSave,
  maxSize,
}: UploadModalProps) {
  const [preview, setPreview] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [error, setError] = useState("");

  function fileSizeValidator(file: File) {
    if (file.size > maxSize) {
      return {
        code: "file-too-large",
        message: `File size exceeds 10MB`,
      };
    }
    return null;
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setAltText(event.target.value);
  };

  const onSubmitUpload = () => {
    if (!file) {
      setError("Select a file");
      return;
    }
    if (!altText) {
      setError("Alternative text is required");
      return;
    }
    onSave({
      fileId: uuidv4(),
      file,
      preview,
      altText,
    });
  };

  const generateVideoThumbnail = (videoFile: File) => {
    try {
      const video = document.createElement("video");
      const objectUrl = URL.createObjectURL(videoFile);
      video.src = objectUrl;
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.playsInline = true;

      video.addEventListener("loadeddata", () => {
        video.currentTime = 1; // Capture frame at 1s to avoid blank screens
      });

      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth / 2;
        canvas.height = video.videoHeight / 2;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setPreview(canvas.toDataURL("image/png"));
        }

        URL.revokeObjectURL(objectUrl);
      });
    } catch (err) {
      console.error("Error generating video thumbnail:", err);
    }
  };

  const generatePdfThumbnail = async (pdfFile: File) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const pdfData = new Uint8Array(fileReader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const page = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context!, viewport }).promise;
        setPreview(canvas.toDataURL("image/png"));
      };
      fileReader.readAsArrayBuffer(pdfFile);
    } catch (err) {
      console.error("Error generating PDF thumbnail:", err);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const chosenFile = acceptedFiles[0];
    setFile(chosenFile);
    setPreview("");

    if (chosenFile.type.startsWith("image/")) {
      // Handle image preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(chosenFile);
    } else if (chosenFile.type.startsWith("video/")) {
      // Generate a thumbnail for the video
      generateVideoThumbnail(chosenFile);
    } else if (chosenFile.type === "application/pdf") {
      // Generate a thumbnail for the first page of the PDF
      generatePdfThumbnail(chosenFile);
    }
  }, []);

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    onDrop,
    noClick: true,
    accept: acceptedFileTypes,
    maxFiles: 1,
    validator: fileSizeValidator,
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      const errors = fileRejections[0].errors.map((e) => e.message).join(", ");
      setError(errors);
    } else {
      setError("");
    }
  }, [fileRejections]);

  return (
    <div className="rounded-extra bg-white py-5 px-6 w-full shadow-2xl">
      <p className="text-lg font-medium	text-black mb-6">{heading}</p>

      <div
        {...getRootProps()}
        className="flex flex-col items-center border border-grayborder border-dashed rounded-extra py-1.5 mb-7"
      >
        <CloudIcon width={47} height={38} />
        <div className="flex flex-col justify-center items-center">
          <p className="font-sans text-black text-sm leading-4 mb-3">
            Select a file or drag and drop here
          </p>
          <p className="font-sans text-softblack2 text-sm leading-4 mb-6">
            {hint}
          </p>
          <div>
            <Input {...getInputProps()} hidden type="file" className="hidden" />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="w-fit"
              onClick={open}
            >
              Select File
            </Button>
          </div>
        </div>
      </div>

      <div className="border border-grayborder" />

      <div className="mt-2">
        {preview && <UploadThumbnail src={preview as string} />}
      </div>

      <div className="mt-2.5 mb-4">
        <InputName isRequired htmlFor="upload-alt">
          Alt text
        </InputName>
        <Input
          id="upload-alt"
          placeholder="Ex: indoor, outdoor, balcony, garden, ...etc"
          className="placeholder-graytext"
          onChange={onChange}
        />
        {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={onSubmitUpload}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
