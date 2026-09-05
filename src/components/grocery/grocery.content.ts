/** Grocery-only tokens, copy, and dedicated media slots — THE GROCERY RUN. */

export const groceryTokens = {
  green: "#22C55E",
  soft: "#ECFDF3",
  yellow: "#FFD400",
  white: "#FFFFFF",
  surface: "#F7F8F5",
  warm: "#F7F3EB",
  ink: "#111111",
  muted: "#666666",
  deep: "#052E16",
  forest: "#14532D",
  leaf: "#16A34A",
} as const;

/** Temporary fallback until dedicated assets are supplied. */
export const GROCERY_FALLBACK_SRC = "/services/grocery.webp";

export type GroceryMediaSlot = {
  src: string;
  objectPosition: string;
  objectPositionMobile: string;
  recommendedSize: string;
  aspect: string;
};

/**
 * Dedicated Grocery image slots.
 * Drop matching files into public/services/grocery/ — missing files fall back to grocery.webp.
 */
export const groceryMedia = {
  hero: {
    src: "/services/grocery/grocery-hero.webp",
    objectPosition: "58% 40%",
    objectPositionMobile: "62% 36%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
  categories: {
    src: "/services/grocery/grocery-categories.webp",
    objectPosition: "50% 48%",
    objectPositionMobile: "50% 50%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
  discovery: {
    src: "/services/grocery/grocery-discovery.webp",
    objectPosition: "36% 46%",
    objectPositionMobile: "28% 44%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
  fulfilment: {
    src: "/services/grocery/grocery-fulfilment.webp",
    objectPosition: "54% 42%",
    objectPositionMobile: "58% 40%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
  doorstep: {
    src: "/services/grocery/grocery-doorstep.webp",
    objectPosition: "48% 44%",
    objectPositionMobile: "52% 42%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
} as const satisfies Record<string, GroceryMediaSlot>;

/** Journey rail stages — THE GROCERY RUN */
export const groceryRunChapters = [
  { id: "fresh", index: "01", label: "FRESH" },
  { id: "aisle", index: "02", label: "AISLE" },
  { id: "find", index: "03", label: "FIND" },
  { id: "bag", index: "04", label: "BAG" },
  { id: "prepare", index: "05", label: "PREPARE" },
  { id: "door", index: "06", label: "DOOR" },
] as const;

export type GroceryRunChapterId = (typeof groceryRunChapters)[number]["id"];

export const groceryAisleCategories = [
  { id: "produce", label: "Fresh Produce", short: "PRODUCE" },
  { id: "dairy", label: "Dairy & Everyday", short: "DAIRY" },
  { id: "staples", label: "Staples", short: "STAPLES" },
  { id: "snacks", label: "Snacks", short: "SNACKS" },
  { id: "home", label: "Home & Personal Care", short: "HOME" },
] as const;

export const groceryDiscoveryConcepts = [
  {
    id: "search",
    title: "SEARCH",
    body: "Find everyday essentials.",
  },
  {
    id: "categories",
    title: "CATEGORIES",
    body: "Move quickly through what you need.",
  },
  {
    id: "availability",
    title: "AVAILABILITY",
    body: "See products based on available inventory.",
  },
] as const;

export const groceryFulfilmentStages = [
  {
    id: "received",
    label: "ORDER RECEIVED",
    support: "Enters GONA fulfilment.",
  },
  {
    id: "prepared",
    label: "PREPARED WITH CARE",
    support: "Packed for local delivery.",
  },
  {
    id: "ready",
    label: "READY FOR DELIVERY",
    support: "Ready for the doorstep run.",
  },
] as const;

export const groceryTrustItems = [
  "Inventory-backed availability",
  "Location-aware service",
  "GONA fulfilment",
  "Order tracking",
] as const;
