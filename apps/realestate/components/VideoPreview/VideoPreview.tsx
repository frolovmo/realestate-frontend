"use client";

import { BaseComponentProps } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IVideoPreviewProps extends BaseComponentProps {
  url: string;
  width: number;
  height: number;
  alt: string;
}

function VideoPreview({
  url,
  width,
  height,
  alt,
  ...props
}: IVideoPreviewProps) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));

  useEffect(() => {
    if (!document || !canvasRef.current) {
      return;
    }

    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.currentTime = 1;

    video.addEventListener("loadeddata", () => {
      canvasRef.current.width = video.videoWidth / 2;
      canvasRef.current.height = video.videoHeight / 2;

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          video,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageUrl = canvasRef.current.toDataURL("image/jpeg");
        setThumbnail(imageUrl);
      }
    });

    video.addEventListener("error", (error) => {
      console.error("Error loading video", error);
    });
  }, [url]);

  if (!thumbnail) return null;

  return (
    <>
      <Image
        src={thumbnail}
        alt={alt}
        width={width}
        height={width}
        {...props}
      />
    </>
  );
}

export default VideoPreview;
