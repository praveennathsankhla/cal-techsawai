import type { ToolContent } from "./construction";
import { constructionContent } from "./construction";
import { hobbyContent } from "./hobby";
import { universalContent } from "./universal";
import { getLocalizedContent, mergeToolContent } from "./localized";

export type { ToolContent };
export { getLocalizedContent, hasTranslatedToolContent, toolHreflangLocales } from "./localized";

export const toolContent: Record<string, ToolContent> = {
  ...constructionContent,
  ...hobbyContent,
  ...universalContent,
};

export const getToolContent = (slug: string): ToolContent | undefined => toolContent[slug];

/** Locale-aware content for the tool detail page. Formulas always stay in English. */
export const getLocalizedToolContent = (locale: string, slug: string): ToolContent | undefined => {
  const base = toolContent[slug];
  if (!base) return undefined;
  return mergeToolContent(base, getLocalizedContent(locale, slug));
};
