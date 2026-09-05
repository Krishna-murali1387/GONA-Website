import { notFound } from "next/navigation";

import { HealthcarePageExperience } from "@/components/healthcare/healthcare-page";
import { getServiceById } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "GONA Healthcare Ecosystem",
  description:
    "Discover local doctors, book appointments, access specialist care and keep important health records connected through GONA. Availability depends on your location.",
  path: "/services/healthcare",
});

export default function HealthcarePage() {
  const service = getServiceById("healthcare");
  if (!service) notFound();
  return <HealthcarePageExperience />;
}
