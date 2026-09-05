"use client";

import { useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  farmingFieldStages,
  farmingMedia,
  farmingTokens,
} from "@/components/farming/farming.content";
import { FarmingMediaImage } from "@/components/farming/farming-media";
import { FieldRows } from "@/components/farming/farming-visuals";
import { cn } from "@/lib/cn";

export function FarmingField() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const unsub = scrollYProgress.on("change", (v) => {
      const next = Math.min(
        farmingFieldStages.length - 1,
        Math.floor(v * farmingFieldStages.length),
      );
      setStage((prev) => (prev === next ? prev : next));
    });
    return unsub;
  }, [reduce, scrollYProgress]);

  const active = reduce ? farmingFieldStages.length - 1 : stage;

  return (
    <section
      id="farming-field"
      ref={ref}
      className="relative overflow-hidden bg-[#FAF6EE] py-24 md:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: farmingTokens.accent }}
        >
          The living field
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl text-[#1C1917] md:text-5xl">
          Every stage brings different needs.
        </h2>
        <p className="mt-3 max-w-lg text-base text-stone-600 md:text-lg">
          A visual story of how farming needs shift — not a promise that GONA
          causes crop growth.
        </p>

        <ol className="mt-8 flex flex-wrap gap-2">
          {farmingFieldStages.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setStage(index)}
                onFocus={() => setStage(index)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#65A30D]",
                  index === active
                    ? "border-[#65A30D] bg-[#ECFCCB] text-[#365314]"
                    : "border-stone-200 bg-white/70 text-stone-500",
                )}
                aria-pressed={index === active}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Living field environment + stage cues */}
      <div className="relative mx-auto mt-10 max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="relative min-h-[20rem] overflow-hidden md:min-h-[28rem] lg:min-h-[32rem]">
          <FarmingMediaImage
            src={farmingMedia.growth.src}
            objectPosition={farmingMedia.growth.objectPosition}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="scale-[1.02]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,238,0.15)_0%,rgba(250,246,238,0.05)_30%,rgba(54,83,20,0.25)_100%)]"
            aria-hidden="true"
          />
          {/* Stage SVG as supporting graphic — not the whole visual */}
          <div className="absolute inset-x-0 bottom-0 h-[42%] md:h-[48%]">
            <div className="h-full w-full bg-[linear-gradient(180deg,transparent,rgba(250,246,238,0.55)_35%,rgba(250,246,238,0.92)_100%)]">
              <FieldRows
                stage={active}
                labels
                className="h-full w-full opacity-95"
              />
            </div>
          </div>
        </div>
        <p className="mt-5 max-w-xl text-sm text-stone-600 md:text-base">
          <strong className="text-[#365314]">
            {farmingFieldStages[active].label}.
          </strong>{" "}
          {farmingFieldStages[active].body}
        </p>
      </div>
    </section>
  );
}
