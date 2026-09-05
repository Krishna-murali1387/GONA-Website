import { AboutPage } from "@/components/about/about-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Built for Local India — GONA brings everyday commerce, services and community experiences together through one local digital ecosystem.",
  path: "/about",
});

export default function AboutRoutePage() {
  return <AboutPage />;
}
