"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  farmingJourneySteps,
  farmingMedia,
  farmingTokens,
} from "@/components/farming/farming.content";
import { FarmingMediaImage } from "@/components/farming/farming-media";
import { JourneyCrop } from "@/components/farming/farming-visuals";
import { cn } from "@/lib/cn";

export function FarmingCropJourney() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    const next = Math.min(
      farmingJourneySteps.length - 1,
      Math.floor(value * farmingJourneySteps.length),
    );
    setStep((prev) => (prev === next ? prev : next));
  });

  const active = reduce ? farmingJourneySteps.length - 1 : step;
  const cropStage = Math.min(3, active + 1);

  return (
    <section className="bg-[#FFFCF5]">
      {/* Mobile sequential */}
      <div className="py-24 lg:hidden">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <Header />
          <div className="relative mt-8 min-h-[14rem] overflow-hidden md:min-h-[18rem]">
            <FarmingMediaImage
              src={farmingMedia.guidance.src}
              objectPosition={farmingMedia.guidance.objectPosition}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,245,0.2),rgba(54,83,20,0.35))]"
              aria-hidden="true"
            />
          </div>
          <ol className="mt-10 space-y-10">
            {farmingJourneySteps.map((item, index) => (
              <li key={item.id}>
                <p
                  className="text-xs font-semibold tracking-[0.18em] uppercase"
                  style={{ color: farmingTokens.accent }}
                >
                  {item.concept}
                </p>
                <h3 className="mt-2 font-display text-2xl text-[#1C1917]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600">{item.body}</p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#D9F99D]/80">
                  <div className="aspect-[480/420] max-h-[18rem] w-full">
                    <JourneyCrop
                      stage={Math.min(3, index + 1)}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Desktop sticky organic journey — guidance photo as environment */}
      <div ref={pinRef} className="relative hidden lg:block">
        <div className="h-[220vh]">
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center">
            <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[0.9fr_1.1fr] items-center gap-10 px-10 xl:gap-12 xl:px-14">
              <div>
                <Header />
                <ol className="mt-8 space-y-2">
                  {farmingJourneySteps.map((item, index) => {
                    const on = index === active;
                    return (
                      <li key={item.id}>
                        <div
                          className={cn(
                            "rounded-2xl border px-4 py-3 transition-colors",
                            on
                              ? "border-[#65A30D] bg-[#ECFCCB]/70"
                              : "border-transparent",
                          )}
                        >
                          <p
                            className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                            style={{
                              color: on ? farmingTokens.accent : "#A8A29E",
                            }}
                          >
                            {item.concept}
                          </p>
                          <h3
                            className={cn(
                              "mt-1 font-display text-xl",
                              on ? "text-[#1C1917]" : "text-stone-400",
                            )}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={cn(
                              "mt-1 text-sm text-stone-600 transition-opacity",
                              on ? "opacity-100" : "opacity-0",
                            )}
                          >
                            {on ? item.body : "\u00A0"}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="relative min-h-[28rem] overflow-hidden rounded-[1.5rem] border border-[#D9F99D] shadow-[0_24px_60px_rgba(54,83,20,0.12)] xl:min-h-[32rem]">
                <FarmingMediaImage
                  src={farmingMedia.guidance.src}
                  objectPosition={farmingMedia.guidance.objectPosition}
                  alt=""
                  fill
                  sizes="50vw"
                  className="opacity-90"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,252,245,0.55)_0%,rgba(255,252,245,0.2)_40%,rgba(54,83,20,0.35)_100%)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-[8%] bottom-[4%] top-[28%] overflow-hidden rounded-xl border border-white/40 bg-[#FFFCF5]/75 shadow-lg backdrop-blur-[2px]">
                  <JourneyCrop stage={cropStage} className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div>
      <p
        className="text-xs font-semibold tracking-[0.2em] uppercase"
        style={{ color: farmingTokens.accent }}
      >
        Crop journey
      </p>
      <h2 className="mt-3 font-display text-3xl text-[#1C1917] md:text-4xl lg:text-[2.75rem]">
        Your crop changes.
        <span className="mt-1 block text-[#3F6212]">Your needs change.</span>
      </h2>
    </div>
  );
}
