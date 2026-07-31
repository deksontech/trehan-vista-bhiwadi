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
    gtag_report_conversion?: (url?: string) => boolean;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GOOGLE_ADS_LEAD_CONVERSION_ID = "AW-16950600138/azy9CLrLuMgaEMrD1pI_";
export const GOOGLE_ADS_CONFIG_ID = "AW-16950600138";

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

export function reportLeadConversion(url: string) {
  if (typeof window === "undefined") {
    return false;
  }

  if (typeof window.gtag_report_conversion === "function") {
    return window.gtag_report_conversion(url);
  }

  if (typeof window.gtag !== "function") {
    window.location.assign(url);
    return false;
  }

  let redirected = false;
  const redirect = () => {
    if (redirected) return;
    redirected = true;
    window.location.assign(url);
  };

  window.gtag("event", "conversion", {
    send_to: GOOGLE_ADS_LEAD_CONVERSION_ID,
    event_callback: redirect,
  });
  window.setTimeout(redirect, 900);
  return false;
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
