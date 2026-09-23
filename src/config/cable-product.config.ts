import { cableSite } from "@/config/cable.config";
import { businessSite, productColors } from "@/config/business.config";

export const cableIdentity = {
  accent: productColors.cable.accent,
  soft: productColors.cable.accentSoft,
  extraLight: "#F8F6FF",
  deep: productColors.cable.accentDark,
  white: "#FFFFFF",
  yellow: "#FFD400",
} as const;

/** Feature-category accents inside Cable (not product identities). */
export const cableFeatureAccent = {
  customers: "#2563EB",
  billing: "#059669",
  collections: "#16A34A",
  whatsapp: "#15803D",
  email: "#2563EB",
  complaints: "#EA580C",
  team: "#4F46E5",
  reports: "#1D4ED8",
  devices: "#0891B2",
  branding: "#C026D3",
  import: "#D97706",
  plans: "#4F46E5",
  notices: "#6D4AFF",
  dashboard: "#6D4AFF",
  security: "#241653",
} as const;

export type FeatureCard = {
  id: string;
  title: string;
  body: string;
  accent: string;
  tags?: readonly string[];
  visual: "customers" | "connections" | "plans" | "devices" | "team" | "billing" | "dues" | "collections" | "cash" | "invoice" | "receipt" | "history" | "whatsapp" | "email" | "notices" | "complaints" | "support" | "dashboard" | "search360" | "reports" | "import" | "branding" | "secure";
};

