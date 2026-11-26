import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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
  const title = t("termsTitle");
  const description = t("termsDescription");

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/terms-and-conditions"),
    openGraph: {
      title,
      description,
      url: `${SITE.url}/${locale}/terms-and-conditions`,
      siteName: SITE.name,
      locale,
      type: "website",
      images: socialImages.openGraph,
    },
    twitter: { card: "summary_large_image", title, description, images: socialImages.twitter },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("pages.termsTitle"),
    description: t("pages.termsDescription"),
    url: `${SITE.url}/${locale}/terms-and-conditions`,
    inLanguage: locale,
    dateModified: SITE.contentUpdated,
  };

  return (
    <>
      <PageHeader
        title={t("pages.termsTitle")}
        description={t("pages.termsDescription")}
        updated={t("pages.updated")}
        breadcrumb={t("footer.terms")}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <article className="prose-custom mx-auto max-w-3xl">
          <p>
            These Terms &amp; Conditions govern your use of {SITE.domain} and the calculators and content available on
            it. By using the site, you agree to these terms. If you do not agree, please do not use the site.
          </p>

          <h2>1. The service</h2>
          <p>
            {SITE.name} provides free online calculators, conversion tools and explanatory guides for construction,
            hobbies, crafts and everyday measurement. The service is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. We may add, change, suspend or remove any calculator or page at any time.
          </p>

          <h2>2. Estimates, not professional advice</h2>
          <p>
            Results are planning estimates. They are not engineering, architectural, structural, electrical, safety,
            legal, financial, medical or other professional advice. You are responsible for verifying every quantity,
            dimension, load, material specification and code requirement with a qualified professional, your supplier,
            or the relevant authority before purchasing materials or beginning work.
          </p>
          <p>
            Construction and craft work can involve serious risk. Always follow manufacturer instructions, local
            building codes and safe working practices. Never rely on a calculator for a decision that could affect
            structural safety or personal health.
          </p>

          <h2>3. Accuracy and availability</h2>
          <p>
            We work to keep formulas correct and current, but we do not warrant that any result, conversion factor,
            material yield or guide is accurate, complete or suitable for your particular project. Material yields vary
            by manufacturer, region and product. Rounding, waste allowances and unit conversions are estimates. The site
            may contain errors or be unavailable, and we do not guarantee uninterrupted access.
          </p>

          <h2>4. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>use the site in a way that breaks any applicable law or regulation;</li>
            <li>attempt to gain unauthorised access to the site, its servers or its data;</li>
            <li>interfere with the site&apos;s operation, including through automated scraping that degrades service;</li>
            <li>upload malicious code or use the contact form to send spam, abuse or unlawful content;</li>
            <li>misrepresent the site or its results as professional certification or advice.</li>
          </ul>

          <h2>5. Intellectual property</h2>
          <p>
            The site&apos;s design, text, calculators, guides and branding are owned by {SITE.name} or used with
            permission and are protected by copyright and other laws. You may use the calculators for personal and
            internal business purposes. You may not reproduce, republish, sell or create a competing database from the
            site&apos;s content without written permission. Short quotations with a link back to the original page are
            welcome.
          </p>

          <h2>6. Your content</h2>
          <p>
            If you send us a message, correction or suggestion, you grant us permission to use it to improve the site.
            Do not send confidential information. You are responsible for ensuring that anything you send is accurate and
            does not infringe another person&apos;s rights.
          </p>

          <h2>7. Third-party links and advertising</h2>
          <p>
            The site may link to third-party websites and may display advertising. We do not control those sites or
            advertisements and are not responsible for their content, products, cookies or privacy practices. A link or
            advertisement does not imply endorsement. Your dealings with third parties are solely between you and them.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {SITE.name} and its operators are not liable for any indirect,
            incidental, special, consequential or punitive damages, or for any loss of profits, materials, time, data or
            goodwill, arising from your use of or inability to use the site. This includes losses caused by reliance on a
            calculator result, a material shortage, a material over-order, or a delay in delivery.
          </p>
          <p>
            Where liability cannot be excluded, our total aggregate liability for any claim relating to the site is
            limited to the greater of the amount you paid us to use the site (which is zero for the free service) or INR
            1,000. Some jurisdictions do not allow certain exclusions, so parts of this section may not apply to you.
          </p>

          <h2>9. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless {SITE.name} and its operators from any claim, loss, liability or
            expense (including reasonable legal fees) arising from your misuse of the site, your breach of these terms,
            or your violation of another person&apos;s rights.
          </p>

          <h2>10. Privacy</h2>
          <p>
            Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we handle cookies, country detection and
            contact-form data. It forms part of these terms.
          </p>

          <h2>11. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The revision date appears at the top of the page. Continued use
            of the site after a change means you accept the updated terms. If any provision is found unenforceable, the
            remaining provisions continue in effect.
          </p>

          <h2>12. Governing law and jurisdiction</h2>
          <p>
            These terms are governed by the laws of India. Subject to any mandatory consumer-protection rights, the
            courts at Bikaner, Rajasthan shall have exclusive jurisdiction over disputes connected with the site.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, call{" "}
            <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>, or write to {SITE.name}, {SITE.addressText}.
          </p>
        </article>
      </div>

      <JsonLd data={page} />
    </>
  );
}
