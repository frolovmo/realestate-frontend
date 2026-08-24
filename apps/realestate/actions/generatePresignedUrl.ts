"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  endpoint: `${process.env.BUCKET_ENDPOINT}:${process.env.BUCKET_PORT}`,
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.BUCKET_KEY!,
    secretAccessKey: process.env.BUCKET_SECRET!,
  },
  forcePathStyle: true,
  tls: false,
});

async function generatePresignedUrl({
  fileType,
  fileSize,
  fileChecksum,
  altText,
}: {
  fileType: string;
  fileSize: number;
  fileChecksum: string;
  altText: string;
}) {
  const fileKey = `realestate-dev/${generateFileName()}.${
    fileType.split("/")[1]
  }`;

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: fileKey,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: fileChecksum,
    Metadata: {
      customUserDescription: altText,
    },
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return { signedUrl, fileKey };
}

export default generatePresignedUrl;
