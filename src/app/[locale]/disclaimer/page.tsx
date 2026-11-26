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
  const title = t("disclaimerTitle");
  const description = t("disclaimerDescription");

  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/disclaimer"),
    openGraph: { title, description, url: `${SITE.url}/${locale}/disclaimer`, siteName: SITE.name, locale, type: "website", images: socialImages.openGraph },
    twitter: { card: "summary_large_image", title, description, images: socialImages.twitter },
  };
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("pages.disclaimerTitle"),
    description: t("pages.disclaimerDescription"),
    url: `${SITE.url}/${locale}/disclaimer`,
    inLanguage: locale,
    dateModified: SITE.contentUpdated,
  };

  return (
    <>
      <PageHeader
        title={t("pages.disclaimerTitle")}
        description={t("pages.disclaimerDescription")}
        updated={t("pages.updated")}
        breadcrumb={t("footer.disclaimer")}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <article className="prose-custom mx-auto max-w-3xl">
          <div className="not-prose rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-base font-bold text-amber-950">Short version</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-amber-900">
              Our calculators are planning aids. They are not a substitute for professional advice, site measurements,
              building codes or manufacturer instructions. Verify before you buy or build.
            </p>
          </div>

          <h2>1. General information only</h2>
          <p>
            The calculators, formulas, guides and other content on {SITE.name} are provided for general information and
            estimation. They do not constitute professional advice of any kind, including engineering, architectural,
            structural, construction, electrical, plumbing, safety, legal, tax, financial, medical or dietary advice.
          </p>

          <h2>2. Construction and renovation</h2>
          <p>
            Construction results depend on site conditions, material specifications, workmanship, local codes and
            factors a calculator cannot see. Concrete strength, soil bearing capacity, structural loads, span tables,
            fire resistance, drainage and seismic requirements must be confirmed by a qualified engineer or building
            professional. Do not use a calculator as the sole basis for a structural decision.
          </p>
          <p>
            Material quantities are estimates. Always add an appropriate waste allowance, check the actual yield printed
            on the product you purchase, and confirm delivery quantities with your supplier. Running short mid-project
            can create cold joints, colour mismatch or delay.
          </p>

          <h2>3. Hobbies, crafts and making</h2>
          <p>
            Hobby calculators use typical values and simplified models. Yarn yardage varies with stitch pattern, tension
            and fibre; resin and candle calculations depend on mould shape, temperature and additive ratios; 3D-printing
            and PC power estimates depend on settings and hardware. Follow the safety instructions and technical data
            sheets supplied by the manufacturer of your materials and equipment.
          </p>

          <h2>4. Units, rounding and conversions</h2>
          <p>
            Unit systems are converted using standard factors, but display rounding can produce small differences.
            Imperial and US customary measures differ from some historical or regional measures. If a project tolerance
            is tight, calculate in the unit your supplier uses and confirm the conversion independently.
          </p>

          <h2>5. No warranty</h2>
          <p>
            The site and its results are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied,
            including accuracy, completeness, fitness for a particular purpose or non-infringement. We do not warrant
            that the site will be available, error-free or free of harmful components.
          </p>

          <h2>6. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {SITE.name} and its operators accept no liability for any loss,
            damage, injury, cost or expense arising from the use of, or reliance on, the site or its calculators. This
            includes wasted materials, project delays, over-ordering, under-ordering and decisions made on the basis of a
            result.
          </p>

          <h2>7. External links and advertising</h2>
          <p>
            Links to suppliers, manufacturers, reference sources and advertisers are provided for convenience. We do not
            control and do not endorse third-party content, products or services, and we are not responsible for their
            accuracy or practices.
          </p>

          <h2>8. Your responsibility</h2>
          <p>
            You are responsible for checking every input, choosing the right formula for your situation, verifying the
            output, and complying with applicable laws, codes and safety requirements. If you are unsure, stop and
            consult a qualified professional.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you believe a calculator is wrong, please tell us so we can investigate. Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use the{" "}
            <Link href="/contact">contact form</Link>.
          </p>
        </article>
      </div>

      <JsonLd data={page} />
    </>
  );
}
