"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AUTH_BACKEND_API_URL } from "../../lib/api";
import { useState } from "react";
import { z } from "zod";
import { authResetSchema } from "@/lib/schemas/authLoginSchema";

type Inputs = typeof authResetSchema;

export default function FindAccountForm() {
  const form = useForm<z.output<Inputs>>({
    resolver: zodResolver(authResetSchema),
    defaultValues: {
      emailOrPhone: "",
    },
  });

  const [findAccountError, setFindAccountError] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Handle form submission
  const handleFindAccount = async (formData: FormData) => {
    try {
      const emailOrPhone = formData.get("emailOrPhone");

      await axios.post(`${AUTH_BACKEND_API_URL}/api/auth/reset`, { emailOrPhone });

      // Clear the form and show success banner
      form.reset();
      setFindAccountError(null);
      setShowSuccessBanner(true);

      // Hide success message after a few seconds
      setTimeout(() => setShowSuccessBanner(false), 5000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setFindAccountError(error.response.data.message || "An error occurred");
      } else {
        setFindAccountError("An error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        const formData = new FormData();
        formData.append("emailOrPhone", data.emailOrPhone);
        handleFindAccount(formData);
      })}
      className="space-y-4"
    >
      <div>
        <label htmlFor="emailOrPhone">Email or Phone Number</label>
        <Controller
          name="emailOrPhone"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter your email or phone number"
              className="mt-1 w-full"
              onChange={field.onChange}
            />
          )}
        />
        {form.formState.errors.emailOrPhone?.message && (
          <div className="text-red-600 text-xs mt-2">
            {form.formState.errors.emailOrPhone.message}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Button type="submit" variant="default" className="w-full">
          Find Account
        </Button>
        <div className="border-t border-graytext my-4" />
        <Button type="button" variant="secondary" className="w-full">
          Create Account
        </Button>
      </div>

      {findAccountError && (
        <p className="py-4 text-base text-red-500">{findAccountError}</p>
      )}
      {showSuccessBanner && (
        <div className="bg-green-500 text-white py-2 text-center rounded-lg">
          Success! A reset password link has been sent to your email/phone.
        </div>
      )}
    </form>
  );
}