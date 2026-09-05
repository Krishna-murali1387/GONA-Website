"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  healthcareFamilyNodes,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { cn } from "@/lib/cn";

/** 09 — Family · separate member threads within one care experience */
export function HealthcareFamily() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(0);
      return;
    }
    const next = Math.min(
      healthcareFamilyNodes.length - 1,
      Math.floor(v * healthcareFamilyNodes.length),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const stage = reduce ? 0 : active;

  return (
    <section
      ref={ref}
      data-care-chapter="family"
      className="relative bg-[#F8FAFC]"
    >
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          09 / Family
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Care for more than one.
          <span className="mt-1 block text-[#1E3A5F]">
            Without losing each story.
          </span>
        </h2>
        <ul className="mt-8 space-y-5">
          {healthcareFamilyNodes.map((node) => (
            <li key={node.id} className="border-t border-black/6 pt-4">
              <div className="flex items-center gap-3">
                <span className="size-2.5 rounded-full bg-[#3B82F6]" />
                <span className="font-display text-2xl text-gona-black">
                  {node.label}
                </span>
              </div>
              <div className="mt-3 ml-1 h-8 w-px bg-[#BFDBFE]" aria-hidden="true" />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-[#94A3B8]">
          Each member keeps a distinct care thread within the family experience.
        </p>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-[170vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[0.9fr_1.1fr] items-center gap-12 px-8 lg:px-14">
              <div>
                <p
                  className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: healthcareTokens.accent }}
                >
                  09 / Family
                </p>
                <h2 className="mt-4 font-display text-4xl text-gona-black xl:text-5xl">
                  Care for more than one.
                  <span className="mt-2 block text-[#1E3A5F]">
                    Without losing each story.
                  </span>
                </h2>
                <p className="mt-4 max-w-sm text-sm text-[#64748B]">
                  Family care in one experience — each profile keeps its own
                  thread.
                </p>
              </div>

              <div className="relative h-[22rem]">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 480 360"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="120" cy="180" r="28" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />
                  {/* Distinct member threads — not merged */}
                  <path d="M148 160 C220 90 280 70 360 70" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M148 180 C230 180 290 180 360 180" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
                  <path d="M148 200 C220 270 280 290 360 290" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="360" cy="70" r={stage === 1 ? 8 : 5} fill={stage === 1 ? "#3B82F6" : "#93C5FD"} />
                  <circle cx="360" cy="180" r={stage === 2 ? 8 : 5} fill={stage === 2 ? "#3B82F6" : "#93C5FD"} />
                  <circle cx="360" cy="290" r={stage === 3 ? 8 : 5} fill={stage === 3 ? "#3B82F6" : "#93C5FD"} />
                  <circle cx="120" cy="180" r={stage === 0 ? 10 : 7} fill="#3B82F6" />
                </svg>

                <p className="absolute top-[10.4rem] left-8 font-display text-lg text-gona-black">
                  You
                </p>
                <ul className="absolute top-6 right-4 space-y-14 text-right">
                  {healthcareFamilyNodes.slice(1).map((node, i) => (
                    <li key={node.id}>
                      <span
                        className={cn(
                          "font-display text-xl transition-colors",
                          stage === i + 1 ? "text-gona-black" : "text-black/30",
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
