import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolCard } from "@/components/ToolCard";
import { ToolIcon } from "@/components/ToolIcon";
import { JsonLd } from "@/components/JsonLd";
import { categoryIds, toolsByCategory, type CategoryId } from "@/data/tools";
import { locales } from "@/i18n/routing";
import { SITE } from "@/config/site";
import { alternatesFor, socialImages } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string; category: string }> };

const isCategory = (value: string): value is CategoryId =>
  (categoryIds as string[]).includes(value);

export function generateStaticParams() {
  return locales.flatMap((locale) => categoryIds.map((category) => ({ locale, category })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isCategory(category)) return {};

  const t = await getTranslations({ locale });
  const categoryName = t(`categories.${category}`);
  const title = t("seo.categoryTitle", { category: categoryName });
  const description = t("seo.categoryDescription", { category: categoryName });

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, `/category/${category}`),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/category/${category}`,
      siteName: SITE.name,
      locale,
      type: "website",
      images: socialImages.openGraph,
    },
    twitter: { card: "summary_large_image", title, description, images: socialImages.twitter },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale, category } = await params;
  if (!isCategory(category)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations();
  const categoryTools = toolsByCategory(category);
  const categoryName = t(`categories.${category}`);
  const others = categoryIds.filter((item) => item !== category);
  const Icon = categoryTools[0]?.icon ?? "Calculator";

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: categoryName,
    description: t(`categoryDescriptions.${category}`),
    url: `${SITE.url}/${locale}/category/${category}`,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categoryTools.length,
      itemListElement: categoryTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: t(`toolNames.${tool.slug}`),
        url: `${SITE.url}/${locale}/tools/${tool.slug}`,
      })),
    },
  };

  return (
    <>
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-brand-50/70 to-slate-50">
        <div className="mx-auto max-w-7xl px-4 pb-9 pt-6 sm:px-6">
          <Breadcrumbs
            items={[
              { label: t("footer.allTools"), href: "/tools" },
              { label: categoryName },
            ]}
          />
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-brand-700 shadow-sm ring-1 ring-brand-100">
              <ToolIcon name={Icon} className="h-6.5 w-6.5" />
            </span>
            <div className="max-w-3xl">
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                {categoryName}
              </h1>
              <p className="mt-2 text-pretty text-base leading-relaxed text-slate-600">
                {t(`categoryDescriptions.${category}`)}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                {t("home.toolsFound", { count: categoryTools.length })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">{t("home.categories")}</p>
            <p className="mt-1 text-xs text-slate-500">{t("home.categoriesSubtitle")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {others.map((item) => (
              <Link
                key={item}
                href={`/category/${item}`}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-800"
              >
                {t(`categories.${item}`)}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
            <Link
              href="/tools"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-brand-700 px-3 text-xs font-semibold text-white transition hover:bg-brand-800"
            >
              {t("footer.allTools")}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <JsonLd data={collection} />
    </>
  );
}
