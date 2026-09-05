"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import {
  healthcareMedia,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { HealthcareMediaImage } from "@/components/healthcare/healthcare-media";
import { buttonClass } from "@/lib/ui";

/** 01 — Care Starts Closer · warm local-care photography */
export function HealthcareHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.02, 1.06],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 16],
  );
  const threadH = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    reduce ? ["100%", "100%"] : ["0%", "100%"],
  );

  return (
    <section
      ref={ref}
      data-care-chapter="start"
      className="relative bg-[#F8FAFC]"
    >
      <div className="relative min-h-[88svh] overflow-hidden md:min-h-[92svh]">
        <motion.div className="absolute inset-0" style={{ scale: mediaScale }}>
          <HealthcareMediaImage
            src={healthcareMedia.hero.src}
            objectPosition={healthcareMedia.hero.objectPosition}
            objectPositionMobile={healthcareMedia.hero.objectPositionMobile}
            alt="Local GONA healthcare visit with doctor and family"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Localized left readability — preserve warm home atmosphere */}
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.72)_0%,rgba(15,23,42,0.38)_34%,rgba(15,23,42,0.08)_58%,transparent_72%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,#F8FAFC)]"
          aria-hidden="true"
        />

        {/* Care Thread begins — subtle backing for legibility on photo */}
        <div
          className="pointer-events-none absolute bottom-0 left-[12%] hidden h-44 w-px md:block lg:left-[18%]"
          aria-hidden="true"
        >
          <span className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-white/35 blur-[2px]" />
          <motion.div
            className="absolute inset-x-0 bottom-0 origin-bottom bg-[#3B82F6]"
            style={{ height: threadH }}
          />
          <span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-[#3B82F6] shadow-[0_0_0_3px_rgba(255,255,255,0.55)]" />
        </div>

        <motion.div
          className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-[1280px] flex-col justify-end px-5 pb-24 sm:px-8 md:min-h-[92svh] md:justify-center md:pb-28 lg:px-14"
          style={{ y: copyY }}
        >
          <div className="max-w-xl text-white">
            <motion.p
              className="mb-5 text-[0.7rem] font-semibold tracking-[0.28em] uppercase"
              style={{ color: healthcareTokens.yellow }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              01 / Care Starts Closer
            </motion.p>

            <h1 className="font-display text-[2.55rem] leading-[1.02] md:text-6xl lg:text-[4.2rem]">
              <motion.span
                className="block tracking-[0.04em]"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5 }}
              >
                Care starts closer.
              </motion.span>
              <motion.span
                className="mt-2 block text-[#BFDBFE]"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.5 }}
              >
                Healthcare that stays
                <span className="block">with your story.</span>
              </motion.span>
            </h1>

            <motion.p
              className="mt-5 max-w-md text-base text-white/80 md:text-lg"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48, duration: 0.4 }}
            >
              Nearby care, appointments and connected health context through
              GONA.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <a href="#care-nearby" className={buttonClass("yellow")}>
                Explore the care journey
              </a>
              <a href="#care-time" className={buttonClass("secondaryOnDark")}>
                How care connects
              </a>
            </motion.div>

            <motion.p
              className="mt-6 text-[0.7rem] font-semibold tracking-[0.2em] text-white/45 uppercase"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.4 }}
            >
              The Care Thread
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
