import { CableProductExperience } from "@/components/business/cable-product-experience";
import { cableSite } from "@/config/cable.config";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Manage cable customers, connections, billing, collections, operators, complaints and customer communication with GONA Cable.";

export const metadata = {
  ...createPageMetadata({
    title: "GONA Cable",
    description,
    path: cableSite.productPath,
  }),
  title: {
    absolute: "GONA Cable | Cable Network Management Software",
  },
};

export default function CableProductPage() {
  return <CableProductExperience />;
}
