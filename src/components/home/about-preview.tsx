"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * About preview — broader local-India + technology composition (not another LOCAL world).
 */
export function AboutPreview() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      aria-labelledby="about-preview-heading"
      className="relative overflow-hidden bg-[#E8DFD0] py-16 md:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#EDE8DC] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,122,26,0.12),transparent_45%),radial-gradient(ellipse_at_85%_20%,rgba(255,212,0,0.2),transparent_40%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#F3F0E8]"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-gona-black/5 bg-[#1C1814] shadow-[0_24px_60px_rgba(0,0,0,0.12)] md:aspect-[16/11]"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 640 440" className="h-full w-full">
            <defs>
              <linearGradient id="aboutRoad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFD400" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#FFD400" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            <rect width="640" height="440" fill="#1C1814" />

            {/* Soft field hint — agriculture */}
            <ellipse cx="520" cy="340" rx="110" ry="55" fill="#24301C" opacity="0.7" />
            <path
              d="M450 340 H590 M470 355 H575 M460 325 H580"
              stroke="#FFD400"
              strokeOpacity="0.12"
              strokeWidth="1.5"
            />

            {/* Main connecting roads */}
            <motion.path
              d="M40 300 C160 280 220 220 320 200 C420 180 500 160 600 120"
              fill="none"
              stroke="url(#aboutRoad)"
              strokeWidth="10"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.3 }}
            />
            <path
              d="M120 80 C180 160 200 240 220 380"
              fill="none"
              stroke="#FFD400"
              strokeOpacity="0.2"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Shop hint */}
            <rect x="80" y="200" width="70" height="48" rx="6" fill="#2E2822" />
            <rect x="92" y="214" width="18" height="22" rx="2" fill="#FFD400" opacity="0.45" />
            <rect x="118" y="214" width="18" height="22" rx="2" fill="#FFD400" opacity="0.28" />

            {/* Health hint */}
            <rect x="250" y="120" width="52" height="42" rx="6" fill="#2A2220" />
            <path
              d="M270 132 V152 M260 142 H280"
              stroke="#FF7A1A"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Vehicle hint */}
            <rect x="380" y="230" width="64" height="28" rx="8" fill="#2C2620" />
            <circle cx="394" cy="262" r="7" fill="#FFD400" opacity="0.7" />
            <circle cx="430" cy="262" r="7" fill="#FFD400" opacity="0.7" />

            {/* Community points */}
            <circle cx="200" cy="280" r="5" fill="#FFD400" />
            <circle cx="340" cy="190" r="4" fill="#FF7A1A" />
            <circle cx="480" cy="150" r="5" fill="#FFD400" />
            <circle cx="560" cy="100" r="6" fill="#FFFFFF" opacity="0.85" />

            {/* Tech / connection lattice near end */}
            <g opacity="0.55">
              <circle cx="560" cy="100" r="18" fill="none" stroke="#FFD400" strokeWidth="1.2" />
              <circle cx="560" cy="100" r="28" fill="none" stroke="#FFD400" strokeOpacity="0.35" strokeWidth="1" />
              <path d="M560 82 V70 M560 118 V130 M542 100 H530 M578 100 H590" stroke="#FFD400" strokeWidth="1.2" />
            </g>

            <text
              x="36"
              y="400"
              fill="#FFFFFF"
              fillOpacity="0.72"
              fontSize="22"
              fontFamily="var(--font-display), system-ui"
            >
              Local India · Technology · Connection
            </text>
          </svg>
        </motion.div>

        <div className="max-w-lg">
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-gona-gray uppercase">
            About
          </p>
          <h2
            id="about-preview-heading"
            className="font-display text-4xl leading-[1.05] text-gona-black md:text-5xl lg:text-[3.25rem]"
          >
            Built for
            <span className="mt-1 block">Local India.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gona-gray md:text-lg">
            GONA brings everyday commerce, services and community experiences
            together through one local digital ecosystem.
          </p>
          <Link
            href={siteConfig.routes.about}
            className="gona-btn gona-btn-primary mt-8"
          >
            Our Story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function AboutPreviewPlaceholder() {
  return <AboutPreview />;
}
