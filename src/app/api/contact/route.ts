import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { SITE } from "@/config/site";

type Body = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  locale?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

async function sendWithResend(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  locale: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.CONTACT_FROM_EMAIL || `TechSawai <onboarding@resend.dev>`;
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `[TechSawai] ${payload.subject}`,
        text: [
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          `Locale: ${payload.locale}`,
          "",
          payload.message,
        ].join("\n"),
        html: `
          <h2>New TechSawai message</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Locale:</strong> ${escapeHtml(payload.locale)}</p>
          <hr />
          <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
        `,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function persist(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "contact-messages.jsonl"), `${JSON.stringify(payload)}\n`, "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: pretend success so bots do not retry.
  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const subject = clean(body.subject, 160);
  const message = clean(body.message, 4000);
  const locale = clean(body.locale, 16) || "en";

  if (!name || !email || !subject || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const record = {
    name,
    email,
    subject,
    message,
    locale,
    receivedAt: new Date().toISOString(),
    ip,
  };

  const [emailed, saved] = await Promise.all([sendWithResend(record), persist(record)]);

  if (!emailed && !saved) {
    return NextResponse.json({ ok: false, error: "Could not store the message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, emailed });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
