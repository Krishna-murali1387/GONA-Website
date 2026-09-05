import { notFound } from "next/navigation";

import { FarmingPageExperience } from "@/components/farming/farming-page";
import { getServiceById } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "GONA Farming",
  description:
    "Guidance, farmer support and agricultural services designed around local farming needs through GONA. Services and availability may vary by location.",
  path: "/services/farming",
});

export default function FarmingPage() {
  const service = getServiceById("farming");
  if (!service) notFound();
  return <FarmingPageExperience />;
}
