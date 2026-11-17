import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | TechSawai",
  description: "The page you are looking for does not exist. Browse the TechSawai calculators instead.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">404</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">This page does not exist</h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500">
            The link may be out of date, or the calculator may have moved. Head back to the tool directory to find what
            you need.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/en"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              TechSawai home
            </Link>
            <Link
              href="/en/tools"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800"
            >
              All calculators
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
