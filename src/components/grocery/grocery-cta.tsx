"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { groceryMedia, groceryTokens } from "@/components/grocery/grocery.content";
import { GroceryMediaImage } from "@/components/grocery/grocery-media";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

/**
 * 08 — Groceries. Sorted.
 * Typography-forward closure; doorstep as tight cinematic edge only.
 */
export function GroceryCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const edgeX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["4%", "-2%"],
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0A1A12] py-20 text-white md:py-28"
    >
      {/* Narrow cinematic edge — different crop from doorstep chapter */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 w-[38%] max-w-md opacity-40 md:opacity-50"
        style={{ x: edgeX }}
        aria-hidden="true"
      >
        <GroceryMediaImage
          src={groceryMedia.doorstep.src}
          objectPosition="78% 42%"
          objectPositionMobile="70% 45%"
          alt=""
          fill
          sizes="40vw"
          className="scale-125"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0A1A12_0%,rgba(10,26,18,0.55)_45%,rgba(10,26,18,0.2)_100%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <p className="mb-6 text-[0.7rem] font-semibold tracking-[0.28em] text-white/45 uppercase">
          The Grocery Run
        </p>
        <h2 className="font-display text-5xl leading-[0.98] md:text-7xl lg:text-[5.5rem]">
          GROCERIES.
          <span className="mt-1 block text-[#BBF7D0]">SORTED.</span>
        </h2>
        <p className="mt-6 text-sm tracking-[0.04em] text-white/60 md:text-base">
          Seven Services. One GONA.
        </p>
        <div className="mt-10">
          <Link href={downloadHref()} className={buttonClass("yellow")}>
            Explore GONA
          </Link>
        </div>
        <p
          className="mt-10 text-[0.65rem] font-semibold tracking-[0.22em] uppercase"
          style={{ color: groceryTokens.green }}
        >
          Availability depends on your location
        </p>
      </div>
    </section>
  );
}
