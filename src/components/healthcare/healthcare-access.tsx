"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import {
  healthcareAccessPoints,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { AccessScene } from "@/components/healthcare/healthcare-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function HealthcareAccess() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<(typeof healthcareAccessPoints)[number]["id"]>(
    "local",
  );
  const current =
    healthcareAccessPoints.find((p) => p.id === active) ?? healthcareAccessPoints[0];

  return (
    <section id="healthcare-access" className="bg-gona-white py-16 md:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: healthcareTokens.accent }}
          >
            Care access
          </p>
          <h2 className="font-display text-3xl text-gona-black md:text-4xl">
            Start with the care you need.
          </h2>
          <p className="mt-3 text-base text-gona-gray md:text-lg">
            Three entry points into one connected healthcare ecosystem.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 900 420"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M450 200 L200 95"
              fill="none"
              stroke={active === "local" ? healthcareTokens.accent : "#BFDBFE"}
              strokeWidth={active === "local" ? 5 : 2.5}
              strokeLinecap="round"
            />
            <path
              d="M450 200 L700 95"
              fill="none"
              stroke={active === "hospital" ? healthcareTokens.accent : "#BFDBFE"}
              strokeWidth={active === "hospital" ? 5 : 2.5}
              strokeLinecap="round"
            />
            <path
              d="M450 200 L450 330"
              fill="none"
              stroke={active === "vet" ? healthcareTokens.accent : "#BFDBFE"}
              strokeWidth={active === "vet" ? 5 : 2.5}
              strokeLinecap="round"
            />
          </svg>

          <div className="relative grid gap-6 md:gap-8">
            <div className="grid gap-5 md:grid-cols-2 md:gap-8">
              {healthcareAccessPoints
                .filter((p) => p.id !== "vet")
                .map((point) => (
                  <AccessCard
                    key={point.id}
                    point={point}
                    active={active === point.id}
                    onFocus={() => setActive(point.id)}
                  />
                ))}
            </div>

            <div className="relative z-10 mx-auto flex flex-col items-center">
              <div
                className="flex size-20 items-center justify-center rounded-full border-2 border-[#BFDBFE] bg-white shadow-[0_12px_30px_rgba(30,58,95,0.1)]"
                style={{ boxShadow: `0 0 0 8px ${healthcareTokens.mist}` }}
              >
                <span
                  className="font-display text-sm font-bold tracking-wide"
                  style={{ color: healthcareTokens.navy }}
                >
                  GONA
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold tracking-[0.14em] text-gona-gray uppercase">
                Healthcare
              </p>
            </div>

            <div className="mx-auto w-full max-w-lg">
              {healthcareAccessPoints
                .filter((p) => p.id === "vet")
                .map((point) => (
                  <AccessCard
                    key={point.id}
                    point={point}
                    active={active === point.id}
                    onFocus={() => setActive(point.id)}
                    secondary
                  />
                ))}
            </div>
          </div>

          <div className="mt-8 min-h-[4.5rem] text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                className="mx-auto max-w-lg text-sm leading-relaxed text-gona-gray md:text-base"
              >
                {current.body}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AccessCard({
  point,
  active,
  onFocus,
  secondary,
}: {
  point: (typeof healthcareAccessPoints)[number];
  active: boolean;
  onFocus: () => void;
  secondary?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onFocus}
      onFocus={onFocus}
      className={cn(
        "w-full overflow-hidden rounded-2xl border text-left transition-[border-color,box-shadow,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2",
        active
          ? "border-[#93C5FD] bg-[#EFF6FF] shadow-[0_16px_40px_rgba(30,58,95,0.1)]"
          : "border-black/8 bg-white hover:border-[#BFDBFE]",
        active && !secondary && "md:scale-[1.02]",
        !active && "md:scale-[0.985] md:opacity-90",
        secondary && !active && "bg-[#FFF7ED]/60",
      )}
      style={{ outlineColor: healthcareTokens.accent }}
      aria-pressed={active}
    >
      <div className="aspect-[7/4] w-full border-b border-[#E2E8F0]">
        <AccessScene kind={point.id} active={active} />
      </div>
      <div className="px-5 py-4">
        <p
          className="font-display text-lg text-gona-black md:text-xl"
          style={{ color: active ? healthcareTokens.navy : undefined }}
        >
          {point.title}
        </p>
        {secondary && (
          <p className="mt-1 text-xs font-semibold tracking-wide text-gona-gray uppercase">
            Secondary branch
          </p>
        )}
      </div>
    </button>
  );
}
