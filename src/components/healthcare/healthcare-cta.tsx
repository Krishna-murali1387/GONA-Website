import Link from "next/link";

import { healthcareTokens } from "@/components/healthcare/healthcare.content";
import { CtaCareScene } from "@/components/healthcare/healthcare-visuals";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function HealthcareCta() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(160deg,#1E3A5F_0%,#1D4ED8_48%,#3B82F6_100%)] py-16 md:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,212,0,0.12),transparent_45%)]"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="max-w-xl">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: healthcareTokens.yellow }}
          >
            GONA Healthcare
          </p>
          <h2 className="font-display text-3xl text-white md:text-4xl lg:text-[2.75rem]">
            Care, connected through GONA.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
            Local care, specialist access and important health information —
            brought together in one healthcare experience.
          </p>
          <div className="mt-8">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
          </div>
          <p className="mt-5 text-sm text-white/65">
            Healthcare availability depends on your location and participating
            providers.
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/10 backdrop-blur-sm">
          <CtaCareScene className="aspect-[5/3] w-full" />
        </div>
      </Container>
    </section>
  );
}
