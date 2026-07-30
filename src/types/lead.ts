export type ApartmentPreference =
  | "2 BHK"
  | "3 BHK"
  | "4 BHK"
  | "Need Help Choosing";

export type EnquiryType =
  | "Latest Price List"
  | "Site Visit"
  | "Project Brochure"
  | "Floor Plan"
  | "Furnishing Details"
  | "Payment Plan"
  | "Loan Assistance"
  | "General Enquiry";

export type LeadPayload = {
  fullName: string;
  phone: string;
  email?: string;
  apartmentPreference: ApartmentPreference;
  budgetRange?: string;
  enquiryType: EnquiryType;
  preferredVisitDate?: string;
  message?: string;
  consent: boolean;
  pageUrl?: string;
  referrer?: string;
  enquirySource?: string;
  ctaClicked?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  company?: string;
};
