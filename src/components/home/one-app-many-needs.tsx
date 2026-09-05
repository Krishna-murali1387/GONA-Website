"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Explains the value of one connected GONA ecosystem — not another carousel.
 * W4.1: stronger convergence depth only.
 */
export function OneAppManyNeeds() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="one-app-heading"
      className="relative overflow-hidden bg-gona-white py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gona-light to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 h-72 w-72 -translate-y-1/2 rounded-full bg-gona-yellow/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#F7F5F0]"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gona-gray uppercase">
            Connected ecosystem
          </p>
          <h2
            id="one-app-heading"
            className="font-display text-4xl leading-[1.05] text-gona-black md:text-5xl lg:text-[3.1rem]"
          >
            One App.
            <span className="block">Many Needs.</span>
          </h2>
          <p className="mt-5 text-lg font-medium text-gona-black/85">
            One account.
            <br />
            One trusted platform.
            <br />
            Your local ecosystem.
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-gona-gray">
            GONA brings everyday services and community experiences together
            through one connected local ecosystem — so you move between needs
            without juggling platforms.
          </p>
        </div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-lg"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="absolute inset-[6%] rounded-full border border-black/[0.04] bg-[#FAFAF8]" />
          <div className="absolute inset-[14%] rounded-full border border-gona-yellow/25" />
          <div className="absolute inset-[24%] rounded-full border border-gona-yellow/15" />
          <div className="absolute inset-[32%] rounded-full bg-[radial-gradient(circle,rgba(255,212,0,0.28),transparent_68%)]" />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
            {[
              "M55 100 C130 70 175 150 200 200",
              "M345 95 C270 65 230 145 200 200",
              "M48 260 C125 235 165 215 200 200",
              "M352 270 C275 240 230 215 200 200",
              "M200 55 C200 110 200 150 200 200",
              "M200 345 C200 290 200 240 200 200",
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#FFD400"
                strokeWidth={i < 2 ? 2 : 1.4}
                strokeOpacity={i < 2 ? 0.7 : 0.4}
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.15, delay: 0.1 + i * 0.08 }}
              />
            ))}
            {/* Outer nodes */}
            {[
              [70, 105],
              [330, 100],
              [60, 265],
              [340, 275],
              [200, 60],
              [200, 340],
            ].map(([cx, cy], i) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={i < 4 ? 5 : 4}
                fill={i === 2 || i === 3 ? "#FF7A1A" : "#111111"}
                opacity={0.75}
              />
            ))}
          </svg>

          <div className="absolute top-[9%] left-[10%] rounded-full border border-black/8 bg-gona-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-gona-black/75 uppercase shadow-sm">
            Needs
          </div>
          <div className="absolute top-[8%] right-[10%] rounded-full border border-black/8 bg-gona-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-gona-black/75 uppercase shadow-sm">
            Services
          </div>
          <div className="absolute bottom-[12%] left-[8%] rounded-full border border-black/8 bg-gona-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-gona-black/75 uppercase shadow-sm">
            Local
          </div>
          <div className="absolute right-[8%] bottom-[10%] rounded-full border border-black/8 bg-gona-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-gona-black/75 uppercase shadow-sm">
            Community
          </div>

          <div className="absolute top-1/2 left-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[30%] bg-gona-yellow shadow-[0_16px_48px_rgba(255,212,0,0.4)]">
            <Image
              src={siteConfig.assets.logo}
              alt=""
              width={56}
              height={56}
              className="rounded-[22%]"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export function OneAppManyNeedsPlaceholder() {
  return <OneAppManyNeeds />;
}
