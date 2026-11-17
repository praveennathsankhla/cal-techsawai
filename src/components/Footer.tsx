import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { SITE } from "@/config/site";
import { popularTools } from "@/data/tools";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date(`${SITE.contentUpdated}T00:00:00Z`).getUTCFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">{t("footer.tagline")}</p>

            <div className="mt-5 space-y-2.5 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 text-slate-300 transition hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <span className="break-all">{SITE.email}</span>
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex items-center gap-2.5 text-slate-300 transition hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                {SITE.phone}
              </a>
              <p className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                {SITE.addressText}
              </p>
              <a
                href={SITE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-300 transition hover:text-white"
              >
                <Send className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                {t("footer.social")} · {SITE.telegramHandle}
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t("footer.popular")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {popularTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 text-slate-400 transition hover:text-brand-300"
                  >
                    {t(`toolNames.${tool.slug}`)}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t("footer.quickLinks")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/tools", key: "allTools" },
                { href: "/category/construction", key: "construction" },
                { href: "/category/hobby", key: "hobby" },
                { href: "/about", key: "about" },
                { href: "/contact", key: "contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 transition hover:text-brand-300">
                    {item.key === "construction" || item.key === "hobby"
                      ? t(`nav.${item.key}`)
                      : item.key === "allTools"
                        ? t("footer.allTools")
                        : t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">{t("footer.legal")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/privacy-policy", key: "privacy" },
                { href: "/terms-and-conditions", key: "terms" },
                { href: "/disclaimer", key: "disclaimer" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 transition hover:text-brand-300">
                    {t(`footer.${item.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-slate-400 transition hover:text-brand-300">
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
