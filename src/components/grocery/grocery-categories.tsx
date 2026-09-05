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
  groceryAisleCategories,
  groceryMedia,
  groceryTokens,
} from "@/components/grocery/grocery.content";
import { GroceryMediaImage } from "@/components/grocery/grocery-media";
import { cn } from "@/lib/cn";

/** 02 — The Fresh Aisle · sticky editorial category storytelling */
export function GroceryCategories() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  const count = groceryAisleCategories.length;

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
    reduce ? [1, 1] : [1.02, 1.08],
  );
  const imageX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "-2.5%"],
  );
  const stage = reduce ? 0 : active;
  const current = groceryAisleCategories[stage] ?? groceryAisleCategories[0];

  return (
    <section
      id="grocery-aisle"
      ref={ref}
      data-grocery-chapter="aisle"
      className="relative scroll-mt-24 bg-[#0B1F14] text-white"
    >
      {/* Mobile — stacked, no sticky trap */}
      <div className="relative overflow-hidden py-14 lg:hidden">
        <div className="absolute inset-0">
          <GroceryMediaImage
            src={groceryMedia.categories.src}
            objectPosition={groceryMedia.categories.objectPositionMobile}
            objectPositionMobile={groceryMedia.categories.objectPositionMobile}
            alt=""
            fill
            sizes="100vw"
            className="opacity-70"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,46,22,0.55)_0%,rgba(5,46,22,0.72)_100%)]"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 px-5">
          <p
            className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
            style={{ color: groceryTokens.yellow }}
          >
            02 / Aisle
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight">
            The Fresh Aisle
          </h2>
          <ul className="mt-8 space-y-5 border-t border-white/15 pt-6">
            {groceryAisleCategories.map((cat, index) => (
              <li key={cat.id} className="flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl">{cat.label}</span>
                <span
                  className="text-[0.7rem] font-semibold tracking-[0.18em]"
                  style={{ color: groceryTokens.green }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-sm text-sm text-white/70">
            Everything you need. Without the supermarket maze.
          </p>
        </div>
      </div>

      {/* Desktop — sticky visual chapter */}
      <div className="relative hidden lg:block">
        <div className="h-[190vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <motion.div className="absolute inset-0" style={{ scale: imageScale, x: imageX }}>
              <GroceryMediaImage
                src={groceryMedia.categories.src}
                objectPosition={groceryMedia.categories.objectPosition}
                objectPositionMobile={groceryMedia.categories.objectPositionMobile}
                alt="GONA grocery aisle categories"
                fill
                sizes="100vw"
              />
            </motion.div>
            <div
              className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,46,22,0.78)_0%,rgba(5,46,22,0.28)_42%,rgba(5,46,22,0.45)_100%)]"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-[0.9fr_1.1fr] items-end gap-10 px-8 pb-16 lg:px-14 xl:items-center xl:pb-0">
              <div>
                <p
                  className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: groceryTokens.yellow }}
                >
                  02 / Aisle
                </p>
                <div className="mt-8 min-h-[9.5rem]">
                  <p
                    className="text-[0.75rem] font-semibold tracking-[0.22em]"
                    style={{ color: groceryTokens.green }}
                  >
                    {String(stage + 1).padStart(2, "0")}
                  </p>
                  <h2
                    key={current.id}
                    className="mt-2 font-display text-5xl leading-[1.02] xl:text-6xl"
                  >
                    {current.label}
                  </h2>
                </div>
                <p className="mt-10 max-w-sm text-sm text-white/65">
                  Everything you need. Without the supermarket maze.
                </p>
              </div>

              <ul className="justify-self-end space-y-3 text-right">
                {groceryAisleCategories.map((cat, index) => {
                  const on = index === stage;
                  return (
                    <li key={cat.id}>
                      <span
                        className={cn(
                          "font-display text-lg tracking-[0.04em] transition-all duration-300 xl:text-xl",
                          on ? "text-white" : "text-white/28",
                        )}
                      >
                        {cat.short}
                      </span>
                      {on ? (
                        <span
                          className="ml-3 inline-block size-1.5 rounded-full align-middle"
                          style={{ backgroundColor: groceryTokens.green }}
                          aria-hidden="true"
                        />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
