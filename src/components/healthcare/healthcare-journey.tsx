"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

import {
  healthcareJourneySteps,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { JourneyStageArt } from "@/components/healthcare/healthcare-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function HealthcareJourney() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 85%"],
  });
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[linear-gradient(180deg,#F8FAFC_0%,#EFF6FF_40%,#FFFFFF_100%)] py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: healthcareTokens.accent }}
          >
            Connected care journey
          </p>
          <h2 className="font-display text-3xl text-gona-black md:text-4xl">
            One pathway through care.
          </h2>
          <p className="mt-3 text-base text-gona-gray md:text-lg">
            Follow how local care, appointments, referrals and records stay linked
            through GONA.
          </p>
        </div>

        {/* Mobile / tablet — vertical timeline */}
        <ol className="relative mt-12 space-y-10 lg:hidden">
          <div
            className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-[#BFDBFE]"
            aria-hidden="true"
          />
          {healthcareJourneySteps.map((step, index) => (
            <li key={step.n} className="relative grid gap-4 pl-12 sm:grid-cols-[1fr_0.95fr] sm:items-center">
              <span
                className="absolute top-1 left-0 flex size-9 items-center justify-center rounded-full border-2 border-[#3B82F6] bg-white font-display text-xs font-bold"
                style={{ color: healthcareTokens.navy }}
              >
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-xl text-gona-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gona-gray">{step.body}</p>
              </div>
              <div className="min-h-[14rem] overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white shadow-[0_16px_40px_rgba(30,58,95,0.08)] sm:min-h-[16rem]">
                <JourneyStageArt stage={index} />
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop — alternating connected pathway */}
        <div className="relative mt-16 hidden lg:block">
          <PathwayRail progress={reduce ? undefined : pathProgress} reduced={Boolean(reduce)} />
          <ol className="relative space-y-20 xl:space-y-24">
            {healthcareJourneySteps.map((step, index) => {
              const copyLeft = index % 2 === 0;
              return (
                <li
                  key={step.n}
                  className="grid grid-cols-[1fr_5rem_1fr] items-center gap-6 xl:gap-10"
                >
                  <div
                    className={cn(
                      copyLeft
                        ? "justify-self-end text-right"
                        : "justify-self-end",
                    )}
                  >
                    {copyLeft ? (
                      <StageCopy step={step} align="right" />
                    ) : (
                      <StageVisual stage={index} />
                    )}
                  </div>

                  <div className="relative z-10 flex justify-center">
                    <span
                      className="flex size-12 items-center justify-center rounded-full border-[3px] border-[#3B82F6] bg-white font-display text-sm font-bold shadow-[0_0_0_6px_#EFF6FF]"
                      style={{ color: healthcareTokens.navy }}
                    >
                      {step.n}
                    </span>
                  </div>

                  <div
                    className={cn(
                      copyLeft ? "justify-self-start" : "justify-self-start text-left",
                    )}
                  >
                    {copyLeft ? (
                      <StageVisual stage={index} />
                    ) : (
                      <StageCopy step={step} align="left" />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function StageCopy({
  step,
  align,
}: {
  step: (typeof healthcareJourneySteps)[number];
  align: "left" | "right";
}) {
  return (
    <div className={cn("max-w-xs xl:max-w-sm", align === "right" ? "ml-auto" : "mr-auto text-left")}>
      <h3 className="font-display text-2xl text-gona-black">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gona-gray md:text-base">{step.body}</p>
    </div>
  );
}

function StageVisual({ stage }: { stage: number }) {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white shadow-[0_18px_44px_rgba(30,58,95,0.1)] xl:max-w-2xl">
      <div className="aspect-[4/3] min-h-[16rem] w-full xl:min-h-[18rem]">
        <JourneyStageArt stage={stage} />
      </div>
    </div>
  );
}

function PathwayRail({
  progress,
  reduced,
}: {
  progress?: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute top-6 bottom-6 left-1/2 w-1 -translate-x-1/2 overflow-hidden rounded-full bg-[#DBEAFE]"
      aria-hidden="true"
    >
      {progress && !reduced ? (
        <motion.div
          className="absolute inset-x-0 top-0 origin-top rounded-full bg-[#3B82F6]"
          style={{ scaleY: progress, height: "100%" }}
        />
      ) : (
        <div className="absolute inset-0 rounded-full bg-[#93C5FD]" />
      )}
    </div>
  );
}
