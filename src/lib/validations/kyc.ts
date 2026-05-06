import { z } from "zod";

export const businessSchema = z.object({
  businessName: z.string().min(2, "Enter your business name."),
  businessType: z.string().min(2, "Select a business type."),
  registrationNumber: z.string().min(4, "Enter a registration number."),
  country: z.string().min(2, "Enter a country."),
  website: z
    .string()
    .url("Enter a valid website URL.")
    .optional()
    .or(z.literal("")),
});

export type BusinessFormValues = z.infer<typeof businessSchema>;

export const ownerSchema = z.object({
  ownerName: z.string().min(2, "Enter the owner full name."),
  ownerEmail: z.string().email("Enter a valid email address."),
  ownerPhone: z.string().min(7, "Enter a valid phone number."),
  ownerIdNumber: z.string().min(4, "Enter an ID number."),
});

export type OwnerFormValues = z.infer<typeof ownerSchema>;

export const documentsSchema = z.object({
  documentType: z.string().min(2, "Select a document type."),
  documentNumber: z.string().min(4, "Enter a document reference."),
  consent: z
    .boolean()
    .refine((value) => value, "You must accept the declaration."),
});

export type DocumentsFormValues = z.infer<typeof documentsSchema>;
