import {
  InnerCtaLink,
  InnerPageHero,
} from "@/components/inner/inner-page-hero";
import { InnerDownloadBand } from "@/components/inner/inner-download-band";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

const STORY = [
  {
    n: "01",
    title: "Local needs are fragmented",
    body: "Everyday shopping, healthcare, repairs, mobility, fashion, farming and community life often live in separate apps and disconnected experiences.",
  },
  {
    n: "02",
    title: "GONA connects them",
    body: "One account and one trusted platform bring everyday services into a clearer local digital ecosystem.",
  },
  {
    n: "03",
    title: "Seven services",
    body: "Grocery, Healthcare, GONA Repair, Vehicle Booking, Fashion, Farming and LOCAL — connected through one GONA.",
  },
  {
    n: "04",
    title: "LOCAL connects the community",
    body: "Beyond commerce and services, LOCAL keeps people closer to tournaments, events, alerts, offers and nearby opportunities.",
  },
  {
    n: "05",
    title: "One ecosystem",
    body: "GONA is built local-first — designed around nearby communities, not generic one-size-fits-all city templates.",
  },
] as const;

export function AboutPage() {
  return (
    <article>
      <InnerPageHero
        tone="warm"
        eyebrow="About"
        title={
          <>
            Built for
            <span className="mt-1 block">Local India.</span>
          </>
        }
        description="GONA brings everyday commerce, services and community experiences together through one local digital ecosystem."
        actions={
          <>
            <InnerCtaLink href={siteConfig.routes.services} variant="primary">
              Explore Services →
            </InnerCtaLink>
            <InnerCtaLink href={siteConfig.routes.partners} variant="secondary">
              Partner With GONA
            </InnerCtaLink>
          </>
        }
      />

      <section className="bg-gona-white py-14 md:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-3xl text-gona-black md:text-4xl">
            Why connected local services matter
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gona-gray md:text-lg">
            When everyday needs sit in separate places, people spend more time
            switching platforms than getting things done. GONA is built to keep
            local life connected — from essentials and services to community
            experiences — without inventing claims about scale or coverage that
            are still expanding.
          </p>
        </Container>
      </section>

      <section className="bg-[#EDE8DC] py-14 md:py-20">
        <Container>
          <h2 className="mb-10 font-display text-3xl text-gona-black md:text-4xl">
            The GONA story
          </h2>
          <ol className="space-y-0">
            {STORY.map((item, index) => (
              <li
                key={item.n}
                className="grid gap-4 border-t border-gona-black/10 py-7 md:grid-cols-[5rem_1fr] md:gap-8"
              >
                <span className="font-display text-2xl text-gona-yellow md:text-3xl">
                  {item.n}
                </span>
                <div>
                  <h3 className="font-display text-xl text-gona-black md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gona-gray md:text-base">
                    {item.body}
                  </p>
                  {index < STORY.length - 1 ? (
                    <div
                      className="mt-6 hidden h-8 w-px bg-gona-yellow/60 md:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-gona-black py-14 text-gona-white md:py-16">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-gona-yellow uppercase">
              Positioning
            </p>
            <p className="mt-3 font-display text-2xl md:text-3xl">
              {siteConfig.brand.positioning}
            </p>
          </div>
          <InnerCtaLink href={siteConfig.routes.local} variant="yellow">
            Discover LOCAL →
          </InnerCtaLink>
        </Container>
      </section>

      <InnerDownloadBand />
    </article>
  );
}
