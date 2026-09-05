"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import {
  repairServiceTypes,
  repairTokens,
} from "@/components/repair/repair.content";
import { CategorySymbols } from "@/components/repair/repair-visuals";
import { cn } from "@/lib/cn";

export function RepairServices() {
  const reduce = useReducedMotion();
  const [active, setActive] =
    useState<(typeof repairServiceTypes)[number]["id"]>("ac");
  const current =
    repairServiceTypes.find((s) => s.id === active) ?? repairServiceTypes[0];

  return (
    <section id="repair-services" className="bg-[#F5F5F4] py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-3xl leading-tight text-[#1C1917] md:text-4xl lg:text-[3rem]">
            What needs attention?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-700 md:text-lg">
            Choose a supported repair service and tell us what needs fixing.
          </p>
        </div>

        <div
          className="rounded-sm px-4 py-8 md:px-8 md:py-10"
          style={{
            background: "linear-gradient(180deg,#F3EBE0 0%,#E4DACB 100%)",
            boxShadow: "inset 0 0 0 1px rgba(28,25,23,0.08)",
          }}
        >
          <div
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4"
            role="tablist"
            aria-label="Supported repair categories"
          >
            {repairServiceTypes.map((service) => {
              const on = active === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onMouseEnter={() => setActive(service.id)}
                  onFocus={() => setActive(service.id)}
                  onClick={() => setActive(service.id)}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-sm p-3 text-center transition-all focus-visible:outline-2 focus-visible:outline-offset-2",
                    on ? "bg-white/70" : "bg-transparent hover:bg-white/40",
                  )}
                  style={{ outlineColor: repairTokens.accent }}
                >
                  <div
                    className="flex h-[120px] w-full max-w-[140px] items-center justify-center transition-transform"
                    style={{
                      transform: on ? "scale(1.04)" : undefined,
                      filter: on
                        ? "drop-shadow(0 0 12px rgba(249,115,22,0.45))"
                        : undefined,
                    }}
                  >
                    <CategorySymbols id={service.id} active={on} />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      on ? "text-[#C2410C]" : "text-stone-800",
                    )}
                  >
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 min-h-[2.5rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              className="text-sm text-stone-600 md:text-base"
            >
              {current.body}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
