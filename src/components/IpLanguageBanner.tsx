import { cookies } from "next/headers";
import { Globe2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { countryLocale, localeMeta, type Locale } from "@/i18n/routing";
import { IpLanguageBannerActions } from "./IpLanguageBannerActions";

const DISMISS_COOKIE = "techsawai_locale_banner_dismissed";

/**
 * Rendered on the server so the notice is part of the initial HTML. A
 * client-injected banner used to be the LCP element and caused the site's only
 * layout shift. Cookie-based dismissal keeps the server and client in sync.
 */
export async function IpLanguageBanner({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const store = await cookies();
  const country = (store.get("ip_country")?.value ?? "").toUpperCase();
  const suggested = countryLocale[country];

  if (!suggested || suggested === locale) {
    return null;
  }

  // Keep the old per-country/per-language dismissal semantics: switching
  // country or suggested language can show the notice again.
  let dismissed = false;
  const dismissValue = store.get(DISMISS_COOKIE)?.value;
  try {
    dismissed = decodeURIComponent(dismissValue ?? "") === `${country}:${suggested}`;
  } catch {
    dismissed = dismissValue === `${country}:${suggested}`;
  }
  if (dismissed) return null;

  const t = await getTranslations({ locale, namespace: "banner" });
  let countryName = country;
  try {
    countryName = new Intl.DisplayNames([locale], { type: "region" }).of(country) ?? country;
  } catch {
    countryName = country;
  }
  const languageName = localeMeta[suggested].name;

  return (
    <div data-locale-banner className="relative z-40 border-b border-brand-100 bg-brand-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-2.5 text-sm text-brand-950 sm:px-6">
        <Globe2 className="h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />
        <p className="min-w-0 flex-1">
          {t("message", { country: countryName, language: languageName })}
        </p>
        <IpLanguageBannerActions
          target={suggested}
          dismissKey={`${country}:${suggested}`}
          switchLabel={t("switch", { language: languageName })}
          dismissLabel={t("dismiss")}
        />
      </div>
    </div>
  );
}
