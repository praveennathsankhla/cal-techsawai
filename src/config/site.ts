export const SITE = {
  name: "TechSawai",
  domain: "techsawai.com",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://techsawai.com",
  tagline: "Practical calculators for building, making and everyday life.",
  ogImage: "/og-image.png",
  description:
    "31 free, accurate calculators for construction, hobbies and everyday conversions. Check the maths, see the formula and get instant estimates in 18 languages.",
  email: "pnath6745@gmail.com",
  phone: "+91 8440095260",
  phoneHref: "+918440095260",
  telegram: "https://t.me/Mediportal247",
  telegramHandle: "@Mediportal247",
  address: {
    street: "Bikaner",
    postalCode: "334001",
    region: "Rajasthan",
    country: "India",
  },
  addressText: "Bikaner, 334001, Rajasthan, India",
  contentUpdated: "2026-11-17",
} as const;

export const CONTACT_EMAIL = SITE.email;
