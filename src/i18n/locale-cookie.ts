/**
 * Persist the visitor's language choice so the proxy can send a bare "/" to the
 * matching locale on their next visit. Kept outside React components because it
 * writes to the document cookie jar.
 */
export function setLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}
