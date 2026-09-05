"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  repairTokens,
  repairTransformSteps,
} from "@/components/repair/repair.content";
import { HomeRepairScene } from "@/components/repair/repair-visuals";
import { cn } from "@/lib/cn";

export function RepairTransform() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const [stage, setStage] = useState(0);
  const [approvedDemo, setApprovedDemo] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    const next = Math.min(
      repairTransformSteps.length - 1,
      Math.floor(value * repairTransformSteps.length),
    );
    setStage((prev) => (prev === next ? prev : next));
  });

  const active = reduce ? repairTransformSteps.length - 1 : stage;
  const darkMoment = active >= 1 && active <= 3;

  return (
    <section id="repair-transform" className="relative bg-[#1C1917]">
      {/* Mobile — stacked same visual language */}
      <div className="py-24 lg:hidden">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Header onDark />
          <ol className="mt-10 space-y-12">
            {repairTransformSteps.map((s, index) => (
              <li key={s.id}>
                <p
                  className="text-xs font-bold tracking-[0.18em]"
                  style={{ color: repairTokens.accent }}
                >
                  {s.label}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {s.body}
                </p>
                <div className="relative mt-5 min-h-[240px] overflow-hidden">
                  <HomeRepairScene
                    stage={index}
                    className="h-full min-h-[240px] w-full"
                    approved={index >= 3}
                    tone={index >= 1 && index <= 3 ? "graphite" : index >= 5 ? "fixed" : "warm"}
                  />
                </div>
                {index === 3 && (
                  <p className="mt-3 text-xs text-white/45">
                    Presentational demo — not a live booking.
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Desktop sticky — ~3.5 viewports */}
      <div ref={pinRef} className="relative hidden lg:block">
        <div className="h-[350vh]">
          <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-stretch">
            <div
              className={cn(
                "relative flex w-full transition-colors duration-500",
                darkMoment ? "bg-[#1C1917]" : active >= 5 ? "bg-[#FAF8F5]" : "bg-[#292524]",
              )}
            >
              <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-[0.75fr_1.25fr] items-center gap-8 px-10 xl:gap-10 xl:px-14">
                <div className="relative z-10 py-8">
                  <Header onDark={darkMoment || active < 5} />
                  <ol className="mt-8 space-y-1">
                    {repairTransformSteps.map((s, index) => {
                      const on = index === active;
                      const lightText = darkMoment || active < 5;
                      return (
                        <li key={s.id}>
                          <div
                            className={cn(
                              "border-l-2 px-4 py-2.5 transition-all duration-300",
                              on
                                ? "border-[#F97316]"
                                : "border-transparent opacity-40",
                            )}
                          >
                            <p
                              className="text-[10px] font-bold tracking-[0.16em]"
                              style={{
                                color: on ? repairTokens.accent : lightText ? "#A8A29E" : "#78716C",
                              }}
                            >
                              {s.label}
                            </p>
                            <h3
                              className={cn(
                                "mt-0.5 font-display text-lg xl:text-xl",
                                lightText ? "text-white" : "text-[#1C1917]",
                                !on && "opacity-70",
                              )}
                            >
                              {s.title}
                            </h3>
                            <p
                              className={cn(
                                "mt-1 max-w-sm text-sm leading-relaxed transition-opacity",
                                lightText ? "text-white/60" : "text-stone-600",
                                on ? "opacity-100" : "opacity-0",
                              )}
                            >
                              {on ? s.body : "\u00A0"}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  {active === 3 && (
                    <button
                      type="button"
                      className="mt-6 rounded-full border-2 px-5 py-2.5 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{
                        background: approvedDemo ? repairTokens.yellow : repairTokens.soft,
                        borderColor: repairTokens.charcoal,
                        color: repairTokens.charcoal,
                        outlineColor: repairTokens.accent,
                      }}
                      onClick={() => setApprovedDemo(true)}
                      aria-pressed={approvedDemo}
                    >
                      {approvedDemo ? "Approved ✓" : "Approve Repair"}
                      <span className="sr-only">
                        {" "}
                        Presentational demo only
                      </span>
                    </button>
                  )}
                </div>

                <motion.div
                  className="relative h-[min(72vh,560px)] w-full overflow-hidden"
                  key={active}
                  initial={reduce ? false : { opacity: 0.85 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <HomeRepairScene
                    stage={active}
                    className="h-full w-full"
                    approved={approvedDemo || active >= 3}
                    tone={
                      darkMoment
                        ? "graphite"
                        : active >= 5
                          ? "fixed"
                          : "warm"
                    }
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header({ onDark }: { onDark?: boolean }) {
  return (
    <div className="max-w-md">
      <p
        className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: repairTokens.accent }}
      >
        The repair transform
      </p>
      <h2
        className={cn(
          "font-display text-3xl leading-tight md:text-4xl lg:text-[3rem]",
          onDark ? "text-white" : "text-[#1C1917]",
        )}
      >
        From fault
        <span className="mt-1 block" style={{ color: repairTokens.accent }}>
          to fixed.
        </span>
      </h2>
      <p
        className={cn(
          "mt-3 text-base leading-relaxed",
          onDark ? "text-white/60" : "text-stone-600",
        )}
      >
        One home. One job — from issue through your approval to completion.
      </p>
    </div>
  );
}
