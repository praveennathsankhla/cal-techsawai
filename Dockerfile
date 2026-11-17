# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# TechSawai production image
# Build: docker build -t techsawai .
# Run:   docker run -p 3000:3000 --env-file .env techsawai
#
# NEXT_PUBLIC_SITE_URL is baked in at build time because Next.js inlines
# NEXT_PUBLIC_* values. Set it as a build arg for every environment:
#   docker build --build-arg NEXT_PUBLIC_SITE_URL=https://example.com -t techsawai .
# ---------------------------------------------------------------------------

FROM node:22-alpine AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_STANDALONE=true

ARG NEXT_PUBLIC_SITE_URL=https://techsawai.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build \
  && test -f .next/standalone/server.js

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Contact submissions fall back to this directory when RESEND_API_KEY is unset.
RUN mkdir -p /app/.data && chown nextjs:nodejs /app/.data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
