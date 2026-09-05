"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Final conversion band — signature GONA black + yellow.
 * Echoes Hero atmosphere without copying the Hero composition.
 */
export function DownloadCta() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const playUrl = siteConfig.download.playStoreUrl;

  return (
    <section
      ref={ref}
      id="download"
      className="relative scroll-mt-24 overflow-hidden bg-gona-black py-20 text-gona-white md:py-28"
      aria-labelledby="download-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,212,0,0.16),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F3F0E8] via-[#F3F0E8]/40 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="mx-auto mb-8 flex size-16 items-center justify-center rounded-[28%] bg-gona-yellow shadow-[0_0_48px_rgba(255,212,0,0.35)]"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.55 }}
          >
            <Image
              src={siteConfig.assets.logo}
              alt=""
              width={40}
              height={40}
              className="rounded-[22%]"
            />
          </motion.div>

          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gona-yellow uppercase">
            Download
          </p>
          <h2
            id="download-heading"
            className="font-display text-3xl text-gona-white md:text-5xl"
          >
            Everything You Need.
            <span className="mt-1 block text-gona-yellow">One GONA.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
            Your everyday services and local community, connected in one app.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {playUrl ? (
              <a
                href={playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gona-yellow px-8 py-3 text-sm font-semibold text-gona-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
              >
                Google Play
              </a>
            ) : (
              <div className="inline-flex min-h-12 flex-col items-center justify-center rounded-full border border-gona-yellow/40 bg-gona-yellow/10 px-8 py-3">
                <span className="text-sm font-semibold text-gona-yellow">
                  Google Play
                </span>
                <span className="text-[11px] tracking-wide text-gona-yellow/75 uppercase">
                  {siteConfig.download.comingSoonLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Converging paths — decorative */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto hidden h-24 w-full max-w-3xl opacity-40 md:block"
          viewBox="0 0 800 80"
          aria-hidden="true"
        >
          <motion.path
            d="M40 70 C200 70 280 20 400 20 C520 20 600 70 760 70"
            fill="none"
            stroke="#FFD400"
            strokeWidth="1.5"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.2 }}
          />
        </svg>
      </Container>
    </section>
  );
}

/** @deprecated Use DownloadCta — retained for import compatibility */
export function DownloadFoundation() {
  return <DownloadCta />;
}

export function DownloadCtaPlaceholder() {
  return <DownloadCta />;
}
