/**
 * Centralized, typed configuration for the official GONA public website.
 * Update brand, services, routes, and asset paths here — do not hardcode across pages.
 */

export const gonaColors = {
  yellow: "#FFD400",
  black: "#111111",
  white: "#FFFFFF",
  light: "#F5F5F5",
  gray: "#666666",
  /** Controlled secondary accent — LOCAL / community only */
  localOrange: "#FF7A1A",
} as const;

export type GonaColorToken = keyof typeof gonaColors;

export type ServiceId =
  | "grocery"
  | "healthcare"
  | "repair"
  | "vehicle-booking"
  | "fashion"
  | "farming"
  | "local";

export type ServiceKind = "everyday" | "community";

export type GonaService = {
  id: ServiceId;
  name: string;
  shortName: string;
  kind: ServiceKind;
  /** Marketing blurb — may expand in later phases */
  summary: string;
  /** Short carousel line */
  carouselLine: string;
  href: string;
  /**
   * Official service mark path once supplied.
   * Null — do not fabricate logos.
   */
  logoSrc: string | null;
  /** Carousel / story order (1–7) */
  order: number;
  accentToken: GonaColorToken;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  brand: {
    name: string;
    legalName: string;
    wordmark: string;
    positioning: string;
    tagline: string;
    supportLine: string;
  };
  hero: {
    eyebrow: string;
    headlinePrimary: string;
    headlineAccent: string;
    support: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
    scrollHint: string;
  };
  domain: string;
  url: string;
  supportEmail: string;
  colors: typeof gonaColors;
  assets: {
    logo: string;
    logoAlt: string;
  };
  download: {
    /** Real Play Store URL when live — never invent */
    playStoreUrl: string | null;
    ctaLabel: string;
    comingSoonLabel: string;
    /** In-page foundation target until Play Store URL exists */
    anchor: string;
  };
  social: {
    instagram: string | null;
    facebook: string | null;
    youtube: string | null;
    x: string | null;
    linkedin: string | null;
  };
  nav: {
    primary: NavItem[];
    footerCompany: NavItem[];
    footerSupport: NavItem[];
    footerLegal: NavItem[];
  };
  services: GonaService[];
  routes: {
    home: string;
    services: string;
    local: string;
    about: string;
    partners: string;
    careers: string;
    contact: string;
    faq: string;
    privacy: string;
    terms: string;
    refundPolicy: string;
    shippingDeliveryPolicy: string;
    deleteAccount: string;
  };
};

export const siteConfig: SiteConfig = {
  brand: {
    name: "GONA",
    legalName: "GONA TECHNOLOGIES",
    wordmark: "GONA",
    positioning: "SEVEN SERVICES · ONE GONA",
    tagline: "Everything You Need. One GONA.",
    supportLine: "Built for local India.",
  },
  hero: {
    eyebrow: "LOCAL SUPER-APP ECOSYSTEM",
    headlinePrimary: "Everything You Need.",
    headlineAccent: "All in GONA.",
    support:
      "Everyday services, local businesses and your community — connected through one app.",
    primaryCta: "Download GONA",
    secondaryCta: "Explore Services",
    trustLine: "Built for local India. One account across every service.",
    scrollHint: "Scroll to explore",
  },
  domain: "gonasuperapp.com",
  url: "https://gonasuperapp.com",
  supportEmail: "wearegonasuperapp@gmail.com",
  colors: gonaColors,
  assets: {
    logo: "/brand/gona-logo.png",
    logoAlt: "GONA",
  },
  download: {
    playStoreUrl: null,
    ctaLabel: "Download App",
    comingSoonLabel: "Google Play — Coming Soon",
    anchor: "#download",
  },
  social: {
    instagram: null,
    facebook: null,
    youtube: null,
    x: null,
    linkedin: null,
  },
  nav: {
    primary: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "LOCAL", href: "/local" },
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    footerCompany: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Cable Software", href: "/business/cable" },
      { label: "Contact", href: "/contact" },
    ],
    footerSupport: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Account Deletion", href: "/delete-account" },
    ],
    footerLegal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cancellation & Refund Policy", href: "/refund-policy" },
      {
        label: "Shipping / Delivery Policy",
        href: "/shipping-delivery-policy",
      },
    ],
  },
  services: [
    {
      id: "grocery",
      name: "Grocery",
      shortName: "Grocery",
      kind: "everyday",
      summary: "Everyday essentials delivered through GONA.",
      carouselLine: "Daily essentials, delivered locally.",
      href: "/services/grocery",
      logoSrc: null,
      order: 1,
      accentToken: "yellow",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      shortName: "Healthcare",
      kind: "everyday",
      summary: "Health and wellness connected in one place.",
      carouselLine: "Healthcare support closer to your community.",
      href: "/services/healthcare",
      logoSrc: null,
      order: 2,
      accentToken: "yellow",
    },
    {
      id: "repair",
      name: "GONA Repair",
      shortName: "Repair",
      kind: "everyday",
      summary: "Repairs and service when you need them.",
      carouselLine: "Trusted local service when things need fixing.",
      href: "/services/repair",
      logoSrc: null,
      order: 3,
      accentToken: "yellow",
    },
    {
      id: "vehicle-booking",
      name: "Vehicle Booking",
      shortName: "Vehicle",
      kind: "everyday",
      summary: "Book rides and vehicles through GONA.",
      carouselLine: "Find the right vehicle for your journey.",
      href: "/services/vehicle-booking",
      logoSrc: null,
      order: 4,
      accentToken: "yellow",
    },
    {
      id: "fashion",
      name: "Fashion",
      shortName: "Fashion",
      kind: "everyday",
      summary: "Style and essentials for every day.",
      carouselLine: "Discover fashion closer to you.",
      href: "/services/fashion",
      logoSrc: null,
      order: 5,
      accentToken: "yellow",
    },
    {
      id: "farming",
      name: "Farming",
      shortName: "Farming",
      kind: "everyday",
      summary: "Tools and support for farming communities.",
      carouselLine: "Supporting the needs of local agriculture.",
      href: "/services/farming",
      logoSrc: null,
      order: 6,
      accentToken: "yellow",
    },
    {
      id: "local",
      name: "LOCAL",
      shortName: "LOCAL",
      kind: "community",
      summary: "Your Mandal. Now Digital.",
      carouselLine: "Your Mandal. Now Digital.",
      href: "/local",
      logoSrc: null,
      order: 7,
      accentToken: "localOrange",
    },
  ],
  routes: {
    home: "/",
    services: "/services",
    local: "/local",
    about: "/about",
    partners: "/partners",
    careers: "/careers",
    contact: "/contact",
    faq: "/faq",
    privacy: "/privacy",
    terms: "/terms",
    refundPolicy: "/refund-policy",
    shippingDeliveryPolicy: "/shipping-delivery-policy",
    deleteAccount: "/delete-account",
  },
};

export const everydayServices = siteConfig.services.filter(
  (service) => service.kind === "everyday",
);

export const communityServices = siteConfig.services.filter(
  (service) => service.kind === "community",
);

export function getServiceById(id: ServiceId): GonaService | undefined {
  return siteConfig.services.find((service) => service.id === id);
}

export function getServiceByHref(href: string): GonaService | undefined {
  return siteConfig.services.find((service) => service.href === href);
}
