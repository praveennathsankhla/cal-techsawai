"use client";

import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ToolSearch } from "@/components/ToolSearch";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/tools", key: "tools" },
  { href: "/category/construction", key: "construction" },
  { href: "/category/hobby", key: "hobby" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-3">
          <Logo href="/" />

          <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label={t("menu")}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden w-full max-w-sm md:block">
            <ToolSearch variant="header" />
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t("close") : t("openMenu")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <ToolSearch variant="header" onNavigate={() => setMenuOpen(false)} />
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-slate-100 bg-white transition-[max-height] duration-300 lg:hidden",
          menuOpen ? "max-h-[32rem]" : "max-h-0",
        )}
      >
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-4" aria-label={t("menu")}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-800"
            >
              {t(item.key)}
              <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
