import Link from "next/link";

import { vehicleTokens } from "@/components/vehicle/vehicle.content";
import { FinalRoadCtaArt } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function VehicleCta() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-16 text-white md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <FinalRoadCtaArt className="h-full w-full object-cover" />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.72)_45%,rgba(15,23,42,0.35)_100%)]"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="max-w-xl">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: vehicleTokens.yellow }}
          >
            GONA Vehicle
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Where are you going next?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            Find passenger or goods transport through GONA based on availability
            around your location.
          </p>
          <div className="mt-8">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-400">
            Vehicle options vary by location and provider availability.
          </p>
        </div>
      </Container>
    </section>
  );
}
