"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  healthcareMedTimeline,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { cn } from "@/lib/cn";

/** 06 — Medication timeline · editorial continuity (not adherence tracking) */
export function HealthcareMedication() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(healthcareMedTimeline.length - 1);
      return;
    }
    const next = Math.min(
      healthcareMedTimeline.length - 1,
      Math.floor(v * healthcareMedTimeline.length),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const stage = reduce ? healthcareMedTimeline.length - 1 : active;

  return (
    <section
      ref={ref}
      data-care-chapter="meds"
      className="relative bg-white"
    >
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          06 / Medication
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Prescribed care over time.
        </h2>
        <p className="mt-3 text-sm text-[#64748B]">
          A clearer view of prescribed care over time.
        </p>
        <ol className="mt-8 space-y-6">
          {healthcareMedTimeline.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <span className="size-2.5 rounded-full bg-[#3B82F6]" />
              <span className="font-display text-2xl text-gona-black">
                {item.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-[150vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto w-full max-w-[1280px] px-8 lg:px-14">
              <p
                className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                style={{ color: healthcareTokens.accent }}
              >
                06 / Medication
              </p>
              <h2 className="mt-4 font-display text-4xl text-gona-black xl:text-5xl">
                Prescribed care over time.
              </h2>
              <p className="mt-3 max-w-md text-sm text-[#64748B]">
                A clearer view of prescribed care over time.
              </p>

              <div className="relative mt-20">
                <div className="absolute top-3 right-0 left-0 h-px bg-[#DBEAFE]" />
                <motion.div
                  className="absolute top-3 left-0 h-px origin-left bg-[#3B82F6]"
                  style={{
                    width: reduce
                      ? "100%"
                      : `${((stage + 1) / healthcareMedTimeline.length) * 100}%`,
                  }}
                />
                <ul className="relative flex justify-between">
                  {healthcareMedTimeline.map((item, i) => {
                    const on = i <= stage;
                    const current = i === stage;
                    return (
                      <li key={item.id} className="text-center">
                        <span
                          className={cn(
                            "mx-auto mb-4 block size-3 rounded-full transition-all",
                            on ? "bg-[#3B82F6]" : "bg-[#BFDBFE]",
                            current &&
                              "shadow-[0_0_0_5px_rgba(59,130,246,0.18)]",
                          )}
                        />
                        <span
                          className={cn(
                            "font-display text-2xl tracking-[0.06em] uppercase",
                            current ? "text-gona-black" : "text-black/30",
                          )}
                        >
                          {item.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p className="mt-14 text-xs text-[#94A3B8]">
                Visual representation of prescription timing — not adherence
                monitoring or pharmacy fulfilment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
