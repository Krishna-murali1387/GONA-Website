"use client";

import { useState } from "react";

import {
  fashionColors,
  fashionSizeScale,
  fashionSizes,
  fashionTokens,
} from "@/components/fashion/fashion.content";
import { OutfitStudioArt } from "@/components/fashion/fashion-visuals";
import { cn } from "@/lib/cn";

export function FashionLookBuilder() {
  const [selectedColour, setSelectedColour] = useState<
    (typeof fashionColors)[number]["id"]
  >("purple");
  const [selectedSize, setSelectedSize] =
    useState<(typeof fashionSizes)[number]>("M");

  const color =
    fashionColors.find((c) => c.id === selectedColour)?.hex ??
    fashionTokens.accent;
  const scale = fashionSizeScale[selectedSize];

  return (
    <section className="overflow-hidden bg-[#FFFCFA] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.22em] uppercase"
              style={{ color: fashionTokens.accent }}
            >
              Build the look
            </p>
            <h2 className="mt-3 font-display text-4xl text-[#0F0A1A] md:text-5xl">
              Choose the variant.
            </h2>
          </div>
          <p className="text-xs tracking-[0.18em] uppercase text-stone-400">
            Interactive product preview
          </p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Product preview — first on mobile, ~50% desktop */}
          <div className="relative order-1 mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className="relative aspect-[3/4] overflow-hidden bg-[#F3E8FF]"
              style={{
                transform: `scale(${scale})`,
                transition: "transform 250ms ease",
                transformOrigin: "center center",
              }}
            >
              <OutfitStudioArt color={color} className="h-full w-full" />
            </div>
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[#A855F7]/15 blur-3xl"
              aria-hidden="true"
            />
            <p className="mt-4 text-center text-sm text-[#2E1065]">
              Preview:{" "}
              <strong>
                {fashionColors.find((c) => c.id === selectedColour)?.label} ·{" "}
                {selectedSize}
              </strong>
            </p>
          </div>

          {/* Controls */}
          <div className="order-2 max-w-md">
            <p className="text-sm font-semibold tracking-[0.16em] uppercase text-stone-500">
              Colour
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {fashionColors.map((c) => {
                const on = selectedColour === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColour(c.id)}
                    onFocus={() => setSelectedColour(c.id)}
                    className={cn(
                      "group flex flex-col items-center gap-2 rounded-xl px-2 py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]",
                      on ? "bg-[#F3E8FF]" : "hover:bg-stone-50",
                    )}
                    aria-pressed={on}
                    aria-label={`Colour ${c.label}`}
                  >
                    <span
                      className={cn(
                        "h-11 w-11 rounded-full border-2 transition-all duration-200",
                        on
                          ? "border-[#A855F7] ring-2 ring-[#A855F7]/35 ring-offset-2"
                          : "border-black/15 group-hover:border-[#A855F7]/50",
                      )}
                      style={{ backgroundColor: c.hex }}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        on ? "text-[#2E1065]" : "text-stone-600",
                      )}
                    >
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-9 text-sm font-semibold tracking-[0.16em] uppercase text-stone-500">
              Size
            </p>
            <p className="mt-2 text-sm text-stone-500">
              Select a size to preview.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {fashionSizes.map((s) => {
                const on = selectedSize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    onFocus={() => setSelectedSize(s)}
                    className={cn(
                      "h-12 min-w-12 rounded-lg border px-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]",
                      on
                        ? "border-[#A855F7] bg-[#2E1065] text-white"
                        : "border-stone-200 bg-white text-stone-600 hover:border-[#C4B5FD]",
                    )}
                    aria-pressed={on}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-stone-500">
              GONA Fashion supports products with choices such as size and
              colour. Options shown here are a visual demo — not a live product.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
