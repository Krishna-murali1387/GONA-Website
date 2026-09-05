/** Healthcare-only tokens, copy, and media slots — THE CARE THREAD. */

export const healthcareTokens = {
  accent: "#3B82F6",
  soft: "#DBEAFE",
  mist: "#EFF6FF",
  surface: "#F8FAFC",
  warm: "#FFFFFF",
  navy: "#1E3A5F",
  deep: "#1D4ED8",
  ink: "#0F172A",
  muted: "#64748B",
  yellow: "#FFD400",
  dotted: "#93C5FD",
} as const;

export const HEALTHCARE_FALLBACK_SRC = "/services/healthcare.webp";

export type HealthcareMediaSlot = {
  src: string;
  objectPosition: string;
  objectPositionMobile: string;
};

/**
 * Dedicated Healthcare media slots — final photography (H-WEB-02).
 * Missing files fall back to healthcare.webp.
 */
export const healthcareMedia = {
  hero: {
    src: "/services/healthcare/healthcare-hero.webp",
    /** Doctor + family interaction (avoid busy right pillar text) */
    objectPosition: "38% 42%",
    objectPositionMobile: "42% 40%",
  },
  consultation: {
    src: "/services/healthcare/healthcare-consultation.webp",
    /** Doctor face + patient interaction */
    objectPosition: "58% 38%",
    objectPositionMobile: "62% 36%",
  },
  referral: {
    src: "/services/healthcare/healthcare-referral.webp",
    /** Two doctors + patient + tablet moment */
    objectPosition: "52% 44%",
    objectPositionMobile: "55% 42%",
  },
  veterinary: {
    src: "/services/healthcare/healthcare-veterinary.webp",
    /** Vet + animal + family */
    objectPosition: "48% 48%",
    objectPositionMobile: "46% 50%",
  },
} as const satisfies Record<string, HealthcareMediaSlot>;

export const healthcareRunChapters = [
  { id: "start", index: "01", label: "START" },
  { id: "nearby", index: "02", label: "NEARBY" },
  { id: "time", index: "03", label: "TIME" },
  { id: "consult", index: "04", label: "CONSULT" },
  { id: "rx", index: "05", label: "RX" },
  { id: "meds", index: "06", label: "MEDS" },
  { id: "refer", index: "07", label: "REFER" },
  { id: "history", index: "08", label: "HISTORY" },
  { id: "family", index: "09", label: "FAMILY" },
  { id: "vet", index: "10", label: "VET" },
  { id: "future", index: "11", label: "SOON" },
] as const;

export type HealthcareChapterId = (typeof healthcareRunChapters)[number]["id"];

export const healthcareNearbyNodes = [
  { id: "general", label: "General Care" },
  { id: "local", label: "Local / RMP Care" },
  { id: "hospital", label: "Hospitals" },
  { id: "specialist", label: "Specialists" },
] as const;

export const healthcareBookingSteps = [
  "Choose care",
  "Choose available time",
  "Appointment confirmed",
] as const;

export const healthcareBookingWindows = [
  "Now",
  "Morning",
  "Afternoon",
  "Later",
] as const;

export const healthcareConsultStages = [
  { id: "symptoms", label: "Symptoms" },
  { id: "assessment", label: "Assessment" },
  { id: "plan", label: "Care plan" },
] as const;

export const healthcareRxStructure = [
  { id: "header", label: "Care plan" },
  { id: "meds", label: "Medication" },
  { id: "dose", label: "Dosage · Timing · Duration" },
  { id: "notes", label: "Instructions" },
] as const;

export const healthcareMedTimeline = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "night", label: "Night" },
] as const;

export const healthcareReferralLabels = [
  "Visit context",
  "Prescription",
  "History",
  "Referral",
] as const;

export const healthcareHistoryStages = [
  { id: "earlier", label: "Earlier", detail: "Consultation" },
  { id: "then", label: "Then", detail: "Prescription" },
  { id: "next", label: "Next", detail: "Referral" },
  { id: "current", label: "Current", detail: "Ongoing care context" },
] as const;

export const healthcareFamilyNodes = [
  { id: "you", label: "You" },
  { id: "parent", label: "Parent" },
  { id: "child", label: "Child" },
  { id: "member", label: "Family member" },
] as const;

export const healthcareComingSoon = [
  { id: "pharmacy", title: "Pharmacy" },
  { id: "laboratory", title: "Laboratory" },
] as const;
