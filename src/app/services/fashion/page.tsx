import { notFound } from "next/navigation";

import { FashionPageExperience } from "@/components/fashion/fashion-page";
import { getServiceById } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "GONA Fashion",
  description:
    "Discover fashion from approved stores available around you, choose the right variant and shop through GONA. Selection varies by location and participating stores.",
  path: "/services/fashion",
});

export default function FashionPage() {
  const service = getServiceById("fashion");
  if (!service) notFound();
  return <FashionPageExperience />;
}
