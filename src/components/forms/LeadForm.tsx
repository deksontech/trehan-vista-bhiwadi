"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { eventForEnquiry, trackEvent } from "@/lib/analytics";
import { collectLeadSource } from "@/lib/lead-source";
import {
  apartmentPreferences,
  budgetRanges,
  enquiryTypes,
  leadSchema,
  type LeadFormValues,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "25c24e80-ef96-42c2-a5b2-b47bc86ce783";
const NATIVE_FORM_TARGET = "trehan-vista-lead-fallback";
const THANK_YOU_PATH = "/thank-you";

type LeadSubmissionPayload = LeadFormValues & {
  enquirySource: string;
  ctaClicked: string;
  pageUrl?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  submittedAt: string;
  leadId: string;
};

type LeadFormProps = {
  compact?: boolean;
  defaultApartment?: LeadFormValues["apartmentPreference"];
  defaultEnquiry?: LeadFormValues["enquiryType"];
  ctaClicked?: string;
  source?: string;
};

export function LeadForm({
  compact,
  defaultApartment = "Need Help Choosing",
  defaultEnquiry = "General Enquiry",
  ctaClicked = "Lead Form",
  source = "Landing Page",
}: LeadFormProps) {
  const [serverError, setServerError] = useState("");
  const started = useRef(false);
  const leadSequence = useRef(0);

  const defaults = useMemo(
    () => ({
      fullName: "",
      phone: "",
      email: "",
      apartmentPreference: defaultApartment,
      budgetRange: "",
      enquiryType: defaultEnquiry,
      preferredVisitDate: "",
      message: "",
      consent: false,
      company: "",
    }),
    [defaultApartment, defaultEnquiry],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    reset(defaults);
  }, [defaults, reset]);

  const enquiryType = useWatch({ control, name: "enquiryType" });
  const showVisitDate = enquiryType === "Site Visit" || !compact;

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("lead_form_started", {
      enquiry_type: enquiryType,
      source,
      cta_clicked: ctaClicked,
    });
  }

  function buildWeb3FormsPayload(payload: LeadSubmissionPayload) {
    const web3Payload: Record<string, string> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Trehan Vista Lead - ${payload.enquiryType} - ${payload.submittedAt}`,
      from_name: "Trehan Vista Landing Page",
      lead_id: payload.leadId,
      submitted_at: payload.submittedAt,
      name: payload.fullName,
      phone: payload.phone,
      apartment_preference: payload.apartmentPreference,
      budget_range: payload.budgetRange || "Not selected",
      enquiry_type: payload.enquiryType,
      preferred_visit_date: payload.preferredVisitDate || "Not selected",
      message: payload.message || "Not provided",
      consent: payload.consent ? "Yes" : "No",
      cta_clicked: payload.ctaClicked,
      enquiry_source: payload.enquirySource,
      page_url: payload.pageUrl || "Not captured",
      referrer: payload.referrer || "Not captured",
      utm_source: payload.utm_source || "Not captured",
      utm_medium: payload.utm_medium || "Not captured",
      utm_campaign: payload.utm_campaign || "Not captured",
      utm_content: payload.utm_content || "Not captured",
      utm_term: payload.utm_term || "Not captured",
    };

    if (payload.email) {
      web3Payload.email = payload.email;
    }

    return web3Payload;
  }

  function submitViaHiddenForm(fields: Record<string, string>) {
    const form = document.createElement("form");
    form.action = WEB3FORMS_ENDPOINT;
    form.method = "POST";
    form.target = NATIVE_FORM_TARGET;
    form.style.display = "none";

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    window.setTimeout(() => form.remove(), 1500);
  }

  function markSubmitted(values: LeadFormValues) {
    trackEvent("lead_form_submitted", {
      enquiry_type: values.enquiryType,
      apartment_preference: values.apartmentPreference,
      cta_clicked: ctaClicked,
    });
    trackEvent(eventForEnquiry(values.enquiryType), {
      apartment_preference: values.apartmentPreference,
      cta_clicked: ctaClicked,
    });
    reset(defaults);
    window.location.assign(THANK_YOU_PATH);
  }

  async function onSubmit(values: LeadFormValues) {
    setServerError("");
    const submittedAt = new Date().toISOString();
    leadSequence.current += 1;
    const leadId =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${submittedAt}-${leadSequence.current}`;

    const payload = {
      ...values,
      ...collectLeadSource(),
      enquirySource: source,
      ctaClicked,
      submittedAt,
      leadId,
    };
    const web3Payload = buildWeb3FormsPayload(payload);

    let response: Response;
    let result: { success?: boolean; message?: string };

    try {
      response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(web3Payload),
      });

      result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
    } catch (error) {
      console.error("Web3Forms browser submission failed", error);
      submitViaHiddenForm(web3Payload);
      markSubmitted(values);
      return;
    }

    if (!response.ok || !result.success) {
      console.warn("Web3Forms AJAX submission failed, using native fallback", result);
      submitViaHiddenForm(web3Payload);
      markSubmitted(values);
      return;
    }

    markSubmitted(values);
  }

  return (
    <form
      action={WEB3FORMS_ENDPOINT}
      className="space-y-4"
      method="post"
      target={NATIVE_FORM_TARGET}
      // eslint-disable-next-line react-hooks/refs -- React Hook Form's handleSubmit is stable for submit binding.
      onSubmit={handleSubmit(onSubmit)}
      onFocus={markStarted}
    >
      <iframe className="hidden" name={NATIVE_FORM_TARGET} title="Lead form fallback" />
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value="New Trehan Vista Lead" />
      <input type="hidden" name="from_name" value="Trehan Vista Landing Page" />
      <input type="hidden" name="redirect" value={THANK_YOU_PATH} />
      <input
        {...register("company")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "md:grid-cols-2")}>
        <Field label="Full Name" error={errors.fullName?.message}>
          <input {...register("fullName")} autoComplete="name" className="input" />
        </Field>
        <Field label="Indian Mobile Number" error={errors.phone?.message}>
          <input {...register("phone")} autoComplete="tel" inputMode="tel" className="input" />
        </Field>
        {!compact ? (
          <Field label="Email Address" error={errors.email?.message}>
            <input {...register("email")} autoComplete="email" className="input" />
          </Field>
        ) : null}
        <Field label="Apartment Preference" error={errors.apartmentPreference?.message}>
          <select {...register("apartmentPreference")} className="input">
            {apartmentPreferences.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        {!compact ? (
          <Field label="Budget Range" error={errors.budgetRange?.message}>
            <select {...register("budgetRange")} className="input">
              <option value="">Select budget range</option>
              {budgetRanges.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
        ) : null}
        <Field label="Enquiry Type" error={errors.enquiryType?.message}>
          <select {...register("enquiryType")} className="input">
            {enquiryTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        {showVisitDate ? (
          <Field label="Preferred Site Visit Date" error={errors.preferredVisitDate?.message}>
            <div className="relative">
              <input {...register("preferredVisitDate")} type="date" className="input pr-10" />
              <CalendarDays
                className="pointer-events-none absolute right-3 top-3 text-[#B18A4A]"
                size={18}
              />
            </div>
          </Field>
        ) : null}
      </div>
      {!compact ? (
        <Field label="Message" error={errors.message?.message}>
          <textarea {...register("message")} rows={4} className="input resize-none" />
        </Field>
      ) : null}
      <label className="flex gap-3 text-sm leading-6 text-[#6D6962]">
        <input
          {...register("consent")}
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-[#B18A4A] accent-[#B18A4A]"
        />
        <span>
          I agree to be contacted by the authorised project sales team by phone, WhatsApp,
          SMS or email.
          {errors.consent ? (
            <span className="block text-[#9B2C2C]">{errors.consent.message}</span>
          ) : null}
        </span>
      </label>
      {serverError ? <p className="text-sm text-[#9B2C2C]">{serverError}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#B18A4A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#967238] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C29A] disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
        Request a Callback
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-[#161512]">
      <span>{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-1 block text-xs text-[#9B2C2C]">{error}</span> : null}
    </label>
  );
}
