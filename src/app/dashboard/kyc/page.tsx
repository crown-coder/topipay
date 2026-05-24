"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { MotionItem, MotionPage } from "@/components/ui/Motion";
import { setKycStatus, submitKyc } from "@/lib/api";
import {
  accountSchema,
  boardSchema,
  bvnSchema,
  businessSchema,
  registrationSchema,
  type AccountFormValues,
  type BoardFormValues,
  type BvnFormValues,
  type BusinessFormValues,
  type RegistrationFormValues,
} from "@/lib/validations/kyc";
import type { KycProfile, KycStatus } from "@/types";
import { cn } from "@/lib/utils";
import { loadKycDraft, saveKycDraft } from "@/lib/kycStorage";

const steps = ["Business", "Account", "BVN", "Board", "Registration"] as const;

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
    description: "Provide your business identity and address details.",
  },
  {
    key: "Account",
    title: "Account information",
    description: "Add the settlement account for collections.",
  },
  {
    key: "BVN",
    title: "BVN information",
    description: "Provide your BVN and registered phone number.",
  },
  {
    key: "Board",
    title: "Board member information",
    description: "Upload NIN card and recent utility bill.",
  },
  {
    key: "Registration",
    title: "Business registration documents",
    description: "Upload statutory and incorporation documents.",
  },
];