export const cableFeatureLanes: ReadonlyArray<{
  id: string;
  label: string;
  direction: "rtl" | "ltr";
  cards: readonly FeatureCard[];
}> = [
  {
    id: "operations",
    label: "Operations",
    direction: "rtl",
    cards: [
      {
        id: "customers",
        title: "Customers",
        body: "Search and manage customer records with the identifiers your network already uses.",
        accent: cableFeatureAccent.customers,
        tags: ["Name", "Mobile", "Customer ID", "CAS ID", "STB", "Smart Card", "Status"],
        visual: "customers",
      },
      {
        id: "connections",
        title: "Connections",
        body: "Customer connection information and service details in one place.",
        accent: cableFeatureAccent.devices,
        visual: "connections",
      },
      {
        id: "plans",
        title: "Plans",
        body: "Manage Cable plans associated with customer operations.",
        accent: cableFeatureAccent.plans,
        visual: "plans",
      },
      {
        id: "devices",
        title: "Devices",
        body: "Track operational device information such as STB and Smart Card.",
        accent: cableFeatureAccent.devices,
        tags: ["STB", "Smart Card"],
        visual: "devices",
      },
      {
        id: "team",
        title: "Team",
        body: "Owner-managed team access. Operators create and use their own credentials.",
        accent: cableFeatureAccent.team,
        visual: "team",
      },
    ],
  },
  {
    id: "billing",
    label: "Billing & money",
    direction: "ltr",
    cards: [
      {
        id: "monthly-billing",
        title: "Monthly Billing",
        body: "Monthly customer billing workflow for each billing period.",
        accent: cableFeatureAccent.billing,
        visual: "billing",
      },
      {
        id: "due-tracking",
        title: "Due Tracking",
        body: "See who is paid, part paid, due, or carrying outstanding balance.",
        accent: cableFeatureAccent.billing,
        tags: ["Paid", "Part Paid", "Due", "Outstanding"],
        visual: "dues",
      },
      {
        id: "collections",
        title: "Collections",
        body: "Record customer collections as CASH or UPI — no online payment gateway.",
        accent: cableFeatureAccent.collections,
        tags: ["CASH", "UPI"],
        visual: "collections",
      },
      {
        id: "operator-cash",
        title: "Operator Cash",
        body: "Operator cash handover and reconciliation workflow.",
        accent: cableFeatureAccent.collections,
        visual: "cash",
      },
      {
        id: "invoices",
        title: "Invoices",
        body: "Generate professional customer invoice documents.",
        accent: cableFeatureAccent.billing,
        visual: "invoice",
      },
      {
        id: "receipts",
        title: "Receipts",
        body: "Generate payment receipts after collections are recorded.",
        accent: cableFeatureAccent.billing,
        visual: "receipt",
      },
      {
        id: "payment-history",
        title: "Payment History",
        body: "View recorded payment history for the customer.",
        accent: cableFeatureAccent.billing,
        visual: "history",
      },
    ],
  },
  {
    id: "communication",
    label: "Communication & service",
    direction: "rtl",
    cards: [
      {
        id: "whatsapp",
        title: "WhatsApp",
        body: "Manual WhatsApp deep-link communication for bills, reminders, confirmations, and notices.",
        accent: cableFeatureAccent.whatsapp,
        tags: ["Monthly bill", "Due reminder", "Payment confirmation", "Service notice"],
        visual: "whatsapp",
      },
      {
        id: "email",
        title: "Email",
        body: "Supported email for monthly bills, due reminders, and payment confirmation.",
        accent: cableFeatureAccent.email,
        tags: ["Monthly bill", "Due reminder", "Payment confirmation"],
        visual: "email",
      },
      {
        id: "notices",
        title: "Notices",
        body: "Publish important network and customer notices.",
        accent: cableFeatureAccent.notices,
        visual: "notices",
      },
      {
        id: "complaints",
        title: "Complaints",
        body: "Customer service workflow from open through resolved.",
        accent: cableFeatureAccent.complaints,
        tags: ["Open", "Assigned", "Accepted", "In Progress", "Resolved"],
        visual: "complaints",
      },
      {
        id: "customer-support",
        title: "Customer Support",
        body: "Customer Portal support experience for issues and tracking.",
        accent: cableFeatureAccent.complaints,
        visual: "support",
      },
    ],
  },
  {
    id: "management",
    label: "Control & management",
    direction: "ltr",
    cards: [
      {
        id: "owner-dashboard",
        title: "Owner Dashboard",
        body: "Network-level operational overview for owners.",
        accent: cableFeatureAccent.dashboard,
        visual: "dashboard",
      },
      {
        id: "customer-360",
        title: "Customer 360",
        body: "Search by Name, Mobile, Customer ID, CAS, STB, or Smart Card — then see the full picture.",
        accent: cableFeatureAccent.customers,
        tags: ["Collect", "WhatsApp", "Call"],
        visual: "search360",
      },
      {
        id: "reports",
        title: "Reports",
        body: "Operational reporting available to the owner.",
        accent: cableFeatureAccent.reports,
        visual: "reports",
      },
      {
        id: "bulk-import",
        title: "Bulk Import",
        body: "CSV / XLSX customer import with preview and validation.",
        accent: cableFeatureAccent.import,
        visual: "import",
      },
      {
        id: "branding",
        title: "Branding",
        body: "Network logo and banner for your Cable experiences.",
        accent: cableFeatureAccent.branding,
        visual: "branding",
      },
      {
        id: "secure-access",
        title: "Secure Access",
        body: "Each Cable network operates in its own protected workspace.",
        accent: cableFeatureAccent.security,
        visual: "secure",
      },
    ],
  },
];

