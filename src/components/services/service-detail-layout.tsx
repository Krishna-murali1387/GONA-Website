import { InnerDownloadBand } from "@/components/inner/inner-download-band";
import { InnerPageHero } from "@/components/inner/inner-page-hero";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { ServiceAbstractVisual } from "@/components/services/service-abstract-visual";
import { Container } from "@/components/ui/container";
import type { ServicePageContent } from "@/config/services.content";
import { getServiceById } from "@/config/site.config";

type Props = {
  content: ServicePageContent;
};

export function ServiceDetailLayout({ content }: Props) {
  const service = getServiceById(content.id);
  if (!service) return null;

  return (
    <article>
      <InnerPageHero
        tone="dark"
        eyebrow={content.eyebrow}
        title={
          <>
            {content.heroPrimary}
            <span className="mt-1 block text-gona-yellow">
              {content.heroAccent}
            </span>
          </>
        }
        description={content.intro}
        visual={<ServiceAbstractVisual visual={content.visual} />}
      />

      <section className="bg-gona-white py-14 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-gona-gray uppercase">
              About this service
            </p>
            <h2 className="font-display text-3xl text-gona-black md:text-4xl">
              {content.aboutTitle}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-gona-gray md:text-lg">
            {content.aboutBody}
          </p>
        </Container>
      </section>

      <section className="bg-gona-light py-14 md:py-20">
        <Container>
          <h2 className="mb-8 font-display text-3xl text-gona-black md:text-4xl">
            {content.capabilitiesTitle}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {content.capabilities.map((cap, index) => (
              <li
                key={cap.title}
                className="border-l-2 border-gona-yellow pl-5"
              >
                <p className="font-display text-sm text-gona-yellow">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl text-gona-black">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gona-gray md:text-base">
                  {cap.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-[#F7F5F0] py-14 md:py-20">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-gona-black md:text-4xl">
            {content.howTitle}
          </h2>
          <ol className="relative grid gap-8 md:grid-cols-3">
            <div
              className="pointer-events-none absolute top-7 right-[10%] left-[10%] hidden h-px bg-gona-yellow/70 md:block"
              aria-hidden="true"
            />
            {content.howSteps.map((step) => (
              <li key={step.n}>
                <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border-2 border-gona-yellow bg-[#F7F5F0] font-display text-sm font-bold text-gona-black">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-xl text-gona-black">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-gona-gray">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />

      <InnerDownloadBand />
      <RelatedServices ids={content.relatedIds} currentId={content.id} />
    </article>
  );
}
