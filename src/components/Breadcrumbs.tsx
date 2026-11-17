import { ChevronRight, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const t = await getTranslations("nav");

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <li>
          <Link href="/" className="inline-flex items-center gap-1 rounded px-1 py-0.5 transition hover:text-brand-700">
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("home")}</span>
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-slate-300" aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} className="rounded px-1 py-0.5 transition hover:text-brand-700">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="px-1 py-0.5 font-medium text-slate-700">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
