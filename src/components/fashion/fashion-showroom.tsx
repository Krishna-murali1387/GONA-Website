"use client";

import { useState } from "react";

import {
  fashionShowrooms,
  fashionTokens,
} from "@/components/fashion/fashion.content";
import { FashionMediaImage } from "@/components/fashion/fashion-media";
import { cn } from "@/lib/cn";

export function FashionShowroom() {
  const [active, setActive] = useState(1);

  return (
    <section className="relative overflow-hidden bg-[#F3E8FF] py-16 md:py-24">
      <div
        className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-[#A855F7]/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.22em] uppercase"
              style={{ color: fashionTokens.accent }}
            >
              Local showroom
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#0F0A1A] md:text-5xl">
              Fashion around you.
            </h2>
            <p className="mt-4 max-w-md text-base text-stone-600">
              Discover fashion from participating stores available around your
              location.
            </p>

            <ul className="mt-8 space-y-2">
              {fashionShowrooms.map((look, index) => {
                const on = index === active;
                return (
                  <li key={look.id}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      className={cn(
                        "flex w-full items-baseline justify-between border-b px-1 py-3 text-left transition-colors",
                        on
                          ? "border-[#A855F7] text-[#2E1065]"
                          : "border-stone-300 text-stone-500",
                      )}
                      aria-pressed={on}
                    >
                      <span className="font-display text-xl">{look.code}</span>
                      <span className="text-sm tracking-wide uppercase">
                        {look.mood}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Spatial showroom windows — LOOK 01 / 02 / 03 slots */}
          <div className="relative mx-auto h-[22rem] w-full max-w-xl md:h-[28rem]">
            {fashionShowrooms.map((look, index) => {
              const on = index === active;
              const offsets = [
                "left-0 top-8 z-10 w-[58%] rotate-[-4deg]",
                "left-[20%] top-0 z-20 w-[64%]",
                "right-0 top-12 z-10 w-[56%] rotate-[5deg]",
              ];
              return (
                <button
                  key={look.id}
                  type="button"
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={cn(
                    "absolute overflow-hidden border border-white/60 shadow-[0_24px_60px_rgba(46,16,101,0.22)] transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]",
                    offsets[index],
                    on
                      ? "scale-105 brightness-100"
                      : "scale-95 brightness-90 opacity-80",
                  )}
                  aria-label={`${look.code} ${look.mood}`}
                  aria-pressed={on}
                >
                  <div className="relative aspect-[3/4] w-full">
                    <FashionMediaImage
                      src={look.media.src}
                      objectPosition={look.media.objectPosition}
                      alt=""
                      fill
                      sizes="320px"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 transition-colors",
                        on ? "bg-[#A855F7]/10" : "bg-[#2E1065]/25",
                      )}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-[#0F0A1A]/70 px-3 py-2 text-left text-white">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/70">
                        {look.code}
                      </p>
                      <p className="font-display text-lg">{look.mood}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-8 text-sm text-stone-500">
          {fashionShowrooms[active].body}
        </p>
      </div>
    </section>
  );
}
