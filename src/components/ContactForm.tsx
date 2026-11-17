"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/config/site";

type Status = "idle" | "sending" | "success" | "error";

const initial = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const t = useTranslations("contactForm");
  const tc = useTranslations("common");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const [values, setValues] = useState(initial);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [emailed, setEmailed] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof typeof initial, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!values.name.trim() || !values.email.trim() || !values.subject.trim() || values.message.trim().length < 10) {
      setStatus("error");
      setError(t("required"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      setStatus("error");
      setError(t("invalidEmail"));
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, locale }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; emailed?: boolean };
      if (!response.ok || !data.ok) throw new Error("request failed");

      setEmailed(Boolean(data.emailed));
      setStatus("success");
      setValues(initial);
    } catch {
      setStatus("error");
      setError(t("error", { email: SITE.email }));
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:p-8" role="status" aria-live="polite">
        <CheckCircle2 className="h-8 w-8 text-brand-700" aria-hidden="true" />
        <h2 className="mt-3 text-lg font-bold text-brand-950">{t("title")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-900/80">
          {emailed ? t("success") : t("successNoEmail", { email: SITE.email })}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="inline-flex min-h-10 items-center rounded-lg bg-brand-700 px-4 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            {t("title")}
          </button>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-10 items-center rounded-lg border border-brand-300 bg-white px-4 text-sm font-semibold text-brand-900 transition hover:bg-brand-100"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" noValidate>
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">{t("title")}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{t("subtitle")}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("name")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder={t("namePlaceholder")}
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-base text-slate-900 shadow-xs outline-none transition placeholder:text-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("email")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder={t("emailPlaceholder")}
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-base text-slate-900 shadow-xs outline-none transition placeholder:text-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("subject")} <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            maxLength={160}
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
            placeholder={t("subjectPlaceholder")}
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-base text-slate-900 shadow-xs outline-none transition placeholder:text-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t("message")} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            minLength={10}
            maxLength={4000}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder={t("messagePlaceholder")}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-base text-slate-900 shadow-xs outline-none transition placeholder:text-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
          />
        </div>
      </div>

      {/* Honeypot: hidden from people, attractive to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {status === "error" && error && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {status === "sending" ? tc("sending") : tc("send")}
        </button>
        <p className="text-xs text-slate-400">{t("responseTime")}</p>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        {t("privacy")}{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-700 underline underline-offset-2">
          {tf("privacy")}
        </Link>
      </p>
    </form>
  );
}
