type AnalyticsEvent =
  | "lead_form_started"
  | "lead_form_submitted"
  | "site_visit_requested"
  | "price_list_requested"
  | "brochure_requested"
  | "floor_plan_requested"
  | "furnishing_details_requested"
  | "payment_plan_requested"
  | "loan_assistance_requested"
  | "phone_clicked"
  | "whatsapp_clicked"
  | "map_clicked"
  | "configuration_selected";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer?.push({ event, ...params });
  window.gtag?.("event", event, params);
  window.fbq?.("trackCustom", event, params);
}

export function eventForEnquiry(enquiryType: string): AnalyticsEvent {
  const map: Record<string, AnalyticsEvent> = {
    "Site Visit": "site_visit_requested",
    "Latest Price List": "price_list_requested",
    "Project Brochure": "brochure_requested",
    "Floor Plan": "floor_plan_requested",
    "Furnishing Details": "furnishing_details_requested",
    "Payment Plan": "payment_plan_requested",
    "Loan Assistance": "loan_assistance_requested",
  };

  return map[enquiryType] ?? "lead_form_started";
}
