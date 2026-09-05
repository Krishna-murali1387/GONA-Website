"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { groceryMedia, groceryTokens } from "@/components/grocery/grocery.content";
import { GroceryMediaImage } from "@/components/grocery/grocery-media";
import { buttonClass } from "@/lib/ui";

/** 01 — Fresh Arrival · immersive cinematic hero */
export function GroceryHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.04, 1.1],
  );
  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 36],
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 18],
  );
  const fadeOut = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9],
    reduce ? [1, 1, 1] : [1, 0.85, 0],
  );

  return (
    <section
      ref={ref}
      data-grocery-chapter="fresh"
      className="relative bg-[#0A1A12]"
    >
      <div className="relative min-h-[88svh] overflow-hidden md:min-h-[92svh]">
        <motion.div
          className="absolute inset-0"
          style={{ scale: mediaScale, y: mediaY }}
        >
          <GroceryMediaImage
            src={groceryMedia.hero.src}
            objectPosition={groceryMedia.hero.objectPosition}
            objectPositionMobile={groceryMedia.hero.objectPositionMobile}
            alt="GONA grocery delivery with fresh everyday essentials"
            fill
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Readability — restrained left wash only */}
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(5,46,22,0.78)_0%,rgba(5,46,22,0.42)_34%,rgba(5,46,22,0.12)_58%,transparent_74%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(247,248,245,0.92))]"
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-[1280px] flex-col justify-end px-5 pb-20 sm:px-8 md:min-h-[92svh] md:justify-center md:pb-24 lg:px-14"
          style={{ y: copyY, opacity: fadeOut }}
        >
          <div className="max-w-xl text-white">
            <motion.p
              className="mb-5 text-[0.7rem] font-semibold tracking-[0.28em] uppercase"
              style={{ color: groceryTokens.yellow }}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
            >
              01 / Fresh Arrival
            </motion.p>

            <h1 className="font-display text-[2.65rem] leading-[1.02] md:text-6xl lg:text-[4.35rem]">
              <motion.span
                className="block"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                Fresh essentials.
              </motion.span>
              <motion.span
                className="mt-1 block text-[#BBF7D0]"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                One smooth run.
              </motion.span>
            </h1>

            <motion.p
              className="mt-5 max-w-md text-base text-white/78 md:text-lg"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.45 }}
            >
              Everyday groceries from available inventory — fulfilled through
              GONA.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.4 }}
            >
              <a href="#grocery-aisle" className={buttonClass("yellow")}>
                Explore the grocery run
              </a>
              <a
                href="#grocery-find"
                className={buttonClass("secondaryOnDark")}
              >
                How it works
              </a>
            </motion.div>

            <motion.p
              className="mt-6 text-[0.7rem] font-semibold tracking-[0.22em] text-white/45 uppercase"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              The Grocery Run
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bridge into aisle — warm grocery-neutral */}
      <div
        className="h-10 bg-[linear-gradient(180deg,rgba(247,248,245,0.92),#F7F8F5)] md:h-14"
        aria-hidden="true"
      />
    </section>
  );
}
