import { Link } from "@/i18n/navigation";
import { Calculator } from "lucide-react";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  compact = false,
  light = false,
}: {
  href?: string;
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      aria-label={`${SITE.name} home`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-700 text-white shadow-sm transition-transform group-hover:-rotate-3">
        <Calculator className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-white" />
      </span>
      {!compact && (
        <span className={cn("text-lg font-bold tracking-tight", light ? "text-white" : "text-slate-900")}>
          Tech<span className="text-brand-600">Sawai</span>
        </span>
      )}
    </Link>
  );
}
