import {
  InnerCtaLink,
  InnerPageHero,
} from "@/components/inner/inner-page-hero";
import { ServicesOverviewRow } from "@/components/services/overview/services-overview-row";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

export function ServicesDirectory() {
  return (
    <article>
      <InnerPageHero
        tone="dark"
        eyebrow="The GONA Ecosystem"
        title={
          <>
            Seven Services.
            <span className="mt-1 block text-gona-yellow">One GONA.</span>
          </>
        }
        description="Everyday needs, local services and your community — connected through one ecosystem."
        actions={
          <InnerCtaLink href="/local" variant="yellow">
            Explore LOCAL →
          </InnerCtaLink>
        }
      />

      <section className="bg-gona-white py-14 md:py-20">
        <Container>
          <div className="relative">
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-[1.15rem] hidden w-px bg-gradient-to-b from-gona-yellow via-gona-yellow/40 to-[#FF7A1A] md:block"
              aria-hidden="true"
            />

            <ul className="space-y-6 md:space-y-8">
              {siteConfig.services.map((service, index) => (
                <ServicesOverviewRow
                  key={service.id}
                  service={service}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </article>
  );
}
