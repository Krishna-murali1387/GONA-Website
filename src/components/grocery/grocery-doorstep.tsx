"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { groceryMedia, groceryTokens } from "@/components/grocery/grocery.content";
import { GroceryMediaImage } from "@/components/grocery/grocery-media";

/** 06 — To your door · expanding cinematic release */
export function GroceryDoorstep() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const frameWidth = useTransform(
    scrollYProgress,
    [0.05, 0.55],
    reduce ? ["100%", "100%"] : ["72%", "100%"],
  );
  const frameRadius = useTransform(
    scrollYProgress,
    [0.05, 0.55],
    reduce ? ["0px", "0px"] : ["1.5rem", "0px"],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.7],
    reduce ? [1, 1] : [1.08, 1],
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.45],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={ref}
      data-grocery-chapter="door"
      className="relative bg-[#F7F8F5]"
    >
      {/* Mobile */}
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: groceryTokens.leaf }}
        >
          06 / Doorstep
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          From selection
          <span className="mt-1 block">to your doorstep.</span>
        </h2>
        <p className="mt-3 max-w-sm text-sm text-[#666666]">
          Your order moves through GONA from preparation to local delivery.
        </p>
        <div className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[1.25rem]">
          <GroceryMediaImage
            src={groceryMedia.doorstep.src}
            objectPosition={groceryMedia.doorstep.objectPositionMobile}
            objectPositionMobile={groceryMedia.doorstep.objectPositionMobile}
            alt="Grocery delivery arriving at the doorstep"
            fill
            sizes="100vw"
          />
        </div>
      </div>

      {/* Desktop expanding reveal */}
      <div className="relative hidden lg:block">
        <div className="h-[180vh]">
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
            <div className="flex flex-1 items-center justify-center px-0">
              <motion.div
                className="relative h-[78vh] overflow-hidden"
                style={{
                  width: frameWidth,
                  borderRadius: frameRadius,
                }}
              >
                <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
                  <GroceryMediaImage
                    src={groceryMedia.doorstep.src}
                    objectPosition={groceryMedia.doorstep.objectPosition}
                    objectPositionMobile={groceryMedia.doorstep.objectPositionMobile}
                    alt="Grocery delivery arriving at the doorstep"
                    fill
                    sizes="100vw"
                  />
                </motion.div>
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,46,22,0.15)_0%,transparent_35%,rgba(5,46,22,0.55)_100%)]"
                  aria-hidden="true"
                />

                <motion.div
                  className="absolute inset-x-0 bottom-0 p-10 xl:p-14"
                  style={{ opacity: copyOpacity }}
                >
                  <p
                    className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                    style={{ color: groceryTokens.yellow }}
                  >
                    06 / Doorstep
                  </p>
                  <h2 className="mt-3 max-w-xl font-display text-4xl text-white xl:text-5xl">
                    From selection
                    <span className="mt-1 block">to your doorstep.</span>
                  </h2>
                  <p className="mt-3 max-w-md text-sm text-white/75">
                    Your order moves through GONA from preparation to local
                    delivery.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
