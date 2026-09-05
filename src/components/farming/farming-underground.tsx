"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import {
  farmingMedia,
  farmingTokens,
} from "@/components/farming/farming.content";
import { FarmingMediaImage } from "@/components/farming/farming-media";
import { UndergroundScene } from "@/components/farming/farming-visuals";

export function FarmingUnderground() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -20]);
  const rootOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    reduce ? [1, 1] : [0.55, 1],
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#C4A484] py-24 md:py-28"
    >
      {/* Environmental soil texture — does not replace cross-section */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
      >
        <FarmingMediaImage
          src={farmingMedia.soil.src}
          objectPosition={farmingMedia.soil.objectPosition}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="max-w-xl">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: farmingTokens.earth }}
          >
            Below the surface
          </p>
          <h2 className="mt-3 font-display text-3xl text-[#1C1917] md:text-5xl">
            What happens above
            <span className="mt-1 block text-[#78350F]">starts below.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-stone-800 md:text-lg">
            Soil conditions are part of the bigger farming picture. GONA Farming
            can bring soil-support services into the local farming ecosystem as
            those services are available.
          </p>
        </div>
      </div>

      <motion.div
        className="relative mx-auto mt-10 max-w-[1280px] px-5 sm:px-8 lg:px-14"
        style={{ y, opacity: rootOpacity }}
      >
        <div className="overflow-hidden border border-[#78350F]/25 shadow-[0_30px_70px_rgba(120,53,15,0.25)]">
          <div className="aspect-[900/720] min-h-[22rem] w-full md:min-h-[34rem]">
            <UndergroundScene className="h-full w-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/** Visual bridge back to sky/field */
export function FarmingEmerge() {
  return (
    <section
      className="relative h-48 overflow-hidden md:h-64"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C4A484_0%,#8B5E3C_22%,#65A30D_52%,#84CC16_72%,#BAE6FD_100%)]" />
      <svg
        viewBox="0 0 1200 240"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 160 Q300 110 600 145 T1200 120 V240 H0 Z"
          fill="#84CC16"
          opacity="0.55"
        />
        <path
          d="M0 180 Q400 150 800 175 T1200 160 V240 H0 Z"
          fill="#65A30D"
          opacity="0.4"
        />
        <path d="M0 0 H1200 V48 Q600 90 0 48 Z" fill="#78350F" opacity="0.4" />
      </svg>
    </section>
  );
}