const emptyProfile: KycProfile = {
  businessInformation: "",
  businessCountry: "",
  businessState: "",
  businessLga: "",
  businessAddress: "",
  businessWebsite: "",
  businessLogo: "",
  socialMedia: "",
  bankSearch: "",
  accountNumber: "",
  bvn: "",
  bvnPhone: "",
  nin: "",
  ninCardFile: "",
  utilityBillFile: "",
  boardResolutionFile: "",
  cacDocumentFile: "",
  companyProfileFile: "",
  memorandumFile: "",
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
        businessInformation: draft.businessInformation,
        businessCountry: draft.businessCountry,
        businessState: draft.businessState,
        businessLga: draft.businessLga,
        businessAddress: draft.businessAddress,
        businessWebsite: draft.businessWebsite,
        socialMedia: draft.socialMedia,
      }),
      [draft],
    ),
    mode: "onBlur",
  });

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: useMemo(
      () => ({
        bankSearch: draft.bankSearch,
        accountNumber: draft.accountNumber,
      }),
      [draft],
    ),
    mode: "onBlur",
  });

  const bvnForm = useForm<BvnFormValues>({
    resolver: zodResolver(bvnSchema),
    defaultValues: useMemo(
      () => ({
        bvn: draft.bvn,
        bvnPhone: draft.bvnPhone,
      }),
      [draft],
    ),
    mode: "onBlur",
  });

  const boardForm = useForm<BoardFormValues>({
    resolver: zodResolver(boardSchema),
    defaultValues: useMemo(
      () => ({
        nin: draft.nin,
      }),
      [draft],
    ),
    mode: "onBlur",
  });

  const registrationForm = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: useMemo(
      () => ({
        boardResolutionFile: undefined,
        cacDocumentFile: undefined,
        companyProfileFile: undefined,
        memorandumFile: undefined,
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
        businessInformation: draft.businessInformation,
        businessCountry: draft.businessCountry,
        businessState: draft.businessState,
        businessLga: draft.businessLga,
        businessAddress: draft.businessAddress,
        businessWebsite: draft.businessWebsite,
        socialMedia: draft.socialMedia,
      });
    }
    if (stepIndex === 1) {
      accountForm.reset({
        bankSearch: draft.bankSearch,
        accountNumber: draft.accountNumber,
      });
    }
    if (stepIndex === 2) {
      bvnForm.reset({
        bvn: draft.bvn,
        bvnPhone: draft.bvnPhone,
      });
    }
    if (stepIndex === 3) {
      boardForm.reset({
        nin: draft.nin,
      });
    }
    if (stepIndex === 4) {
      registrationForm.reset({
        boardResolutionFile: undefined,
        cacDocumentFile: undefined,
        companyProfileFile: undefined,
        memorandumFile: undefined,
      });
    }
  }, [
    stepIndex,
    draft,
    businessForm,
    accountForm,
    bvnForm,
    boardForm,
    registrationForm,
  ]);

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
    const nextDraft = {
      ...draft,
      businessInformation: values.businessInformation,
      businessCountry: values.businessCountry,
      businessState: values.businessState,
      businessLga: values.businessLga,
      businessAddress: values.businessAddress,
      businessWebsite: values.businessWebsite ?? "",
      socialMedia: values.socialMedia ?? "",
      businessLogo: values.businessLogo?.item(0)?.name ?? draft.businessLogo,
    };
    setDraft(nextDraft);
    setStepIndex(1);
    persistDraft(nextDraft, 1, status);
  };

  const handleDemoNext = (nextStep: number, nextDraft: KycProfile) => {
    setDraft(nextDraft);
    setStepIndex(nextStep);
    persistDraft(nextDraft, nextStep, status);
  };

  const handleAccountNext = (values: AccountFormValues) => {
    const nextDraft = { ...draft, ...values };
    setDraft(nextDraft);
    setStepIndex(2);
    persistDraft(nextDraft, 2, status);
  };

  const handleBvnNext = (values: BvnFormValues) => {
    const nextDraft = { ...draft, ...values };
    setDraft(nextDraft);
    setStepIndex(3);
    persistDraft(nextDraft, 3, status);
  };

  const handleBoardNext = (values: BoardFormValues) => {
    const nextDraft = {
      ...draft,
      nin: values.nin,
      ninCardFile: values.ninCardFile?.item(0)?.name ?? draft.ninCardFile,
      utilityBillFile:
        values.utilityBillFile?.item(0)?.name ?? draft.utilityBillFile,
    };
    setDraft(nextDraft);
    setStepIndex(4);
    persistDraft(nextDraft, 4, status);
  };

  const handleRegistrationNext = (values: RegistrationFormValues) => {
    const nextDraft = {
      ...draft,
      boardResolutionFile:
        values.boardResolutionFile?.item(0)?.name ?? draft.boardResolutionFile,
      cacDocumentFile:
        values.cacDocumentFile?.item(0)?.name ?? draft.cacDocumentFile,
      companyProfileFile:
        values.companyProfileFile?.item(0)?.name ?? draft.companyProfileFile,
      memorandumFile:
        values.memorandumFile?.item(0)?.name ?? draft.memorandumFile,
    };
    setDraft(nextDraft);
    persistDraft(nextDraft, 4, status);
  };

  const handleRegistrationSubmit = async (
    values: RegistrationFormValues,
    submitNow: boolean,
  ) => {
    const nextDraft = {
      ...draft,
      boardResolutionFile:
        values.boardResolutionFile?.item(0)?.name ?? draft.boardResolutionFile,
      cacDocumentFile:
        values.cacDocumentFile?.item(0)?.name ?? draft.cacDocumentFile,
      companyProfileFile:
        values.companyProfileFile?.item(0)?.name ?? draft.companyProfileFile,
      memorandumFile:
        values.memorandumFile?.item(0)?.name ?? draft.memorandumFile,
    };
    setDraft(nextDraft);
    persistDraft(nextDraft, 4, status);
    if (submitNow) {
      setSubmitError(null);
      try {
        const nextStatus = await submitKyc(nextDraft);
        setStatus(nextStatus);
        persistDraft(nextDraft, stepIndex, nextStatus);
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Unable to submit KYC details.",
        );
      }
    }
  };

  const handleStatusUpdate = async (nextStatus: KycStatus) => {
    const updated = await setKycStatus(nextStatus);
    setStatus(updated);
    persistDraft(draft, stepIndex, updated);
  };

  const isSubmitted = status === "pending" || status === "approved";
  const statusTone =
    status === "approved"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "pending"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : status === "rejected"
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : "border-slate-200 bg-slate-100 text-slate-600";

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
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
              statusTone,
            )}
          >
            Status: {status.replace("_", " ")}
          </span>
          {savedAt ? (
            <p className="text-xs text-slate-500">
              Draft saved {new Date(savedAt).toLocaleString()}
            </p>
          ) : null}
        </header>
      </MotionItem>

      <MotionItem>
        <div className="rounded-3xl border border-blue-100/80 bg-gradient-to-br from-white via-white to-blue-50/60 p-6 shadow-sm">
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
                <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50/70 px-3 py-2 text-xs text-slate-600">
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
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      Business information
                    </span>
                    <textarea
                      className="min-h-[110px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Describe what your business does"
                      {...businessForm.register("businessInformation")}
                    />
                    {businessForm.formState.errors.businessInformation
                      ?.message ? (
                      <span className="text-xs text-rose-600">
                        {
                          businessForm.formState.errors.businessInformation
                            ?.message
                        }
                      </span>
                    ) : null}
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Country of business"
                      placeholder="Nigeria"
                      error={
                        businessForm.formState.errors.businessCountry?.message
                      }
                      {...businessForm.register("businessCountry")}
                    />
                    <Input
                      label="State of business"
                      placeholder="Lagos"
                      error={
                        businessForm.formState.errors.businessState?.message
                      }
                      {...businessForm.register("businessState")}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Local government area"
                      placeholder="Ikeja"
                      error={businessForm.formState.errors.businessLga?.message}
                      {...businessForm.register("businessLga")}
                    />
                    <Input
                      label="Business address"
                      placeholder="12, Obafemi Awolowo Way"
                      error={
                        businessForm.formState.errors.businessAddress?.message
                      }
                      {...businessForm.register("businessAddress")}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Business website"
                      placeholder="https://topipay.co"
                      error={
                        businessForm.formState.errors.businessWebsite?.message
                      }
                      {...businessForm.register("businessWebsite")}
                    />
                    <Input
                      label="Social media (optional)"
                      placeholder="https://linkedin.com/company/topipay"
                      error={businessForm.formState.errors.socialMedia?.message}
                      {...businessForm.register("socialMedia")}
                    />
                  </div>
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      Business logo upload
                    </span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                      {...businessForm.register("businessLogo")}
                    />
                    {businessForm.formState.errors.businessLogo?.message ? (
                      <span className="text-xs text-rose-600">
                        {businessForm.formState.errors.businessLogo?.message}
                      </span>
                    ) : null}
                  </label>
                  <div className="flex justify-between gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        saveAndExit({
                          ...draft,
                          ...businessForm.getValues(),
                          businessLogo:
                            businessForm.getValues().businessLogo?.item(0)
                              ?.name ?? draft.businessLogo,
                        })
                      }
                    >
                      Save & exit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        handleDemoNext(1, {
                          ...draft,
                          ...businessForm.getValues(),
                          businessLogo:
                            businessForm.getValues().businessLogo?.item(0)
                              ?.name ?? draft.businessLogo,
                        })
                      }
                    >
                      Skip for demo
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              ) : null}

              {stepIndex === 1 ? (
                <form
                  className="space-y-4"
                  onSubmit={accountForm.handleSubmit(handleAccountNext)}
                >
                  <Input
                    label="Search bank"
                    placeholder="Search bank"
                    error={accountForm.formState.errors.bankSearch?.message}
                    {...accountForm.register("bankSearch")}
                  />
                  <Input
                    label="Account number"
                    placeholder="0123456789"
                    error={accountForm.formState.errors.accountNumber?.message}
                    {...accountForm.register("accountNumber")}
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
                          ...accountForm.getValues(),
                        })
                      }
                    >
                      Save & exit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        handleDemoNext(2, {
                          ...draft,
                          ...accountForm.getValues(),
                        })
                      }
                    >
                      Skip for demo
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              ) : null}

              {stepIndex === 2 ? (
                <form
                  className="space-y-4"
                  onSubmit={bvnForm.handleSubmit(handleBvnNext)}
                >
                  <Input
                    label="BVN"
                    placeholder="12345678901"
                    error={bvnForm.formState.errors.bvn?.message}
                    {...bvnForm.register("bvn")}
                  />
                  <Input
                    label="Phone number"
                    placeholder="+234 802 123 4567"
                    error={bvnForm.formState.errors.bvnPhone?.message}
                    {...bvnForm.register("bvnPhone")}
                  />
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
                          ...bvnForm.getValues(),
                        })
                      }
                    >
                      Save & exit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        handleDemoNext(3, {
                          ...draft,
                          ...bvnForm.getValues(),
                        })
                      }
                    >
                      Skip for demo
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              ) : null}

              {stepIndex === 3 ? (
                <form
                  className="space-y-4"
                  onSubmit={boardForm.handleSubmit(handleBoardNext)}
                >
                  <Input
                    label="NIN"
                    placeholder="12345678901"
                    error={boardForm.formState.errors.nin?.message}
                    {...boardForm.register("nin")}
                  />
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      Valid NIN card (image or pdf)
                    </span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                      {...boardForm.register("ninCardFile")}
                    />
                    {boardForm.formState.errors.ninCardFile?.message ? (
                      <span className="text-xs text-rose-600">
                        {boardForm.formState.errors.ninCardFile?.message}
                      </span>
                    ) : null}
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      Utility bill (image or pdf)
                    </span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                      {...boardForm.register("utilityBillFile")}
                    />
                    {boardForm.formState.errors.utilityBillFile?.message ? (
                      <span className="text-xs text-rose-600">
                        {boardForm.formState.errors.utilityBillFile?.message}
                      </span>
                    ) : null}
                  </label>
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
                      onClick={() =>
                        saveAndExit({
                          ...draft,
                          ...boardForm.getValues(),
                          ninCardFile:
                            boardForm.getValues().ninCardFile?.item(0)?.name ??
                            draft.ninCardFile,
                          utilityBillFile:
                            boardForm.getValues().utilityBillFile?.item(0)
                              ?.name ?? draft.utilityBillFile,
                        })
                      }
                    >
                      Save & exit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        handleDemoNext(4, {
                          ...draft,
                          ...boardForm.getValues(),
                          ninCardFile:
                            boardForm.getValues().ninCardFile?.item(0)?.name ??
                            draft.ninCardFile,
                          utilityBillFile:
                            boardForm.getValues().utilityBillFile?.item(0)
                              ?.name ?? draft.utilityBillFile,
                        })
                      }
                    >
                      Skip for demo
                    </Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              ) : null}

              {stepIndex === 4 ? (
                <form
                  className="space-y-4"
                  onSubmit={registrationForm.handleSubmit((values) =>
                    handleRegistrationSubmit(values, true),
                  )}
                >
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      Board resolution (image or pdf)
                    </span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                      {...registrationForm.register("boardResolutionFile")}
                    />
                    {registrationForm.formState.errors.boardResolutionFile
                      ?.message ? (
                      <span className="text-xs text-rose-600">
                        {
                          registrationForm.formState.errors.boardResolutionFile
                            ?.message
                        }
                      </span>
                    ) : null}
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      CAC document (image or pdf)
                    </span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                      {...registrationForm.register("cacDocumentFile")}
                    />
                    {registrationForm.formState.errors.cacDocumentFile
                      ?.message ? (
                      <span className="text-xs text-rose-600">
                        {
                          registrationForm.formState.errors.cacDocumentFile
                            ?.message
                        }
                      </span>
                    ) : null}
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      Company profile (image or pdf)
                    </span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                      {...registrationForm.register("companyProfileFile")}
                    />
                    {registrationForm.formState.errors.companyProfileFile
                      ?.message ? (
                      <span className="text-xs text-rose-600">
                        {
                          registrationForm.formState.errors.companyProfileFile
                            ?.message
                        }
                      </span>
                    ) : null}
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">
                      Memorandum & articles of association (image or pdf)
                    </span>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm"
                      {...registrationForm.register("memorandumFile")}
                    />
                    {registrationForm.formState.errors.memorandumFile
                      ?.message ? (
                      <span className="text-xs text-rose-600">
                        {
                          registrationForm.formState.errors.memorandumFile
                            ?.message
                        }
                      </span>
                    ) : null}
                  </label>
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
                      onClick={() => setStepIndex(3)}
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        handleRegistrationSubmit(
                          registrationForm.getValues(),
                          true,
                        )
                      }
                    >
                      Skip for demo
                    </Button>
                    <Button type="submit">Submit for review</Button>
                  </div>
                </form>
              ) : null}
            </section>
          </div>
        </div>
      </MotionItem>
    </MotionPage>
  );
}
