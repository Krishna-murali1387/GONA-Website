import { CareersPage } from "@/components/careers/careers-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Careers",
  description:
    "Build what's next for local communities. No open positions right now — check back soon.",
  path: "/careers",
});

export default function CareersRoutePage() {
  return <CareersPage />;
}
