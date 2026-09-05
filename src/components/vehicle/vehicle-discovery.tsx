"use client";

import { useState } from "react";

import {
  vehicleDiscoveryItems,
  vehicleTokens,
} from "@/components/vehicle/vehicle.content";
import { DiscoveryRadar } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function VehicleDiscovery() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem =
    vehicleDiscoveryItems.find((item) => item.id === active) ?? null;

  return (
    <section className="relative overflow-hidden bg-[#EEF2FF] py-24 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: vehicleTokens.accent }}
            >
              Nearby discovery
            </p>
            <h2 className="font-display text-3xl text-slate-900 md:text-4xl lg:text-[3rem]">
              Vehicles around your location.
            </h2>
            <p className="mt-3 max-w-md text-base text-slate-600 md:text-lg">
              Discover passenger and goods options near you — without a map
              cluttered with live tracking claims.
            </p>

            <ul className="mt-8 space-y-2">
              {vehicleDiscoveryItems.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(item.id)}
                      onFocus={() => setActive(item.id)}
                      onMouseLeave={() => setActive(null)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all",
                        on
                          ? "border-[#6366F1] bg-white shadow-[0_12px_30px_rgba(99,102,241,0.16)]"
                          : "border-transparent bg-white/50 hover:border-[#C7D2FE]",
                      )}
                    >
                      <span>
                        <span className="block font-display text-lg text-slate-900">
                          {item.label}
                        </span>
                        <span className="text-sm text-slate-500">
                          {item.kind}
                        </span>
                      </span>
                      <span
                        className="text-xs font-semibold tracking-wide uppercase"
                        style={{ color: vehicleTokens.accent }}
                      >
                        {item.note}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {activeItem && (
              <p className="mt-4 rounded-xl border border-[#C7D2FE] bg-white px-4 py-3 text-sm text-slate-600">
                <strong className="text-slate-900">{activeItem.label}</strong> ·{" "}
                {activeItem.kind} · {activeItem.note}
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#C7D2FE] bg-[#EEF2FF] shadow-[0_24px_50px_rgba(49,46,129,0.12)]">
            <div className="aspect-[1080/600] min-h-[22rem] w-full md:min-h-[28rem] lg:min-h-[32rem]">
              <DiscoveryRadar activeId={active} className="h-full w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
