import nodemailer from "nodemailer";
import type { LeadFormValues } from "@/lib/validation";

type LeadRecord = LeadFormValues & {
  phone: string;
  submittedAt: string;
  serverSource: string;
  ipHashKey: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function leadRows(lead: LeadRecord) {
  const rows: Array<[string, unknown]> = [
    ["Name", lead.fullName],
    ["Phone", lead.phone],
    ["Email", lead.email || "Not provided"],
    ["Apartment Preference", lead.apartmentPreference],
    ["Budget Range", lead.budgetRange || "Not selected"],
    ["Enquiry Type", lead.enquiryType],
    ["Preferred Visit Date", lead.preferredVisitDate || "Not selected"],
    ["Message", lead.message || "Not provided"],
    ["CTA Clicked", lead.ctaClicked || "Not captured"],
    ["Enquiry Source", lead.enquirySource || "Not captured"],
    ["Page URL", lead.pageUrl || "Not captured"],
    ["Referrer", lead.referrer || "Not captured"],
    ["UTM Source", lead.utm_source || "Not captured"],
    ["UTM Medium", lead.utm_medium || "Not captured"],
    ["UTM Campaign", lead.utm_campaign || "Not captured"],
    ["UTM Content", lead.utm_content || "Not captured"],
    ["UTM Term", lead.utm_term || "Not captured"],
    ["Submitted At", lead.submittedAt],
  ];

  return rows;
}

export async function sendLeadEmail(lead: LeadRecord) {
  const host = requiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || 465);
  const user = requiredEnv("SMTP_USER");
  const pass = requiredEnv("SMTP_PASS");
  const from = process.env.SMTP_FROM || user;
  const to = process.env.LEAD_NOTIFICATION_EMAIL || user;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const rows = leadRows(lead);
  const text = rows.map(([label, value]) => `${label}: ${value || ""}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="border:1px solid #ded7cb;padding:10px;font-weight:700;background:#f7f3ea;">${escapeHtml(label)}</td>
          <td style="border:1px solid #ded7cb;padding:10px;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  await transporter.sendMail({
    from: `"Trehan Vista Leads" <${from}>`,
    to,
    replyTo: lead.email || from,
    subject: `New Trehan Vista Lead - ${lead.enquiryType}`,
    text,
    html: `
      <div style="font-family:Arial,sans-serif;color:#161512;line-height:1.5;">
        <h2 style="margin:0 0 12px;">New Trehan Vista Lead</h2>
        <p style="margin:0 0 18px;color:#6d6962;">A new enquiry was submitted from the Trehan Vista landing page.</p>
        <table style="border-collapse:collapse;width:100%;max-width:760px;">${htmlRows}</table>
      </div>
    `,
  });
}
