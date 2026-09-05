import { notFound } from "next/navigation";

import { RepairPageExperience } from "@/components/repair/repair-page";
import { getServiceById } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "GONA Repair",
  description:
    "From problem to fixed. Request supported home repair services, get the issue inspected and approve the quotation before repair work begins. Availability varies by location.",
  path: "/services/repair",
});

export default function RepairPage() {
  const service = getServiceById("repair");
  if (!service) notFound();
  return <RepairPageExperience />;
}
