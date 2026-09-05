"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { localEnter, localMedia, localTokens } from "@/components/local/local.content";
import { LocalMediaImage } from "@/components/local/local-media";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

/** Chapter 01 — Enter the Mandal (photo-dominant) */
export function LocalChapterEnter() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.9],
    reduce ? [1, 1] : [1.02, 1.18],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -48],
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.72],
    reduce ? [1, 1, 1] : [1, 1, 0],
  );

  return (
    <section ref={ref} className="relative bg-[#1C1917]">
      <div className="h-[140vh] md:h-[160vh]">
        <div className="sticky top-0 flex h-[100svh] items-stretch overflow-hidden pt-20">
          <motion.div className="absolute inset-0" style={{ scale, y }}>
            <LocalMediaImage
              src={localMedia.mandal.src}
              objectPosition={localMedia.mandal.objectPosition}
              objectPositionMobile={localMedia.mandal.objectPositionMobile}
              alt="Aerial view of a local Mandal community at sunset"
              fill
              priority
              sizes="100vw"
            />
          </motion.div>

          {/* Readability — left copy zone only, not full-image teal tint */}
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.72)_0%,rgba(15,23,42,0.35)_38%,rgba(15,23,42,0.12)_58%,transparent_78%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(28,25,23,0.45))]"
            aria-hidden="true"
          />

          {!reduce ? (
            <motion.div
              className="pointer-events-none absolute top-[36%] left-[42%] size-3 rounded-full bg-[#FFD400] shadow-[0_0_24px_rgba(255,212,0,0.65)] md:left-[48%]"
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          ) : null}

          <motion.div
            className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col justify-center px-5 sm:px-8 lg:px-14"
            style={{ opacity: copyOpacity }}
          >
            <div className="max-w-lg">
              <p
                className="mb-4 text-xs font-semibold tracking-[0.26em] uppercase"
                style={{ color: localTokens.yellow }}
              >
                {localEnter.eyebrow}
              </p>
              <h1 className="font-display text-4xl leading-[1.02] text-white md:text-6xl lg:text-[4.25rem]">
                {localEnter.headlinePrimary}
                <span
                  className="mt-1 block"
                  style={{ color: localTokens.accentSoft }}
                >
                  {localEnter.headlineAccent}
                </span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
                {localEnter.support}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={downloadHref()} className={buttonClass("yellow")}>
                  {localEnter.primaryCta}
                </Link>
                <a
                  href="#local-stream"
                  className={buttonClass("secondaryOnDark")}
                >
                  {localEnter.secondaryCta}
                </a>
              </div>
              <p className="mt-5 text-sm text-white/55">{localEnter.note}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
