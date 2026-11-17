import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Languages,
  Search,
  ShieldCheck,
  Sigma,
  Sparkles,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ToolDirectory } from "@/components/ToolDirectory";
import { ToolCard } from "@/components/ToolCard";
import { ToolIcon } from "@/components/ToolIcon";
import { JsonLd } from "@/components/JsonLd";
import { categoryIds, popularTools, tools, toolsByCategory } from "@/data/tools";
import { SITE } from "@/config/site";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const title = t("homeTitle");
  const description = t("homeDescription");
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const featured = popularTools.slice(0, 5);
  const concrete = tools[0];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("home.allTools"),
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(`toolNames.${tool.slug}`),
      url: `${SITE.url}/${locale}/tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/40 to-slate-50">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24 lg:pt-20">
          <div className="animate-enter">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-800 shadow-xs backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
              {t("home.badge")}
            </span>

            <h1 className="mt-5 max-w-2xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem]">
              {t("home.title")}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              {t("home.subtitle")}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/tools"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 text-sm font-semibold text-white shadow-md shadow-brand-900/10 transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                {t("home.browseAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#all-tools"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-xs transition hover:border-brand-300 hover:text-brand-800"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                {t("nav.search")}
              </a>
            </div>

            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-brand-900/10 pt-5">
              {[
                { value: `${tools.length}`, label: t("home.statTools") },
                { value: "18", label: t("home.statLanguages") },
                { value: "100%", label: t("home.statCost") },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-extrabold tracking-tight text-slate-900">{stat.value}</dt>
                  <dd className="mt-0.5 text-xs leading-snug text-slate-500">{stat.label}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex items-center gap-1.5 text-xs text-slate-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              {t("home.why2Title")} · {t("common.free")} · {t("home.statCost")}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            <div className="absolute inset-6 rounded-[2rem] bg-brand-400/20 blur-2xl" aria-hidden="true" />
            <div className="relative rotate-1 rounded-3xl border border-white/70 bg-white p-5 shadow-2xl shadow-brand-950/15 transition hover:rotate-0 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <ToolIcon name={concrete.icon} className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{t("common.estimate")}</p>
                    <p className="text-sm font-semibold text-slate-800">{t(`toolNames.${concrete.slug}`)}</p>
                  </div>
                </div>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                  {t("common.free")}
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-800 to-teal-950 p-5 text-white">
                <p className="text-[11px] uppercase tracking-wider text-brand-100/70">{t("common.result")}</p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight">1.26 m³</p>
                <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-xs text-brand-100/80">
                  <span>101 bags</span>
                  <span>3,024 kg</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">{t("common.metric")}</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">1.26 m³</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">{t("common.imperial")}</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">1.65 yd³</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
                {t("home.why2Title")}
              </div>
            </div>

            <div className="absolute -left-3 bottom-8 hidden rotate-[-4deg] rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg sm:block">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">{t("common.estimate")}</p>
              <p className="text-sm font-bold text-slate-800">5 skeins</p>
            </div>
            <div className="absolute -right-4 top-16 hidden rotate-3 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-lg sm:block">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">PSU</p>
              <p className="text-sm font-bold text-slate-800">700 W</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16" aria-labelledby="categories-heading">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t("home.categories")}
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">{t("home.categoriesSubtitle")}</p>
          </div>
          <Link href="/tools" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
            {t("home.browseAll")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {categoryIds.map((category) => {
            const count = toolsByCategory(category).length;
            const categoryTool = toolsByCategory(category)[0];
            return (
              <Link
                key={category}
                href={`/category/${category}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <ToolIcon name={categoryTool.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-800">{t(`categories.${category}`)}</h3>
                    <p className="text-xs text-slate-500">{t("home.toolsFound", { count })}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{t(`categoryDescriptions.${category}`)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  {t("home.browseAll")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-brand-50 transition-transform group-hover:scale-125" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section id="popular" className="border-y border-slate-200/70 bg-white" aria-labelledby="popular-heading">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="popular-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {t("home.popular")}
              </h2>
              <p className="mt-1.5 text-sm text-slate-500">{t("home.popularSubtitle")}</p>
            </div>
            <Link href="/tools" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900">
              {t("footer.allTools")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {featured.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section id="all-tools" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 lg:py-16" aria-labelledby="all-tools-heading">
        <div className="mb-6 max-w-2xl">
          <h2 id="all-tools-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {t("home.allTools")}
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">{t("home.allToolsSubtitle")}</p>
        </div>
        <ToolDirectory />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10" aria-labelledby="why-heading">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
          <div className="max-w-2xl">
            <h2 id="why-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t("home.whyTitle")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{t("home.whySubtitle")}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: t("home.why1Title"), text: t("home.why1Text") },
              { icon: Sigma, title: t("home.why2Title"), text: t("home.why2Text") },
              { icon: Languages, title: t("home.why3Title"), text: t("home.why3Text") },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-slate-50/80 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-800">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16" aria-labelledby="steps-heading">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 id="steps-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t("home.howItWorks")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{t("home.why3Text")}</p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              { title: t("home.step1"), text: t("home.step1Text") },
              { title: t("home.step2"), text: t("home.step2Text") },
              { title: t("home.step3"), text: t("home.step3Text") },
            ].map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center">
          <TriangleAlert className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-950">{t("home.disclaimerTitle")}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-amber-800">{t("home.disclaimerText")}</p>
          </div>
          <Link
            href="/disclaimer"
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {t("footer.disclaimer")}
          </Link>
        </div>
      </section>

      <JsonLd data={itemList} />
    </>
  );
}
