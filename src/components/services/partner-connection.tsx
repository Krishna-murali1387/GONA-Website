import Link from "next/link";

import { Container } from "@/components/ui/container";
import { partnerCta } from "@/config/partners.content";
import { getPartnerById } from "@/config/partners.content";
import type { PartnerId } from "@/config/partners.content";
import { siteConfig } from "@/config/site.config";

type Props = {
  partnerId: PartnerId;
  heading: string;
  body: string;
};

export function PartnerConnection({ partnerId, heading, body }: Props) {
  const partner = getPartnerById(partnerId);
  const href = partnerCta.onboardingUrl ?? partnerCta.contactHref;
  const label = partnerCta.onboardingUrl
    ? "Partner With GONA"
    : partnerCta.contactFallbackLabel;

  return (
    <section className="border-y border-black/5 bg-[#F3F0E8] py-14 md:py-16">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-gona-gray uppercase">
            Partner with GONA
          </p>
          <h2 className="font-display text-2xl text-gona-black md:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gona-gray md:text-base">
            {body}
            {partner ? (
              <>
                {" "}
                <span className="text-gona-black/80">
                  Related path: {partner.title}.
                </span>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={href}
            className="gona-btn gona-btn-primary"
          >
            {label} →
          </Link>
          <Link
            href={siteConfig.routes.partners}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gona-black/15 px-6 py-3 text-sm font-semibold text-gona-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
          >
            Explore Partners
          </Link>
        </div>
      </Container>
    </section>
  );
}
