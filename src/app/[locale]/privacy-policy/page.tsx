import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
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
  const title = t("privacyTitle");
  const description = t("privacyDescription");

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/privacy-policy"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/privacy-policy`, siteName: SITE.name, locale, type: "website", images: socialImages.openGraph },
    twitter: { card: "summary_large_image", title, description, images: socialImages.twitter },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("pages.privacyTitle"),
    description: t("pages.privacyDescription"),
    url: `${SITE.url}/${locale}/privacy-policy`,
    inLanguage: locale,
    dateModified: SITE.contentUpdated,
  };

  return (
    <>
      <PageHeader
        title={t("pages.privacyTitle")}
        description={t("pages.privacyDescription")}
        updated={t("pages.updated")}
        breadcrumb={t("footer.privacy")}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <article className="prose-custom mx-auto max-w-3xl">
          <p>
            This Privacy Policy explains what information {SITE.name} collects when you use {SITE.domain}, why we
            collect it, and the choices you have. We keep data collection to the minimum needed to run a free
            calculator website.
          </p>

          <h2>1. Who we are</h2>
          <p>
            {SITE.name} is an independent website operated from {SITE.addressText}. For any privacy question or request,
            contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or by phone at{" "}
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>. We are the controller of the personal data described
            below.
          </p>

          <h2>2. Information you give us</h2>
          <p>
            When you submit the contact form, we receive the name, email address, subject and message you enter, plus
            the language of the page and the time of submission. We use this information only to answer your message,
            investigate a reported error, or consider a tool request. We do not use it for advertising and we do not
            sell it.
          </p>
          <p>
            Contact messages are kept for up to 24 months so that we can follow up on corrections and repeated issues,
            then deleted. If you would like us to delete your message sooner, email us and we will do so unless we are
            required to keep it by law.
          </p>

          <h2>3. Calculator inputs</h2>
          <p>
            All calculator calculations run in your browser. The measurements, quantities and options you type into a
            calculator are not transmitted to our servers and are not stored by us. Refreshing the page clears them.
          </p>

          <h2>4. Cookies and local storage</h2>
          <p>We use a small number of first-party cookies and browser storage entries:</p>
          <ul>
            <li>
              <strong>NEXT_LOCALE</strong> — remembers the language you selected so future visits open in the same
              language. Stored for up to one year.
            </li>
            <li>
              <strong>ip_country</strong> — stores the two-letter country code supplied by our hosting or CDN provider
              (for example Cloudflare&apos;s <code>cf-ipcountry</code> header) so we can show a one-time language
              suggestion. Stored for 24 hours.
            </li>
            <li>
              <strong>techsawai_locale_banner_dismissed</strong> — a local-storage entry that remembers that you dismissed
              the language suggestion, so we do not show it again for the same country and language.
            </li>
          </ul>
          <p>
            These items are necessary for the language features you see. You can clear them at any time through your
            browser settings; the site will continue to work, but it may not remember your language choice.
          </p>

          <h2>5. IP addresses and country detection</h2>
          <p>
            Our hosting provider and CDN process your IP address to deliver the site and may pass us a country code
            derived from it. We use that country code only to decide whether to offer a language suggestion. We do not
            store your full IP address for this purpose. We do not redirect you automatically: the suggestion banner is
            dismissible and the language switcher always remains available.
          </p>

          <h2>6. Analytics</h2>
          <p>
            We may use privacy-respecting, aggregate analytics to understand which calculators are used and which pages
            fail. Where analytics are enabled, they record page views, approximate region, device type and referrer. We
            do not attempt to identify individual visitors from these reports. If we adopt a tool that uses cookies for
            analytics, we will update this policy and, where required, ask for consent before setting non-essential
            cookies.
          </p>

          <h2>7. Advertising and Google AdSense</h2>
          <p>
            This site may display advertising to keep the calculators free. Third-party vendors, including Google, may
            use cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of
            advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other
            sites on the internet.
          </p>
          <p>
            You can opt out of personalised advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            , or opt out of third-party vendor cookies for personalised advertising at{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>
            . Visitors in the European Economic Area, the United Kingdom and Switzerland will be shown a consent
            mechanism before non-essential advertising cookies are set, where required by law.
          </p>
          <p>
            Advertising providers may process data outside your country. Where required, transfers rely on standard
            contractual clauses or an equivalent safeguard. We do not control the cookies set by advertisers; please
            review their policies for details.
          </p>

          <h2>8. Service providers</h2>
          <p>
            We use hosting and content-delivery providers to serve the site, and may use an email-delivery provider to
            receive contact-form messages. These providers process data on our instructions and only for the purposes
            described here. Where a provider acts as a processor, it is bound by a data-processing agreement.
          </p>

          <h2>9. Legal bases</h2>
          <p>
            Where the GDPR or similar laws apply, we rely on: our legitimate interest in operating and securing the
            site (Article 6(1)(f)); your consent for any non-essential cookies or advertising (Article 6(1)(a)); and the
            necessity of processing to respond to a request you make (Article 6(1)(b)). You may withdraw consent at any
            time without affecting processing that already took place.
          </p>

          <h2>10. Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access, correct, delete or restrict the processing of
            your personal data, to object to processing, to data portability, and to lodge a complaint with your local
            supervisory authority. California residents may have the right to know, delete and opt out of the sale or
            sharing of personal information; we do not sell personal information. To exercise a right, email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will respond within the period required by applicable
            law.
          </p>

          <h2>11. Children</h2>
          <p>
            The site is intended for a general audience and is not directed at children under 13. We do not knowingly
            collect personal information from children. If you believe a child has sent us personal information, contact
            us and we will delete it.
          </p>

          <h2>12. Security and retention</h2>
          <p>
            We use HTTPS, restrict access to contact messages, and keep only the data we need. No method of transmission
            or storage is completely secure, so we cannot guarantee absolute security. We retain contact messages for up
            to 24 months and server logs for the short period needed for security and troubleshooting.
          </p>

          <h2>13. Changes to this policy</h2>
          <p>
            We may update this policy when our tools, providers or legal obligations change. The date at the top of the
            page shows the latest revision. Material changes will be highlighted on the site.
          </p>

          <h2>14. Contact</h2>
          <p>
            {SITE.name}, {SITE.addressText}. Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Phone:{" "}
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>. Telegram:{" "}
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer">
              {SITE.telegramHandle}
            </a>
            .
          </p>
        </article>
      </div>

      <JsonLd data={page} />
    </>
  );
}
