"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-WWTH7SDZ";

/**
 * Inject GTM from an effect instead of next/script. React hoists external
 * script elements into <head> with a preload, which put a 184 KB gtm.js on the
 * critical path. An effect-created script has no preload and runs after paint.
 * The existing dataLayer bootstrap in the layout is unchanged, so the
 * container and its tags behave exactly as before.
 */
export function GtmLoader() {
  useEffect(() => {
    const start = () => {
      if (document.getElementById("gtm-container")) return;
      const script = document.createElement("script");
      script.id = "gtm-container";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    };

    const idle = (window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    }).requestIdleCallback;

    if (typeof idle === "function") {
      const handle = idle(start, { timeout: 3000 });
      return () => {
        (window as Window & { cancelIdleCallback?: (handle: number) => void }).cancelIdleCallback?.(handle);
      };
    }

    const timer = window.setTimeout(start, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
