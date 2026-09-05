/** LOCAL-only tokens, media slots, and Living Mandal copy. */

export const localTokens = {
  accent: "#0F9F94",
  accentDeep: "#0B7A72",
  accentSoft: "#5BC4BC",
  tealGlow: "#14B8A6",
  cream: "#F5EDE0",
  building: "#E8DCC8",
  buildingDeep: "#C4B49A",
  terracotta: "#C4734A",
  earth: "#8B6914",
  road: "#9CA3AF",
  roadDark: "#6B7280",
  park: "#6B9F5A",
  parkDeep: "#4A7A3C",
  fieldSoft: "#A8C97A",
  sky: "#D6EEEB",
  skyWarm: "#F0E6D4",
  duskSky: "#3D4A5C",
  evening: "#2A3544",
  nearBlack: "#0F172A",
  offWhite: "#FAF8F4",
  charcoal: "#1C1917",
  yellow: "#FFD400",
  white: "#FFFFFF",
  danger: "#DC2626",
} as const;

export const LOCAL_FALLBACK_SRC = "/services/local.webp";

export type LocalMediaSlot = {
  src: string;
  objectPosition: string;
  /** Tighter subject framing on small screens */
  objectPositionMobile: string;
  recommendedSize: string;
  aspect: string;
};

/**
 * Dedicated LOCAL media slots.
 * Drop files into public/services/local/ — missing files fall back to local.webp.
 */
export const localMedia = {
  mandal: {
    src: "/services/local/local-mandal-v2.webp",
    objectPosition: "50% 48%",
    objectPositionMobile: "48% 46%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
  community: {
    src: "/services/local/local-community-v2.webp",
    objectPosition: "45% 42%",
    objectPositionMobile: "42% 40%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  tournament: {
    src: "/services/local/local-tournament-v2.webp",
    // Center framing keeps cricket + volleyball + kabaddi + esports zones visible
    objectPosition: "50% 50%",
    objectPositionMobile: "50% 52%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
  business: {
    src: "/services/local/local-business-v2.webp",
    objectPosition: "48% 45%",
    objectPositionMobile: "50% 42%",
    recommendedSize: "1600×1200",
    aspect: "4:3",
  },
  champions: {
    src: "/services/local/local-champions-v2.webp",
    objectPosition: "50% 42%",
    objectPositionMobile: "50% 40%",
    recommendedSize: "1600×900",
    aspect: "16:9",
  },
} as const satisfies Record<string, LocalMediaSlot>;

export const localEnter = {
  eyebrow: "GONA LOCAL",
  headlinePrimary: "Your Mandal.",
  headlineAccent: "Connected.",
  support: "What's happening around you — brought together in one local community.",
  note: "LOCAL content and availability depend on supported communities and locations.",
  primaryCta: "Explore GONA",
  secondaryCta: "Enter the Mandal",
} as const;

export const localStreamMoments = [
  {
    id: "announcement",
    kind: "LOCAL UPDATE",
    title: "Road update",
    detail: "Nandyala Road · East Tadipatri",
    label: "Example local update",
  },
  {
    id: "important",
    kind: "PUBLIC INFORMATION",
    title: "Community notice",
    detail: "Supported public information for your Mandal.",
    label: "Example important information",
  },
  {
    id: "emergency",
    kind: "EMERGENCY INFORMATION",
    title: "Useful local contacts",
    detail:
      "GONA helps surface useful local contact information. GONA does not operate ambulance, police, fire or government emergency services.",
    label: "Example contact information",
  },
  {
    id: "event",
    kind: "LOCAL EVENT",
    title: "Community celebration",
    detail: "This weekend",
    label: "Example local event",
  },
  {
    id: "banner",
    kind: "SPONSORED LOCAL",
    title: "Festival Offer",
    detail: "Local business",
    label: "Example local banner",
  },
] as const;

export const localEmergencyContacts = [
  { id: "ambulance", label: "AMBULANCE" },
  { id: "police", label: "POLICE" },
  { id: "fire", label: "FIRE" },
  { id: "hospital", label: "HOSPITAL" },
] as const;

export const localTournament = {
  headline: "Local competition.",
  headlineAccent: "Community pride.",
  support:
    "Discover supported local tournaments and follow the competition through GONA LOCAL.",
  note: "Organizer tournaments and Official GONA tournaments remain separate. Admin approval does not make an organizer tournament Official GONA.",
  scoreLabel: "Example live score",
  home: { name: "Tigers", score: "126/4", overs: "14.2 Overs" },
  away: { name: "Warriors", score: "Yet to bat", overs: "" },
  winner: "Tigers",
  championsLine: "Verified winners from legitimate LOCAL tournaments.",
  hallTitle: "Hall of Champions",
  hallLine: "Reserved for verified champions of Official GONA tournaments.",
  hallNote: "Champions and Hall of Champions are not the same.",
} as const;

export const localBusinessCopy = {
  headline: "Your business.",
  headlineAccent: "Seen by your LOCAL community.",
  support:
    "LOCAL advertising helps approved local businesses and community promotions gain visibility within the relevant LOCAL community.",
  note: "Advertising is a LOCAL capability — not a separate GONA service. Visibility is not a guarantee of customers or sales.",
  surfaces: ["Shop", "Local offer", "Sponsored banner", "Community visibility"],
} as const;

export const localCalendar = [
  {
    id: "d12",
    day: "12",
    month: "SEP",
    title: "Community Event",
  },
  {
    id: "d14",
    day: "14",
    month: "SEP",
    title: "Local Tournament",
  },
  {
    id: "d18",
    day: "18",
    month: "SEP",
    title: "Community Celebration",
  },
] as const;

export const localPulloutLabels = [
  "Announcements",
  "Emergency Info",
  "Events",
  "Offers",
  "Tournaments",
  "Champions",
  "Local Businesses",
] as const;

export const localFinale = {
  headline: "Everything local.",
  headlineAccent: "Closer together.",
  brand: "GONA LOCAL",
  support: "One Mandal. One Community. One LOCAL.",
  cta: "Explore GONA",
  note: "LOCAL features and content vary by supported community and location.",
} as const;
