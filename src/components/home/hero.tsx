"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { HeroEcosystem } from "@/components/home/hero-ecosystem";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const downloadHref =
    siteConfig.download.playStoreUrl ?? siteConfig.download.anchor;

  return (
    <section
      aria-labelledby="gona-hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#090909] text-gona-white"
    >
      <HeroAtmosphere reducedMotion={reducedMotion} />

      <Container className="relative z-10 grid min-h-[100svh] items-center gap-8 pt-24 pb-24 max-lg:content-center lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-8 lg:pt-28 lg:pb-28 xl:gap-10">
        {/* Copy column */}
        <div className="order-1 max-w-xl text-gona-white lg:max-w-none">
          <motion.p
            className="mb-3 text-[0.7rem] font-semibold tracking-[0.22em] text-gona-yellow uppercase sm:mb-3.5 sm:text-xs"
            {...fadeUp(reducedMotion, 0)}
          >
            {siteConfig.hero.eyebrow}
          </motion.p>

          <motion.h1
            id="gona-hero-heading"
            className="font-display text-[clamp(2.05rem,4.6vw,3.35rem)] leading-[1.1] font-bold tracking-[-0.03em] text-balance text-white"
            {...fadeUp(reducedMotion, 0.08)}
          >
            <span className="block text-white lg:whitespace-nowrap">
              {siteConfig.hero.headlinePrimary}
            </span>
            <span className="mt-1 block text-white lg:whitespace-nowrap">
              All in <span className="text-gona-yellow">GONA.</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
            {...fadeUp(reducedMotion, 0.16)}
          >
            {siteConfig.hero.support}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center"
            {...fadeUp(reducedMotion, 0.24)}
          >
            <Link
              href={downloadHref}
              className="group inline-flex min-h-12 items-center justify-center rounded-full bg-gona-yellow px-7 text-sm font-semibold text-gona-black shadow-[0_0_0_0_rgba(255,212,0,0)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#ffe14d] hover:shadow-[0_14px_40px_rgba(255,212,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
            >
              {siteConfig.hero.primaryCta}
            </Link>
            <Link
              href="#explore"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.02] px-7 text-sm font-semibold text-gona-white transition-[border-color,background-color,transform,gap] duration-300 hover:-translate-y-0.5 hover:gap-3 hover:border-white/55 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
            >
              {siteConfig.hero.secondaryCta}
              <span
                aria-hidden="true"
                className="translate-x-0 text-gona-yellow transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-white/45"
            {...fadeUp(reducedMotion, 0.3)}
          >
            {siteConfig.download.comingSoonLabel}
          </motion.p>

          <motion.p
            className="mt-6 max-w-sm text-sm text-white/50"
            {...fadeUp(reducedMotion, 0.34)}
          >
            {siteConfig.hero.trustLine}
          </motion.p>

          <motion.a
            href="#explore"
            className="mt-10 hidden items-center gap-2 text-xs tracking-[0.16em] text-white/40 uppercase transition-colors hover:text-gona-yellow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gona-yellow lg:inline-flex"
            {...fadeUp(reducedMotion, 0.4)}
          >
            {siteConfig.hero.scrollHint}
            <span aria-hidden="true" className="text-sm normal-case">
              ↓
            </span>
          </motion.a>
        </div>

        {/* Ecosystem / phone — second on mobile */}
        <motion.div
          className="relative order-2 mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none lg:justify-self-end"
          {...fadeUp(reducedMotion, 0.18)}
        >
          <HeroEcosystem />
        </motion.div>

        <motion.a
          href="#explore"
          className="order-3 mt-2 inline-flex items-center justify-center gap-2 text-xs tracking-[0.16em] text-white/40 uppercase transition-colors hover:text-gona-yellow lg:hidden"
          {...fadeUp(reducedMotion, 0.42)}
        >
          {siteConfig.hero.scrollHint}
          <span aria-hidden="true">↓</span>
        </motion.a>
      </Container>

      {/* Bridge into explore / future W3 — ENTER → DISCOVER */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5]"
        aria-hidden="true"
      >
        <div className="h-24 bg-gradient-to-b from-transparent via-[#090909]/30 to-[#F5F5F5]" />
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gona-yellow/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function HeroAtmosphere({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#090909]" />

      {/* Left stays darker for copy readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_12%_40%,rgba(255,212,0,0.07),transparent_58%)]" />

      {/* Stronger warm illumination behind product */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_78%_48%,rgba(255,212,0,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_45%_at_72%_42%,rgba(255,180,40,0.08),transparent_50%)]" />

      {/* Layered dark gradients / vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,0.72)_0%,rgba(9,9,9,0.25)_42%,rgba(9,9,9,0.05)_62%,rgba(9,9,9,0.45)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.62)_100%)]" />

      {/* Faint structural perspective lines */}
      <div
        className="absolute inset-y-[12%] right-[2%] left-[48%] opacity-[0.09] max-lg:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(105deg, transparent 40%, rgba(255,212,0,0.35) 50%, transparent 60%)",
          backgroundSize: "48px 100%",
          maskImage:
            "radial-gradient(ellipse at 70% 50%, black 20%, transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08] max-md:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,212,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,212,0,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 74% 48%, black 8%, transparent 62%)",
        }}
      />

      {!reducedMotion ? (
        <motion.div
          className="absolute top-[12%] right-[8%] size-[34rem] rounded-full bg-gona-yellow/12 blur-[110px] max-md:size-[18rem]"
          animate={{ opacity: [0.35, 0.58, 0.35], scale: [1, 1.05, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div className="absolute top-[12%] right-[8%] size-[34rem] rounded-full bg-gona-yellow/12 blur-[110px] max-md:size-[18rem]" />
      )}

      {!reducedMotion ? (
        <motion.div
          className="absolute right-[18%] bottom-[8%] size-[18rem] rounded-full bg-gona-yellow/10 blur-[80px] max-md:hidden"
          animate={{ opacity: [0.25, 0.45, 0.25], x: [0, 10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}

function fadeUp(reducedMotion: boolean, delay: number) {
  if (reducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  };
}
