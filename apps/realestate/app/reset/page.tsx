"use client";

import { useSearchParams } from "next/navigation";
import AuthPageShell from "@/components/auth/AuthPageShell";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";
import { useEffect, useState } from "react";
import { validateResetToken } from "@/actions/validateResetToken";
import { Loader } from "lucide-react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleValidateResetToken = async (resetToken: string | null) => {
    setLoading(true);

    const result = await validateResetToken(resetToken || "");

    if (!result) {
      setIsTokenValid(false);
    } else {
      setIsTokenValid(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleValidateResetToken(resetToken);
  }, [resetToken]);

  return (
    <AuthPageShell
      eyebrow="Account recovery"
      title="Choose a new password"
      description="Use a strong password that you do not use for another service."
    >
      {!loading && isTokenValid && (
        <ResetPasswordForm resetToken={resetToken} />
      )}

      {!loading && !isTokenValid && (
        <div className="rounded-lg bg-red-500 px-4 py-3 text-center text-white">
          Reset token is invalid or expired.
        </div>
      )}

      {loading && <Loader className="m-auto h-12 w-12 animate-spin text-primary" />}
    </AuthPageShell>
  );
};

export default ResetPasswordPage;
