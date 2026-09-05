/** Repair-only tokens and copy. Isolated from other service pages. */

export const repairTokens = {
  accent: "#F97316",
  soft: "#FFEDD5",
  mist: "#FFF7ED",
  deep: "#C2410C",
  charcoal: "#1C1917",
  graphite: "#292524",
  graphiteMid: "#44403C",
  warmWhite: "#FAF8F5",
  concrete: "#E7E5E4",
  metal: "#A8A29E",
  yellow: "#FFD400",
  success: "#16A34A",
  cool: "#7DD3FC",
} as const;

export const repairServiceTypes = [
  {
    id: "ac",
    title: "AC / Cooling",
    body: "Cooling and AC service requests where available.",
  },
  {
    id: "electrical",
    title: "Electrical",
    body: "Help with fixtures, switches and power issues where available.",
  },
  {
    id: "appliances",
    title: "Appliances",
    body: "Everyday home appliances that need attention where available.",
  },
  {
    id: "plumbing",
    title: "Plumbing",
    body: "Water and fixture issues where available.",
  },
  {
    id: "home",
    title: "Home Maintenance",
    body: "General home repair and maintenance where available.",
  },
] as const;

export const repairTransformSteps = [
  {
    id: "issue",
    n: "01",
    label: "ISSUE",
    title: "Issue",
    body: "Share what is wrong so the technician has context before inspection.",
  },
  {
    id: "inspection",
    n: "02",
    label: "INSPECTION",
    title: "Inspection",
    body: "The technician inspects the issue before confirming repair work and pricing.",
  },
  {
    id: "quotation",
    n: "03",
    label: "QUOTATION",
    title: "Quotation",
    body: "You receive a quotation based on the inspection — your approval is required.",
  },
  {
    id: "approval",
    n: "04",
    label: "YOUR APPROVAL",
    title: "Your Approval",
    body: "Review the quotation and approve before repair work begins.",
  },
  {
    id: "repair",
    n: "05",
    label: "REPAIR",
    title: "Repair",
    body: "After you approve, the technician proceeds with the supported repair.",
  },
  {
    id: "completion",
    n: "06",
    label: "COMPLETION",
    title: "Completion",
    body: "The job finishes with a clear completion check.",
  },
] as const;

export const repairHistoryItems = [
  {
    type: "AC service",
    date: "Recent",
    state: "Completed",
    note: "Inspection · Quote approved · Verified",
  },
  {
    type: "Electrical",
    date: "Earlier",
    state: "Completed",
    note: "Scheduled · Quote approved · Verified",
  },
  {
    type: "Appliance",
    date: "Earlier",
    state: "Completed",
    note: "Service Now · Quote approved · Verified",
  },
] as const;
