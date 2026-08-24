"use client";

import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";
import Image from "next/image";

interface PdfPreviewProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({
  pdfUrl,
  width = 0,
  height = 0,
  onClick,
}) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const renderThumbnail = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          setThumbnail(canvas.toDataURL("image/png"));
        }
      } catch (error) {
        console.error("Failed to generate PDF preview:", error);
      }
    };

    renderThumbnail();
  }, [pdfUrl]);

  return (
    <div>
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt="PDF Preview"
          onClick={onClick}
          width={width}
          height={height}
          sizes="100vw"
          style={{ width: width || "100%", height: height || "auto" }}
          className="cursor-pointer rounded-lg shadow-md"
        />
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default PdfPreview;
