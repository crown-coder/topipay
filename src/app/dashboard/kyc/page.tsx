"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { MotionItem, MotionPage, MotionStagger } from "@/components/ui/Motion";
import { setKycStatus, submitKyc } from "@/lib/api";
import {
  businessSchema,
  documentsSchema,
  ownerSchema,
  type BusinessFormValues,
  type DocumentsFormValues,
  type OwnerFormValues,
} from "@/lib/validations/kyc";
import type { KycProfile, KycStatus } from "@/types";
import { cn } from "@/lib/utils";
import { loadKycDraft, saveKycDraft } from "@/lib/kycStorage";

const steps = ["Business", "Owner", "Documents", "Review"] as const;

type StepKey = (typeof steps)[number];

type StepConfig = {
  key: StepKey;
  title: string;
  description: string;
};

const stepConfig: StepConfig[] = [
  {
    key: "Business",
    title: "Business details",
    description: "Tell us about your company and registration details.",
  },
  {
    key: "Owner",
    title: "Owner information",
    description: "Provide the primary owner or director details.",
  },
  {
    key: "Documents",
    title: "Verification documents",
    description: "Add a government-issued ID for verification.",
  },
  {
    key: "Review",
    title: "Review and submit",
    description: "Confirm the details before submitting for review.",
  },
];

const emptyProfile: KycProfile = {
  businessName: "",
  businessType: "",
  registrationNumber: "",
  country: "",
  website: "",
  ownerName: "",
  ownerEmail: "",
  ownerPhone: "",
  ownerIdNumber: "",
  documentType: "",
  documentNumber: "",
  consent: false,
};

