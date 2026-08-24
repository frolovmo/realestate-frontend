import { getUserData } from "@/actions/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserData();
  return NextResponse.json(user);
}
