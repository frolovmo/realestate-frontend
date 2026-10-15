"use client";
import { FileMetadata } from "../lib/types/index";
import { API_URL } from "../lib/api";

const uploadToFileStorage = async (
  files: {
    fileId: string;
    file: File;
    preview: string;
    altText: string;
  }[]
): Promise<FileMetadata[]> => {
  const url = `${API_URL}/files/upload`;

  if (!files || !files?.length) {
    return [];
  }

  try {
    const formData = new FormData();
    formData.append("path", "realestate-dev");
    files.forEach((file) => {
      formData.append("files", file.file);
    });

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    const urls = data.urls || data.data?.urls;

    if (!Array.isArray(urls) || urls.length !== files.length) {
      throw new Error("Mismatch in uploaded images count");
    }

    // Map uploaded URLs with their corresponding metadata
    return urls.map((url: string, index: number) => ({
      url,
      type: files[index].file.type,
      size: files[index].file.size,
      originalName: files[index].file.name,
      altText: files[index].altText,
    }));
  } catch (error) {
    throw new Error(`Uploading files error: ${error}`);
  }
};

export default uploadToFileStorage;
