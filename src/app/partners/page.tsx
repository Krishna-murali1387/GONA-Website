import { PartnersExperience } from "@/components/partners/partners-experience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Partners",
  description:
    "Grow with GONA — delivery, fashion, healthcare, repair, vehicle, farming and local community partnership paths.",
  path: "/partners",
});

export default function PartnersPage() {
  return <PartnersExperience />;
}
