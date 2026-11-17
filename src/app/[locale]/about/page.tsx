import type { Metadata } from "next";
import { CheckCircle2, Compass, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { tools } from "@/data/tools";
import { locales } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const title = t("aboutTitle");
  const description = t("aboutDescription");

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/about"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/about`, siteName: SITE.name, locale, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("pages.aboutTitle"),
    description: t("pages.aboutDescription"),
    url: `${SITE.url}/${locale}/about`,
    inLanguage: locale,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressRegion: SITE.address.region,
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <PageHeader
        title={t("pages.aboutTitle")}
        description={t("pages.aboutDescription")}
        breadcrumb={t("nav.about")}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <article className="prose-custom min-w-0 max-w-none">
            <p>
              {SITE.name} exists for a simple reason: most everyday calculations are easy in principle but surprisingly
              easy to get wrong in practice. A slab measured in feet, a paint estimate that ignores a second coat, or a
              yarn substitution that leaves a project one skein short — small errors that cost real money and real time.
            </p>
            <p>
              We build focused calculators that do one job properly. Every tool shows the formula behind the result, a
              worked example you can follow, and practical notes about ordering, waste and rounding. If you cannot see
              why a number came out the way it did, the calculator is not finished.
            </p>

            <h2>What you will find here</h2>
            <p>
              The collection is deliberately split into three parts. Construction tools cover concrete, tiles, paint,
              roofing, rebar, masonry, asphalt, drywall, lumber, stairs, gravel, mulch, sod, fencing and decking. Hobby
              and craft tools cover knitting, aquariums, PC builds, resin, candles, cosplay, 3D printing, model trains,
              guitar setup, home brewing, sewing, quilting, jewellery, woodworking and baking. A universal converter
              handles length, weight, temperature, volume, area, speed and digital data.
            </p>

            <h2>How we build the numbers</h2>
            <p>
              Each calculator uses a published, standard formula rather than a proprietary black box. Inputs are
              validated, units are converted explicitly, and results are rounded only at the point of display. Where
              suppliers sell in whole bags, boxes, sheets or rolls, the tool rounds up so you do not order a fraction of
              a product. Waste allowances are your choice, because a simple slab and a cut-up bathroom are not the same
              job.
            </p>
            <p>
              We test the worked examples by hand and keep the guides short enough to read before you buy. If you spot a
              mistake, tell us — corrections are the most useful message we receive.
            </p>

            <h2>Free, transparent, and available in your language</h2>
            <p>
              Every calculator is free and requires no account. The interface is available in {locales.length} languages,
              with a visible language switcher and a suggestion banner based on your country. We use that country hint
              only to offer a language — never to redirect you without consent.
            </p>

            <h2>Who we are</h2>
            <p>
              {SITE.name} is an independent project based in Bikaner, Rajasthan, India. We are not a construction
              contractor, engineering firm or financial adviser. Our job is to make the arithmetic clear and quick; the
              final decision about materials and safety always belongs with you and your qualified professional.
            </p>

            <div className="not-prose mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Sparkles, title: `${tools.length} tools`, text: "Focused calculators, no filler." },
                { icon: Compass, title: "Formulas shown", text: "Every result can be checked." },
                { icon: CheckCircle2, title: "No sign-up", text: "Open a tool and use it." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                  <item.icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
                  <p className="mt-2.5 text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">{t("footer.contactHeading")}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              Questions, corrections and partnership ideas are all welcome.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-2.5 text-slate-700 hover:text-brand-800">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneHref}`} className="flex items-start gap-2.5 text-slate-700 hover:text-brand-800">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-slate-700 hover:text-brand-800"
                >
                  <Send className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                  {SITE.telegramHandle}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                {SITE.addressText}
              </li>
            </ul>
          </aside>
        </div>
      </div>

      <JsonLd data={aboutPage} />
    </>
  );
}
