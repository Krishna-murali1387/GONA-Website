"use client";

import { useState } from "react";

import { vehicleTokens } from "@/components/vehicle/vehicle.content";
import { JunctionWorld } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function VehicleSplit() {
  const [focus, setFocus] = useState<"passenger" | "goods" | "both">("both");

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-24 md:py-28">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 bg-[linear-gradient(180deg,#6366F1_0%,#C7D2FE_100%)] opacity-40"
        aria-hidden="true"
      />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: vehicleTokens.accent }}
          >
            Journey type
          </p>
          <h2 className="font-display text-3xl text-slate-900 md:text-4xl lg:text-[3rem]">
            One network. Different journeys.
          </h2>
          <p className="mt-3 text-base text-slate-600 md:text-lg">
            Choose passenger transport or goods and load movement — based on
            what you need to move.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {(
            [
              ["passenger", "Passenger"],
              ["goods", "Goods"],
              ["both", "Both"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFocus(id)}
              onFocus={() => setFocus(id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                focus === id
                  ? "border-[#6366F1] bg-[#EEF2FF] text-[#312E81]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#C7D2FE]",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </Container>

      {/* Dominant road world — ~70%+ of section presence */}
      <div className="relative mx-auto mt-10 w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div
          className="relative overflow-hidden rounded-[1.5rem]"
          onMouseLeave={() => setFocus("both")}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex md:inset-y-0 md:left-0 md:w-full">
            <button
              type="button"
              className="pointer-events-auto h-12 w-1/2 bg-transparent md:h-full"
              aria-label="Emphasize passenger route"
              onMouseEnter={() => setFocus("passenger")}
              onFocus={() => setFocus("passenger")}
            />
            <button
              type="button"
              className="pointer-events-auto h-12 w-1/2 bg-transparent md:h-full"
              aria-label="Emphasize goods route"
              onMouseEnter={() => setFocus("goods")}
              onFocus={() => setFocus("goods")}
            />
          </div>
          <div className="aspect-[1280/560] min-h-[20rem] w-full md:min-h-[28rem] lg:min-h-[32rem]">
            <JunctionWorld focus={focus} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
