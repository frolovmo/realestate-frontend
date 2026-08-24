import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PdfPreview from "./pdfPreview";
import { basePath } from "@/lib/constants";

interface PdfViewerProps {
  fileUrl: string;
  fileName: string;
  disableProxy?: boolean;
}

const PdfViewer = ({ fileUrl, fileName, disableProxy }: PdfViewerProps) => {
  const [open, setOpen] = useState(false);

  const newUrl = disableProxy
    ? fileUrl
    : `${basePath}/bucket/pdf/${encodeURIComponent(fileName || "")}`;

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <PdfPreview pdfUrl={newUrl} />
        </DialogTrigger>

        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex justify-center p-2 shadow-sm">
              {fileName}
            </DialogTitle>
          </DialogHeader>

          <div className="h-[600px]">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={newUrl} />
            </Worker>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PdfViewer;
