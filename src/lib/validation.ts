import { z } from "zod";

export const apartmentPreferences = [
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Need Help Choosing",
] as const;

export const enquiryTypes = [
  "Latest Price List",
  "Site Visit",
  "Project Brochure",
  "Floor Plan",
  "Furnishing Details",
  "Payment Plan",
  "Loan Assistance",
  "General Enquiry",
] as const;

export const budgetRanges = [
  "Below ₹25 lakh",
  "₹25 lakh to ₹35 lakh",
  "₹35 lakh to ₹45 lakh",
  "₹45 lakh to ₹55 lakh",
  "Above ₹55 lakh",
] as const;

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: "Enter a valid email address",
    }),
  apartmentPreference: z.enum(apartmentPreferences, {
    error: "Please select an apartment preference",
  }),
  budgetRange: z.string().optional(),
  enquiryType: z.enum(enquiryTypes, {
    error: "Please select an enquiry type",
  }),
  preferredVisitDate: z.string().optional(),
  message: z.string().max(600, "Message is too long").optional(),
  consent: z
    .boolean()
    .refine((value) => value === true, "Please consent to be contacted"),
  pageUrl: z.string().optional(),
  referrer: z.string().optional(),
  enquirySource: z.string().optional(),
  ctaClicked: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  company: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
