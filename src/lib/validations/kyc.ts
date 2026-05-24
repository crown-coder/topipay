import { z } from "zod";

export const businessSchema = z.object({
  businessInformation: z
    .string()
    .min(2, "Enter business information.")
    .max(120, "Keep it under 120 characters."),
  businessCountry: z.string().min(2, "Enter the country of business."),
  businessState: z.string().min(2, "Enter the state of business."),
  businessLga: z
    .string()
    .min(2, "Enter the local government area of business."),
  businessAddress: z.string().min(4, "Enter the business address."),
  businessWebsite: z
    .string()
    .url("Enter a valid business website.")
    .optional()
    .or(z.literal("")),
  businessLogo: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "Upload a business logo.",
  ),
  socialMedia: z
    .string()
    .url("Enter a valid social media URL.")
    .optional()
    .or(z.literal("")),
});

export type BusinessFormValues = z.infer<typeof businessSchema>;

export const accountSchema = z.object({
  bankSearch: z.string().min(2, "Search for a bank."),
  accountNumber: z.string().min(8, "Enter an account number."),
});

export type AccountFormValues = z.infer<typeof accountSchema>;

export const bvnSchema = z.object({
  bvn: z.string().min(11, "Enter a valid BVN."),
  bvnPhone: z.string().min(7, "Enter a valid phone number."),
});

export type BvnFormValues = z.infer<typeof bvnSchema>;

export const boardSchema = z.object({
  nin: z.string().min(5, "Enter a valid NIN."),
  ninCardFile: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "Upload a valid NIN card.",
  ),
  utilityBillFile: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "Upload a utility bill.",
  ),
});

export type BoardFormValues = z.infer<typeof boardSchema>;

export const registrationSchema = z.object({
  boardResolutionFile: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "Upload a board resolution.",
  ),
  cacDocumentFile: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "Upload a CAC document.",
  ),
  companyProfileFile: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "Upload a company profile.",
  ),
  memorandumFile: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "Upload the memorandum and articles of association.",
  ),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
