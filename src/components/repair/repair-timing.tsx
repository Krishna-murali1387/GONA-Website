"use client";

import { useState } from "react";

import { repairTokens } from "@/components/repair/repair.content";
import { TimingEnvironment } from "@/components/repair/repair-visuals";
import { cn } from "@/lib/cn";

export function RepairTiming() {
  const [mode, setMode] = useState<"now" | "schedule">("now");

  return (
    <section id="repair-timing" className="bg-[#E7E5E4] py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="mb-8 max-w-xl">
          <h2 className="font-display text-3xl leading-tight text-[#1C1917] md:text-4xl lg:text-[3rem]">
            When do you need help?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-stone-700 md:text-lg">
            Request service now or choose a suitable time where scheduling is
            available.
          </p>
        </div>

        <div
          className="inline-flex rounded-full border-2 p-1"
          style={{ borderColor: repairTokens.charcoal, background: "#FAF8F5" }}
          role="group"
          aria-label="Service timing"
        >
          {(
            [
              { id: "now", label: "Service Now" },
              { id: "schedule", label: "Schedule" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              onFocus={() => setMode(item.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                mode === item.id
                  ? "bg-[#F97316] text-white"
                  : "bg-transparent text-stone-600",
              )}
              style={{ outlineColor: repairTokens.accent }}
              aria-pressed={mode === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.55fr_0.45fr] lg:gap-12">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[340px]">
            <TimingEnvironment
              mode={mode}
              className="h-full min-h-[280px] w-full md:min-h-[340px]"
            />
          </div>
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-stone-800 md:text-lg">
              {mode === "now"
                ? "Request service based on current local availability."
                : "Choose a suitable future time where scheduling is supported."}
            </p>
            <p className="mt-3 text-sm text-stone-500">
              Availability varies by location — not a guaranteed instant arrival.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
