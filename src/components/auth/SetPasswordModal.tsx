"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { getUser, setPassword } from "@/lib/api";
import {
  setPasswordSchema,
  type SetPasswordFormValues,
} from "@/lib/validations/auth";
import type { User } from "@/types";

type SetPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (user: User) => void;
  email?: string;
};

export default function SetPasswordModal({
  isOpen,
  onClose,
  onComplete,
  email,
}: SetPasswordModalProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: SetPasswordFormValues) => {
    setServerError(null);
    try {
      await setPassword({ password: values.password });
      const user = await getUser();
      reset();
      if (onComplete) {
        onComplete(user);
      } else {
        onClose();
      }
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Unable to set password.",
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Set your password"
      onClose={onClose}
      footer={
        <Button
          className="w-full"
          type="submit"
          form="password-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save and continue"}
        </Button>
      }
    >
      <form
        id="password-form"
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-sm text-slate-600">
          Choose a strong password to finish creating your workspace.
        </p>
        {email ? <p className="text-xs text-slate-500">For {email}</p> : null}
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        {serverError ? (
          <p className="text-xs text-rose-600">{serverError}</p>
        ) : null}
      </form>
    </Modal>
  );
}
