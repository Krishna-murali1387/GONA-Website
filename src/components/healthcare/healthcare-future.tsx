"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import {
  healthcareComingSoon,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";

/** 11 — Ecosystem growing · solid today → dotted soon */
export function HealthcareFuture() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const dotted = useTransform(
    scrollYProgress,
    [0.25, 0.6],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={ref}
      data-care-chapter="future"
      className="relative bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          11 / Growing
        </p>
        <h2 className="mt-4 font-display text-3xl text-gona-black md:text-4xl xl:text-5xl">
          The care ecosystem is growing.
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2 font-semibold tracking-[0.12em] text-[#16A34A] uppercase">
            <span className="size-2 rounded-full bg-[#16A34A]" />
            Available today
          </span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="inline-flex items-center gap-2 font-semibold tracking-[0.12em] text-[#64748B] uppercase">
            <span className="size-2 rounded-full border border-dashed border-[#93C5FD] bg-transparent" />
            Coming soon
          </span>
        </div>

        <div className="relative mt-14 max-w-2xl">
          <svg
            className="h-24 w-full"
            viewBox="0 0 640 96"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 48 H280"
              stroke="#3B82F6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <motion.path
              d="M280 48 H620"
              stroke="#93C5FD"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 8"
              style={{ pathLength: dotted }}
            />
            <circle cx="20" cy="48" r="5" fill="#3B82F6" />
            <circle cx="280" cy="48" r="5" fill="#3B82F6" />
            <motion.circle
              cx="450"
              cy="48"
              r="5"
              fill="none"
              stroke="#93C5FD"
              strokeWidth="2"
              strokeDasharray="3 3"
              style={{ opacity: dotted }}
            />
            <motion.circle
              cx="600"
              cy="48"
              r="5"
              fill="none"
              stroke="#93C5FD"
              strokeWidth="2"
              strokeDasharray="3 3"
              style={{ opacity: dotted }}
            />
          </svg>

          <ul className="mt-6 grid gap-8 sm:grid-cols-2">
            {healthcareComingSoon.map((item) => (
              <li key={item.id}>
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[#94A3B8] uppercase">
                  Coming soon
                </p>
                <p className="mt-2 font-display text-3xl text-[#1E3A5F]">
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-[#94A3B8]">
          Pharmacy and Laboratory are not available yet — shown as future care
          pathways only.
        </p>
      </div>
    </section>
  );
}
