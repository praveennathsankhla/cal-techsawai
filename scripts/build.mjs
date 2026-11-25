#!/usr/bin/env node
/**
 * Build entry point.
 *
 * Cloudflare Workers Builds runs `npm run build` and then deploys with
 * `npx wrangler deploy`, which delegates to `opennextjs-cloudflare deploy`.
 * That deploy step only packages an existing OpenNext build, so `npm run build`
 * must produce `.open-next/` when it runs inside Workers Builds. On every other
 * host (Vercel, Docker, plain Node) it stays a normal `next build`.
 *
 * `opennextjs-cloudflare build` runs this same script again for the Next.js
 * build, so OPEN_NEXT_BUILD breaks the recursion and falls through to
 * `next build`.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const bin = {
  next: path.join(root, "node_modules", "next", "dist", "bin", "next"),
  "opennextjs-cloudflare": path.join(
    root,
    "node_modules",
    "@opennextjs",
    "cloudflare",
    "dist",
    "cli",
    "index.js",
  ),
};

const isCloudflareCI =
  process.env.WORKERS_CI === "1" || process.env.CF_PAGES === "1";
const isOpenNextChild = process.env.OPEN_NEXT_BUILD === "1";
const useOpenNext = isCloudflareCI && !isOpenNextChild;

const [command, args, extraEnv] = useOpenNext
  ? ["opennextjs-cloudflare", ["build"], { OPEN_NEXT_BUILD: "1" }]
  : ["next", ["build"], {}];

if (useOpenNext) {
  console.log("> Cloudflare Workers Builds detected: building with OpenNext");
} else if (isOpenNextChild) {
  console.log("> Next.js build requested by OpenNext");
}

const result = spawnSync(process.execPath, [bin[command], ...args], {
  stdio: "inherit",
  cwd: root,
  env: { ...process.env, ...extraEnv },
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
