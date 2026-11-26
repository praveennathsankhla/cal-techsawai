import { locales } from "@/i18n/routing";
import { SITE } from "@/config/site";

export const socialImages = {
  openGraph: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  twitter: [SITE.ogImage],
};

export function canonicalUrl(locale: string, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `${SITE.url}/${locale}${clean}`;
}

export function languageAlternates(
  path = "",
  allowedLocales: readonly string[] = locales,
): Record<string, string> {
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const locale of allowedLocales) {
    languages[locale] = `${SITE.url}/${locale}${clean}`;
  }
  languages["x-default"] = `${SITE.url}/en${clean}`;
  return languages;
}

export function alternatesFor(
  locale: string,
  path = "",
  options?: { allowedLocales?: readonly string[]; canonicalLocale?: string },
) {
  const canonicalLocale = options?.canonicalLocale ?? locale;
  return {
    canonical: canonicalUrl(canonicalLocale, path),
    languages: languageAlternates(path, options?.allowedLocales ?? locales),
  };
}

/** Keep generated descriptions inside meta-description limits without cutting words. */
export function metaDescription(value: string, fallback: string, max = 160): string {
  const text = value.trim();
  if (!text) return fallback;
  if (text.length <= max) return text;
  const clipped = text.slice(0, max - 1);
  const boundary = clipped.lastIndexOf(" ");
  return `${boundary > max / 2 ? clipped.slice(0, boundary) : clipped.trimEnd()}…`;
}
