import {
  DeleteAccountAction,
  LegalPageLayout,
} from "@/components/content/legal-page-layout";
import { getLegalDocument } from "@/config/legal.content";
import { createPageMetadata } from "@/lib/seo";

const document = getLegalDocument("delete-account");

export const metadata = createPageMetadata({
  title: document.title,
  description: document.description,
  path: document.path,
});

export default function DeleteAccountPage() {
  return <LegalPageLayout document={document} action={<DeleteAccountAction />} />;
}
