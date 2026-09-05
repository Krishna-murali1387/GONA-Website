"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { farmingMedia, farmingTokens } from "@/components/farming/farming.content";
import { FarmingMediaImage } from "@/components/farming/farming-media";
import { CropPlant } from "@/components/farming/farming-visuals";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function FarmingHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#E0F2FE] pt-24 md:min-h-[92vh] md:pt-28">
      {/* Sky atmosphere */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,#E0F2FE_0%,#BAE6FD_28%,#FEF9C3_55%,#D9F99D_72%,#8B5E3C_100%)]"
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute top-[12%] right-[18%] h-28 w-44 rounded-full bg-[#EAB308]/35 blur-2xl"
        animate={reduce ? undefined : { opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Field depth SVG rows */}
      <div className="absolute inset-x-0 bottom-0 h-[58%]">
        <svg
          viewBox="0 0 1440 520"
          className="h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMax slice"
        >
          <path d="M0 80 Q360 20 720 70 T1440 40 V200 H0 Z" fill="#84CC16" opacity="0.55" />
          <path d="M0 160 Q400 110 800 155 T1440 130 V280 H0 Z" fill="#65A30D" opacity="0.65" />
          <path d="M0 250 H1440 V520 H0 Z" fill="#8B5E3C" />
          <path d="M0 300 H1440 V520 H0 Z" fill="#78350F" opacity="0.45" />
          {[180, 320, 460, 600, 740, 880, 1020, 1160].map((x, i) => (
            <g key={x} transform={`translate(${x} ${340 + (i % 3) * 8})`}>
              <CropPlant x={0} y={0} stage={3} scale={1.35 + (i % 2) * 0.15} />
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${60 + i * 40} 520 Q720 ${360 - i * 12} ${1380 - i * 40} 520`}
              fill="none"
              stroke="#A16207"
              strokeWidth="3"
              opacity="0.35"
            />
          ))}
        </svg>
      </div>

      {/* Farmer artwork — integrated, not a card */}
      <motion.div
        className="absolute right-[-4%] bottom-[8%] h-[62%] w-[52%] md:w-[44%] lg:right-[2%] lg:w-[40%]"
        initial={false}
        animate={reduce ? undefined : { y: [10, 0], opacity: [0.85, 1] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="relative h-full w-full">
          <FarmingMediaImage
            src={farmingMedia.hero.src}
            objectPosition={farmingMedia.hero.objectPosition}
            alt="Farmer in the field with GONA Farming"
            fill
            priority
            sizes="(max-width: 768px) 70vw, 42vw"
            className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(28,25,23,0.25)]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,#E0F2FE_0%,transparent_22%),linear-gradient(180deg,transparent_70%,rgba(139,94,60,0.35)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(224,242,254,0.65),transparent)]"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-5 pb-24 sm:px-8 lg:px-10">
        <div className="max-w-lg">
          <p
            className="mb-4 text-xs font-semibold tracking-[0.24em] uppercase"
            style={{ color: farmingTokens.deep }}
          >
            GONA Farming
          </p>
          <h1 className="font-display text-4xl leading-[1.05] text-[#1C1917] md:text-5xl lg:text-[3.75rem]">
            Grow with
            <span className="mt-1 block" style={{ color: farmingTokens.foliage }}>
              better support.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-stone-700 md:text-lg">
            Guidance, farmer support and agricultural services designed around
            local farming needs through GONA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={downloadHref()} className={buttonClass("primary")}>
              Download GONA
            </Link>
            <a href="#farming-field" className={buttonClass("secondary")}>
              Explore Farming
            </a>
          </div>
          <p className="mt-5 text-sm text-stone-600">
            Farming services and availability may vary by location.
          </p>
        </div>
      </div>

      {/* Continuity bridge into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,#FAF6EE)]"
        aria-hidden="true"
      />
    </section>
  );
}
