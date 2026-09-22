/**
 * Cable product URLs on the official marketing site.
 */
export const cableSite = {
  productPath: "/business/cable",
  registerPath: "/business/cable/register",
  /** Owner portal host (production). Override with NEXT_PUBLIC_CABLE_APP_URL. */
  portalUrl:
    process.env.NEXT_PUBLIC_CABLE_APP_URL?.replace(/\/$/, "") ||
    "https://cable.gonasuperapp.com",
} as const;
