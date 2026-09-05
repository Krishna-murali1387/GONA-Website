"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  groceryFulfilmentStages,
  groceryMedia,
  groceryTokens,
} from "@/components/grocery/grocery.content";
import { GroceryMediaImage } from "@/components/grocery/grocery-media";

/** 05 — Prepared locally · cinematic sticky process (illustrative) */
export function GroceryFulfilment() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  const count = groceryFulfilmentStages.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(0);
      return;
    }
    const next = Math.min(count - 1, Math.floor(v * count));
    setActive((prev) => (prev === next ? prev : next));
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 1.05],
  );

  const stage = reduce ? 0 : active;
  const current = groceryFulfilmentStages[stage] ?? groceryFulfilmentStages[0];

  return (
    <section
      ref={ref}
      data-grocery-chapter="prepare"
      className="relative bg-[#052E16] text-white"
    >
      {/* Mobile */}
      <div className="relative overflow-hidden py-14 lg:hidden">
        <div className="absolute inset-0">
          <GroceryMediaImage
            src={groceryMedia.fulfilment.src}
            objectPosition={groceryMedia.fulfilment.objectPositionMobile}
            objectPositionMobile={groceryMedia.fulfilment.objectPositionMobile}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,46,22,0.55),rgba(5,46,22,0.82))]"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 px-5">
          <p
            className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
            style={{ color: groceryTokens.yellow }}
          >
            05 / Prepare
          </p>
          <h2 className="mt-4 font-display text-3xl">Prepared locally.</h2>
          <ol className="mt-10 space-y-8">
            {groceryFulfilmentStages.map((item, index) => (
              <li key={item.id}>
                <span
                  className="inline-block size-1.5 rounded-full"
                  style={{ backgroundColor: groceryTokens.green }}
                  aria-hidden="true"
                />
                <p className="mt-3 font-display text-2xl tracking-[0.04em]">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-white/65">{item.support}</p>
                <p className="mt-2 text-[0.65rem] tracking-[0.16em] text-white/40 uppercase">
                  Stage {String(index + 1).padStart(2, "0")}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-xs text-white/50">
            Storytelling stages — not a live order feed.
          </p>
        </div>
      </div>

      {/* Desktop sticky */}
      <div className="relative hidden lg:block">
        <div className="h-[200vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
              <GroceryMediaImage
                src={groceryMedia.fulfilment.src}
                objectPosition={groceryMedia.fulfilment.objectPosition}
                objectPositionMobile={groceryMedia.fulfilment.objectPositionMobile}
                alt="Local grocery preparation and packing"
                fill
                sizes="100vw"
              />
            </motion.div>
            <div
              className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,46,22,0.72)_0%,rgba(5,46,22,0.28)_48%,rgba(5,46,22,0.55)_100%)]"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-8 lg:px-14">
              <p
                className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                style={{ color: groceryTokens.yellow }}
              >
                05 / Prepare
              </p>

              <div className="mt-14 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: groceryTokens.green }}
                    aria-hidden="true"
                  />
                  <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-[#86EFAC] uppercase">
                    Stage {String(stage + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2
                  key={current.id}
                  className="mt-4 font-display text-5xl leading-[1.05] tracking-[0.02em] xl:text-6xl"
                >
                  {current.label}
                </h2>
                <p className="mt-4 max-w-md text-base text-white/70">
                  {current.support}
                </p>
              </div>

              <ul className="mt-16 flex gap-8" aria-hidden="true">
                {groceryFulfilmentStages.map((item, index) => (
                  <li
                    key={item.id}
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase transition-opacity duration-300"
                    style={{
                      color:
                        index === stage
                          ? groceryTokens.green
                          : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {item.id}
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-xs text-white/45">
                Illustrative fulfilment — not live order status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
