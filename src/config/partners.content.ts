import type { ServiceId } from "@/config/site.config";
import { siteConfig } from "@/config/site.config";

export type PartnerId =
  | "delivery"
  | "fashion"
  | "healthcare"
  | "repair"
  | "vehicle"
  | "farming"
  | "local-community";

export type PartnerType = {
  id: PartnerId;
  title: string;
  shortLabel: string;
  description: string;
  relatesTo: ServiceId | ServiceId[];
  relatesLabel: string;
  participation: string;
  process: [string, string, string];
  /** Query reason for /contact preselect */
  contactReason: "partnership";
};

/**
 * Partner CTA destination.
 * When a real onboarding URL exists, set it here.
 * Null → honest contact / coming-soon flow.
 */
export const partnerCta = {
  onboardingUrl: null as string | null,
  comingSoonLabel: "Partner Registration — Coming Soon",
  contactFallbackLabel: "Contact GONA About Partnering",
  contactHref: `${siteConfig.routes.contact}?reason=partnership`,
} as const;

export const partnerTypes: PartnerType[] = [
  {
    id: "delivery",
    title: "Delivery Partner",
    shortLabel: "Delivery",
    description:
      "For people interested in delivery work through the GONA ecosystem.",
    relatesTo: "grocery",
    relatesLabel: "Grocery & everyday delivery",
    participation:
      "Help move everyday essentials and local orders through GONA as the ecosystem expands.",
    process: [
      "Choose Delivery Partner",
      "Share your interest with GONA",
      "Join when onboarding opens",
    ],
    contactReason: "partnership",
  },
  {
    id: "fashion",
    title: "Fashion Partner",
    shortLabel: "Fashion",
    description:
      "For fashion shops, sellers and businesses participating through GONA Fashion.",
    relatesTo: "fashion",
    relatesLabel: "GONA Fashion",
    participation:
      "Bring apparel, footwear and accessories into the GONA Fashion experience.",
    process: [
      "Choose Fashion Partner",
      "Tell us about your store or catalogue",
      "Connect when Fashion onboarding opens",
    ],
    contactReason: "partnership",
  },
  {
    id: "healthcare",
    title: "Healthcare Partner",
    shortLabel: "Healthcare",
    description:
      "For relevant healthcare providers and businesses participating in the healthcare ecosystem.",
    relatesTo: "healthcare",
    relatesLabel: "GONA Healthcare",
    participation:
      "Participate carefully in community healthcare pathways through GONA — without overstating medical claims.",
    process: [
      "Choose Healthcare Partner",
      "Share your practice or business details",
      "Connect through GONA Healthcare pathways",
    ],
    contactReason: "partnership",
  },
  {
    id: "repair",
    title: "Repair Technician",
    shortLabel: "Repair",
    description:
      "For technicians and service professionals participating through GONA Repair.",
    relatesTo: "repair",
    relatesLabel: "GONA Repair",
    participation:
      "Offer local repair and service support to people nearby through GONA.",
    process: [
      "Choose Repair Technician",
      "Share your skills and service area",
      "Join GONA Repair when onboarding opens",
    ],
    contactReason: "partnership",
  },
  {
    id: "vehicle",
    title: "Vehicle Partner",
    shortLabel: "Vehicle",
    description: "Drive or list your vehicle with GONA.",
    relatesTo: "vehicle-booking",
    relatesLabel: "Vehicle Booking",
    participation:
      "Help power local journeys by driving or listing vehicles through GONA Vehicle Booking.",
    process: [
      "Choose Vehicle Partner",
      "Share your vehicle or driving interest",
      "Join when vehicle onboarding opens",
    ],
    contactReason: "partnership",
  },
  {
    id: "farming",
    title: "Farming Partner",
    shortLabel: "Farming",
    description:
      "For agriculture and farming sellers or service providers in the GONA Farming ecosystem.",
    relatesTo: "farming",
    relatesLabel: "GONA Farming",
    participation:
      "Support local agriculture by connecting products or services through GONA Farming.",
    process: [
      "Choose Farming Partner",
      "Share what you offer",
      "Connect as Farming pathways expand",
    ],
    contactReason: "partnership",
  },
  {
    id: "local-community",
    title: "Local Business / Community Partner",
    shortLabel: "LOCAL",
    description:
      "For local businesses, organizers and community partners participating through LOCAL.",
    relatesTo: "local",
    relatesLabel: "LOCAL",
    participation:
      "Bring local offers, events, tournaments and community presence into the LOCAL experience.",
    process: [
      "Choose Local / Community Partner",
      "Share your business or community role",
      "Join LOCAL as community tools expand",
    ],
    contactReason: "partnership",
  },
];

export function getPartnerById(id: PartnerId): PartnerType | undefined {
  return partnerTypes.find((p) => p.id === id);
}

export function getPartnerForService(
  serviceId: ServiceId,
): PartnerType | undefined {
  return partnerTypes.find((p) =>
    Array.isArray(p.relatesTo)
      ? p.relatesTo.includes(serviceId)
      : p.relatesTo === serviceId,
  );
}
