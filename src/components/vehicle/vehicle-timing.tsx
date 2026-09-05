"use client";

import { useState } from "react";

import { vehicleTokens } from "@/components/vehicle/vehicle.content";
import { TimingRoad } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function VehicleTiming() {
  const [mode, setMode] = useState<"now" | "schedule">("now");

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: vehicleTokens.accent }}
          >
            Timing
          </p>
          <h2 className="font-display text-3xl text-slate-900 md:text-4xl">
            Go now. Or plan ahead.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Choose immediate availability or schedule an eligible journey for
            later.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {(
            [
              ["now", "Service Now"],
              ["schedule", "Schedule"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              onFocus={() => setMode(id)}
              onMouseEnter={() => setMode(id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                mode === id
                  ? "border-[#6366F1] bg-[#EEF2FF] text-[#312E81]"
                  : "border-slate-200 bg-white text-slate-600",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC]">
          <div className="aspect-[11/3] min-h-[12rem] w-full md:min-h-[14rem]">
            <TimingRoad mode={mode} className="h-full w-full" />
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          For scheduled bookings, advance payment may apply where shown in the
          app.
        </p>
      </Container>
    </section>
  );
}
