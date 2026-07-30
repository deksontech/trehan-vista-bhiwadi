import { NextRequest, NextResponse } from "next/server";
import { hasLeadEmailConfig, sendLeadEmail } from "@/lib/lead-email";
import { leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

const RATE_WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const requests = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

export async function POST(request: NextRequest) {
  const key = getClientKey(request);
  const now = Date.now();
  const bucket = requests.get(key);

  if (bucket && bucket.resetAt > now && bucket.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { ok: false, message: "Please wait a moment before submitting again." },
      { status: 429 },
    );
  }

  requests.set(key, {
    count: bucket && bucket.resetAt > now ? bucket.count + 1 : 1,
    resetAt: bucket && bucket.resetAt > now ? bucket.resetAt : now + RATE_WINDOW_MS,
  });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    ...parsed.data,
    phone: parsed.data.phone.replace(/\s|-/g, ""),
    submittedAt: new Date().toISOString(),
    serverSource: "trehan-vista-landing-page",
    ipHashKey: key,
  };

  if (process.env.NODE_ENV !== "production") {
    console.info("Trehan Vista lead received", lead);
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    try {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      console.error("Lead webhook failed", error);
    }
  }

  const isEmailConfigured = hasLeadEmailConfig();

  if (process.env.NODE_ENV === "production" && !isEmailConfigured) {
    console.error("Lead email is not configured");

    return NextResponse.json(
      {
        ok: false,
        message:
          "Lead email notification is not configured. Please call or WhatsApp the sales team.",
      },
      { status: 503 },
    );
  }

  if (isEmailConfigured) {
    try {
      await sendLeadEmail(lead);
    } catch (error) {
      console.error("Lead email failed", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Your details were received, but email notification failed. Please call or WhatsApp the sales team.",
        },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you for your interest in Trehan Vista. The project team will contact you shortly.",
  });
}
