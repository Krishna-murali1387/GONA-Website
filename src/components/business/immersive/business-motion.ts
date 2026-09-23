export const V3_PRODUCTS = [
  {
    id: "cable",
    name: "GONA Cable",
    subtitle: "Cable Network Management",
    status: "available" as const,
    href: "/business/cable",
  },
  {
    id: "schools",
    name: "GONA Schools",
    subtitle: "School & Education Management",
    status: "soon" as const,
  },
  {
    id: "restaurants",
    name: "GONA Restaurants",
    subtitle: "Restaurant Operations Management",
    status: "soon" as const,
  },
  {
    id: "industry",
    name: "GONA Industry",
    subtitle: "Factory & Industrial Operations",
    status: "soon" as const,
  },
  {
    id: "events",
    name: "GONA Events",
    subtitle: "Event & Venue Management",
    status: "soon" as const,
  },
  {
    id: "workforce",
    name: "GONA Workforce",
    subtitle: "Workforce & Field Operations",
    status: "soon" as const,
  },
  {
    id: "finance",
    name: "GONA Finance",
    subtitle: "Business Finance & Collections",
    status: "soon" as const,
  },
] as const;

export type V3ProductId = (typeof V3_PRODUCTS)[number]["id"];

/** Layout angles (degrees) for universe nodes; Cable at front. */
export const UNIVERSE_LAYOUT: Record<
  V3ProductId,
  { angle: number; radius: number; elevation: number }
> = {
  cable: { angle: -90, radius: 2.15, elevation: 0.05 },
  schools: { angle: -20, radius: 2.55, elevation: 0.55 },
  restaurants: { angle: 35, radius: 2.45, elevation: 0.2 },
  industry: { angle: 90, radius: 2.5, elevation: -0.15 },
  events: { angle: 145, radius: 2.4, elevation: 0.35 },
  workforce: { angle: -150, radius: 2.5, elevation: -0.05 },
  finance: { angle: -45, radius: 2.6, elevation: 0.45 },
};

export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
