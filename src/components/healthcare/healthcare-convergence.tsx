"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { healthcareTokens } from "@/components/healthcare/healthcare.content";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

/** 12 — Final convergence · typography-led closure */
export function HealthcareConvergence() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0B1220] py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          className="h-[28rem] w-[28rem] opacity-40 md:h-[34rem] md:w-[34rem]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <motion.circle
            cx="200"
            cy="200"
            r="70"
            stroke="#3B82F6"
            strokeWidth="1.5"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x2 = 200 + Math.cos(rad) * 150;
            const y2 = 200 + Math.sin(rad) * 150;
            return (
              <motion.line
                key={deg}
                x1="200"
                y1="200"
                x2={x2}
                y2={y2}
                stroke="#60A5FA"
                strokeWidth="1.25"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.55 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: reduce ? 0 : 0.15 + i * 0.05,
                  duration: 0.7,
                }}
              />
            );
          })}
          <circle cx="200" cy="200" r="8" fill="#3B82F6" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 text-center sm:px-8 lg:px-14">
        <p className="mb-6 text-[0.7rem] font-semibold tracking-[0.28em] text-white/45 uppercase">
          The Care Thread
        </p>
        <h2 className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-[4.5rem]">
          One health story.
          <span className="mt-2 block text-[#93C5FD]">
            Connected through GONA.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-white/60 md:text-base">
          Nearby care. Connected context. Family care in one ecosystem.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={downloadHref()} className={buttonClass("yellow")}>
            Explore GONA
          </Link>
        </div>
        <p
          className="mt-10 text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          Availability depends on your location
        </p>
      </div>
    </section>
  );
}
