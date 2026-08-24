"use server";

import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: process.env.BUCKET_ENDPOINT,
  accessKeyId: process.env.BUCKET_KEY,
  secretAccessKey: process.env.BUCKET_SECRET,
  region: process.env.BUCKET_REGION,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  sslEnabled: true,
});

async function uploadFilesToS3(formData: FormData) {
  const files = formData.getAll("files") as File[];
  const altTexts = formData.getAll("altTexts") as string[];

  if (!files.length) throw new Error("No files provided.");

  const uploadedFilesPromises = files.map(async (file, index) => {
    const altText = altTexts[index];
    const fileKey = `realestate-dev/${crypto.randomUUID()}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const params = {
      Bucket: process.env.BUCKET_NAME!,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: file.type,
    };

    return s3
      .upload(params)
      .promise()
      .then(() => ({
        url: `${process.env.BUCKET_ENDPOINT}/${process.env.BUCKET_NAME}/${fileKey}`,
        type: file.type,
        size: file.size,
        originalName: file.name,
        altText,
      }));
  });

  // Use Promise.all to handle all uploads concurrently
  const uploadedFiles = await Promise.all(uploadedFilesPromises);

  return uploadedFiles;
}
export default uploadFilesToS3;