export const cableProductCopy = {
  backLabel: "Back to GONA Business",
  backHref: businessSite.path,
  hero: {
    eyebrow: "GONA BUSINESS / CABLE",
    badge: "AVAILABLE NOW",
    headline: ["GONA CABLE"],
    subtitle: "Cable Network Management",
    support:
      "Run customers, connections, billing, collections, teams and customer service from one connected Cable system.",
    primaryCta: "Register Your Network",
    secondaryCta: "Owner Sign In",
    tertiaryCta: "Explore the system",
  },
  core: {
    heading: ["ONE CABLE NETWORK.", "THREE CONNECTED EXPERIENCES."],
    roles: ["OWNER", "OPERATOR", "CUSTOMER"] as const,
  },
  features: {
    id: "cable-features",
    heading: ["EVERYTHING YOUR", "NETWORK NEEDS."],
    support:
      "From customer records to collections and support, GONA Cable brings everyday cable operations into one connected system.",
  },
  experiences: {
    id: "cable-experiences",
    heading: ["BUILT FOR EVERYONE", "IN THE NETWORK."],
    owner: {
      id: "cable-owner",
      label: "OWNER",
      heading: ["CONTROL THE NETWORK", "FROM ONE PLACE."],
      support:
        "Run network operations, money, people and identity from one Owner web workspace.",
      areas: [
        "Customers",
        "Connections",
        "Billing",
        "Collections",
        "Plans",
        "Devices",
        "Team",
        "Complaints",
        "Reports",
        "Notices",
        "Communications",
        "Branding",
        "Subscription",
        "Settings",
      ] as const,
    },
    operator: {
      id: "cable-operator",
      label: "OPERATOR",
      heading: ["BUILT FOR WORK", "IN THE FIELD."],
      support:
        "A mobile-friendly Operator workspace for customer lookup, dues, collections, complaints and cash handover — with access limited by owner-assigned capabilities.",
      areas: ["Home", "Customers", "Collect", "Complaints", "More", "My Cash", "Notices"] as const,
    },
    customer: {
      id: "cable-customer",
      label: "CUSTOMER PORTAL",
      heading: ["A DIGITAL SPACE", "FOR EVERY CUSTOMER."],
      support:
        "A web Customer Portal — not a separate Cable mobile app — for bills, connection details, notices, support and profile.",
      areas: ["Home", "Bills", "Connection", "Support", "Profile", "Notices"] as const,
      note: "Customer Portal = WEB EXPERIENCE.",
    },
  },
  documents: {
    id: "cable-documents",
    heading: ["FROM COLLECTION", "TO DOCUMENT."],
    flow: ["COLLECTION RECORDED", "RECEIPT", "INVOICE / BILLING DOCUMENT"] as const,
  },
  communications: {
    id: "cable-comms",
    heading: ["KEEP CUSTOMERS", "INFORMED."],
    channels: [
      {
        title: "WhatsApp",
        body: "Manual communication using WhatsApp deep links — monthly bill, due reminder, payment confirmation, service notice, or a custom message. Your team opens WhatsApp; GONA does not auto-send WhatsApp messages.",
      },
      {
        title: "Email",
        body: "Supported email for monthly bills, due reminders, and payment confirmation — with delivery status and history in Cable.",
      },
      {
        title: "Notices",
        body: "Owner-published customer notices for maintenance, interruptions, service updates, and important announcements.",
      },
    ],
  },
  search360: {
    id: "cable-360",
    heading: ["FIND THE CUSTOMER.", "SEE THE WHOLE PICTURE."],
    placeholders: [
      "Name",
      "Mobile",
      "Customer ID",
      "CAS",
      "STB",
      "Smart Card",
    ] as const,
    view: ["Status", "Plan", "Devices", "Due / Paid", "Payment history"] as const,
    actions: ["Collect", "WhatsApp", "Call"] as const,
  },
  complaints: {
    id: "cable-complaints",
    heading: "From complaint to resolution.",
    stages: ["Open", "Assigned", "Accepted", "In Progress", "Resolved"] as const,
  },
  trio: {
    id: "cable-ops",
    import: {
      title: "Bulk Import",
      body: "CSV / XLSX customer import with preview and validation.",
    },
    branding: {
      title: "Branding",
      body: "Network logo and banner for your Cable experiences.",
    },
    reports: {
      title: "Reports",
      body: "Operational visibility for owners across collections and dues.",
    },
  },
  security: {
    id: "cable-security",
    heading: ["YOUR NETWORK.", "YOUR TEAM.", "YOUR DATA."],
    support:
      "Each Cable network operates in its own protected workspace. Owner and Operator access is controlled. Customers only see their own portal information.",
  },
  onboarding: {
    id: "cable-start",
    heading: "Getting started is simple.",
    steps: [
      { n: "01", title: "Register your network" },
      { n: "02", title: "GONA reviews your registration" },
      { n: "03", title: "Sign in with your approved account" },
      { n: "04", title: "Set up your network and team" },
    ] as const,
  },
  closing: {
    eyebrow: "GONA BUSINESS",
    headline: ["READY TO RUN YOUR", "CABLE NETWORK", "DIFFERENTLY?"],
    primaryCta: "Register Your Network",
    secondaryCta: "Owner Sign In",
  },
  links: {
    register: cableSite.registerPath,
    portal: cableSite.portalUrl,
    business: businessSite.path,
  },
} as const;
