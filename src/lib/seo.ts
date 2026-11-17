import { locales } from "@/i18n/routing";
import { SITE } from "@/config/site";

export function canonicalUrl(locale: string, path = ""): string {
  const clean = path === "/" ? "" : path;
  return `${SITE.url}/${locale}${clean}`;
}

export function languageAlternates(path = ""): Record<string, string> {
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE.url}/${locale}${clean}`;
  }
  languages["x-default"] = `${SITE.url}/en${clean}`;
  return languages;
}

export function alternatesFor(locale: string, path = "") {
  return {
    canonical: canonicalUrl(locale, path),
    languages: languageAlternates(path),
  };
}
