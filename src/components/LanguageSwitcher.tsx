"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { setLocaleCookie } from "@/i18n/locale-cookie";
import { localeMeta, locales } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("languages");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentLanguage = localeMeta[locale as keyof typeof localeMeta]?.name ?? "English";

  const choose = (next: string) => {
    setOpen(false);
    setLocaleCookie(next);
    const search = typeof window === "undefined" ? "" : window.location.search;
    startTransition(() => {
      router.replace(`${pathname}${search}` as never, { locale: next } as never);
      router.refresh();
    });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t("label")}: ${currentLanguage}`}
        className={cn(
          "inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-sm font-medium text-slate-700 shadow-xs transition hover:border-brand-300 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          isPending && "opacity-60",
        )}
      >
        <Globe2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
        {!compact && <span className="hidden sm:inline">{currentLanguage}</span>}
        <span className="sm:hidden">{locale.split("-")[0].toUpperCase()}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 z-50 mt-2 max-h-[70vh] w-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
        >
          {locales.map((code) => {
            const active = code === locale;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => choose(code)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                  active ? "bg-brand-50 font-semibold text-brand-800" : "text-slate-700 hover:bg-slate-50",
                )}
              >
                <span className="flex items-baseline gap-2">
                  <span>{localeMeta[code].name}</span>
                  {localeMeta[code].name !== localeMeta[code].english && (
                    <span className="text-xs text-slate-500">{localeMeta[code].english}</span>
                  )}
                </span>
                {active && <Check className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
