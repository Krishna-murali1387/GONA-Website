import { cableSite } from "@/config/cable.config";

export const cableProductCopy = {
  hero: {
    eyebrow: "GONA CABLE",
    badge: "AVAILABLE NOW",
    headline: ["Your entire cable network.", "One professional system."],
    support:
      "Manage customers, connections, billing, collections, operators, complaints and communication — while giving your customers their own digital portal.",
    primaryCta: "Register Your Network",
    secondaryCta: "Owner Sign In",
    tertiaryCta: "Explore features",
  },
  experiences: {
    heading: ["One network.", "Three connected experiences."],
    owner: {
      title: "Run your entire network from one place.",
      role: "OWNER WEB",
      groups: [
        {
          title: "Network operations",
          items: ["Overview", "Customers", "Connections", "Devices", "Plans"],
        },
        {
          title: "Money & billing",
          items: ["Billing", "Collections", "Reports", "Subscription"],
        },
        {
          title: "People & service",
          items: ["Team", "Complaints", "Notices", "Communications"],
        },
        {
          title: "Identity",
          items: ["Network branding", "Settings"],
        },
      ],
    },
    operator: {
      title: "Built for your team in the field.",
      role: "OPERATOR MOBILE",
      items: [
        "Mobile-friendly workspace",
        "Customer search & details",
        "Check dues and collect payments",
        "Complaints handling",
        "My Cash and cash handover",
        "Call customer",
        "Manual WhatsApp where supported",
        "Access limited by owner-assigned capabilities",
      ],
    },
    customer: {
      title: "Give every customer their own digital space.",
      role: "CUSTOMER PORTAL",
      note: "Web access for customers — not a separate Cable mobile app.",
      items: [
        "Customer login",
        "Connection details and current plan",
        "Bills and payment history",
        "Notices from your network",
        "Report an issue and track complaints",
        "Network banners",
        "Profile",
        "GONA platform advertisements where applicable",
      ],
    },
  },
  search360: {
    heading: "Find any customer in seconds.",
    support: "Search across the identifiers your network already uses.",
    searchBy: [
      "Customer Name",
      "Mobile Number",
      "Customer ID",
      "CAS ID",
      "STB Number",
      "Smart Card Number",
    ],
    view: ["Status", "Plan", "Connection", "Devices", "Due", "Paid", "Payment history"],
    actions: ["Collect", "WhatsApp", "Call"],
  },
  billing: {
    heading: ["Know who paid.", "Know who owes."],
    support:
      "Monthly billing and collections for real field operations — recorded as CASH or UPI by your team. No online payment gateway in GONA Cable V1.",
    items: [
      "Monthly billing and current billing period",
      "Bill status: Paid, Part Paid, Due",
      "Outstanding balances",
      "Record manual CASH payment",
      "Record manual UPI payment",
      "Payment allocation and receipts",
      "Payment history",
      "Operator cash accountability",
      "Cash handover and reconciliation",
    ],
  },
  communications: {
    heading: "Keep customers informed.",
    channels: [
      {
        title: "WhatsApp",
        body: "Manual communication using WhatsApp deep links — monthly bill, payment reminder, payment confirmation, service notice, or a custom message. Your team opens WhatsApp; GONA does not auto-send or track WhatsApp delivery.",
      },
      {
        title: "Email",
        body: "Monthly bill emails, payment due reminders, and payment confirmation after qualifying payments — with delivery status and history in Cable.",
      },
      {
        title: "Notices",
        body: "Owner-published customer notices for maintenance, network interruptions, channel or service updates, and important announcements.",
      },
    ],
  },
  documents: {
    heading: "Professional billing documents.",
    items: ["Invoice PDF", "Receipt PDF", "Secure document access and download"],
  },
  team: {
    heading: ["Your team.", "The right access."],
    items: [
      "Owner invites Operators",
      "Operators create their own password and account",
      "Role and capability-based access",
      "Owner never needs to create or know Operator passwords",
      "Field-friendly mobile experience",
    ],
  },
  complaints: {
    heading: "From complaint to resolution.",
    stages: ["Open", "Assigned", "Accepted", "In Progress", "Resolved"],
  },
  branding: {
    heading: ["Your network.", "Your identity."],
    support:
      "Owners can add a network logo and banner so branding appears appropriately through Cable experiences — while remaining part of the GONA Business software family.",
  },
  reports: {
    heading: "See your network clearly.",
    support:
      "Owner reports and overview visibility for collections, outstanding dues, and operational periods — so you can see the network clearly without inventing forecasts that are not part of the product.",
  },
  import: {
    heading: "Move your existing customer records without starting over.",
    items: [
      "CSV and Excel import",
      "Preview and validation before commit",
      "Supports customer and connection data including relevant device identifiers",
    ],
    note: "Does not claim migration from every third-party cable system.",
  },
  security: {
    heading: "Your network stays your network.",
    items: [
      "Each Cable Network has its own workspace",
      "Owner and Operator access is controlled",
      "Customers only see their own portal information",
      "Cable business data is separate from consumer GONA service locations",
      "GONA Super Admin approval before network activation",
    ],
  },
  onboarding: {
    heading: "Getting started is simple.",
    steps: [
      "Register your network",
      "Verify your email",
      "Submit your business and network details",
      "GONA reviews and approves your network",
      "Set up customers, plans and team",
      "Start operating",
    ],
  },
  closing: {
    eyebrow: "GONA CABLE",
    headline: ["Ready to bring your cable network", "into one professional system?"],
    primaryCta: "Register Your Network",
    secondaryCta: "Owner Sign In",
    note: "Already approved? Sign in with your existing GONA account.",
  },
  links: {
    register: cableSite.registerPath,
    portal: cableSite.portalUrl,
    featuresId: "cable-features",
  },
} as const;
