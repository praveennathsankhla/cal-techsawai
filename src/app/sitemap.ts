import type { MetadataRoute } from "next";
import { categoryIds, tools } from "@/data/tools";
import { locales } from "@/i18n/routing";
import { SITE } from "@/config/site";
import { canonicalUrl, languageAlternates } from "@/lib/seo";
import { toolHreflangLocales } from "@/data/content/localized";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const entries: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
  ...categoryIds.map((category) => ({
    path: `/category/${category}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
  ...tools.map((tool) => ({
    path: `/tools/${tool.slug}`,
    changeFrequency: "monthly" as const,
    priority: tool.popular ? 0.8 : 0.7,
  })),
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SITE.contentUpdated}T00:00:00Z`);
  const toolPrefix = "/tools/";

  const sharedEntries = entries
    .filter((entry) => !entry.path.startsWith(toolPrefix))
    .flatMap((entry) =>
      locales.map((locale) => ({
        url: canonicalUrl(locale, entry.path),
        lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: { languages: languageAlternates(entry.path) },
      })),
    );

  const toolEntries = entries
    .filter((entry) => entry.path.startsWith(toolPrefix))
    .flatMap((entry) => {
      const slug = entry.path.slice(toolPrefix.length);
      const allowedLocales = toolHreflangLocales(slug);
      return allowedLocales.map((locale) => ({
        url: canonicalUrl(locale, entry.path),
        lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: { languages: languageAlternates(entry.path, allowedLocales) },
      }));
    });

  return [...sharedEntries, ...toolEntries];
}
