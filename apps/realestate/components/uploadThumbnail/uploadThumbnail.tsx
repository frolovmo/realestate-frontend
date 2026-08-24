"use client";

import Image from "next/image";
import Close from "../close/close";
import { AttachmentType } from "@/lib/constants/attachments";
import { useEffect, useState } from "react";
import pdfToBase64 from "@/lib/utils/pdfToBase64";
import VideoPreview from "../VideoPreview";
import useMount from "@/lib/hooks/useMount";

interface UploadThumbnailProps {
  src: string;
  removable?: boolean;
  type?: AttachmentType;
  onClose?: () => void;
}

export default function UploadThumbnail({
  src,
  onClose,
  removable = false,
  type = AttachmentType.IMAGE,
}: UploadThumbnailProps) {
  const isMount = useMount();

  const [preview, setPreview] = useState(
    type === AttachmentType.IMAGE || AttachmentType.VIDEO ? src : ""
  );

  const convertFileToBase64 = async (src: string, type: AttachmentType) => {
    if (type === AttachmentType.PDF) {
      const newPreview = await pdfToBase64(src);
      setPreview(newPreview as string);
      return;
    }
  };

  useEffect(() => {
    convertFileToBase64(src, type);
  }, [src, type]);

  return (
    <div className="relative w-[73px] h-[73px] border border-grayborder rounded-md p-1">
      {preview && type !== AttachmentType.VIDEO && (
        <Image
          src={preview}
          alt="upload thumbnail"
          width={62}
          height={62}
          className="w-[62px] h-[62px]"
        />
      )}
      {preview && type === AttachmentType.VIDEO && isMount && (
        <VideoPreview
          url={preview}
          alt="upload thumbnail"
          width={62}
          height={62}
          className="w-[62px] h-[62px]"
        />
      )}
      {removable && (
        <span className="absolute -top-1.5 -right-1.5">
          <Close onClick={onClose || (() => null)} />
        </span>
      )}
    </div>
  );
}
