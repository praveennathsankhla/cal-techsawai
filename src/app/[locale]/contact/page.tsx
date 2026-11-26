import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { locales } from "@/i18n/routing";
import { alternatesFor, socialImages } from "@/lib/seo";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const title = t("contactTitle");
  const description = t("contactDescription");

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/contact"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/contact`, siteName: SITE.name, locale, type: "website", images: socialImages.openGraph },
    twitter: { card: "summary_large_image", title, description, images: socialImages.twitter },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("pages.contactTitle"),
    description: t("pages.contactDescription"),
    url: `${SITE.url}/${locale}/contact`,
    inLanguage: locale,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      email: SITE.email,
      telephone: SITE.phone,
      sameAs: [SITE.telegram],
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        postalCode: SITE.address.postalCode,
        addressRegion: SITE.address.region,
        addressCountry: "IN",
      },
    },
  };

  const details = [
    {
      icon: Mail,
      label: t("common.email"),
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: Phone,
      label: t("common.phone"),
      value: SITE.phone,
      href: `tel:${SITE.phoneHref}`,
    },
    {
      icon: Send,
      label: t("footer.social"),
      value: SITE.telegramHandle,
      href: SITE.telegram,
      external: true,
    },
    {
      icon: MapPin,
      label: t("common.address"),
      value: SITE.addressText,
    },
  ];

  return (
    <>
      <PageHeader
        title={t("pages.contactTitle")}
        description={t("pages.contactDescription")}
        breadcrumb={t("nav.contact")}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <ContactForm />

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">{t("footer.contactHeading")}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{t("contactForm.direct")}</p>
              <ul className="mt-4 space-y-4">
                {details.map((item) => (
                  <li key={item.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-1 flex items-start gap-2.5 text-sm font-medium text-slate-700 transition hover:text-brand-800"
                      >
                        <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                        <span className="break-all">{item.value}</span>
                      </a>
                    ) : (
                      <p className="mt-1 flex items-start gap-2.5 text-sm font-medium text-slate-700">
                        <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                        {item.value}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-brand-700" aria-hidden="true" />
                <p className="text-sm font-semibold text-brand-950">{t("contactForm.responseTime")}</p>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-900/75">
                Include the calculator name, the figures you entered and what you expected to see. That lets us
                reproduce the problem and fix it quickly.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-slate-500" aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-900">Corrections and tool requests</p>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                We especially want to hear about formula errors, outdated material yields, missing unit options and
                calculators you would use but cannot find. Every message is read by a person.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <JsonLd data={contactPage} />
    </>
  );
}
