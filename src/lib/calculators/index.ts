import { constructionCalculators } from "@/lib/calculators/construction";
import { hobbyCalculators } from "@/lib/calculators/hobby";
import type { Calculator } from "@/lib/calculators/types";

export const calculators: Record<string, Calculator> = {
  ...constructionCalculators,
  ...hobbyCalculators,
};

export const getCalculator = (slug: string): Calculator | undefined => calculators[slug];
