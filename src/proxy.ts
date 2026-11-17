import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { locales, routing, type Locale } from "./i18n/routing";
import { categoryIds, toolBySlug } from "./data/tools";

const intlMiddleware = createMiddleware(routing);

const isCategory = (value: string) => (categoryIds as string[]).includes(value);

/**
 * Unknown tool slugs and categories must 404 before the dynamic page starts
 * streaming, otherwise the first request can return a 200 soft 404. Rewriting
 * to the catch-all route lets the localized not-found UI render with a real
 * 404 status while the browser keeps the original URL.
 */
function missingDetailPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 3) return null;

  const [locale, section, value] = parts;
  if (!locales.includes(locale as Locale)) return null;

  const missing =
    (section === "tools" && !toolBySlug(value)) ||
    (section === "category" && !isCategory(value));

  return missing ? `/${locale}/__not-found` : null;
}

function readCountry(request: NextRequest): string {
  const raw =
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cloudfront-viewer-country") ??
    "";
  const country = raw.toUpperCase();
  return /^[A-Z]{2}$/.test(country) && country !== "XX" && country !== "T1" ? country : "";
}

function withCountryCookie(response: NextResponse, country: string) {
  if (!country) return response;
  response.cookies.set("ip_country", country, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const country = readCountry(request);

  // The locale prefix is always present. Send bare "/" to the saved or default locale.
  if (pathname === "/") {
    const saved = request.cookies.get("NEXT_LOCALE")?.value;
    const locale: Locale = locales.includes(saved as Locale) ? (saved as Locale) : "en";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return withCountryCookie(NextResponse.redirect(url), country);
  }

  const missingPath = missingDetailPath(pathname);
  if (missingPath) {
    const url = request.nextUrl.clone();
    url.pathname = missingPath;
    return withCountryCookie(NextResponse.rewrite(url), country);
  }

  return withCountryCookie(intlMiddleware(request), country);
}

export const config = {
  // Skip API routes, Next internals, and any request with a file extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
