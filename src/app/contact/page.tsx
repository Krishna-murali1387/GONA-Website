import {
  InnerPageHero,
} from "@/components/inner/inner-page-hero";
import { ContactExperience } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Help & Feedback",
  description:
    "How can we help? Customer support, partner support, report a problem, suggest an improvement, and more.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams: Promise<{ reason?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const raw = params.reason;
  const reason = Array.isArray(raw) ? raw[0] : raw;

  return (
    <article>
      <InnerPageHero
        tone="warm"
        eyebrow="Help & Feedback"
        title={
          <>
            How Can
            <span className="mt-1 block">We Help?</span>
          </>
        }
        description={`Support, partnership questions, problems and suggestions — reach GONA at ${siteConfig.supportEmail}.`}
      />
      <section className="bg-[#F3F0E8] py-14 md:py-20">
        <Container>
          <ContactExperience initialReason={reason} />
        </Container>
      </section>
    </article>
  );
}
