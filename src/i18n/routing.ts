import { defineRouting } from "next-intl/routing";

export const locales = [
  "en",
  "hi",
  "ta",
  "te",
  "bn",
  "mr",
  "gu",
  "kn",
  "ml",
  "pa",
  "or",
  "ur",
  "id",
  "vi",
  "tr",
  "pl",
  "pt-BR",
  "tl",
] as const;

export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { name: string; english: string; dir: "ltr" | "rtl" }> = {
  en: { name: "English", english: "English", dir: "ltr" },
  hi: { name: "हिन्दी", english: "Hindi", dir: "ltr" },
  ta: { name: "தமிழ்", english: "Tamil", dir: "ltr" },
  te: { name: "తెలుగు", english: "Telugu", dir: "ltr" },
  bn: { name: "বাংলা", english: "Bengali", dir: "ltr" },
  mr: { name: "मराठी", english: "Marathi", dir: "ltr" },
  gu: { name: "ગુજરાતી", english: "Gujarati", dir: "ltr" },
  kn: { name: "ಕನ್ನಡ", english: "Kannada", dir: "ltr" },
  ml: { name: "മലയാളം", english: "Malayalam", dir: "ltr" },
  pa: { name: "ਪੰਜਾਬੀ", english: "Punjabi", dir: "ltr" },
  or: { name: "ଓଡ଼ିଆ", english: "Odia", dir: "ltr" },
  ur: { name: "اردو", english: "Urdu", dir: "rtl" },
  id: { name: "Bahasa Indonesia", english: "Indonesian", dir: "ltr" },
  vi: { name: "Tiếng Việt", english: "Vietnamese", dir: "ltr" },
  tr: { name: "Türkçe", english: "Turkish", dir: "ltr" },
  pl: { name: "Polski", english: "Polish", dir: "ltr" },
  "pt-BR": { name: "Português (Brasil)", english: "Brazilian Portuguese", dir: "ltr" },
  tl: { name: "Tagalog", english: "Tagalog", dir: "ltr" },
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

/** Country → recommended locale. Only countries where we have a matching language. */
export const countryLocale: Record<string, Locale> = {
  IN: "hi",
  ID: "id",
  VN: "vi",
  TR: "tr",
  PL: "pl",
  BR: "pt-BR",
  PH: "tl",
  PK: "ur",
  BD: "bn",
};

/** Locale-based default measurement system used by calculators. */
export function defaultUnitSystem(locale: string): "metric" | "imperial" {
  return locale === "en" ? "imperial" : "metric";
}
