"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AUTH_BACKEND_API_URL } from '../../lib/api';
import InputName from "../inputName/inputName";
import { Eye, EyeOff } from "lucide-react";
import { basePath } from '../../lib/constants';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmationPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: "Passwords must match",
    path: ["confirmationPassword"],
  });

interface ResetPasswordFormProps {
  resetToken: string | null;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ resetToken }) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmationPassword: "",
    },
  });

  const [resetError, setResetError] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  
  // Separate states for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (data: { password: string; confirmationPassword: string }) => {
    if (!resetToken) {
      setResetError("Invalid or missing reset token.");
      return;
    }

    try {
      await axios.patch(`${AUTH_BACKEND_API_URL}/api/auth/reset`, {
        password: data.password,
        confirmationPassword: data.confirmationPassword,
        resetToken,
      });

      form.reset();
      setResetError(null);
      setShowSuccessBanner(true);
      setTimeout(() => {
        setShowSuccessBanner(false);
        window.location.href = `${basePath}/login`;
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setResetError(error.response.data.message || "An error occurred");
      } else {
        setResetError("An error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleResetPassword)}
      className="space-y-6"
    >
    <div className="relative">
        <InputName htmlFor="password">New Password</InputName>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className="mt-1 w-full"
              />
            )}
          />
          <button
            type="button"
            className="absolute top-10 right-4 flex items-center"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {form.formState.errors.password?.message && (
            <div className="text-red-600 text-xs mt-2">{form.formState.errors.password.message}</div>
          )}
      </div>

      <div className="relative">
        <InputName htmlFor="confirmationPassword">Confirm Password</InputName>
          <Controller
            name="confirmationPassword"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                className="mt-1 w-full"
              />
            )}
          />
          <button
            type="button"
            className="absolute top-10 right-4 flex items-center"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {form.formState.errors.confirmationPassword?.message && (
            <div className="text-red-600 text-xs mt-2">{form.formState.errors.confirmationPassword.message}</div>
          )}
      </div>

      <Button type="submit" variant="default" className="w-full">
        Reset Password
      </Button>

      {resetError && <p className="py-4 text-base text-red-500">{resetError}</p>}
      {showSuccessBanner && (
        <div className="bg-green-500 text-white py-2 text-center rounded-lg">
          Success! Your password has been reset.
        </div>
      )}
    </form>
  );
};

export default ResetPasswordForm;