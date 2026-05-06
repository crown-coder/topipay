export type User = {
  id: string;
  name: string;
  email: string;
};

export type Transaction = {
  id: string;
  merchant: string;
  amount: number;
  status: "Completed" | "Pending" | "Settled" | "Failed";
  date: string;
};

export type AuthSession = {
  user: User;
  token: string;
};

export type KycStatus = "not_started" | "pending" | "approved" | "rejected";

export type KycProfile = {
  businessName: string;
  businessType: string;
  registrationNumber: string;
  country: string;
  website: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerIdNumber: string;
  documentType: string;
  documentNumber: string;
  consent: boolean;
};
