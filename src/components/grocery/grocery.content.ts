/** Grocery page visual tokens — local to Grocery, not a global redesign. */
export const groceryTokens = {
  green: "#22C55E",
  soft: "#ECFDF3",
  softDeep: "#D1FAE5",
  leaf: "#16A34A",
  cream: "#FFFEF9",
  warm: "#F7F3EB",
  ink: "#111111",
  muted: "#5B6470",
  yellow: "#FFD400",
} as const;

export const groceryCategories = [
  { id: "produce", label: "Fruits & Vegetables", hint: "Fresh daily picks", tone: "#22C55E" },
  { id: "dairy", label: "Dairy", hint: "Milk & essentials", tone: "#7DD3FC" },
  { id: "staples", label: "Staples", hint: "Rice, oil & more", tone: "#FBBF24" },
  { id: "snacks", label: "Snacks", hint: "Everyday treats", tone: "#FB923C" },
  { id: "household", label: "Household", hint: "Home care basics", tone: "#A78BFA" },
  { id: "personal", label: "Personal Care", hint: "Daily self-care", tone: "#F472B6" },
] as const;

export const groceryDemoProducts = [
  {
    id: "tomatoes",
    name: "Farm Tomatoes",
    unit: "500 g",
    price: "₹42",
    meta: "Available nearby",
    kind: "produce" as const,
  },
  {
    id: "milk",
    name: "Fresh Milk",
    unit: "1 L",
    price: "₹58",
    meta: "In stock",
    kind: "dairy" as const,
  },
  {
    id: "basmati",
    name: "Basmati Rice",
    unit: "5 kg",
    price: "₹549",
    meta: "Ready to order",
    kind: "staple" as const,
  },
] as const;

export const groceryJourneySteps = [
  {
    n: "01",
    title: "Add your essentials",
    body: "Browse real inventory-backed availability and build your basket with confidence.",
  },
  {
    n: "02",
    title: "Choose your address",
    body: "Confirm where you want delivery — serviceability depends on your location.",
  },
  {
    n: "03",
    title: "Place your order",
    body: "Checkout securely in the GONA app and submit your grocery order.",
  },
  {
    n: "04",
    title: "GONA prepares it",
    body: "Your order is packed and prepared for fulfillment through GONA.",
  },
  {
    n: "05",
    title: "Delivered to you",
    body: "Follow the journey until your essentials arrive at your door.",
  },
] as const;

export const groceryTrackingStages = [
  "Order Confirmed",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Delivered",
] as const;

export const groceryTrustItems = [
  {
    title: "Real availability",
    body: "See what is actually available before you order.",
  },
  {
    title: "Local serviceability",
    body: "Delivery depends on your area as GONA expands.",
  },
  {
    title: "Secure checkout",
    body: "Complete your order through the trusted GONA app flow.",
  },
  {
    title: "GONA delivery",
    body: "Orders move from preparation to your door with tracking.",
  },
] as const;
