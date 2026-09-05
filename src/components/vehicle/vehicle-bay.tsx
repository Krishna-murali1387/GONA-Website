"use client";

import { useState } from "react";

import { vehicleTokens } from "@/components/vehicle/vehicle.content";
import { InspectionBayArt } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const views = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "interior", label: "Interior" },
] as const;

export function VehicleBay() {
  const [view, setView] =
    useState<(typeof views)[number]["id"]>("front");

  return (
    <section className="bg-[#F8FAFC] py-24 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: vehicleTokens.accent }}
            >
              Vehicle confidence
            </p>
            <h2 className="font-display text-3xl text-slate-900 md:text-4xl lg:text-[3rem]">
              Know what you&apos;re booking.
            </h2>
            <p className="mt-3 max-w-md text-base text-slate-600 md:text-lg">
              See an approved vehicle and relevant vehicle photos before the
              trip — so you know what you&apos;re booking.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {views.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  onFocus={() => setView(item.id)}
                  onMouseEnter={() => setView(item.id)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    view === item.id
                      ? "border-[#6366F1] bg-[#EEF2FF] text-[#312E81]"
                      : "border-slate-200 bg-white text-slate-600",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#C7D2FE] bg-white shadow-[0_20px_48px_rgba(30,27,75,0.08)]">
            <div className="aspect-[960/520] min-h-[20rem] w-full md:min-h-[26rem] lg:min-h-[30rem]">
              <InspectionBayArt view={view} className="h-full w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
