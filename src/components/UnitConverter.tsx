"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { defaultUnitSystem } from "@/i18n/routing";
import {
  convert,
  unitCategories,
  unitSymbol,
  type UnitCategoryId,
} from "@/lib/units";
import { cn, formatNumber } from "@/lib/utils";

const categoryIds: UnitCategoryId[] = [
  "length",
  "weight",
  "temperature",
  "volume",
  "area",
  "speed",
  "data",
];

export function UnitConverter() {
  const t = useTranslations("unitConverter");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [category, setCategory] = useState<UnitCategoryId>("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [precision, setPrecision] = useState("2");
  const [copied, setCopied] = useState(false);

  const config = unitCategories[category];
  const numeric = Number.parseFloat(value.replace(",", "."));
  const digits = Number.parseInt(precision, 10);
  const result = Number.isFinite(numeric) ? convert(numeric, from, to, category) : Number.NaN;

  const rows = useMemo(() => {
    if (!Number.isFinite(numeric)) return [];
    return config.units
      .map((unit) => ({
        ...unit,
        converted: convert(numeric, from, unit.id, category),
      }))
      .filter((unit) => Number.isFinite(unit.converted));
  }, [category, config.units, from, numeric]);

  const switchCategory = (next: UnitCategoryId) => {
    const nextConfig = unitCategories[next];
    const system = defaultUnitSystem(locale);
    setCategory(next);
    setFrom(system === "metric" ? nextConfig.metricDefault : nextConfig.imperialDefault);
    setTo(system === "metric" ? nextConfig.imperialDefault : nextConfig.metricDefault);
    setValue(next === "temperature" ? "20" : "1");
    setCopied(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${formatNumber(locale, numeric, 6)} ${unitSymbol(category, from)} = ${formatNumber(locale, result, digits)} ${unitSymbol(category, to)}`,
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6 lg:p-8">
        <h2 className="text-base font-semibold text-slate-900">{t("category")}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categoryIds.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => switchCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "min-h-9 rounded-lg border px-3 text-xs font-semibold transition",
                category === item
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-800",
              )}
            >
              {t(item)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="unit-value" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t("value")}
              </label>
              <input
                id="unit-value"
                type="number"
                inputMode="decimal"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-base font-medium tabular-nums text-slate-900 shadow-xs outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
              />
            </div>
            <div>
              <label htmlFor="unit-precision" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t("precision")}
              </label>
              <select
                id="unit-precision"
                value={precision}
                onChange={(event) => setPrecision(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
              >
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <div>
              <label htmlFor="unit-from" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t("from")}
              </label>
              <select
                id="unit-from"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
              >
                {config.units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              aria-label={t("swap")}
              className="mb-1 inline-flex h-11 w-11 items-center justify-center justify-self-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-brand-300 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <ArrowLeftRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <div>
              <label htmlFor="unit-to" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t("to")}
              </label>
              <select
                id="unit-to"
                value={to}
                onChange={(event) => setTo(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
              >
                {config.units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setValue("")}
              className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              {tc("reset")}
            </button>
            <p className="text-xs text-slate-500">
              {t("from")} {unitSymbol(category, from)} → {unitSymbol(category, to)}
            </p>
          </div>
        </div>

        <div className="flex flex-col bg-gradient-to-br from-brand-800 via-brand-800 to-teal-950 p-5 text-white sm:p-6 lg:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-100/90">{t("result")}</h2>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
            >
              {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
              {copied ? tc("copied") : tc("copy")}
            </button>
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium text-brand-100/80">
              {formatNumber(locale, numeric, 4)} {unitSymbol(category, from)}
            </p>
            <p className="mt-1 break-words text-3xl font-bold tracking-tight sm:text-4xl" aria-live="polite">
              {Number.isFinite(result) ? formatNumber(locale, result, digits) : "—"}{" "}
              <span className="text-xl font-semibold text-brand-100/90">{unitSymbol(category, to)}</span>
            </p>
          </div>

          <dl className="mt-7 space-y-2.5 border-t border-white/15 pt-5">
            {rows.slice(0, 8).map((unit) => (
              <div key={unit.id} className="flex items-center justify-between gap-3 text-sm">
                <dt className="text-brand-100/75">
                  {unit.label} <span className="text-brand-100/40">({unit.symbol})</span>
                </dt>
                <dd className="shrink-0 font-semibold tabular-nums text-white">
                  {formatNumber(locale, unit.converted, digits)}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-auto pt-6 text-[11px] leading-relaxed text-brand-100/55">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
