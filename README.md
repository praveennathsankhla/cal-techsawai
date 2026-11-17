# TechSawai

TechSawai is a multilingual calculator site built with Next.js App Router, Tailwind CSS and next-intl. It ships 31 calculators (15 construction, 15 hobby, plus a universal unit converter) across 18 languages, with localized routing, SEO metadata and a dismissible IP-based language suggestion.

## Requirements

- **Node.js 22 or newer** — Next.js 16.4 requires Node 22. Node 20.19 fails during the build with `webidl.util.markAsUncloneable is not a function`. `.nvmrc` pins Node 22 and `.npmrc` makes install fail early on an unsupported version.
- npm 10+ (bundled with Node 22).

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The root path redirects to the saved `NEXT_LOCALE` cookie or `/en`.

Production check:

```bash
npm run build
npm start
```

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build (also type-checks and prerenders) |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting files |
| `npm run check` | Lint, type-check and build in one command |
| `npm run clean` | Remove the `.next` build output |

## Environment variables

Copy `.env.example` to `.env.local` for local use, or add the same keys to your hosting dashboard.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin used by metadata, `sitemap.xml` and `robots.txt`. Defaults to `https://techsawai.com`. **Set it before building** and omit the trailing slash. |
| `RESEND_API_KEY` | Optional | If set, contact submissions are emailed through [Resend](https://resend.com). Without it, messages are only saved locally. |
| `CONTACT_FROM_EMAIL` | Optional | Verified Resend sender, e.g. `TechSawai <hello@techsawai.com>`. Defaults to the Resend onboarding address. |
| `CONTACT_TO_EMAIL` | Optional | Inbox that receives contact messages. Defaults to `pnath6745@gmail.com`. |

Contact submissions are validated server-side, rate-limited in memory (5 per IP per 10 minutes) and appended to `.data/contact-messages.jsonl`. That directory is git-ignored; on serverless platforms the filesystem is ephemeral, so configure `RESEND_API_KEY` in production if you need durable delivery.

## Project structure

```
src/
├── app/
│   ├── [locale]/            # Localized pages (home, tools, categories, legal)
│   ├── api/contact/         # Contact form endpoint
│   ├── api/health/          # Container health check
│   ├── sitemap.ts           # Localized sitemap
│   ├── robots.ts            # robots.txt
│   ├── global-not-found.tsx # Fallback 404 outside the locale segment
│   └── globals.css          # Tailwind theme and base styles
├── components/              # Header, Footer, calculators, SEO helpers, forms
├── config/site.ts           # Brand, URL and contact details
├── data/
│   ├── tools.ts             # 31-tool catalog
│   └── content/             # English guides, formulas and FAQs
├── i18n/                    # Locales, routing, message loading, cookie helper
├── lib/
│   ├── calculators/         # Typed calculation engine
│   ├── units.ts             # Unit converter tables
│   └── seo.ts               # Canonical and hreflang helpers
├── messages/                # en.json plus 17 translated catalogs
├── proxy.ts                 # Locale routing, IP country cookie, unknown-slug 404s
```

Deployment files live at the repository root: `.nvmrc`, `.env.example`, `Dockerfile`, `.dockerignore` and `docker-compose.yml`.

### Routing and languages

- Sub-path routing: `/en/tools/concrete-volume-calculator`, `/hi/tools/...`, and so on.
- 18 locales: `en`, `hi`, `ta`, `te`, `bn`, `mr`, `gu`, `kn`, `ml`, `pa`, `or`, `ur`, `id`, `vi`, `tr`, `pl`, `pt-BR`, `tl`.
- Urdu renders right-to-left; `<html lang>` and `dir` are set in `src/app/[locale]/layout.tsx`.
- `src/proxy.ts` reads `cf-ipcountry`, `x-vercel-ip-country` or `cloudfront-viewer-country`, stores it in the `ip_country` cookie, and never redirects automatically. The banner only suggests a switch and remembers dismissals in `localStorage`.
- Adding a locale means updating `src/i18n/routing.ts`, `src/i18n/request.ts`, the language switcher, and adding `src/messages/<locale>.json`. Missing keys fall back to English through the deep-merge loader in `src/i18n/request.ts`.

### Adding a calculator

1. Add an entry to `src/data/tools.ts` (slug, category, icon, related tools).
2. Implement the calculation in `src/lib/calculators/construction.ts` or `hobby.ts`, or register a custom component for special cases.
3. Add the English guide, formula, worked example, tips and four FAQs under `src/data/content/`.
4. Add a localized name to every `src/messages/*.json` catalog under `toolNames`.
5. Run `npm run check` (lint, type-check and production build).

All input fields use metric and imperial defaults; results are formatted with `Intl.NumberFormat` for the active locale.

## SEO

- Per-page canonical URLs and hreflang alternates for all 18 locales plus `x-default`.
- JSON-LD `WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization` and `WebSite` schema.
- `sitemap.xml` lists every localized route; `robots.txt` points at it.
- Localized titles and descriptions live in the `seo` namespace of each message catalog.
- Tool guides, formulas and FAQs are currently English-only; UI chrome, tool names, navigation and SEO templates are localized.

## Deployment

The app builds to a standard Node 22 server for Vercel and plain hosts. The Docker build opts into Next.js standalone output (`.next/standalone`) automatically.

### Before you deploy

- [ ] Use Node **22** locally and on the host (`.nvmrc` is included).
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final public origin, with no trailing slash. It is inlined at build time, so rebuild after changing it.
- [ ] Set `RESEND_API_KEY` (and optionally `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL`) if the contact form should email you. Serverless filesystems are ephemeral.
- [ ] Run `npm run check` (lint + type-check + production build) and fix any failures.
- [ ] After deploying, check `/robots.txt`, `/sitemap.xml`, `/api/health`, a tool page, the contact form and a localized 404 such as `/hi/tools/not-a-tool`.

### Vercel

1. Push the project to a Git provider and import it in Vercel. The framework preset is detected as **Next.js**.
2. Set the Node.js version to **22.x** in Project Settings → General.
3. Add the environment variables above for **Production** (and **Preview** if needed).
4. Deploy. Vercel runs `npm run build` and serves the App Router output automatically.
5. Add your custom domain, then confirm `NEXT_PUBLIC_SITE_URL` matches it exactly and redeploy.

The IP language banner uses `x-vercel-ip-country` automatically. Contact messages should use Resend on Vercel because the local `.data/` directory does not persist between invocations.

### Docker / VPS

A multi-stage `Dockerfile` and `docker-compose.yml` are included. The image runs as a non-root user and exposes a health check at `/api/health`. The Docker build sets `BUILD_STANDALONE=true`, which makes Next.js emit the minimal server at `.next/standalone/server.js`.

```bash
cp .env.example .env
# edit .env with your domain and Resend credentials

docker compose build
docker compose up -d
docker compose logs -f
```

Compose reads `.env` automatically for both the build arg and runtime environment. `NEXT_PUBLIC_SITE_URL` is inlined during the build, so changing the domain requires `docker compose build --no-cache` (or at least a rebuild). Contact messages are stored in the `techsawai-data` volume when Resend is not configured.

Without Compose:

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com -t techsawai .
docker run -d --name techsawai -p 3000:3000 \
  --env-file .env \
  -v techsawai-data:/app/.data \
  --restart unless-stopped \
  techsawai
```

Put Caddy, Nginx or another TLS-terminating proxy in front of port 3000. The app already sends HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` headers.

### Plain Node host

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
NODE_ENV=production npm start
```

Keep the process alive with systemd, PM2 or your host's process manager, and reverse-proxy port 3000 over HTTPS.

Behind Cloudflare, keep the `cf-ipcountry` header enabled for IP-based language suggestions. On Vercel, `x-vercel-ip-country` is read automatically.
