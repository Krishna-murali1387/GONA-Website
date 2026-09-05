/** Healthcare-only tokens and copy. Do not share with Grocery. */

export const healthcareTokens = {
  accent: "#3B82F6",
  soft: "#DBEAFE",
  mist: "#EFF6FF",
  navy: "#1E3A5F",
  deep: "#1D4ED8",
  yellow: "#FFD400",
  warm: "#FFF7ED",
  warmAccent: "#FB923C",
} as const;

export const healthcareAccessPoints = [
  {
    id: "local",
    title: "Local Care",
    body: "Discover local, general and RMP doctors near you — where available.",
    tone: "primary" as const,
  },
  {
    id: "hospital",
    title: "Hospitals & Specialists",
    body: "Explore hospitals and specialist care connected through GONA.",
    tone: "primary" as const,
  },
  {
    id: "vet",
    title: "Veterinary Care",
    body: "Request veterinary home visits for animals where eligible.",
    tone: "secondary" as const,
  },
] as const;

export const healthcareJourneySteps = [
  {
    n: "01",
    title: "Find Local Care",
    body: "Location-aware discovery helps you find nearby doctors and clinics.",
  },
  {
    n: "02",
    title: "Book an Appointment",
    body: "Choose an appropriate appointment or slot where booking is available.",
  },
  {
    n: "03",
    title: "Consultation",
    body: "A doctor consultation creates the care context for what comes next.",
  },
  {
    n: "04",
    title: "Referral",
    body: "When specialist care is needed, a referral can connect the next step.",
  },
  {
    n: "05",
    title: "Hospital & Specialist",
    body: "Continue toward hospital, department or specialist care through GONA.",
  },
  {
    n: "06",
    title: "Records Stay Connected",
    body: "Prescriptions, appointments, referrals and history remain accessible.",
  },
] as const;

export const healthcareFamilyMembers = [
  { id: "you", label: "You", role: "Primary" },
  { id: "parent", label: "Parent", role: "Family" },
  { id: "child", label: "Child", role: "Family" },
] as const;

export const healthcareRecordTypes = [
  "Appointments",
  "Prescriptions",
  "Referrals",
  "Medical History",
] as const;

export const healthcarePrinciples = [
  "Location-aware care",
  "Connected records",
  "Family healthcare",
  "Referral continuity",
] as const;

export const healthcareComingSoon = [
  {
    id: "pharmacy",
    title: "Pharmacy",
    body: "Medicine access pathways are planned as part of the broader ecosystem.",
  },
  {
    id: "laboratory",
    title: "Laboratory",
    body: "Lab pathways are planned to connect with your care journey later.",
  },
] as const;
