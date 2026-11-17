"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { tools } from "@/data/tools";
import { ToolIcon } from "@/components/ToolIcon";
import { cn } from "@/lib/utils";

export function ToolSearch({
  variant = "header",
  autoFocus = false,
  onNavigate,
}: {
  variant?: "header" | "hero";
  autoFocus?: boolean;
  onNavigate?: () => void;
}) {
  const t = useTranslations();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const scored = tools
      .map((tool) => {
        const name = t(`toolNames.${tool.slug}`).toLowerCase();
        const category = t(`categories.${tool.category}`).toLowerCase();
        const haystack = `${name} ${tool.name} ${tool.short} ${tool.keywords.join(" ")} ${category}`.toLowerCase();
        let score = 0;
        if (name === term) score += 100;
        if (name.startsWith(term)) score += 40;
        if (name.includes(term)) score += 20;
        if (tool.keywords.some((word) => word.toLowerCase() === term)) score += 15;
        if (haystack.includes(term)) score += 5;
        return { tool, score, name };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 8);
  }, [query, t]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (results[0]) {
      setOpen(false);
      setQuery("");
      onNavigate?.();
      router.push(`/tools/${results[0].tool.slug}` as never);
    }
  };

  const isHero = variant === "hero";

  return (
    <div className="relative w-full">
      <form onSubmit={submit} role="search" className="relative">
        <Search
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400",
            isHero ? "h-5 w-5" : "h-4 w-4",
          )}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open && query.length > 0}
          aria-controls="tool-search-results"
          aria-label={t("nav.search")}
          autoFocus={autoFocus}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          placeholder={isHero ? t("home.searchPlaceholder") : t("nav.searchPlaceholder")}
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10",
            isHero ? "h-14 pl-12 pr-12 text-base sm:text-lg" : "h-10 pl-10 pr-9 text-sm",
            "[&::-webkit-search-cancel-button]:hidden",
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label={t("common.close")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </form>

      {open && query.trim().length > 0 && (
        <div
          id="tool-search-results"
          role="listbox"
          onMouseDown={(event) => event.preventDefault()}
          className={cn(
            "absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-900/15",
            isHero && "sm:mt-3",
          )}
        >
          {results.length > 0 ? (
            <>
              <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {t("home.toolsFound", { count: results.length })}
              </p>
              {results.map(({ tool, name }) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                    onNavigate?.();
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-brand-50 focus-visible:bg-brand-50 focus-visible:outline-none"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <ToolIcon name={tool.icon} className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-slate-900">{name}</span>
                    <span className="block truncate text-xs text-slate-500">
                      {t(`categories.${tool.category}`)} · {t("common.free")}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
                </Link>
              ))}
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-medium text-slate-700">{t("home.noResults")}</p>
              <p className="mt-1 text-xs text-slate-500">{t("home.searchHint")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
