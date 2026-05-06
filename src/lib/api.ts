import axios from "axios";
import type {
  AuthSession,
  KycProfile,
  KycStatus,
  Transaction,
  User,
} from "@/types";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  name: string;
  email: string;
  company: string;
  acceptTerms: boolean;
};

type OTPPayload = {
  code: string;
};

type SetPasswordPayload = {
  password: string;
};

type SignupResponse = {
  email: string;
  status: "otp_sent";
};

type OTPResponse = {
  verified: boolean;
};

const mockUser: User = {
  id: "user_1024",
  name: "Avery Jordan",
  email: "avery@topipay.com",
};

const mockTransactions: Transaction[] = [
  {
    id: "txn_8401",
    merchant: "Nova Freight",
    amount: -420.12,
    status: "Completed",
    date: "2026-04-29",
  },
  {
    id: "txn_8400",
    merchant: "Inbound payout",
    amount: 1275.5,
    status: "Settled",
    date: "2026-04-28",
  },
  {
    id: "txn_8399",
    merchant: "Lumen Cards",
    amount: -89.99,
    status: "Completed",
    date: "2026-04-28",
  },
  {
    id: "txn_8398",
    merchant: "Starlight Labs",
    amount: -315.75,
    status: "Completed",
    date: "2026-04-27",
  },
  {
    id: "txn_8397",
    merchant: "Inbound payout",
    amount: 820.25,
    status: "Settled",
    date: "2026-04-26",
  },
  {
    id: "txn_8396",
    merchant: "Bluepeak Hosting",
    amount: -64.0,
    status: "Completed",
    date: "2026-04-26",
  },
];

let mockKycStatus: KycStatus = "not_started";
let mockKycProfile: KycProfile | null = null;

function simulate<T>(data: T, delay = 700): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

function simulateError(message: string, delay = 700): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
}

export async function login(payload: LoginPayload): Promise<AuthSession> {
  if (!payload.email || !payload.password) {
    return simulateError("Missing credentials.");
  }

  return simulate({
    user: { ...mockUser, email: payload.email },
    token: "mock-token-124",
  });
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  if (!payload.acceptTerms) {
    return simulateError("Please accept the terms to continue.");
  }

  return simulate({
    email: payload.email,
    status: "otp_sent",
  });
}

export async function verifyOTP(payload: OTPPayload): Promise<OTPResponse> {
  if (payload.code !== "123456") {
    return simulateError("Invalid verification code.");
  }

  return simulate({ verified: true });
}

export async function setPassword(
  payload: SetPasswordPayload,
): Promise<{ status: "ok" }> {
  if (!payload.password) {
    return simulateError("Password is required.");
  }

  return simulate({ status: "ok" });
}

export async function getUser(): Promise<User> {
  return simulate(mockUser);
}

export async function getTransactions(): Promise<Transaction[]> {
  return simulate(mockTransactions);
}

export async function submitKyc(profile: KycProfile): Promise<KycStatus> {
  mockKycProfile = profile;
  mockKycStatus = "pending";
  return simulate(mockKycStatus, 900);
}

export async function getKycStatus(): Promise<KycStatus> {
  return simulate(mockKycStatus);
}

export async function getKycProfile(): Promise<KycProfile | null> {
  return simulate(mockKycProfile);
}

export async function setKycStatus(nextStatus: KycStatus): Promise<KycStatus> {
  mockKycStatus = nextStatus;
  return simulate(mockKycStatus, 400);
}
