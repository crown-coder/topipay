"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getKycStatus } from "@/lib/api";
import { loadKycDraft } from "@/lib/kycStorage";
import type { KycStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusMap: Record<KycStatus, { label: string; className: string }> = {
  not_started: {
    label: "Not started",
    className: "bg-slate-100 text-slate-700",
  },
  pending: { label: "Pending review", className: "bg-amber-50 text-amber-700" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-700" },
  rejected: { label: "Rejected", className: "bg-rose-50 text-rose-700" },
};

export default function KycStatusCard() {
  const [status, setStatus] = useState<KycStatus>("not_started");
  const [draftStep, setDraftStep] = useState<number | null>(null);

  useEffect(() => {
    const stored = loadKycDraft();
    if (stored?.status) {
      setStatus(stored.status);
      setDraftStep(stored.stepIndex);
      return;
    }

    void getKycStatus()
      .then(setStatus)
      .catch(() => setStatus("not_started"));
  }, []);

  const badge = statusMap[status];
  const hasDraft = typeof draftStep === "number";
  const stepLabel = hasDraft ? `Step ${draftStep + 1} of 4` : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">KYC status</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Business verification
          </h3>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </div>
      {stepLabel ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {stepLabel}
          </span>
          {status !== "approved" ? (
            <Link
              href="/dashboard/kyc"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Resume KYC
            </Link>
          ) : null}
        </div>
      ) : null}
      <p className="mt-4 text-sm text-slate-600">
        Complete verification to unlock higher transfer limits and payout
        access.
      </p>
    </div>
  );
}
