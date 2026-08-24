import { AUTH_BACKEND_API_URL } from "@/lib/api";
import axios from "axios";

export async function validateResetToken(resetToken: string): Promise<unknown> {
  try {
    const response = await axios.post(
      `${AUTH_BACKEND_API_URL}/api/auth/validate-reset-token`,
      {
        resetToken,
      }
    );

    const result = await response.data;

    return result;
  } catch (error: any) {
    console.error(
      "Validate reset token failed:",
      error?.response?.data?.message || error?.message
    );
    return null;
  }
}
