import { ServicesDirectory } from "@/components/services/services-directory";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore GONA's seven services — everyday needs, local services and community, connected through one ecosystem.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesDirectory />;
}
