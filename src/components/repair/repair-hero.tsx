"use client";

import Image from "next/image";
import Link from "next/link";

import { repairTokens } from "@/components/repair/repair.content";
import { ToolBag } from "@/components/repair/repair-visuals";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

/** Clean 2-column hero — zero text/visual overlap. */
export function RepairHero() {
  return (
    <section className="relative overflow-hidden bg-[#1C1917] pt-24 md:pt-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[0.44fr_0.56fr] lg:gap-12 lg:px-14 lg:py-24">
        {/* LEFT — copy only */}
        <div className="relative z-10 max-w-md">
          <p
            className="mb-4 text-xs font-semibold tracking-[0.24em] uppercase"
            style={{ color: repairTokens.accent }}
          >
            GONA REPAIR
          </p>
          <h1 className="font-display text-4xl leading-[1.05] text-white md:text-5xl lg:text-[3.5rem]">
            From problem.
            <span className="mt-1 block" style={{ color: repairTokens.accent }}>
              To fixed.
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
            Book supported home repair services, get the issue inspected, and
            review the quotation before repair work begins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
            <a
              href="#repair-transform"
              className={buttonClass("secondaryOnDark")}
            >
              See how it works
            </a>
          </div>
          <p className="mt-5 text-sm text-white/55">
            Service availability varies by location.
          </p>
        </div>

        {/* RIGHT — technician + AC only; never under copy */}
        <div
          className="relative isolate min-h-[320px] overflow-hidden rounded-sm md:min-h-[420px] lg:min-h-[480px]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg,#292524 0%,#44403C 50%,#57534E 100%)",
            }}
          />
          {/* Technician crop — right column only */}
          <div className="absolute inset-y-0 right-0 w-[70%]">
            <Image
              src="/services/repair.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 70vw, 40vw"
              className="object-cover"
              style={{ objectPosition: "78% 12%" }}
            />
            <div className="absolute inset-y-0 left-0 w-[35%] bg-[linear-gradient(90deg,#292524,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(180deg,transparent,#292524)]" />
            <div className="absolute inset-y-0 right-0 w-[14%] bg-[linear-gradient(270deg,rgba(28,25,23,0.5),transparent)]" />
          </div>

          {/* Toolkit connected under technician zone */}
          <div className="absolute bottom-4 left-[8%] z-10 w-16 md:w-20">
            <ToolBag className="h-auto w-full drop-shadow-lg" />
          </div>
        </div>
      </div>
      <span className="sr-only">
        Technician and air conditioner shown for home repair services.
      </span>
    </section>
  );
}
