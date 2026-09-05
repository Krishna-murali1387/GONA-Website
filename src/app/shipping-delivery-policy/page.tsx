import { LegalPageLayout } from "@/components/content/legal-page-layout";
import { getLegalDocument } from "@/config/legal.content";
import { createPageMetadata } from "@/lib/seo";

const document = getLegalDocument("shipping-delivery-policy");

export const metadata = createPageMetadata({
  title: document.title,
  description: document.description,
  path: document.path,
});

export default function ShippingDeliveryPolicyPage() {
  return <LegalPageLayout document={document} />;
}
