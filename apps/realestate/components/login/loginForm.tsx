"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { signIn } from "../../actions/auth";
import { basePath } from "../../lib/constants";
import { authLoginSchema } from "../../lib/schemas/authLoginSchema";
import { Input } from "../ui/input";
import LoginSubmit from "./loginSubmit";

type Inputs = typeof authLoginSchema;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [, startTransition] = useTransition();
  const [state, formAction] = useFormState(signIn, {
    message: "",
  });
  const socialProviders = [
    {
      name: "Google",
      url: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL,
      icon: <FcGoogle aria-hidden="true" className="text-xl" />,
      className: "border-input bg-white text-secondary hover:bg-muted/50",
    },
    {
      name: "Apple",
      url: process.env.NEXT_PUBLIC_APPLE_AUTH_URL,
      icon: <FaApple aria-hidden="true" className="text-xl" />,
      className: "border-black bg-black text-white hover:bg-black/85",
    },
    {
      name: "Facebook",
      url: process.env.NEXT_PUBLIC_FACEBOOK_AUTH_URL,
      icon: (
        <FaFacebookF aria-hidden="true" className="text-lg text-[#1877f2]" />
      ),
      className: "border-input bg-white text-secondary hover:bg-muted/50",
    },
  ];

  const providerUrl = (url: string) => {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}redirectTo=${encodeURIComponent(redirectTo)}`;
  };

  const { handleSubmit, control, formState } = useForm<z.output<Inputs>>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(() => {
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        formData.set("redirectTo", redirectTo);
        startTransition(() => formAction(formData));
      })}
      className="space-y-5"
    >
      <div>
        <label htmlFor="username" className="sr-only">
          Email address
        </label>
        <div className="relative">
          <Mail
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="username"
                name="username"
                autoComplete="email"
                inputMode="email"
                placeholder="Enter your email address"
                className="h-12 w-full pl-12"
              />
            )}
          />
        </div>
        {formState.errors.username?.message && (
          <div className="mt-2 text-xs text-red-600">
            {formState.errors.username.message}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <LockKeyhole
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-12 w-full px-12"
              />
            )}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-muted-foreground transition-colors hover:text-secondary"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {formState.errors.password?.message && (
          <div className="mt-2 text-xs text-red-600">
            {formState.errors.password.message}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <LoginSubmit />
        <Link
          href={`${basePath}/forgot-password`}
          className="block text-center text-sm font-semibold text-googlelink hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      {state?.message && (
        <p role="alert" className="text-sm text-red-500">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3">
        {socialProviders.map((provider) =>
          provider.url ? (
            <a
              key={provider.name}
              href={providerUrl(provider.url)}
              className={`flex h-12 w-full items-center justify-between rounded-lg border px-5 text-sm font-semibold transition-colors ${provider.className}`}
            >
              <span>Continue with {provider.name}</span>
              {provider.icon}
            </a>
          ) : (
            <button
              key={provider.name}
              type="button"
              disabled
              title={`${provider.name} sign-in requires OAuth configuration`}
              className={`flex h-12 w-full cursor-not-allowed items-center justify-between rounded-lg border px-5 text-sm font-semibold opacity-55 ${provider.className}`}
            >
              <span>Continue with {provider.name}</span>
              {provider.icon}
            </button>
          )
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New to IZE Tech Real Estate?{" "}
        <Link
          href={`${basePath}/signup`}
          className="font-semibold text-googlelink hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
