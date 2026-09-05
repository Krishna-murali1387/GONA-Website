import { notFound } from "next/navigation";

import { GroceryPageExperience } from "@/components/grocery/grocery-page";
import { getServiceById } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "GONA Grocery Delivery",
  description:
    "Browse everyday groceries, check real availability and get essentials delivered through GONA. Availability depends on your location.",
  path: "/services/grocery",
});

export default function GroceryPage() {
  const service = getServiceById("grocery");
  if (!service) notFound();
  return <GroceryPageExperience />;
}
