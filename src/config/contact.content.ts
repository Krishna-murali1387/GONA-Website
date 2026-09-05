export type ContactReasonId =
  | "customer-support"
  | "partner-support"
  | "partnership"
  | "report-problem"
  | "suggest-improvement"
  | "business-inquiry"
  | "general-feedback";

export type ContactReason = {
  id: ContactReasonId;
  label: string;
  description: string;
  /** Shown when this reason is selected */
  helper?: string;
};

export const contactReasons: ContactReason[] = [
  {
    id: "customer-support",
    label: "Customer Support",
    description: "Help with using GONA services or your account.",
  },
  {
    id: "partner-support",
    label: "Partner Support",
    description: "Help for existing or prospective partners.",
  },
  {
    id: "partnership",
    label: "Partnership Interest",
    description: "Become part of the GONA partner ecosystem.",
    helper: "Tell us which partner type interests you when you write.",
  },
  {
    id: "report-problem",
    label: "Report a Problem",
    description: "Something is broken, confusing, or not working as expected.",
  },
  {
    id: "suggest-improvement",
    label: "Suggest an Improvement",
    description:
      "Share feature ideas, local needs, missing categories, or general improvements.",
    helper:
      "We read suggestions carefully. We cannot promise every idea will be built.",
  },
  {
    id: "business-inquiry",
    label: "Business Inquiry",
    description: "Press, collaboration, or other business conversations.",
  },
  {
    id: "general-feedback",
    label: "General Feedback",
    description: "Anything else you want the GONA team to hear.",
  },
];

const reasonIds = new Set(contactReasons.map((r) => r.id));

export function isValidContactReason(
  value: string | null | undefined,
): value is ContactReasonId {
  return Boolean(value && reasonIds.has(value as ContactReasonId));
}

export function getContactReason(
  id: ContactReasonId,
): ContactReason | undefined {
  return contactReasons.find((r) => r.id === id);
}
