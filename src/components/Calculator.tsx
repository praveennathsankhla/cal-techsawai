"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RotateCcw, Sparkles, TriangleAlert } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getCalculator } from "@/lib/calculators";
import type { Values } from "@/lib/calculators/types";
import { defaultUnitSystem } from "@/i18n/routing";
import { cn, formatNumber } from "@/lib/utils";

type Systems = { metric: Values; imperial: Values };

export function Calculator({ slug }: { slug: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const calculator = getCalculator(slug);
  const [system, setSystem] = useState<"metric" | "imperial">(() => defaultUnitSystem(locale));
  const [copied, setCopied] = useState(false);

  const [values, setValues] = useState<Systems>(() => {
    const calc = getCalculator(slug);
    const build = (unitSystem: "metric" | "imperial"): Values => {
      const next: Values = {};
      calc?.fields.forEach((field) => {
        next[field.id] = field.kind === "select" ? field.default : String(field[unitSystem].default);
      });
      return next;
    };
    return { metric: build("metric"), imperial: build("imperial") };
  });

  const current = values[system];

  const result = useMemo(() => {
    if (!calculator) return { items: [] };
    return calculator.calculate(current, system);
  }, [calculator, current, system]);

  if (!calculator) return null;

  const reset = () => {
    const next: Values = {};
    calculator.fields.forEach((field) => {
      next[field.id] = field.kind === "select" ? field.default : String(field[system].default);
    });
    setValues((prev) => ({ ...prev, [system]: next }));
    setCopied(false);
  };

  const update = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [system]: { ...prev[system], [id]: value } }));
  };

  const formattedItems = result.items.map((item) => {
    const value =
      typeof item.value === "number"
        ? formatNumber(locale, item.value, item.decimals ?? 2)
        : item.value;
    return { ...item, display: `${value}${item.unit ? ` ${item.unit}` : ""}` };
  });

  const copy = async () => {
    const text = formattedItems.map((item) => `${item.label}: ${item.display}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id={`calculator-${slug}`}
      aria-label={t("tool.inputs")}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-5 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900">{t("tool.inputs")}</h2>
            {!calculator.unitless && (
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5" role="group" aria-label={t("common.unitSystem")}>
                {(["metric", "imperial"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSystem(option)}
                    aria-pressed={system === option}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                      system === option
                        ? "bg-white text-brand-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800",
                    )}
                  >
                    {t(`common.${option}`)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {calculator.fields.map((field) => {
              const id = `field-${slug}-${field.id}`;
              if (field.kind === "select") {
                return (
                  <div key={field.id} className={cn(field.options.length > 4 && "sm:col-span-2")}>
                    <label htmlFor={id} className="mb-1.5 flex items-center justify-between gap-2 text-sm font-medium text-slate-700">
                      <span>{field.label}</span>
                    </label>
                    <select
                      id={id}
                      value={current[field.id] ?? field.default}
                      onChange={(event) => update(field.id, event.target.value)}
                      className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {field.help && <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{field.help}</p>}
                  </div>
                );
              }

              const config = field[system];
              return (
                <div key={field.id}>
                  <label htmlFor={id} className="mb-1.5 flex items-center justify-between gap-2 text-sm font-medium text-slate-700">
                    <span>{field.label}</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {config.unit}
                    </span>
                  </label>
                  <input
                    id={id}
                    type="number"
                    inputMode="decimal"
                    value={current[field.id] ?? ""}
                    onChange={(event) => update(field.id, event.target.value)}
                    min={config.min}
                    max={config.max}
                    step={config.step ?? 0.1}
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-base font-medium tabular-nums text-slate-900 shadow-xs outline-none transition placeholder:text-slate-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
                  />
                  {field.help && <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{field.help}</p>}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById(`result-${slug}`);
                target?.scrollIntoView({ behavior: "smooth", block: "center" });
                target?.focus({ preventScroll: true });
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t("common.calculate")}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t("common.reset")}
            </button>
            <p className="text-xs text-slate-400">{t("tool.resultHint")}</p>
          </div>
        </div>

        <div
          id={`result-${slug}`}
          tabIndex={-1}
          aria-live="polite"
          className="relative flex flex-col bg-gradient-to-br from-brand-800 via-brand-800 to-teal-950 p-5 text-white outline-none sm:p-6 lg:p-8"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-100/90">
              {t("tool.outputs")}
            </h2>
            {result.items.length > 0 && (
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
              >
                {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                {copied ? t("common.copied") : t("common.copy")}
              </button>
            )}
          </div>

          {result.error ? (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-amber-300/40 bg-amber-400/10 p-3 text-sm text-amber-100">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>{result.error}</p>
            </div>
          ) : (
            <>
              <div className="mt-6">
                {formattedItems[0] && (
                  <>
                    <p className="text-xs font-medium text-brand-100/80">{formattedItems[0].label}</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                      {formattedItems[0].display}
                    </p>
                  </>
                )}
              </div>

              <dl className="mt-6 space-y-3 border-t border-white/15 pt-5">
                {formattedItems.slice(1).map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4">
                    <dt className="text-sm text-brand-100/80">
                      {item.label}
                      {item.hint && <span className="mt-0.5 block text-[11px] leading-snug text-brand-100/50">{item.hint}</span>}
                    </dt>
                    <dd className="shrink-0 text-right text-sm font-semibold tabular-nums text-white">{item.display}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {result.note && (
            <p className="mt-6 rounded-xl bg-black/15 p-3 text-xs leading-relaxed text-brand-50/80">
              {result.note}
            </p>
          )}

          <p className="mt-auto pt-6 text-[11px] leading-relaxed text-brand-100/55">{t("tool.disclaimer")}</p>
        </div>
      </div>

      {result.table && (
        <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-900">{result.table.title ?? t("common.results")}</h3>
          <div className="mt-3 max-h-80 overflow-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead className="sticky top-0 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {result.table.columns.map((column) => (
                    <th key={column} scope="col" className="px-3 py-2.5 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.table.rows.map((row) => (
                  <tr key={String(row[0])} className="hover:bg-brand-50/40">
                    {row.map((cell, index) => (
                      <td key={index} className={cn("px-3 py-2 tabular-nums", index === 0 ? "font-medium text-slate-900" : "text-slate-600")}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
