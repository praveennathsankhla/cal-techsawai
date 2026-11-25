"use client";

import { X } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { setLocaleCookie } from "@/i18n/locale-cookie";
import type { Locale } from "@/i18n/routing";

const DISMISS_COOKIE = "techsawai_locale_banner_dismissed";

function dismiss(dismissKey: string) {
  document.cookie = `${DISMISS_COOKIE}=${encodeURIComponent(dismissKey)}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
}

export function IpLanguageBannerActions({
  target,
  dismissKey,
  switchLabel,
  dismissLabel,
}: {
  target: Locale;
  dismissKey: string;
  switchLabel: string;
  dismissLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = () => {
    setLocaleCookie(target);
    const search = typeof window === "undefined" ? "" : window.location.search;
    router.replace(`${pathname}${search}` as never, { locale: target } as never);
    router.refresh();
    dismiss(dismissKey);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={switchLanguage}
        className="rounded-md bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        {switchLabel}
      </button>
      <button
        type="button"
        onClick={(event) => {
          dismiss(dismissKey);
          event.currentTarget.closest("[data-locale-banner]")?.remove();
        }}
        aria-label={dismissLabel}
        className="rounded-md p-1.5 text-brand-700 transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
