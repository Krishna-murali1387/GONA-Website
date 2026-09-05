import Link from "next/link";

import { farmingTokens } from "@/components/farming/farming.content";
import { FinalFieldArt } from "@/components/farming/farming-visuals";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function FarmingCta() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#0C1A0A] py-20 text-white md:min-h-[78vh]">
      <div className="absolute inset-0 opacity-90" aria-hidden="true">
        <FinalFieldArt className="h-full w-full object-cover" />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(12,26,10,0.88)_0%,rgba(12,26,10,0.55)_48%,rgba(12,26,10,0.25)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl items-center px-5 sm:px-8 lg:px-10">
        <div className="max-w-lg">
          <p
            className="mb-4 text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: farmingTokens.yellow }}
          >
            GONA Farming
          </p>
          <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
            For every season
            <span className="mt-1 block text-[#BEF264]">of farming.</span>
          </h2>
          <p className="mt-5 text-base text-white/75 md:text-lg">
            Discover Farming guidance, support and agricultural services through
            GONA.
          </p>
          <div className="mt-8">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
          </div>
          <p className="mt-5 text-sm text-white/55">
            Services and availability vary by location and supported Farming
            operations.
          </p>
        </div>
      </div>
    </section>
  );
}
