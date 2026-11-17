"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { categoryIds, tools, type CategoryId } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { cn } from "@/lib/utils";

export function ToolDirectory({
  initialCategory = "all",
  limit,
}: {
  initialCategory?: CategoryId | "all";
  limit?: number;
}) {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (category !== "all" && tool.category !== category) return false;
      if (!term) return true;
      const name = t(`toolNames.${tool.slug}`).toLowerCase();
      const categoryName = t(`categories.${tool.category}`).toLowerCase();
      return `${name} ${tool.name} ${tool.short} ${tool.keywords.join(" ")} ${categoryName}`
        .toLowerCase()
        .includes(term);
    });
  }, [category, query, t]);

  const visible = limit ? filtered.slice(0, limit) : filtered;
  const activeFilters = query.trim().length > 0 || category !== "all";

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t("nav.search")}
            placeholder={t("home.searchPlaceholder")}
            className="h-13 min-h-13 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-12 pr-11 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-500/10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("home.clearFilters")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 hidden items-center gap-1.5 text-xs font-medium text-slate-400 sm:flex">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          {(["all", ...categoryIds] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "min-h-9 rounded-full border px-3.5 text-xs font-semibold transition",
                category === item
                  ? "border-brand-700 bg-brand-700 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-800",
              )}
            >
              {item === "all" ? t("categories.all") : t(`categories.${item}`)}
            </button>
          ))}
          <span className="ml-auto text-xs font-medium tabular-nums text-slate-400">
            {t("home.toolsFound", { count: filtered.length })}
          </span>
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
          <p className="text-base font-semibold text-slate-800">{t("home.noResults")}</p>
          <p className="mt-1 text-sm text-slate-500">{t("home.searchHint")}</p>
          {activeFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-brand-700 px-4 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              {t("home.clearFilters")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
