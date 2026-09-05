"use client";

import Link from "next/link";

import { repairTokens } from "@/components/repair/repair.content";
import { HomeRepairScene } from "@/components/repair/repair-visuals";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function RepairCta() {
  return (
    <section
      id="repair-cta"
      className="relative min-h-[88vh] overflow-hidden bg-[#1C1917] pt-16 md:min-h-[90vh] md:pt-20"
    >
      <div className="absolute inset-0">
        <HomeRepairScene
          stage={5}
          className="h-full w-full"
          showQuote={false}
          tone="fixed"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,23,0.55)_0%,transparent_40%,rgba(28,25,23,0.35)_70%,rgba(28,25,23,0.75)_100%)]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-[1280px] flex-col justify-end px-5 pb-20 sm:px-8 lg:px-14">
        <div className="max-w-xl">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: repairTokens.yellow }}
          >
            GONA Repair
          </p>
          <h2 className="font-display text-4xl leading-[1.05] text-white md:text-5xl">
            Need something fixed?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Book supported repair services through GONA where technicians are
            available in your area.
          </p>
          <div className="mt-8">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
          </div>
          <p className="mt-5 text-sm text-white/60">
            Services and availability vary by location.
          </p>
        </div>
      </div>
    </section>
  );
}
