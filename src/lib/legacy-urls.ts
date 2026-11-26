/**
 * WordPress-era URLs that Google still reports in Search Console.
 *
 * The 301 set contains only URLs with a true equivalent on the current site.
 * Everything else is permanently retired and should answer 410 instead of
 * soft-404ing through the localized not-found page.
 */

export const LEGACY_REDIRECTS: Record<string, string> = {
  "/about-us": "/en/about",
  "/contact-us": "/en/contact",
  "/disclaimer": "/en/disclaimer",
  "/privacy-policy": "/en/privacy-policy",
  "/terms-and-conditions": "/en/terms-and-conditions",
};

export const LEGACY_GONE = new Set([
  // Feeds, search, and retired roadmaps.
  "/top-10-high-income-tech-skills-in-2026/feed",
  "/start-earning-online-practicle-roadmap",

  // Old category archives. The current categories are unrelated.
  "/category/ai-photo-tools",
  "/category/gadgets-accessories",
  "/category/internet-apps-security",
  "/category/laptops-pc",
  "/category/money-lifestyle",
  "/category/smartphones-mobile",
  "/category/uncategorized",
  "/category/web-hosting-websites",

  // Old editorial content with no calculator or page equivalent.
  "/10-free-chrome-extensions-you-need-in-2026",
  "/best-smartphone-under-₹20000-in-india-2026",
  "/best-vpn-services-in-india-2026-features-explained-prices-compared-step-by-step-buying-guide",
  "/best-wireless-headphones-in-india-2026-reviewed-features-explained-prices-compared",
  "/best-work-from-home-setup-2026-city-wise-guide",
  "/cloud-storage-pricing-in-india-2026-plans-compared",
  "/how-much-does-it-cost-to-build-a-website-in-2026",
  "/how-to-change-wifi-password-step-by-step-guide",
  "/how-to-check-cibil-score-step-by-step-guide-for-2026",
  "/how-to-choose-a-gaming-monitor-complete-guide-2026",
  "/how-to-choose-a-laptop-features-explained-and-compared-2026-guide",
  "/how-to-create-a-website-step-by-step-guide-2026",
  "/how-to-delete-a-google-account-step-by-step-guide-2026",
  "/how-to-earn-money-from-ai-in-2026-a-practical-guide-2",
  "/how-to-earn-money-from-ai-in-2026-a-practical-guide",
  "/how-to-fix-overexposed-photos-step-by-step-guide-2026",
  "/how-to-install-memory-ram-in-a-laptop-2026",
  "/how-to-remove-background-from-image-complete-guide-with-best-ai-tools-2026",
  "/how-to-reset-windows-password-step-by-step-guide-2026",
  "/how-to-stop-apps-running-in-background-android-and-ios-guide",
  "/how-to-track-a-package-step-by-step-guide-2026",
  "/iphone-duo-features-price-in-different-countries-and-buying-guide-2026",
  "/nano-banana-features-price-in-different-countries-and-how-to-use-it-2026",
  "/solar-panel-cost-in-india-2026-price-by-system-size-subsidy-explained-payback-calculated",
  "/tempmail-testing-feature",
  "/video-generation-model-apis-in-2026",
  "/web-hosting-cost-in-india-in-2026",
  "/xiaomi-17-pro-max-features-price-in-different-countries-and-buying-guide-2026",
]);

/** Normalize trailing slashes and percent-encoded characters such as ₹. */
export function normalizeLegacyPath(pathname: string): string {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Keep the raw pathname when it contains an invalid escape sequence.
  }

  const collapsed = decoded.replace(/\/{2,}/g, "/");
  return collapsed.length > 1 ? collapsed.replace(/\/+$/, "") : "/";
}
