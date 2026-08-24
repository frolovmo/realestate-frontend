"use client";
import InputName from "../inputName/inputName";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import Link from "next/link";
import { signUp } from "../../actions/auth";
import { useFormState } from "react-dom";
import SignupSubmit from "./signUpSubmit";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authRegisterSchema } from "../../lib/schemas/authLoginSchema";
import { z } from "zod";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { AUTH_BACKEND_API_URL } from "../../lib/api";
import { auth } from "@uno/utils";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { basePath } from "../../lib/constants";

type Inputs = typeof authRegisterSchema;

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const form = useForm<z.output<Inputs>>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      nationalId: "",
      email: "",
      phone: "",
      password: "",
      confirmationPassword: "",
    },
  });
  const router = useRouter();

  const [state, formAction] = useFormState(signUp, {
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const [signupError, setSignupError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfPassword, setShowConfPassword] = useState(false);

  //! Temp solution to make API calls to Realestate AUTH - To be revamped
  const handleSignUp = async (formData: FormData) => {
    try {
      const email = formData.get("email");
      const phone = formData.get("phone");
      const nationalId = formData.get("nationalId");
      const password = formData.get("password");
      const confirmationPassword = formData.get("confirmationPassword");
      const result = await axios.post(
        `${AUTH_BACKEND_API_URL}/api/auth/register/applicant`,
        {
          nationalId,
          email,
          phone,
          password,
          confirmationPassword,
        }
      );

      const token = result.data.data.token;
      // Set the token in a cookie
      auth.setAuthCookie(token);
      setSignupError(null);

      window.location.href = `${basePath}/login`;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setSignupError(error.response.data.message || "An error occurred");
        console.log("Error", error.response.data.message);
      } else {
        setSignupError("An error occurred");
        console.log("Error", error);
      }
    }
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit(() => {
          const formData = new FormData(formRef.current!);
          formData.append("redirectTo", redirectTo);
          handleSignUp(formData);
        })(event);
      }}
      className="space-y-4"
    >
      <div>
        <InputName htmlFor="nationalId">National Id</InputName>
        <Controller
          name="nationalId"
          control={form.control}
          render={({ field }) => (
            <Input
              {...field}
              name="nationalId"
              placeholder="Enter your national Id"
              className="mt-1 w-full"
              onChange={field.onChange}
            />
          )}
        />
        {form.formState.errors.nationalId?.message && (
          <div className="text-red-600 text-xs mt-2">
            {`${form.formState.errors.nationalId.message}`}
          </div>
        )}
      </div>
      <div>
        <InputName htmlFor="username">Email</InputName>
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <Input
              name="email"
              placeholder="Enter your email or phone number"
              className="mt-1 w-full"
              onChange={field.onChange}
            />
          )}
        />
        {form.formState.errors.email?.message && (
          <div className="text-red-600 text-xs mt-2">
            {`${form.formState.errors.email.message}`}
          </div>
        )}
      </div>
      <div>
        <InputName htmlFor="username">Phone</InputName>
        <Controller
          name="phone"
          control={form.control}
          render={({ field }) => (
            <Input
              name="phone"
              placeholder="Enter your email or phone number"
              className="mt-1 w-full"
              onChange={field.onChange}
            />
          )}
        />
        {form.formState.errors.phone?.message && (
          <div className="text-red-600 text-xs mt-2">
            {`${form.formState.errors.phone.message}`}
          </div>
        )}
      </div>

      <div className="relative">
        <InputName htmlFor="password">Password</InputName>
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="mt-1 w-full"
              onChange={field.onChange}
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
          <div className="text-red-600 text-xs mt-2">
            {`${form.formState.errors.password.message}`}
          </div>
        )}
      </div>
      <div className="relative">
        <InputName htmlFor="confirmationPassword">Confirm password</InputName>
        <Controller
          name="confirmationPassword"
          control={form.control}
          render={({ field }) => (
            <Input
              name="confirmationPassword"
              type={showconfPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="mt-1 w-full"
              onChange={field.onChange}
            />
          )}
        />
        <button
          type="button"
          className="absolute top-10 right-4 flex items-center"
          onClick={() => setShowConfPassword((prev) => !prev)}
        >
          {showconfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {form.formState.errors.confirmationPassword?.message && (
          <div className="text-red-600 text-xs mt-2">
            {`${form.formState.errors.confirmationPassword.message}`}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <Checkbox id="remember_me" />
          <label htmlFor="remember_me" className="text-base">
            Remember me
          </label>
        </div>
        <div>
          <Link
            href={`${basePath}/forgot-password`}
            className="underline text-googlelink"
          >
            Forgot Password
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <SignupSubmit />
        <div className="border-t border-graytext my-4" />
        <Button
          onClick={() => router.push(`${basePath}/login`)}
          type="button"
          variant="secondary"
          className="w-full"
        >
          Log into your Account
        </Button>
      </div>
      {signupError && (
        <p className="py-4 text-base text-red-500">{signupError}</p>
      )}
    </form>
  );
}
