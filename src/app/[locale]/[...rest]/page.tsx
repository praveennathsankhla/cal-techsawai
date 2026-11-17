import { notFound } from "next/navigation";

// This route always renders the localized 404, so it may block while the
// layout resolves URL-dependent client components.
export const instant = false;

/**
 * Any unmatched path inside a locale lands here so the localized not-found
 * boundary renders inside the locale layout (with translations and RTL).
 */
export default function LocaleCatchAllPage() {
  notFound();
}
