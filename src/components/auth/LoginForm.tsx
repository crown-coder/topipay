"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { login as loginRequest } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import OTPModal from "@/components/auth/OTPModal";
import { useModal } from "@/hooks/useModal";
import type { User } from "@/types";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const otpModal = useModal();
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      const session = await loginRequest(values);
      setPendingUser(session.user);
      otpModal.open();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    }
  };

  const handleVerified = () => {
    if (!pendingUser) return;
    login(pendingUser);
    otpModal.close();
    router.push("/dashboard");
  };

  const handleGoogleLogin = () => {
    login({
      id: "user_google_01",
      name: "Sadiq",
      email: "avery@google.com",
    });
    router.push("/dashboard");
  };

  return (
    <>
      <div className="space-y-4">
        <Button
          className="w-full"
          variant="google"
          type="button"
          onClick={handleGoogleLogin}
        >
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#4285F4]">
            G
          </span>
          Continue with Google
        </Button>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          or
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
        {serverError ? (
          <p className="text-sm text-rose-600">{serverError}</p>
        ) : null}
        <div className="pt-2">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Continue"}
          </Button>
        </div>
      </form>
      <OTPModal
        isOpen={otpModal.isOpen}
        email={getValues("email")}
        context="login"
        onClose={otpModal.close}
        onVerified={handleVerified}
      />
    </>
  );
}