export default function KycPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<KycProfile>(emptyProfile);
  const [status, setStatus] = useState<KycStatus>("not_started");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const currentStep = stepConfig[stepIndex];
  const router = useRouter();

  const businessForm = useForm<BusinessFormValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: useMemo(
      () => ({
        businessName: draft.businessName,
        businessType: draft.businessType,
        registrationNumber: draft.registrationNumber,
        country: draft.country,
        website: draft.website,
      }),
      [draft],
    ),
    mode: "onBlur",
  });

  const ownerForm = useForm<OwnerFormValues>({
    resolver: zodResolver(ownerSchema),
    defaultValues: useMemo(
      () => ({
        ownerName: draft.ownerName,
        ownerEmail: draft.ownerEmail,
        ownerPhone: draft.ownerPhone,
        ownerIdNumber: draft.ownerIdNumber,
      }),
      [draft],
    ),
    mode: "onBlur",
  });

  const documentsForm = useForm<DocumentsFormValues>({
    resolver: zodResolver(documentsSchema),
    defaultValues: useMemo(
      () => ({
        documentType: draft.documentType,
        documentNumber: draft.documentNumber,
        consent: draft.consent,
      }),
      [draft],
    ),
    mode: "onBlur",
  });

  useEffect(() => {
    const stored = loadKycDraft();
    if (stored) {
      setDraft(stored.draft);
      setStepIndex(stored.stepIndex);
      setStatus(stored.status);
      setSavedAt(stored.savedAt);
    }
  }, []);

  useEffect(() => {
    if (stepIndex === 0) {
      businessForm.reset({
        businessName: draft.businessName,
        businessType: draft.businessType,
        registrationNumber: draft.registrationNumber,
        country: draft.country,
        website: draft.website,
      });
    }
    if (stepIndex === 1) {
      ownerForm.reset({
        ownerName: draft.ownerName,
        ownerEmail: draft.ownerEmail,
        ownerPhone: draft.ownerPhone,
        ownerIdNumber: draft.ownerIdNumber,
      });
    }
    if (stepIndex === 2) {
      documentsForm.reset({
        documentType: draft.documentType,
        documentNumber: draft.documentNumber,
        consent: draft.consent,
      });
    }
  }, [stepIndex, draft, businessForm, ownerForm, documentsForm]);

  const persistDraft = (
    nextDraft: KycProfile,
    nextStep: number,
    nextStatus: KycStatus,
  ) => {
    const timestamp = new Date().toISOString();
    saveKycDraft({
      draft: nextDraft,
      stepIndex: nextStep,
      status: nextStatus,
      savedAt: timestamp,
    });
    setSavedAt(timestamp);
  };

  const saveAndExit = (nextDraft: KycProfile) => {
    persistDraft(nextDraft, stepIndex, status);
    router.push("/dashboard");
  };

  const handleBusinessNext = (values: BusinessFormValues) => {
    const nextDraft = { ...draft, ...values };
    setDraft(nextDraft);
    setStepIndex(1);
    persistDraft(nextDraft, 1, status);
  };

  const handleOwnerNext = (values: OwnerFormValues) => {
    const nextDraft = { ...draft, ...values };
    setDraft(nextDraft);
    setStepIndex(2);
    persistDraft(nextDraft, 2, status);
  };

  const handleDocumentsNext = (values: DocumentsFormValues) => {
    const nextDraft = { ...draft, ...values };
    setDraft(nextDraft);
    setStepIndex(3);
    persistDraft(nextDraft, 3, status);
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    try {
      const nextStatus = await submitKyc(draft);
      setStatus(nextStatus);
      persistDraft(draft, stepIndex, nextStatus);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit KYC details.",
      );
    }
  };

  const handleStatusUpdate = async (nextStatus: KycStatus) => {
    const updated = await setKycStatus(nextStatus);
    setStatus(updated);
    persistDraft(draft, stepIndex, updated);
  };

  const isSubmitted = status === "pending" || status === "approved";

  return (
    <MotionPage className="space-y-8">
      <MotionItem>
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
            KYC
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Business verification
          </h1>
          <p className="text-sm text-slate-600">
            Complete the onboarding checklist to unlock higher limits and payout
            access.
          </p>
          {savedAt ? (
            <p className="text-xs text-slate-500">
              Draft saved {new Date(savedAt).toLocaleString()}
            </p>
          ) : null}
        </header>
      </MotionItem>

      <MotionItem>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-3">
              {stepConfig.map((step, index) => (
                <div
                  key={step.key}
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-sm",
                    stepIndex === index
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-500",
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                    Step {index + 1}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {step.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </aside>

            <section>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  {currentStep.title}
                </h2>
                <p className="text-sm text-slate-600">
                  {currentStep.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">
                    Mock status:
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => void handleStatusUpdate("pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => void handleStatusUpdate("approved")}
                  >
                    Approved
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => void handleStatusUpdate("rejected")}
                  >
                    Rejected
                  </Button>
                </div>
              </div>

              {stepIndex === 0 ? (
                <form
                  className="space-y-4"
                  onSubmit={businessForm.handleSubmit(handleBusinessNext)}
                >
                  <Input
                    label="Business name"
                    placeholder="TopiPay Limited"
                    error={businessForm.formState.errors.businessName?.message}
                    {...businessForm.register("businessName")}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">
                        Business type
                      </span>
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        {...businessForm.register("businessType")}
                      >
                        <option value="">Select type</option>
                        <option value="llc">LLC</option>
                        <option value="corporation">Corporation</option>
                        <option value="sole">Sole proprietorship</option>
                        <option value="partnership">Partnership</option>
                      </select>
                      {businessForm.formState.errors.businessType?.message ? (
                        <span className="text-xs text-rose-600">
                          {businessForm.formState.errors.businessType?.message}
                        </span>
                      ) : null}
                    </label>
                    <Input
                      label="Registration number"
                      placeholder="RC-102933"
                      error={
                        businessForm.formState.errors.registrationNumber
                          ?.message
                      }
                      {...businessForm.register("registrationNumber")}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Country"
                      placeholder="United States"
                      error={businessForm.formState.errors.country?.message}
                      {...businessForm.register("country")}
                    />
                    <Input
                      label="Website"
                      placeholder="https://topipay.co"
                      error={businessForm.formState.errors.website?.message}
                      {...businessForm.register("website")}
                    />
                  </div>
                  <div className="flex justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        saveAndExit({
                          ...draft,
                          ...businessForm.getValues(),
                        })
                      }
                    >
                      Save & exit
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              ) : null}

              {stepIndex === 1 ? (
                <form
                  className="space-y-4"
                  onSubmit={ownerForm.handleSubmit(handleOwnerNext)}
                >
                  <Input
                    label="Owner full name"
                    placeholder="Avery Jordan"
                    error={ownerForm.formState.errors.ownerName?.message}
                    {...ownerForm.register("ownerName")}
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Owner email"
                      type="email"
                      placeholder="avery@topipay.com"
                      error={ownerForm.formState.errors.ownerEmail?.message}
                      {...ownerForm.register("ownerEmail")}
                    />
                    <Input
                      label="Owner phone"
                      placeholder="+1 555 041 9988"
                      error={ownerForm.formState.errors.ownerPhone?.message}
                      {...ownerForm.register("ownerPhone")}
                    />
                  </div>
                  <Input
                    label="Government ID number"
                    placeholder="A12349002"
                    error={ownerForm.formState.errors.ownerIdNumber?.message}
                    {...ownerForm.register("ownerIdNumber")}
                  />
                  <div className="flex justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStepIndex(0)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        saveAndExit({
                          ...draft,
                          ...ownerForm.getValues(),
                        })
                      }
                    >
                      Save & exit
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              ) : null}

              {stepIndex === 2 ? (
                <form
                  className="space-y-4"
                  onSubmit={documentsForm.handleSubmit(handleDocumentsNext)}
                >
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
                    Uploading is mocked for now. Provide a document type and
                    reference to continue.
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm text-slate-700">
                      <span className="font-medium text-slate-900">
                        Document type
                      </span>
                      <select
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        {...documentsForm.register("documentType")}
                      >
                        <option value="">Select type</option>
                        <option value="passport">Passport</option>
                        <option value="drivers_license">
                          Driver's license
                        </option>
                        <option value="national_id">National ID</option>
                      </select>
                      {documentsForm.formState.errors.documentType?.message ? (
                        <span className="text-xs text-rose-600">
                          {documentsForm.formState.errors.documentType?.message}
                        </span>
                      ) : null}
                    </label>
                    <Input
                      label="Document reference"
                      placeholder="ID-2026-0021"
                      error={
                        documentsForm.formState.errors.documentNumber?.message
                      }
                      {...documentsForm.register("documentNumber")}
                    />
                  </div>
                  <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                      {...documentsForm.register("consent")}
                    />
                    <span>
                      I confirm the information provided is accurate and I am
                      authorized to submit these documents.
                    </span>
                  </label>
                  {documentsForm.formState.errors.consent?.message ? (
                    <p className="text-xs text-rose-600">
                      {documentsForm.formState.errors.consent?.message}
                    </p>
                  ) : null}
                  <div className="flex justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStepIndex(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        saveAndExit({
                          ...draft,
                          ...documentsForm.getValues(),
                        })
                      }
                    >
                      Save & exit
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              ) : null}

              {stepIndex === 3 ? (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">
                      Review details
                    </p>
                    <div className="mt-3 grid gap-2 text-xs">
                      <span>Business: {draft.businessName}</span>
                      <span>Type: {draft.businessType}</span>
                      <span>Registration: {draft.registrationNumber}</span>
                      <span>Country: {draft.country}</span>
                      <span>Website: {draft.website || "-"}</span>
                      <span>Owner: {draft.ownerName}</span>
                      <span>Email: {draft.ownerEmail}</span>
                      <span>Phone: {draft.ownerPhone}</span>
                      <span>ID Number: {draft.ownerIdNumber}</span>
                      <span>Document: {draft.documentType}</span>
                      <span>Document Ref: {draft.documentNumber}</span>
                    </div>
                  </div>

                  {submitError ? (
                    <p className="text-sm text-rose-600">{submitError}</p>
                  ) : null}

                  {isSubmitted ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                      Submission received. Your verification is now {status}.
                    </div>
                  ) : null}

                  <div className="flex justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStepIndex(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => saveAndExit(draft)}
                    >
                      Save & exit
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                      Submit for review
                    </Button>
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </MotionItem>
    </MotionPage>
  );
}
