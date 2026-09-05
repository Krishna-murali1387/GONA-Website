"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  healthcareNearbyNodes,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { cn } from "@/lib/cn";

/** 02 — Nearby Care · abstract local-care radius (no fake map/distances) */
export function HealthcareNearbyCare() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const count = healthcareNearbyNodes.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(0);
      return;
    }
    const next = Math.min(count - 1, Math.floor(v * count));
    setActive((prev) => (prev === next ? prev : next));
  });

  const stage = reduce ? 0 : active;
  const current = healthcareNearbyNodes[stage] ?? healthcareNearbyNodes[0];

  return (
    <section
      id="care-nearby"
      ref={ref}
      data-care-chapter="nearby"
      className="relative scroll-mt-24 bg-[#F8FAFC]"
    >
      {/* Mobile */}
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          02 / Nearby
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Care begins nearby.
        </h2>
        <p className="mt-3 text-sm text-[#64748B]">
          Availability depends on your location.
        </p>
        <div className="relative mx-auto mt-10 flex size-56 items-center justify-center">
          <span className="absolute inset-6 rounded-full border border-[#BFDBFE]" />
          <span className="absolute inset-0 rounded-full border border-dashed border-[#93C5FD]/70" />
          <div className="relative z-10 text-center">
            <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
              You
            </p>
            <p className="mt-1 font-display text-lg text-gona-black">
              Your care need
            </p>
          </div>
        </div>
        <ul className="mt-8 space-y-4">
          {healthcareNearbyNodes.map((node, i) => (
            <li
              key={node.id}
              className="flex items-center gap-3 border-t border-black/6 pt-3"
            >
              <span
                className="size-2 rounded-full bg-[#3B82F6]"
                aria-hidden="true"
              />
              <span className="font-display text-xl text-gona-black">
                {node.label}
              </span>
              <span className="ml-auto text-[0.65rem] tracking-[0.16em] text-[#64748B]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop sticky */}
      <div className="relative hidden lg:block">
        <div className="h-[170vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[0.85fr_1.15fr] items-center gap-10 px-8 lg:px-14">
              <div>
                <p
                  className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: healthcareTokens.accent }}
                >
                  02 / Nearby
                </p>
                <h2 className="mt-4 font-display text-4xl text-gona-black xl:text-5xl">
                  Care begins nearby.
                </h2>
                <p className="mt-4 max-w-sm text-sm text-[#64748B]">
                  Local and general care first — hospitals and specialists when
                  needed.
                </p>
                <p className="mt-6 text-xs text-[#64748B]">
                  Availability depends on your location.
                </p>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
                <div className="absolute inset-[18%] rounded-full border border-[#BFDBFE]" />
                <div className="absolute inset-[6%] rounded-full border border-dashed border-[#93C5FD]/80" />
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 400 400"
                  aria-hidden="true"
                >
                  {healthcareNearbyNodes.map((node, i) => {
                    const angle = (-90 + i * 90) * (Math.PI / 180);
                    const x = 200 + Math.cos(angle) * 148;
                    const y = 200 + Math.sin(angle) * 148;
                    const on = i === stage;
                    return (
                      <g key={node.id}>
                        <line
                          x1="200"
                          y1="200"
                          x2={x}
                          y2={y}
                          stroke={on ? "#3B82F6" : "#BFDBFE"}
                          strokeWidth={on ? 2.5 : 1.25}
                          strokeLinecap="round"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r={on ? 7 : 4.5}
                          fill={on ? "#3B82F6" : "#93C5FD"}
                        />
                      </g>
                    );
                  })}
                  <circle cx="200" cy="200" r="46" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
                      You
                    </p>
                    <p className="mt-1 font-display text-base text-gona-black">
                      Your care need
                    </p>
                  </div>
                </div>

                <div className="absolute right-0 bottom-2 left-0 text-center">
                  <motion.p
                    key={current.id}
                    className="font-display text-2xl text-gona-black"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {current.label}
                  </motion.p>
                </div>

                <ul className="absolute top-0 right-0 space-y-2 text-right">
                  {healthcareNearbyNodes.map((node, i) => (
                    <li key={node.id}>
                      <span
                        className={cn(
                          "text-xs font-semibold tracking-[0.14em] uppercase transition-colors",
                          i === stage ? "text-[#3B82F6]" : "text-black/25",
                        )}
                      >
                        {node.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
