import { LegalPageLayout } from "@/components/content/legal-page-layout";
import { getLegalDocument } from "@/config/legal.content";
import { createPageMetadata } from "@/lib/seo";

const document = getLegalDocument("terms");

export const metadata = createPageMetadata({
  title: document.title,
  description: document.description,
  path: document.path,
});

export default function TermsPage() {
  return <LegalPageLayout document={document} />;
}
