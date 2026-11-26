import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { locales, routing, type Locale } from "./i18n/routing";
import { categoryIds, toolBySlug } from "./data/tools";
import { LEGACY_GONE, LEGACY_REDIRECTS, normalizeLegacyPath } from "./lib/legacy-urls";

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

const CANONICAL_HOST = "techsawai.com";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Send http:// and www. requests to the single canonical origin in one hop.
 * Cloudflare supplies x-forwarded-proto/host; local development keeps its own
 * origin so the dev server is unaffected.
 */
function canonicalRedirect(request: NextRequest): NextResponse | null {
  const rawHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const host = rawHost.split(",")[0].trim().toLowerCase();
  if (LOCAL_HOSTS.has(host.split(":")[0])) return null;

  const rawProto =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  const proto = rawProto.split(",")[0].trim().toLowerCase();

  if (host === CANONICAL_HOST && proto === "https") return null;

  const url = new URL(request.url);
  url.protocol = "https:";
  url.host = CANONICAL_HOST;
  url.port = "";
  return NextResponse.redirect(url, 301);
}

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  return locales.includes(saved as Locale) ? (saved as Locale) : "en";
}

function goneResponse() {
  return new NextResponse("Gone\n", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

export function proxy(request: NextRequest) {
  const canonical = canonicalRedirect(request);
  if (canonical) return canonical;

  const { pathname } = request.nextUrl;
  const country = readCountry(request);
  const legacyPath = normalizeLegacyPath(pathname);

  // WordPress search URLs have no equivalent on the rewritten site.
  if (legacyPath === "/" && request.nextUrl.searchParams.has("s")) {
    return goneResponse();
  }

  if (LEGACY_GONE.has(legacyPath)) return goneResponse();

  const legacyTarget = LEGACY_REDIRECTS[legacyPath];
  if (legacyTarget) {
    const url = new URL(legacyTarget, request.url);
    return withCountryCookie(NextResponse.redirect(url, 301), country);
  }

  // The locale prefix is always present. Send bare "/" to the saved or default locale.
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}`;
    return withCountryCookie(NextResponse.redirect(url, 301), country);
  }

  // Route unprefixed paths ourselves so the permanent locale prefix uses a
  // 301 instead of next-intl's default 307.
  const firstSegment = pathname.split("/")[1];
  if (!locales.includes(firstSegment as Locale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
    return withCountryCookie(NextResponse.redirect(url, 301), country);
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
