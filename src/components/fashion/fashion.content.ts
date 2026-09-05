/** Fashion-only tokens, copy, and dedicated media slots. */

export const fashionTokens = {
  accent: "#A855F7",
  soft: "#F3E8FF",
  lavender: "#EDE4FF",
  plum: "#4C1D95",
  deep: "#2E1065",
  nearBlack: "#0F0A1A",
  ivory: "#FFFCFA",
  warmIvory: "#FAF7F2",
  yellow: "#FFD400",
  muted: "#A8A29E",
} as const;

/** Temporary fallback until dedicated assets are supplied. */
export const FASHION_FALLBACK_SRC = "/services/fashion.webp";

export type FashionMediaSlot = {
  /** Preferred dedicated asset under /public/services/fashion/ */
  src: string;
  /** CSS object-position for intentional cropping */
  objectPosition: string;
  /** Recommended export size (documentation for asset handoff) */
  recommendedSize: string;
  /** Aspect ratio guidance */
  aspect: string;
};

/**
 * Dedicated Fashion image slots.
 * Drop matching files into public/services/fashion/ — missing files fall back to fashion.webp.
 */
export const fashionMedia = {
  hero: {
    src: "/services/fashion/fashion-hero.webp",
    objectPosition: "45% 22%",
    recommendedSize: "1600×2000",
    aspect: "4:5",
  },
  heroInset: {
    src: "/services/fashion/fashion-look-01.webp",
    objectPosition: "50% 28%",
    recommendedSize: "1400×1800",
    aspect: "7:9",
  },
  women: {
    src: "/services/fashion/fashion-women.webp",
    objectPosition: "48% 16%",
    recommendedSize: "1200×1600",
    aspect: "3:4",
  },
  men: {
    src: "/services/fashion/fashion-men.webp",
    objectPosition: "50% 18%",
    recommendedSize: "1200×1600",
    aspect: "3:4",
  },
  kids: {
    src: "/services/fashion/fashion-kids.webp",
    objectPosition: "50% 42%",
    recommendedSize: "1200×1600",
    aspect: "3:4",
  },
  footwear: {
    src: "/services/fashion/fashion-footwear.webp",
    objectPosition: "50% 52%",
    recommendedSize: "1200×1600",
    aspect: "3:4",
  },
  accessories: {
    src: "/services/fashion/fashion-accessories.webp",
    objectPosition: "50% 42%",
    recommendedSize: "1200×1600",
    aspect: "3:4",
  },
  look01: {
    src: "/services/fashion/fashion-look-01.webp",
    objectPosition: "50% 20%",
    recommendedSize: "1400×1800",
    aspect: "7:9",
  },
  look02: {
    src: "/services/fashion/fashion-look-02.webp",
    objectPosition: "50% 22%",
    recommendedSize: "1400×1800",
    aspect: "7:9",
  },
  look03: {
    src: "/services/fashion/fashion-look-03.webp",
    objectPosition: "50% 24%",
    recommendedSize: "1400×1800",
    aspect: "7:9",
  },
  editorial01: {
    src: "/services/fashion/fashion-editorial-01.webp",
    objectPosition: "50% 50%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  editorial02: {
    src: "/services/fashion/fashion-editorial-02.webp",
    objectPosition: "42% 45%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  cta: {
    src: "/services/fashion/fashion-editorial-02.webp",
    objectPosition: "48% 40%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
} as const satisfies Record<string, FashionMediaSlot>;

export const fashionLookbook = [
  {
    id: "women",
    label: "Women",
    tone: "Everyday elegance",
    media: fashionMedia.women,
  },
  {
    id: "men",
    label: "Men",
    tone: "Local essentials",
    media: fashionMedia.men,
  },
  {
    id: "kids",
    label: "Kids",
    tone: "Playful layers",
    media: fashionMedia.kids,
  },
  {
    id: "footwear",
    label: "Footwear",
    tone: "Grounded details",
    media: fashionMedia.footwear,
  },
  {
    id: "accessories",
    label: "Accessories",
    tone: "Finishing notes",
    media: fashionMedia.accessories,
  },
] as const;

export const fashionShowrooms = [
  {
    id: "look-01",
    code: "LOOK 01",
    mood: "Everyday",
    body: "Easy layers for nearby days.",
    media: fashionMedia.look01,
  },
  {
    id: "look-02",
    code: "LOOK 02",
    mood: "Contemporary",
    body: "Clean forms with a local edge.",
    media: fashionMedia.look02,
  },
  {
    id: "look-03",
    code: "LOOK 03",
    mood: "Occasion",
    body: "Elevated pieces for special moments.",
    media: fashionMedia.look03,
  },
] as const;

export const fashionColors = [
  { id: "purple", label: "Purple", hex: "#A855F7" },
  { id: "black", label: "Black", hex: "#1C1917" },
  { id: "cream", label: "Cream", hex: "#F5E6D3" },
] as const;

export const fashionSizes = ["S", "M", "L", "XL"] as const;

export const fashionSizeScale: Record<(typeof fashionSizes)[number], number> = {
  S: 0.94,
  M: 1,
  L: 1.04,
  XL: 1.08,
};

export const fashionBagSteps = [
  "Discover",
  "Choose variant",
  "Bag",
  "Checkout",
  "Delivery",
] as const;

export const fashionTrust = [
  "Local stores",
  "Size & colour",
  "GONA checkout",
  "Orders",
  "Eligible returns",
] as const;
