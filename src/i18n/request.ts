import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import en from "../messages/en.json";

type Messages = Record<string, unknown>;

function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMerge(
        (base[key] as Messages) ?? {},
        value as Messages,
      );
    } else {
      out[key] = value;
    }
  }
  return out;
}

const loaders: Record<string, () => Promise<{ default: Messages }>> = {
  hi: () => import("../messages/hi.json"),
  ta: () => import("../messages/ta.json"),
  te: () => import("../messages/te.json"),
  bn: () => import("../messages/bn.json"),
  mr: () => import("../messages/mr.json"),
  gu: () => import("../messages/gu.json"),
  kn: () => import("../messages/kn.json"),
  ml: () => import("../messages/ml.json"),
  pa: () => import("../messages/pa.json"),
  or: () => import("../messages/or.json"),
  ur: () => import("../messages/ur.json"),
  id: () => import("../messages/id.json"),
  vi: () => import("../messages/vi.json"),
  tr: () => import("../messages/tr.json"),
  pl: () => import("../messages/pl.json"),
  "pt-BR": () => import("../messages/pt-BR.json"),
  tl: () => import("../messages/tl.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  let messages: Messages = en as Messages;
  if (locale !== "en") {
    const loader = loaders[locale];
    if (loader) {
      const localized = (await loader()).default;
      messages = deepMerge(en as Messages, localized);
    }
  }

  return {
    locale,
    messages,
    timeZone: "UTC",
    formats: {
      number: {
        estimate: {
          maximumFractionDigits: 2,
        },
      },
    },
  };
});
