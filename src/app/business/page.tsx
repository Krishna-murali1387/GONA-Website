import { BusinessExperience } from "@/components/business/business-experience";
import { businessSite } from "@/config/business.config";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Explore GONA Business — professional software for cable networks and the next generation of businesses, institutions and operations.";

export const metadata = {
  ...createPageMetadata({
    title: "GONA Business",
    description,
    path: businessSite.path,
  }),
  title: {
    absolute: "GONA Business | Business Software by GONA",
  },
};

export default function BusinessPage() {
  return <BusinessExperience />;
}
