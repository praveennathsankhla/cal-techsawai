import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Calculator as CalculatorIcon,
  Lightbulb,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calculator } from "@/components/Calculator";
import { UnitConverter } from "@/components/UnitConverter";
import { ToolCard } from "@/components/ToolCard";
import { ToolIcon } from "@/components/ToolIcon";
import { JsonLd } from "@/components/JsonLd";
import { getToolContent } from "@/data/content";
import { toolBySlug, tools, type CategoryId } from "@/data/tools";
import { locales } from "@/i18n/routing";
import { SITE } from "@/config/site";
import { alternatesFor } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const accents: Record<CategoryId, { icon: string; chip: string; soft: string }> = {
  construction: {
    icon: "bg-brand-50 text-brand-700 ring-brand-100",
    chip: "bg-brand-50 text-brand-700",
    soft: "from-brand-50/80 via-white to-white",
  },
  hobby: {
    icon: "bg-amber-50 text-amber-700 ring-amber-100",
    chip: "bg-amber-50 text-amber-800",
    soft: "from-amber-50/70 via-white to-white",
  },
  universal: {
    icon: "bg-sky-50 text-sky-700 ring-sky-100",
    chip: "bg-sky-50 text-sky-700",
    soft: "from-sky-50/80 via-white to-white",
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => tools.map((tool) => ({ locale, slug: tool.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) return {};

  const t = await getTranslations({ locale });
  const name = t(`toolNames.${tool.slug}`);
  const category = t(`categories.${tool.category}`);
  const title = t("seo.toolTitle", { name });
  const description = t("seo.toolDescription", { name, category });
  const path = `/tools/${tool.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}${path}`,
      siteName: SITE.name,
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tool = toolBySlug(slug);
  const content = getToolContent(slug);
  if (!tool || !content) notFound();

  const t = await getTranslations();
  const name = t(`toolNames.${tool.slug}`);
  const categoryName = t(`categories.${tool.category}`);
  const accent = accents[tool.category];
  const path = `/tools/${tool.slug}`;
  const pageUrl = `${SITE.url}/${locale}${path}`;

  const related = tools
    .filter((item) => item.slug !== tool.slug && item.category === tool.category)
    .slice(0, 4);

  const updated = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${SITE.contentUpdated}T00:00:00Z`));

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description: content.intro,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: categoryName,
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("nav.home"), item: `${SITE.url}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("footer.allTools"), item: `${SITE.url}/${locale}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: `${SITE.url}/${locale}/category/${tool.category}`,
      },
      { "@type": "ListItem", position: 4, name, item: pageUrl },
    ],
  };

  return (
    <>
      <div className={`border-b border-slate-200/70 bg-gradient-to-b ${accent.soft}`}>
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:pb-12">
          <Breadcrumbs
            items={[
              { label: t("footer.allTools"), href: "/tools" },
              { label: categoryName, href: `/category/${tool.category}` },
              { label: name },
            ]}
          />

          <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ring-1 ${accent.icon}`}>
                  <ToolIcon name={tool.icon} className="h-6 w-6" />
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${accent.chip}`}>{categoryName}</span>
                {tool.popular && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {t("home.popularTag")}
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem]">
                {name}
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-slate-600">
                {content.intro}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {t("common.free")} · {t("home.statCost")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalculatorIcon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  {t("tool.resultHint")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  {t("tool.lastUpdated")}: {updated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="scroll-mt-24">{tool.slug === "unit-converter" ? <UnitConverter /> : <Calculator slug={tool.slug} />}</div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <article className="min-w-0">
            <section aria-labelledby="how-to-heading">
              <h2 id="how-to-heading" className="text-2xl font-bold tracking-tight text-slate-900">
                {t("tool.howTo")}
              </h2>
              <ol className="mt-5 space-y-4">
                {content.howTo.map((step, index) => (
                  <li key={step.slice(0, 40)} className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-600">{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="formula-heading" className="mt-12">
              <h2 id="formula-heading" className="text-2xl font-bold tracking-tight text-slate-900">
                {t("tool.formula")}
              </h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                <pre className="overflow-x-auto border-b border-slate-100 bg-slate-950 p-5 text-sm leading-relaxed text-brand-200">
                  <code>{content.formula.equation}</code>
                </pre>
                <div className="space-y-4 p-5 text-sm leading-relaxed text-slate-600">
                  <p>{content.formula.explanation}</p>
                  <div className="rounded-xl border border-brand-100 bg-brand-50/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-800">
                      {t("tool.workedExample")}
                    </p>
                    <p className="mt-1.5 text-brand-950">{content.formula.example}</p>
                  </div>
                </div>
              </div>
            </section>

            {content.tips && content.tips.length > 0 && (
              <section aria-labelledby="tips-heading" className="mt-12">
                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-6">
                  <h2 id="tips-heading" className="flex items-center gap-2 text-lg font-bold text-amber-950">
                    <Lightbulb className="h-5 w-5 text-amber-600" aria-hidden="true" />
                    {t("tool.quickTips")}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {content.tips.map((tip) => (
                      <li key={tip.slice(0, 40)} className="flex gap-2.5 text-sm leading-relaxed text-amber-900">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            <section aria-labelledby="faq-heading" className="mt-12">
              <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-slate-900">
                {t("tool.faq")}
              </h2>
              <div className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                {content.faqs.map((faq) => (
                  <details key={faq.q} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-sm font-semibold text-slate-900">
                      {faq.q}
                      <ChevronDown
                        className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
              <TriangleAlert className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
              <p className="flex-1 text-xs leading-relaxed text-slate-600">{t("tool.disclaimer")}</p>
              <Link
                href="/disclaimer"
                className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-800"
              >
                {t("footer.disclaimer")}
              </Link>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h2 className="text-sm font-semibold text-slate-900">{t("tool.inThisCategory", { category: categoryName })}</h2>
              <ul className="mt-3 space-y-1">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/tools/${item.slug}`}
                      className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-slate-600 transition hover:bg-brand-50 hover:text-brand-800"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-brand-700">
                        <ToolIcon name={item.icon} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1 leading-snug">{t(`toolNames.${item.slug}`)}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/tools"
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-800"
              >
                {t("tool.allTools")}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5">
              <p className="text-sm font-semibold text-brand-950">{t("home.why2Title")}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-900/75">{t("home.why2Text")}</p>
            </div>
          </aside>
        </div>

        <section aria-labelledby="related-heading" className="mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="related-heading" className="text-2xl font-bold tracking-tight text-slate-900">
              {t("tool.related")}
            </h2>
            <Link
              href={`/category/${tool.category}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              {t("home.browseAll")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ToolCard key={item.slug} tool={item} />
            ))}
          </div>
        </section>
      </div>

      <JsonLd data={[webApp, faqPage, breadcrumbs]} />
    </>
  );
}
