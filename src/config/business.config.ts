import { cableSite } from "@/config/cable.config";

export const businessSite = {
  path: "/business",
  softwareSectionId: "our-software",
  futureSectionId: "whats-next",
} as const;

/** Parent GONA Business brand — do not replace with product accents. */
export const gonaBusinessBrand = {
  yellow: "#FFD400",
  yellowInk: "#6B5A00",
  yellowMuted: "#8A7400",
} as const;

export type ProductColorId =
  | "cable"
  | "schools"
  | "restaurants"
  | "industry"
  | "events"
  | "workforce"
  | "finance";

export type ProductColors = {
  colorName: string;
  accent: string;
  accentSoft: string;
  accentDark: string;
};

/** Single source of truth for software product color identities. */
export const productColors: Record<ProductColorId, ProductColors> = {
  cable: {
    colorName: "Electric Violet",
    accent: "#6D4AFF",
    accentSoft: "#F1EEFF",
    accentDark: "#241653",
  },
  schools: {
    colorName: "Academic Blue",
    accent: "#2563EB",
    accentSoft: "#EFF6FF",
    accentDark: "#172554",
  },
  restaurants: {
    colorName: "Hospitality Orange",
    accent: "#F97316",
    accentSoft: "#FFF7ED",
    accentDark: "#7C2D12",
  },
  industry: {
    colorName: "Industrial Teal",
    accent: "#0F766E",
    accentSoft: "#F0FDFA",
    accentDark: "#134E4A",
  },
  events: {
    colorName: "Event Magenta",
    accent: "#DB2777",
    accentSoft: "#FDF2F8",
    accentDark: "#831843",
  },
  workforce: {
    colorName: "Workforce Green",
    accent: "#16A34A",
    accentSoft: "#F0FDF4",
    accentDark: "#14532D",
  },
  finance: {
    colorName: "Finance Indigo",
    accent: "#4338CA",
    accentSoft: "#EEF2FF",
    accentDark: "#312E81",
  },
};

export const businessCopy = {
  hero: {
    eyebrow: "GONA BUSINESS",
    headline: ["Run your business better.", "Grow it with GONA."],
    support:
      "Professional software designed around the way real businesses work — customers, teams, operations, communication and money in one connected experience.",
    primaryCta: "Explore Our Software",
    secondaryCta: "Explore GONA Cable",
    trust: "Built by GONA TECHNOLOGIES",
  },
  positioning: {
    heading: ["Software for the way", "real businesses work."],
    support:
      "GONA Business builds professional operating software for businesses, institutions and teams — starting with Cable Network Management.",
  },
  software: {
    id: businessSite.softwareSectionId,
    heading: "Our software",
  },
  flagship: {
    badge: "AVAILABLE NOW",
    name: "GONA Cable",
    subtitle: "Cable Network Management",
    line: "Run customers, connections, billing, collections, operators, complaints and communication from one professional system.",
    explore: "Explore GONA Cable",
    register: "Register Your Network",
  },
  future: {
    id: businessSite.futureSectionId,
    heading: "What's next",
    support: "A growing software family — concepts for the businesses GONA will serve next.",
  },
  brand: {
    heading: ["Different businesses.", "One standard."],
    principles: [
      "Simple to operate.",
      "Built around real workflows.",
      "Designed for growing businesses.",
      "Powered by GONA.",
    ],
  },
  closing: {
    eyebrow: "GONA BUSINESS",
    headline: ["Built for businesses", "ready for what's next."],
    support: "GONA Cable is available now.",
    explore: "Explore GONA Cable",
    register: "Register Your Network",
  },
  links: {
    cableProduct: cableSite.productPath,
    cableRegister: cableSite.registerPath,
  },
} as const;

export type FutureProductId =
  | "schools"
  | "restaurants"
  | "industry"
  | "events"
  | "workforce"
  | "finance";

export const futureProducts: ReadonlyArray<{
  id: FutureProductId;
  name: string;
  subtitle: string;
  accent: string;
  accentSoft: string;
  accentDark: string;
}> = [
  {
    id: "schools",
    name: "GONA Schools",
    subtitle: "School & Education Management",
    ...productColors.schools,
  },
  {
    id: "restaurants",
    name: "GONA Restaurants",
    subtitle: "Restaurant Operations Management",
    ...productColors.restaurants,
  },
  {
    id: "industry",
    name: "GONA Industry",
    subtitle: "Factory & Industrial Operations",
    ...productColors.industry,
  },
  {
    id: "events",
    name: "GONA Events",
    subtitle: "Event & Venue Management",
    ...productColors.events,
  },
  {
    id: "workforce",
    name: "GONA Workforce",
    subtitle: "Workforce & Field Operations",
    ...productColors.workforce,
  },
  {
    id: "finance",
    name: "GONA Finance",
    subtitle: "Business Finance & Collections",
    ...productColors.finance,
  },
];
