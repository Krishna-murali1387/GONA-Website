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
  groceryDiscoveryConcepts,
  groceryMedia,
  groceryTokens,
} from "@/components/grocery/grocery.content";
import { GroceryMediaImage } from "@/components/grocery/grocery-media";
import { cn } from "@/lib/cn";

/**
 * 03 — Find what you need
 * Editorial discovery — no HTML phone UI over the photo’s embedded phone.
 */
export function GroceryDiscovery() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  const count = groceryDiscoveryConcepts.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(count - 1);
      return;
    }
    const next = Math.min(count - 1, Math.floor(v * count));
    setActive((prev) => (prev === next ? prev : next));
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [12, -18],
  );
  const lineScale = useTransform(
    scrollYProgress,
    [0.72, 0.95],
    reduce ? [1, 1] : [0, 1],
  );

  const stage = reduce ? count - 1 : active;
  const current = groceryDiscoveryConcepts[stage] ?? groceryDiscoveryConcepts[0];

  return (
    <section
      id="grocery-find"
      ref={ref}
      data-grocery-chapter="find"
      className="relative scroll-mt-24 bg-[#F7F8F5]"
    >
      {/* Mobile */}
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: groceryTokens.leaf }}
        >
          03 / Find
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Find what you need.
        </h2>
        <div className="relative mt-6 aspect-[4/5] overflow-hidden rounded-[1.25rem]">
          <GroceryMediaImage
            src={groceryMedia.discovery.src}
            objectPosition={groceryMedia.discovery.objectPositionMobile}
            objectPositionMobile={groceryMedia.discovery.objectPositionMobile}
            alt="Customer browsing groceries with the GONA app"
            fill
            sizes="100vw"
          />
        </div>
        <ul className="mt-8 space-y-6">
          {groceryDiscoveryConcepts.map((concept, index) => (
            <li key={concept.id} className="border-t border-black/8 pt-4">
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#666666] uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 font-display text-2xl text-gona-black">
                {concept.title}
              </p>
              <p className="mt-1 text-sm text-[#666666]">{concept.body}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop sticky */}
      <div className="relative hidden lg:block">
        <div className="h-[170vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[0.95fr_1.05fr] items-center gap-12 px-8 lg:px-14">
              <div className="max-w-md">
                <p
                  className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: groceryTokens.leaf }}
                >
                  03 / Find
                </p>
                <h2 className="mt-4 font-display text-4xl text-gona-black xl:text-5xl">
                  Find what you need.
                </h2>

                <div className="mt-12 min-h-[8.5rem]">
                  <p
                    key={current.id}
                    className="font-display text-5xl tracking-[0.02em] text-gona-black xl:text-6xl"
                  >
                    {current.title}
                  </p>
                  <p className="mt-3 text-base text-[#666666]">{current.body}</p>
                </div>

                <ul className="mt-10 space-y-3">
                  {groceryDiscoveryConcepts.map((concept, index) => {
                    const on = index === stage;
                    return (
                      <li key={concept.id} className="flex items-center gap-3">
                        <span
                          className={cn(
                            "h-px transition-all duration-300",
                            on ? "w-10 bg-[#22C55E]" : "w-4 bg-black/15",
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "text-xs font-semibold tracking-[0.18em] uppercase transition-colors duration-300",
                            on ? "text-gona-black" : "text-black/30",
                          )}
                        >
                          {concept.title}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <motion.div
                  className="mt-10 h-px origin-left bg-[#22C55E]"
                  style={{ scaleX: lineScale }}
                  aria-hidden="true"
                />
              </div>

              <motion.div
                className="relative h-[70vh] max-h-[38rem] overflow-hidden rounded-[1.5rem]"
                style={{ y: imageY }}
              >
                <GroceryMediaImage
                  src={groceryMedia.discovery.src}
                  objectPosition={groceryMedia.discovery.objectPosition}
                  objectPositionMobile={groceryMedia.discovery.objectPositionMobile}
                  alt="Customer browsing groceries with the GONA app"
                  fill
                  sizes="(max-width: 1280px) 50vw, 640px"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
