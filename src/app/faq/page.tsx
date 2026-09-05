import { FaqAccordion } from "@/components/content/faq-accordion";
import { InnerPageHero } from "@/components/inner/inner-page-hero";
import { InnerCtaLink } from "@/components/inner/inner-page-hero";
import { Container } from "@/components/ui/container";
import { faqCategories } from "@/config/faq.content";
import { siteConfig } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Answers about GONA services, LOCAL, partners, support and the app — using only established facts.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <article>
      <InnerPageHero
        tone="warm"
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Clear answers based on what GONA has already established — no invented prices, dates or guarantees."
        actions={
          <InnerCtaLink href={siteConfig.routes.contact} variant="primary">
            Still need help? →
          </InnerCtaLink>
        }
      />
      <section className="bg-gona-white py-14 md:py-20">
        <Container>
          <FaqAccordion categories={faqCategories} />
        </Container>
      </section>
    </article>
  );
}
