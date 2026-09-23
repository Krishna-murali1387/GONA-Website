import { BusinessV4Experience } from "@/components/business/v4/business-v4-experience";
import { businessSite } from "@/config/business.config";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Professional software by GONA for businesses, institutions and operations. Explore GONA Cable and the growing GONA Business software family.";

export const metadata = {
  ...createPageMetadata({
    title: "GONA Business",
    description,
    path: businessSite.path,
  }),
  title: {
    absolute: "GONA Business | Professional Business Software by GONA",
  },
};

export default function BusinessPage() {
  return <BusinessV4Experience />;
}
