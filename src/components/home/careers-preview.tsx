"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Careers preview — asymmetric future-facing composition.
 * Honest empty openings state. No fabricated jobs or people photos.
 */
export function CareersPreview() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      aria-labelledby="careers-preview-heading"
      className="relative overflow-hidden bg-[#F3F0E8] py-16 md:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#E8DFD0] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gona-yellow/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-gona-black/5 to-gona-black/40"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-gona-gray uppercase">
            Careers
          </p>
          <h2
            id="careers-preview-heading"
            className="font-display text-4xl leading-[1.05] text-gona-black md:text-5xl lg:text-[3.35rem]"
          >
            Build What&apos;s Next
            <span className="mt-2 block text-gona-black/90">
              for Local Communities.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-gona-gray md:text-lg">
            Help shape the digital layer that connects everyday services to the
            places people live.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-gona-gray">
            <span
              className="inline-block size-1.5 rounded-full bg-gona-yellow"
              aria-hidden="true"
            />
            No open positions right now.
          </p>
          <Link
            href={siteConfig.routes.careers}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gona-black/20 bg-gona-white px-6 py-3.5 text-sm font-semibold text-gona-black transition hover:border-gona-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
          >
            Explore Careers
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-md"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 400 400" className="h-full w-full">
            {/* Forward path */}
            <motion.path
              d="M40 320 C120 300 160 240 200 200 C250 150 300 100 360 60"
              fill="none"
              stroke="#FFD400"
              strokeWidth="4"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2 }}
            />
            <motion.path
              d="M60 340 C140 310 180 260 220 220 C270 170 320 120 370 80"
              fill="none"
              stroke="#111111"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.1 }}
            />

            {/* Layered abstract progression blocks */}
            <rect x="70" y="250" width="48" height="64" rx="8" fill="#111111" opacity="0.12" />
            <rect x="140" y="200" width="52" height="72" rx="8" fill="#111111" opacity="0.18" />
            <rect x="215" y="140" width="56" height="80" rx="8" fill="#111111" opacity="0.28" />
            <rect
              x="290"
              y="70"
              width="60"
              height="88"
              rx="10"
              fill="#FFD400"
              opacity="0.95"
            />

            {/* Abstract team / people marks along the path */}
            <circle cx="95" cy="275" r="6" fill="#111111" opacity="0.35" />
            <circle cx="165" cy="225" r="6" fill="#111111" opacity="0.45" />
            <circle cx="240" cy="165" r="7" fill="#111111" opacity="0.55" />
            <circle cx="320" cy="100" r="8" fill="#111111" />

            {/* Growth ticks */}
            <path
              d="M330 55 L360 55 L360 85"
              fill="none"
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </Container>
    </section>
  );
}

export function CareersPreviewPlaceholder() {
  return <CareersPreview />;
}
