"use client";

import { useState, useSyncExternalStore } from "react";
import { Globe2, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { setLocaleCookie } from "@/i18n/locale-cookie";
import { countryLocale, localeMeta, type Locale } from "@/i18n/routing";

const DISMISS_KEY = "techsawai_locale_banner_dismissed";

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] ?? ""
  );
}

/**
 * The suggestion is derived from cookies the proxy writes plus a dismissal in
 * localStorage, so it has to be read as an external store rather than state.
 */
function readSuggestion(locale: string): string {
  const code = readCookie("ip_country").toUpperCase();
  const suggested = countryLocale[code];
  if (!code || !suggested || suggested === locale) return "";
  const key = `${code}:${suggested}`;
  try {
    if (localStorage.getItem(DISMISS_KEY) === key) return "";
  } catch {
    // localStorage can be unavailable in private modes; the banner is still dismissible.
  }
  return key;
}

function subscribe() {
  return () => {};
}

export function IpLanguageBanner() {
  const t = useTranslations("banner");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const snapshot = useSyncExternalStore(
    subscribe,
    () => readSuggestion(locale),
    () => "",
  );
  const [hidden, setHidden] = useState("");

  if (!snapshot || hidden === snapshot) return null;

  const [country, target] = snapshot.split(":") as [string, Locale];

  let countryName = country;
  try {
    countryName = new Intl.DisplayNames([locale], { type: "region" }).of(country) ?? country;
  } catch {
    countryName = country;
  }
  const languageName = localeMeta[target].name;

  const dismiss = () => {
    setHidden(snapshot);
    try {
      localStorage.setItem(DISMISS_KEY, snapshot);
    } catch {
      // ignore
    }
  };

  const switchLanguage = () => {
    setLocaleCookie(target);
    const search = typeof window === "undefined" ? "" : window.location.search;
    router.replace(`${pathname}${search}` as never, { locale: target } as never);
    router.refresh();
    dismiss();
  };

  return (
    <div className="relative z-40 border-b border-brand-100 bg-brand-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2.5 text-sm text-brand-950 sm:px-6">
        <Globe2 className="h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
        <p className="min-w-0 flex-1">
          {t("message", { country: countryName, language: languageName })}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={switchLanguage}
            className="rounded-md bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {t("switch", { language: languageName })}
          </button>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("dismiss")}
            className="rounded-md p-1.5 text-brand-700 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
