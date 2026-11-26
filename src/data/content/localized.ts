import type { LocalizedToolContent, ToolContent } from "./construction";
import { hiContent } from "./locales/hi";
import { urContent } from "./locales/ur";
import { taContent } from "./locales/ta";
import { bnContent } from "./locales/bn";

export type LocalizedContent = Record<string, LocalizedToolContent>;

/**
 * Locale -> slug -> translated sections. Locales not listed here keep the
 * English source until their reviewed translation is added.
 */
export const localizedContent: Record<string, LocalizedContent> = {
  hi: hiContent,
  ur: urContent,
  ta: taContent,
  bn: bnContent,
};

/**
 * Merge a translated section set over the English source. `formula.equation`
 * is deliberately never overridden: it is the calculator's formula and must
 * stay identical in every locale.
 */
export function mergeToolContent(base: ToolContent, override?: LocalizedToolContent): ToolContent {
  if (!override) return base;
  return {
    intro: override.intro ?? base.intro,
    howTo: override.howTo ?? base.howTo,
    formula: {
      equation: base.formula.equation,
      explanation: override.formula?.explanation ?? base.formula.explanation,
      example: override.formula?.example ?? base.formula.example,
    },
    faqs: override.faqs ?? base.faqs,
    tips: override.tips ?? base.tips,
  };
}

export function getLocalizedContent(locale: string, slug: string): LocalizedToolContent | undefined {
  return localizedContent[locale]?.[slug];
}

/** English is always indexable; other locales qualify only with real tool content. */
export function hasTranslatedToolContent(locale: string, slug: string): boolean {
  return locale === "en" || Boolean(localizedContent[locale]?.[slug]);
}

/** Locales that should appear in a tool page's hreflang set and the sitemap. */
export function toolHreflangLocales(slug: string): string[] {
  return [
    "en",
    ...Object.keys(localizedContent).filter((locale) => Boolean(localizedContent[locale]?.[slug])),
  ];
}
