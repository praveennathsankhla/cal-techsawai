"use client";

import { useEffect } from "react";
import { ArrowRight, Compass, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations();
  const title = `${t("notFound.title")} | ${t("meta.siteName")}`;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
        <Compass className="h-7 w-7" aria-hidden="true" />
      </span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">404</p>
      <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
        {t("notFound.heading")}
      </h1>
      <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-slate-500">
        {t("notFound.description")}
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          {t("nav.home")}
        </Link>
        <Link
          href="/tools"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-800"
        >
          {t("footer.allTools")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
