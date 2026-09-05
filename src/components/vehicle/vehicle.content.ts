/** Vehicle-only tokens and copy. Isolated from Grocery / Healthcare / Repair. */

export const vehicleTokens = {
  accent: "#6366F1",
  soft: "#E0E7FF",
  lavender: "#EEF2FF",
  deep: "#312E81",
  midnight: "#1E1B4B",
  navy: "#0F172A",
  coolGray: "#94A3B8",
  road: "#334155",
  asphalt: "#1E293B",
  yellow: "#FFD400",
  white: "#FFFFFF",
  mist: "#F8FAFC",
} as const;

export const vehicleDiscoveryItems = [
  {
    id: "car",
    label: "Car",
    kind: "Passenger",
    note: "Available nearby",
    angle: -28,
    dist: 0.62,
  },
  {
    id: "auto",
    label: "Auto",
    kind: "Passenger",
    note: "Available nearby",
    angle: 42,
    dist: 0.48,
  },
  {
    id: "mini",
    label: "Mini goods",
    kind: "Goods",
    note: "Available nearby",
    angle: 148,
    dist: 0.7,
  },
  {
    id: "load",
    label: "Load vehicle",
    kind: "Goods",
    note: "Available nearby",
    angle: -132,
    dist: 0.78,
  },
] as const;

export const vehicleJourneyNodes = [
  { id: "location", label: "Your location", body: "Start from where you are." },
  { id: "vehicle", label: "Vehicle", body: "Browse available options nearby." },
  { id: "booking", label: "Booking", body: "Confirm passenger or goods travel." },
  { id: "pickup", label: "Pickup", body: "Meet at the agreed pickup point." },
  {
    id: "verify",
    label: "Verify start",
    body: "Confirm the correct booking before the journey begins.",
  },
  { id: "journey", label: "Journey", body: "Move toward your destination." },
] as const;

export const vehicleTrustPoints = [
  "Nearby discovery",
  "Passenger + Goods",
  "Now + Schedule",
  "Vehicle photos",
  "Trip Start verification",
] as const;
