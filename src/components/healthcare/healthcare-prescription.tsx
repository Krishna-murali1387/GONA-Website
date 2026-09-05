"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { healthcareTokens } from "@/components/healthcare/healthcare.content";

/** Soft clinical paper — distinct from page bg without looking like a UI card. */
const PAPER =
  "border border-[#94A3B8]/55 bg-[linear-gradient(165deg,#FFFEFB_0%,#F4F8FC_100%)] shadow-[0_1px_0_rgba(30,58,95,0.04),0_12px_28px_rgba(30,58,95,0.08),0_2px_6px_rgba(15,23,42,0.04)]";

/**
 * 05 — Prescription visibility polish only.
 * Scroll-built illustrative document — not a real medical form.
 */
export function HealthcarePrescription() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sheetY = useTransform(
    scrollYProgress,
    [0, 0.18],
    reduce ? [0, 0] : [36, 0],
  );
  const sheetOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    reduce ? [1, 1] : [0, 1],
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.3],
    reduce ? [1, 1] : [0, 1],
  );
  const medsOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.44],
    reduce ? [1, 1] : [0, 1],
  );
  const doseOpacity = useTransform(
    scrollYProgress,
    [0.44, 0.54],
    reduce ? [1, 1] : [0, 1],
  );
  const timingOpacity = useTransform(
    scrollYProgress,
    [0.54, 0.64],
    reduce ? [1, 1] : [0, 1],
  );
  const durationOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.74],
    reduce ? [1, 1] : [0, 1],
  );
  const notesOpacity = useTransform(
    scrollYProgress,
    [0.74, 0.84],
    reduce ? [1, 1] : [0, 1],
  );
  const threadThrough = useTransform(
    scrollYProgress,
    [0.2, 0.78],
    reduce ? [1, 1] : [0, 1],
  );
  const threadOut = useTransform(
    scrollYProgress,
    [0.84, 0.98],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={ref}
      data-care-chapter="rx"
      className="relative bg-[#EEF2F7]"
    >
      {/* Mobile — completed, clearly visible sheet */}
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          05 / Prescription
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Care plan, clearly structured.
        </h2>
        <p className="mt-2 text-sm text-[#64748B]">
          Illustrative prescription view — not a real medical document.
        </p>
        <div className={`relative mt-8 p-6 ${PAPER}`}>
          <span
            className="absolute top-8 -left-3 h-px w-3 bg-[#3B82F6]"
            aria-hidden="true"
          />
          <RxSheetContent />
          <span
            className="absolute right-0 bottom-10 h-px w-8 bg-[#3B82F6]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Desktop sticky construction */}
      <div className="relative hidden lg:block">
        <div className="h-[200vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[0.85fr_1.15fr] items-center gap-12 px-8 lg:px-14">
              <div>
                <p
                  className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: healthcareTokens.accent }}
                >
                  05 / Prescription
                </p>
                <h2 className="mt-4 font-display text-4xl text-gona-black xl:text-5xl">
                  Care plan,
                  <span className="mt-1 block text-[#1E3A5F]">
                    clearly structured.
                  </span>
                </h2>
                <p className="mt-4 text-sm text-[#64748B]">
                  Illustrative prescription view — not a real medical document.
                </p>
              </div>

              <motion.div
                className="relative mx-auto w-full max-w-[30rem]"
                style={{ y: sheetY, opacity: sheetOpacity }}
              >
                {/* Thread enters from left */}
                <div
                  className="pointer-events-none absolute top-10 -left-14 flex items-center"
                  aria-hidden="true"
                >
                  <span className="h-px w-10 bg-[#3B82F6]" />
                  <span className="size-1.5 rounded-full bg-[#3B82F6]" />
                </div>

                <div className={`relative overflow-hidden px-9 py-9 ${PAPER}`}>
                  {/* Vertical care thread through the document */}
                  <div
                    className="pointer-events-none absolute top-9 bottom-9 left-5 w-px bg-[#BFDBFE]"
                    aria-hidden="true"
                  >
                    <motion.div
                      className="absolute inset-x-0 top-0 origin-top bg-[#3B82F6]"
                      style={{ height: "100%", scaleY: threadThrough }}
                    />
                  </div>

                  <div className="relative pl-4">
                    <motion.div style={{ opacity: headerOpacity }}>
                      <p className="text-[0.75rem] font-semibold tracking-[0.24em] text-[#1E3A5F] uppercase">
                        Care plan
                      </p>
                      <div className="mt-3 h-px w-full bg-[#94A3B8]/45" />
                    </motion.div>

                    <motion.div className="mt-7" style={{ opacity: medsOpacity }}>
                      <FieldLabel>Medication</FieldLabel>
                      <SkeletonLines widths={["88%", "64%"]} />
                    </motion.div>

                    <motion.div className="mt-6" style={{ opacity: doseOpacity }}>
                      <FieldLabel>Dosage</FieldLabel>
                      <SkeletonLines widths={["52%"]} />
                    </motion.div>

                    <motion.div
                      className="mt-6"
                      style={{ opacity: timingOpacity }}
                    >
                      <FieldLabel>Timing</FieldLabel>
                      <SkeletonLines widths={["70%"]} />
                    </motion.div>

                    <motion.div
                      className="mt-6"
                      style={{ opacity: durationOpacity }}
                    >
                      <FieldLabel>Duration</FieldLabel>
                      <SkeletonLines widths={["44%"]} />
                    </motion.div>

                    <motion.div className="mt-6" style={{ opacity: notesOpacity }}>
                      <FieldLabel>Instructions</FieldLabel>
                      <SkeletonLines widths={["100%", "86%", "62%"]} />
                    </motion.div>
                  </div>
                </div>

                {/* Thread exits toward medication chapter */}
                <motion.div
                  className="pointer-events-none absolute top-1/2 -right-16 flex -translate-y-1/2 items-center"
                  style={{ opacity: threadOut }}
                  aria-hidden="true"
                >
                  <span className="size-1.5 rounded-full bg-[#3B82F6]" />
                  <motion.span
                    className="h-px w-12 origin-left bg-[#3B82F6]"
                    style={{ scaleX: threadOut }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-[#334155] uppercase">
        {children}
      </p>
      <div className="mt-2 mb-3 h-px w-full bg-[#CBD5E1]" />
    </>
  );
}

function SkeletonLines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2.5">
      {widths.map((width) => (
        <div
          key={width}
          className="h-2.5 rounded-sm bg-[#CBD5E1]/90"
          style={{ width }}
        />
      ))}
    </div>
  );
}

function RxSheetContent() {
  return (
    <div>
      <p className="text-[0.75rem] font-semibold tracking-[0.24em] text-[#1E3A5F] uppercase">
        Care plan
      </p>
      <div className="mt-3 h-px w-full bg-[#94A3B8]/45" />

      <div className="mt-6">
        <FieldLabel>Medication</FieldLabel>
        <SkeletonLines widths={["88%", "64%"]} />
      </div>
      <div className="mt-5">
        <FieldLabel>Dosage</FieldLabel>
        <SkeletonLines widths={["52%"]} />
      </div>
      <div className="mt-5">
        <FieldLabel>Timing</FieldLabel>
        <SkeletonLines widths={["70%"]} />
      </div>
      <div className="mt-5">
        <FieldLabel>Duration</FieldLabel>
        <SkeletonLines widths={["44%"]} />
      </div>
      <div className="mt-5">
        <FieldLabel>Instructions</FieldLabel>
        <SkeletonLines widths={["100%", "86%", "62%"]} />
      </div>
    </div>
  );
}
