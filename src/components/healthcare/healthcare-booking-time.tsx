"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

import { CareThreadRibbon } from "@/components/healthcare/healthcare-care-thread";
import {
  healthcareBookingSteps,
  healthcareBookingWindows,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { cn } from "@/lib/cn";

/** 03 — Booking becomes time · illustrative windows only */
export function HealthcareBookingTime() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(healthcareBookingWindows.length - 1);
      return;
    }
    const next = Math.min(
      healthcareBookingWindows.length - 1,
      Math.floor(v * healthcareBookingWindows.length),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const stage = reduce ? healthcareBookingWindows.length - 1 : active;
  const stepIndex = Math.min(
    healthcareBookingSteps.length - 1,
    Math.floor(stage / 1.4),
  );

  const nodeScale = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    reduce ? [1, 1] : [0.96, 1],
  );

  return (
    <section
      id="care-time"
      ref={ref}
      data-care-chapter="time"
      className="relative scroll-mt-24 bg-white"
    >
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          03 / Time
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Booking becomes time.
        </h2>
        <ol className="mt-8 space-y-5">
          {healthcareBookingSteps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-[#3B82F6]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl text-gona-black">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-4">
          {healthcareBookingWindows.map((w) => (
            <span
              key={w}
              className="text-sm font-semibold tracking-[0.12em] text-[#64748B] uppercase"
            >
              {w}
            </span>
          ))}
        </div>
        <p className="mt-8 text-sm text-[#64748B]">
          Need care sooner? Check available nearby care.
        </p>
        <p className="mt-2 text-xs text-[#94A3B8]">
          Illustrative booking windows — not live availability.
        </p>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-[160vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto w-full max-w-[1280px] px-8 lg:px-14">
              <p
                className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                style={{ color: healthcareTokens.accent }}
              >
                03 / Time
              </p>
              <h2 className="mt-4 font-display text-4xl text-gona-black xl:text-5xl">
                Booking becomes time.
              </h2>

              <motion.div className="mt-16" style={{ scale: nodeScale }}>
                <CareThreadRibbon progress={scrollYProgress} reduce={!!reduce} />
                <ul className="mt-8 flex justify-between">
                  {healthcareBookingWindows.map((window, i) => {
                    const on = i === stage;
                    return (
                      <li key={window} className="text-center">
                        <span
                          className={cn(
                            "mx-auto mb-3 block size-2.5 rounded-full transition-all",
                            on
                              ? "bg-[#3B82F6] shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"
                              : "bg-[#BFDBFE]",
                          )}
                        />
                        <span
                          className={cn(
                            "font-display text-2xl tracking-[0.04em] uppercase transition-colors",
                            on ? "text-gona-black" : "text-black/25",
                          )}
                        >
                          {window}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>

              <p className="mt-14 font-display text-2xl text-[#1E3A5F]">
                {healthcareBookingSteps[Math.min(stepIndex, healthcareBookingSteps.length - 1)]}
              </p>
              <p className="mt-4 max-w-md text-sm text-[#64748B]">
                Need care sooner? Check available nearby care.
              </p>
              <p className="mt-2 text-xs text-[#94A3B8]">
                Illustrative booking windows — not live availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
