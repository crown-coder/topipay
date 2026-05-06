import type { KycProfile, KycStatus } from "@/types";

const KYC_STORAGE_KEY = "topipay_kyc_draft";

export type StoredKycDraft = {
  draft: KycProfile;
  stepIndex: number;
  status: KycStatus;
  savedAt: string;
};

export function loadKycDraft(): StoredKycDraft | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KYC_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredKycDraft;
  } catch {
    return null;
  }
}

export function saveKycDraft(data: StoredKycDraft): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(data));
}

export function clearKycDraft(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KYC_STORAGE_KEY);
}
