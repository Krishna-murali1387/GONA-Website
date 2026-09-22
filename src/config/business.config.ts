import { cableSite } from "@/config/cable.config";

export const businessSite = {
  path: "/business",
  futureSectionId: "whats-next",
} as const;

export const businessCopy = {
  hero: {
    eyebrow: "GONA · BUSINESS",
    headline: ["Software built for businesses", "that move the real world."],
    support:
      "From local operators to schools, restaurants and industries — GONA Business is building a new generation of simple, powerful operating software.",
    primaryCta: "Explore GONA Cable",
    secondaryCta: "Discover what's next",
  },
  flagship: {
    badge: "AVAILABLE NOW",
    name: "GONA Cable",
    subtitle: "Cable Network Management",
    line: "Customers. Billing. Collections. Operators. Complaints. Communication. Your cable network, under control.",
    explore: "Explore GONA Cable",
    register: "Register Your Network",
  },
  future: {
    id: businessSite.futureSectionId,
    heading: ["One business today.", "Many possibilities tomorrow."],
    support:
      "GONA Business is a growing family of professional software — each product built for a real operating world.",
  },
  philosophy: {
    heading: ["Different businesses.", "One philosophy."],
    principles: [
      "Simple to operate.",
      "Built around real workflows.",
      "Designed for growing businesses.",
      "Powered by GONA.",
    ],
  },
  ecosystem: {
    center: "GONA BUSINESS",
    products: [
      { id: "cable", label: "Cable", active: true },
      { id: "schools", label: "Schools", active: false },
      { id: "restaurants", label: "Restaurants", active: false },
      { id: "industry", label: "Industry", active: false },
      { id: "events", label: "Events", active: false },
      { id: "workforce", label: "Workforce", active: false },
      { id: "finance", label: "Finance", active: false },
    ],
  },
  closing: {
    eyebrow: "GONA BUSINESS",
    headline: ["Built for what businesses", "become next."],
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
    accent: "#7EB8FF",
  },
  {
    id: "restaurants",
    name: "GONA Restaurants",
    subtitle: "Restaurant Operations Management",
    accent: "#FF9B6A",
  },
  {
    id: "industry",
    name: "GONA Industry",
    subtitle: "Factory & Industrial Operations",
    accent: "#A8B4C4",
  },
  {
    id: "events",
    name: "GONA Events",
    subtitle: "Event & Venue Management",
    accent: "#C4A5FF",
  },
  {
    id: "workforce",
    name: "GONA Workforce",
    subtitle: "Workforce & Field Operations",
    accent: "#6EE7B7",
  },
  {
    id: "finance",
    name: "GONA Finance",
    subtitle: "Business Finance & Collections",
    accent: "#FFD400",
  },
];
