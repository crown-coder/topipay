"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import OTPModal from "@/components/auth/OTPModal";
import SetPasswordModal from "@/components/auth/SetPasswordModal";
import { useModal } from "@/hooks/useModal";
import { signup } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { signupSchema, type SignupFormValues } from "@/lib/validations/auth";
import type { User } from "@/types";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [signupError, setSignupError] = useState<string | null>(null);
  const passwordModal = useModal();
  const otpModal = useModal();
  const termsModal = useModal();
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      acceptTerms: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: SignupFormValues) => {
    setSignupError(null);
    try {
      await signup(values);
      otpModal.open();
    } catch (error) {
      setSignupError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const handleVerified = () => {
    otpModal.close();
    passwordModal.open();
  };

  const handlePasswordComplete = (user: User) => {
    login(user);
    passwordModal.close();
    router.push("/dashboard");
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full name"
          placeholder="Avery Jordan"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Company"
          placeholder="TopiPay Labs"
          error={errors.company?.message}
          {...register("company")}
        />
        <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
            {...register("acceptTerms")}
          />
          <span>
            I agree to the Terms of Service and acknowledge the Privacy Policy.
            <button
              type="button"
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
              onClick={termsModal.open}
            >
              Read terms
            </button>
          </span>
        </label>
        {errors.acceptTerms ? (
          <p className="text-xs text-rose-600">{errors.acceptTerms.message}</p>
        ) : null}
        {signupError ? (
          <p className="text-sm text-rose-600">{signupError}</p>
        ) : null}
        <div className="pt-2">
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending code..." : "Create workspace"}
          </Button>
        </div>
      </form>
      <OTPModal
        isOpen={otpModal.isOpen}
        email={getValues("email")}
        context="signup"
        onClose={otpModal.close}
        onVerified={handleVerified}
      />
      <SetPasswordModal
        isOpen={passwordModal.isOpen}
        email={getValues("email")}
        onClose={passwordModal.close}
        onComplete={handlePasswordComplete}
      />
      <Modal
        isOpen={termsModal.isOpen}
        title="Terms and Conditions"
        onClose={termsModal.close}
        footer={
          <Button className="w-full" type="button" onClick={termsModal.close}>
            Got it
          </Button>
        }
      >
        <div className="space-y-3 text-sm text-slate-600">
          <p>
            By creating a TopiPay account, you agree to comply with our platform
            usage guidelines and payment processing policies.
          </p>
          <p>
            You authorize TopiPay to verify business information, perform KYC
            checks, and monitor transactions for compliance.
          </p>
          <p>
            You are responsible for safeguarding account credentials and
            ensuring all submitted details remain accurate and up to date.
          </p>
          <p>
            Full terms will be provided by legal counsel prior to production
            launch.
          </p>
        </div>
      </Modal>
    </>
  );
}
