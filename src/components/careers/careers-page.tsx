import {
  InnerCtaLink,
  InnerPageHero,
} from "@/components/inner/inner-page-hero";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

/** Jobs are config-driven for future expansion — currently empty by design. */
export const openRoles: Array<{
  id: string;
  title: string;
  location: string;
  type: string;
}> = [];

export function CareersPage() {
  return (
    <article>
      <InnerPageHero
        tone="warm"
        eyebrow="Careers"
        title={
          <>
            Build What&apos;s Next
            <span className="mt-1 block">for Local Communities.</span>
          </>
        }
        description="Help shape the digital layer that connects everyday services to the places people live."
        actions={
          <InnerCtaLink href={siteConfig.routes.contact} variant="primary">
            Contact GONA →
          </InnerCtaLink>
        }
      />

      <section className="bg-gona-white py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-display text-3xl text-gona-black md:text-4xl">
              Work that stays close to local life
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gona-gray md:text-lg">
              GONA is building a connected ecosystem for everyday services and
              community experiences. If you join later, you would help make that
              local digital layer clearer, more useful and more trusted.
            </p>
          </div>
          <ul className="space-y-5">
            {[
              "Product and experience for local India",
              "Service and community ecosystem thinking",
              "Responsible growth without overclaiming",
            ].map((item, i) => (
              <li
                key={item}
                className="border-l-2 border-gona-yellow pl-4 text-base text-gona-black"
              >
                <span className="mr-2 font-display text-gona-yellow">
                  0{i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-[#F3F0E8] py-14 md:py-20">
        <Container className="max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-gona-gray uppercase">
            Open roles
          </p>
          <h2 className="mt-3 font-display text-3xl text-gona-black md:text-4xl">
            No open positions right now.
          </h2>
          <p className="mt-4 text-base text-gona-gray">
            Check back soon. When roles open, they will appear here from GONA’s
            careers configuration — we will not invent openings.
          </p>

          {openRoles.length > 0 ? (
            <ul className="mt-10 space-y-3 text-left">
              {openRoles.map((role) => (
                <li
                  key={role.id}
                  className="rounded-2xl border border-black/8 bg-gona-white p-5"
                >
                  <p className="font-display text-xl text-gona-black">
                    {role.title}
                  </p>
                  <p className="mt-1 text-sm text-gona-gray">
                    {role.location} · {role.type}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-gona-black/15 bg-gona-white/70 px-6 py-8">
              <p className="text-sm text-gona-gray">
                There are currently no vacancies listed.
              </p>
            </div>
          )}

          <div className="mt-8">
            <InnerCtaLink
              href={`${siteConfig.routes.contact}?reason=general-feedback`}
              variant="secondary"
            >
              Stay in touch →
            </InnerCtaLink>
          </div>
        </Container>
      </section>
    </article>
  );
}
