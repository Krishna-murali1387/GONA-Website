/** Farming-only tokens, copy, and dedicated media slots. */

export const farmingTokens = {
  accent: "#65A30D",
  leaf: "#84CC16",
  young: "#A3E635",
  foliage: "#3F6212",
  deep: "#365314",
  soil: "#8B5E3C",
  clay: "#A16207",
  earth: "#78350F",
  straw: "#EAB308",
  sky: "#E0F2FE",
  skyDeep: "#BAE6FD",
  ivory: "#FFFCF5",
  warm: "#FAF6EE",
  yellow: "#FFD400",
  charcoal: "#1C1917",
} as const;

/** Temporary fallback until dedicated assets are supplied. */
export const FARMING_FALLBACK_SRC = "/services/farming.webp";

export type FarmingMediaSlot = {
  src: string;
  objectPosition: string;
  recommendedSize: string;
  aspect: string;
};

/**
 * Dedicated Farming image slots.
 * Drop matching files into public/services/farming/ — missing files fall back to farming.webp.
 */
export const farmingMedia = {
  hero: {
    src: "/services/farming/farming-hero.webp",
    objectPosition: "42% 18%",
    recommendedSize: "1600×2000",
    aspect: "4:5",
  },
  growth: {
    src: "/services/farming/farming-growth.webp",
    objectPosition: "50% 55%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  guidance: {
    src: "/services/farming/farming-guidance.webp",
    objectPosition: "32% 42%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  inputs: {
    src: "/services/farming/farming-inputs.webp",
    objectPosition: "38% 50%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  soil: {
    src: "/services/farming/farming-soil.webp",
    objectPosition: "45% 50%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  local: {
    src: "/services/farming/farming-local.webp",
    objectPosition: "38% 42%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
} as const satisfies Record<string, FarmingMediaSlot>;

export const farmingFieldStages = [
  {
    id: "soil",
    label: "Soil",
    body: "Every season begins with the land.",
    stage: 0,
  },
  {
    id: "young",
    label: "Young crop",
    body: "Early growth brings new questions from the field.",
    stage: 1,
  },
  {
    id: "growing",
    label: "Growing crop",
    body: "As crops develop, support needs shift.",
    stage: 2,
  },
  {
    id: "field",
    label: "Developing field",
    body: "A wider landscape of farming needs takes shape.",
    stage: 3,
  },
] as const;

export const farmingJourneySteps = [
  {
    id: "early",
    title: "Early stage",
    concept: "Crop guidance",
    body: "Support designed around early farming questions.",
  },
  {
    id: "growth",
    title: "Growth",
    concept: "Farmer assistance",
    body: "Practical help as the crop develops.",
  },
  {
    id: "needs",
    title: "Field needs",
    concept: "Agricultural inputs",
    body: "Inputs presented where service and location allow.",
  },
  {
    id: "continue",
    title: "Continued support",
    concept: "Soil support",
    body: "Soil conditions as part of the bigger farming picture.",
  },
] as const;

export const farmingSupportPoints = [
  "Guidance",
  "Farmer support",
  "Agricultural inputs",
  "Soil support",
] as const;
