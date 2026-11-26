import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolDirectory } from "@/components/ToolDirectory";
import { JsonLd } from "@/components/JsonLd";
import { categoryIds, tools, toolsByCategory } from "@/data/tools";
import { locales } from "@/i18n/routing";
import { SITE } from "@/config/site";
import { alternatesFor, socialImages } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t("toolsTitle");
  const description = t("toolsDescription");

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/tools"),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/tools`,
      siteName: SITE.name,
      locale,
      type: "website",
      images: socialImages.openGraph,
    },
    twitter: { card: "summary_large_image", title, description, images: socialImages.twitter },
  };
}

export default async function AllToolsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("home.allTools"),
    description: t("home.allToolsSubtitle"),
    url: `${SITE.url}/${locale}/tools`,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
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
          <Breadcrumbs items={[{ label: t("footer.allTools") }]} />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white/80 px-2.5 py-1 text-xs font-semibold text-brand-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
              {t("home.badge")}
            </span>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              {t("home.allTools")}
            </h1>
            <p className="mt-3 text-pretty text-base leading-relaxed text-slate-600">{t("home.allToolsSubtitle")}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ToolDirectory />

        <section className="mt-12 grid gap-4 md:grid-cols-3" aria-label={t("home.categories")}>
          {categoryIds.map((category) => {
            const count = toolsByCategory(category).length;
            return (
              <Link
                key={category}
                href={`/category/${category}`}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
              >
                <div>
                  <h2 className="text-base font-semibold text-slate-900 group-hover:text-brand-800">
                    {t(`categories.${category}`)}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{t(`categoryDescriptions.${category}`)}</p>
                  <p className="mt-2 text-xs font-medium text-slate-500">{t("home.toolsFound", { count })}</p>
                </div>
                <ArrowRight
                  className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-700"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </section>
      </div>

      <JsonLd data={itemList} />
    </>
  );
}
