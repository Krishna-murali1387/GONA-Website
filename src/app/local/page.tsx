import { LocalPage } from "@/components/local/local-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "LOCAL",
  description:
    "GONA LOCAL — Your Mandal. Connected. Local information, events, offers, tournaments and community updates for supported communities.",
  path: "/local",
});

export default function LocalRoutePage() {
  return <LocalPage />;
}
