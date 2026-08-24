// src/app/api/decrypt-user/route.ts
export const runtime = "nodejs"; // Force Node.js runtime for crypto
import { createDecipheriv } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { hash } = await req.json();
    const algorithm = process.env.NEXT_PUBLIC_ENCRYPTION_ALGORITHM as string;
    const encKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
    const iv = process.env.NEXT_PUBLIC_ENCRYPTION_IV as string;

    const key = Buffer.from(encKey);
    const ivBuffer = Buffer.from(iv);

    const [ivPart, encryptedText] = hash.split(":");
    const ivFromHash = Buffer.from(ivPart, "hex");

    const decipher = createDecipheriv(algorithm, key, ivFromHash);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    const decryptedData = JSON.parse(decrypted);

    return NextResponse.json({ decryptedData }, { status: 200 });
  } catch (error) {
    console.error("Decryption error:", error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}
