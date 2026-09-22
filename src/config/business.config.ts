import { cableSite } from "@/config/cable.config";

export const businessSite = {
  path: "/business",
  softwareSectionId: "our-software",
  futureSectionId: "whats-next",
} as const;

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
}> = [
  {
    id: "schools",
    name: "GONA Schools",
    subtitle: "School & Education Management",
    accent: "#3B6FA0",
  },
  {
    id: "restaurants",
    name: "GONA Restaurants",
    subtitle: "Restaurant Operations Management",
    accent: "#C45C26",
  },
  {
    id: "industry",
    name: "GONA Industry",
    subtitle: "Factory & Industrial Operations",
    accent: "#5A6570",
  },
  {
    id: "events",
    name: "GONA Events",
    subtitle: "Event & Venue Management",
    accent: "#6B4C9A",
  },
  {
    id: "workforce",
    name: "GONA Workforce",
    subtitle: "Workforce & Field Operations",
    accent: "#2F7A5B",
  },
  {
    id: "finance",
    name: "GONA Finance",
    subtitle: "Business Finance & Collections",
    accent: "#B8860B",
  },
];
