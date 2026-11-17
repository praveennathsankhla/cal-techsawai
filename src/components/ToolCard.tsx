import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Clock3, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Tool } from "@/data/tools";
import { ToolIcon } from "@/components/ToolIcon";
import { cn } from "@/lib/utils";

const accents = {
  construction: {
    icon: "bg-brand-50 text-brand-700 ring-brand-100",
    chip: "bg-brand-50 text-brand-700",
  },
  hobby: {
    icon: "bg-amber-50 text-amber-700 ring-amber-100",
    chip: "bg-amber-50 text-amber-800",
  },
  universal: {
    icon: "bg-sky-50 text-sky-700 ring-sky-100",
    chip: "bg-sky-50 text-sky-700",
  },
} as const;

export function ToolCard({ tool, priority = false }: { tool: Tool; priority?: boolean }) {
  const t = useTranslations();
  const locale = useLocale();
  const accent = accents[tool.category];
  const name = t(`toolNames.${tool.slug}`);
  const description = locale === "en" ? tool.short : t("home.toolCardDescription");

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={cn("grid h-11 w-11 place-items-center rounded-xl ring-1", accent.icon)}>
          <ToolIcon name={tool.icon} className="h-5.5 w-5.5" />
        </span>
        {tool.popular ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {t("home.popularTag")}
          </span>
        ) : priority ? (
          <Clock3 className="h-4 w-4 text-slate-300" aria-hidden="true" />
        ) : null}
      </div>

      <span className={cn("mb-2 w-fit rounded-md px-1.5 py-0.5 text-[11px] font-medium", accent.chip)}>
        {t(`categories.${tool.category}`)}
      </span>
      <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-slate-900 group-hover:text-brand-800">
        {name}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">{description}</p>

      <span className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-brand-700">
        {t("home.viewTool")}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
