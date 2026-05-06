"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { verifyOTP } from "@/lib/api";
import { otpSchema, type OTPFormValues } from "@/lib/validations/auth";

type OTPModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: () => void;
  context?: "login" | "signup";
  email?: string;
};

export default function OTPModal({
  isOpen,
  onClose,
  onVerified,
  context = "login",
  email,
}: OTPModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: OTPFormValues) => {
    setServerError(null);
    try {
      await verifyOTP({ code: values.code });
      reset();
      if (onVerified) {
        onVerified();
      } else {
        onClose();
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Unable to verify code.",
      );
    }
  };

  const title =
    context === "signup" ? "Confirm your email" : "Verify your login";
  const description =
    context === "signup"
      ? "Enter the 6-digit code we sent to your email to finish creating your workspace."
      : "Enter the 6-digit code sent to your email to finish signing in.";

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      footer={
        <Button
          className="w-full"
          type="submit"
          form="otp-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify and continue"}
        </Button>
      }
    >
      <form
        id="otp-form"
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-sm text-slate-600">{description}</p>
        {email ? (
          <p className="text-xs text-slate-500">Sent to {email}</p>
        ) : null}
        <Input
          label="Verification code"
          inputMode="numeric"
          placeholder="123456"
          error={errors.code?.message}
          {...register("code")}
        />
        {serverError ? (
          <p className="text-xs text-rose-600">{serverError}</p>
        ) : null}
      </form>
    </Modal>
  );
}
