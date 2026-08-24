"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URL, BACKEND_ORIGIN } from "@/lib/api";
import { basePath } from "@/lib/constants";
import AuthPageShell from "@/components/auth/AuthPageShell";
import { auth } from "@uno/utils";
import { jwtDecode } from "jwt-decode";


export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [accountToken, setAccountToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  useEffect(() => {
    const tokenFromParams = searchParams.get("accountToken");
    if (tokenFromParams) {
      setAccountToken(tokenFromParams);
    }
  }, [searchParams]);

  // Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendDisabled && secondsLeft > 0) {
      timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, secondsLeft]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const otp = otpValues.join("");

    if (!accountToken) {
      setError("Missing account token. Please try resending OTP.");
      setLoading(false);
      return;
    }
    if (otp.length !== 6) {
      setError("Please enter all 6 digits.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/users/validate-otp`,
        { otp, accountHash: accountToken },
        {
          headers: {
            Origin: BACKEND_ORIGIN,
            "x-device-header": JSON.stringify({ device: "web" }),
          },
        }
      );

      const token = response.data?.data?.token?.split(" ")[1];

      if (!token) throw new Error("Missing token in response.");

      auth.setAuthCookie(token);
      const decoded: any = jwtDecode(token);

      if (!decoded.user) {
        throw new Error("No encrypted user data in token.");
      }

      const decryptRes = await fetch(`${basePath}/api/decrypt-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash: decoded.user }),
      });

      if (!decryptRes.ok) throw new Error("Failed to decrypt user");

      const { decryptedData } = await decryptRes.json();
      const roles: string[] =
        decryptedData?.encrypt?.roles?.map((r: any) => r.name) || [];

      // Redirect based on resolved role
      if (roles.some((r) => r.includes("Property Developer"))) {
        router.replace(`${basePath}/properties`);
      } else if (roles.some((r) => r === "Admin")) {
        router.replace(`${basePath}/requests`);
      } else {
        setError("User has no valid role for redirection");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "OTP verification failed.";
      setError(msg);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setError("");
    setResendMessage("");

    try {
      const response = await axios.post(
        `${API_URL}/users/resend-otp`,
        { accountHash: accountToken },
        {
          headers: {
            Origin: BACKEND_ORIGIN,
            "x-device-header": JSON.stringify({ device: "web" }),
          },
        }
      );

      const newToken = response.data?.data?.data?.accountToken;
      setAccountToken(newToken); 
      setOtpValues(Array(6).fill(""));
      setResendMessage("OTP resent successfully.");
      setResendDisabled(true);
      setSecondsLeft(60);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to resend OTP.";
      setResendMessage(msg);
    }
  };

  return (
    <AuthPageShell
      eyebrow="Two-factor authentication"
      title="Verify your account"
      description={`We sent a six-digit security code to ${email || "your email address"}.`}
    >
      <div className="mb-6 flex justify-center gap-2 sm:gap-3">
        {otpValues.map((value, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            aria-label={`Security code digit ${index + 1}`}
            className="h-12 w-10 rounded-lg border border-input bg-background text-center text-lg font-semibold text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 sm:w-12"
            value={value}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              if (element) inputRefs.current[index] = element;
            }}
          />
        ))}
      </div>

      {error && (
        <p className="mb-3 text-center text-sm text-red-600">{error}</p>
      )}

      <Button onClick={handleSubmit} className="w-full" loading={loading}>
        Verify account
      </Button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          disabled={resendDisabled}
          onClick={handleResend}
          className={`font-medium underline underline-offset-4 ${
            resendDisabled
              ? "cursor-not-allowed text-gray-400"
              : "text-googlelink hover:text-secondary"
          }`}
        >
          Resend {resendDisabled && `in ${secondsLeft}s`}
        </button>
      </p>

      {resendMessage && (
        <p className="mt-3 text-center text-sm text-success">
          {resendMessage}
        </p>
      )}
    </AuthPageShell>
  );
}
