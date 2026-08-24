import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

interface IOptions {
  page?: number;
  scale?: number;
}

const pdfToBase64 = async (url: string, options?: IOptions) => {
  const { page: selectedPage = 1, scale = 1 } = options || {};

  try {
    const pdf = await pdfjsLib.getDocument(url).promise;
    const page = await pdf.getPage(selectedPage);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");

    if (context) {
      await page.render({ canvasContext: context, viewport }).promise;
      return canvas.toDataURL("image/png");
    }
  } catch (error) {
    console.error("Failed to generate PDF preview:", error);
    return "";
  }
};

export default pdfToBase64;
