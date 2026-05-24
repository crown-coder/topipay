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
  businessInformation: string;
  businessCountry: string;
  businessState: string;
  businessLga: string;
  businessAddress: string;
  businessWebsite: string;
  businessLogo: string;
  socialMedia: string;
  bankSearch: string;
  accountNumber: string;
  bvn: string;
  bvnPhone: string;
  nin: string;
  ninCardFile: string;
  utilityBillFile: string;
  boardResolutionFile: string;
  cacDocumentFile: string;
  companyProfileFile: string;
  memorandumFile: string;
};
