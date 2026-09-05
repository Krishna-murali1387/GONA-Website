"use client";

import { useState } from "react";

import {
  fashionLookbook,
  fashionTokens,
} from "@/components/fashion/fashion.content";
import { FashionMediaImage } from "@/components/fashion/fashion-media";
import { cn } from "@/lib/cn";

export function FashionLookbook() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="fashion-lookbook"
      className="overflow-hidden bg-[#FFFCFA] py-10 md:py-14"
    >
      <div className="mx-auto mb-8 max-w-7xl px-5 sm:px-8 lg:px-10">
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase"
          style={{ color: fashionTokens.accent }}
        >
          What&apos;s your style?
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl text-[#0F0A1A] md:text-5xl">
          An interactive lookbook.
        </h2>
      </div>

      {/* Desktop expanding panels — dedicated image per category */}
      <div className="mx-auto hidden max-w-[1600px] gap-2 px-3 md:flex md:h-[70vh] md:min-h-[28rem] lg:px-6">
        {fashionLookbook.map((item, index) => {
          const on = index === active;
          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={cn(
                "group relative overflow-hidden transition-[flex-grow] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]",
                on ? "flex-[2.4]" : "flex-[0.7]",
              )}
              aria-pressed={on}
            >
              <FashionMediaImage
                src={item.media.src}
                objectPosition={item.media.objectPosition}
                alt={`${item.label} fashion look`}
                fill
                sizes="(max-width: 1024px) 40vw, 30vw"
                className={cn(
                  "transition-transform duration-700",
                  on ? "scale-105" : "scale-100",
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-colors duration-500",
                  on
                    ? "bg-[linear-gradient(180deg,transparent_35%,rgba(15,10,26,0.72)_100%)]"
                    : "bg-[linear-gradient(180deg,rgba(15,10,26,0.15),rgba(15,10,26,0.7))]",
                )}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white lg:p-6">
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className={cn(
                    "font-display transition-all duration-500",
                    on ? "mt-1 text-3xl lg:text-4xl" : "mt-1 text-lg",
                  )}
                >
                  {item.label}
                </p>
                <p
                  className={cn(
                    "mt-2 text-sm text-white/75 transition-opacity duration-500",
                    on ? "opacity-100" : "opacity-0",
                  )}
                >
                  {item.tone}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile stacked / horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto px-5 pb-2 md:hidden">
        {fashionLookbook.map((item, index) => {
          const on = index === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={cn(
                "relative h-[22rem] shrink-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A855F7]",
                on ? "w-[78vw]" : "w-[42vw]",
              )}
              aria-pressed={on}
            >
              <FashionMediaImage
                src={item.media.src}
                objectPosition={item.media.objectPosition}
                alt={`${item.label} fashion look`}
                fill
                sizes="80vw"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(15,10,26,0.75)_100%)]"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white">
                <p className="font-display text-2xl">{item.label}</p>
                <p className="mt-1 text-xs text-white/70">{item.tone}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
