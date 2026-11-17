import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The calculator pages are fully prerendered at build time, so a read-only
// static-assets cache is enough. This avoids R2, D1, Durable Objects and the
// WORKER_SELF_REFERENCE service binding entirely — the binding that failed
// the first Cloudflare deploy.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
