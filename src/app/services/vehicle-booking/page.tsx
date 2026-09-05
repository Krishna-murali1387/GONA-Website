import { notFound } from "next/navigation";

import { VehiclePageExperience } from "@/components/vehicle/vehicle-page";
import { getServiceById } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "GONA Vehicle",
  description:
    "Find available passenger and goods vehicles around you, book for now or schedule your journey through GONA. Availability depends on your location and providers.",
  path: "/services/vehicle-booking",
});

export default function VehicleBookingPage() {
  const service = getServiceById("vehicle-booking");
  if (!service) notFound();
  return <VehiclePageExperience />;
}
