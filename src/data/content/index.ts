import type { ToolContent } from "./construction";
import { constructionContent } from "./construction";
import { hobbyContent } from "./hobby";
import { universalContent } from "./universal";

export type { ToolContent };

export const toolContent: Record<string, ToolContent> = {
  ...constructionContent,
  ...hobbyContent,
  ...universalContent,
};

export const getToolContent = (slug: string): ToolContent | undefined => toolContent[slug];
