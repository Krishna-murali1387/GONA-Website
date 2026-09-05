"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  healthcareHistoryStages,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { cn } from "@/lib/cn";

/** 08 — Medical History · longitudinal care story */
export function HealthcareHistory() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(healthcareHistoryStages.length - 1);
      return;
    }
    const next = Math.min(
      healthcareHistoryStages.length - 1,
      Math.floor(v * healthcareHistoryStages.length),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const stage = reduce ? healthcareHistoryStages.length - 1 : active;
  const current = healthcareHistoryStages[stage] ?? healthcareHistoryStages[0];

  return (
    <section
      ref={ref}
      data-care-chapter="history"
      className="relative bg-white"
    >
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          08 / History
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          One history.
          <span className="mt-1 block text-[#1E3A5F]">Over time.</span>
        </h2>
        <ol className="mt-8 space-y-5">
          {healthcareHistoryStages.map((item) => (
            <li key={item.id} className="border-t border-black/6 pt-4">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[#3B82F6] uppercase">
                {item.label}
              </p>
              <p className="mt-1 font-display text-2xl text-gona-black">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-[160vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto w-full max-w-[1280px] px-8 lg:px-14">
              <p
                className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                style={{ color: healthcareTokens.accent }}
              >
                08 / History
              </p>
              <h2 className="mt-4 font-display text-4xl text-gona-black xl:text-5xl">
                One history.
                <span className="mt-1 block text-[#1E3A5F]">Over time.</span>
              </h2>
              <p className="mt-3 max-w-md text-sm text-[#64748B]">
                Medical history is the accumulated story of previous care — not
                an isolated feature.
              </p>

              <div className="relative mt-16">
                <div className="absolute top-3 right-0 left-0 h-px bg-[#DBEAFE]" />
                <motion.div
                  className="absolute top-3 left-0 h-px bg-[#3B82F6]"
                  style={{
                    width: `${((stage + 1) / healthcareHistoryStages.length) * 100}%`,
                  }}
                />
                <ul className="relative flex justify-between">
                  {healthcareHistoryStages.map((item, i) => {
                    const on = i === stage;
                    const past = i < stage;
                    return (
                      <li key={item.id} className="max-w-[9rem]">
                        <span
                          className={cn(
                            "mb-4 block size-3 rounded-full",
                            on || past ? "bg-[#3B82F6]" : "bg-[#BFDBFE]",
                            on && "shadow-[0_0_0_5px_rgba(59,130,246,0.18)]",
                          )}
                        />
                        <p
                          className={cn(
                            "text-[0.65rem] font-semibold tracking-[0.16em] uppercase",
                            on ? "text-[#3B82F6]" : "text-black/30",
                          )}
                        >
                          {item.label}
                        </p>
                        <p
                          className={cn(
                            "mt-1 font-display text-xl",
                            on ? "text-gona-black" : "text-black/30",
                          )}
                        >
                          {item.detail}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p
                key={current.id}
                className="mt-14 font-display text-3xl text-[#1E3A5F]"
              >
                {current.label}: {current.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
