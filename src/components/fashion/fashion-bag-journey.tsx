"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  fashionBagSteps,
  fashionTokens,
} from "@/components/fashion/fashion.content";
import { TagRibbonArt } from "@/components/fashion/fashion-visuals";

export function FashionBagJourney() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const active = reduce ? fashionBagSteps.length - 1 : step;

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setStep((prev) => (prev + 1) % fashionBagSteps.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="overflow-hidden bg-[#FFFCFA] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.22em] uppercase"
              style={{ color: fashionTokens.accent }}
            >
              Look to bag
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#0F0A1A] md:text-4xl">
              From look to bag.
            </h2>
          </div>
          <p className="max-w-md text-sm text-stone-500">
            Choose available variants, add items to your bag and continue
            through GONA checkout.
          </p>
        </div>

        <div className="mt-8 overflow-hidden">
          <TagRibbonArt
            label={fashionBagSteps[active]}
            className="h-auto w-full min-h-[4.5rem]"
          />
        </div>

        <ol className="mt-6 flex flex-wrap items-center gap-2">
          {fashionBagSteps.map((label, index) => (
            <li key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(index)}
                onFocus={() => setStep(index)}
                className={
                  index === active
                    ? "text-sm font-semibold text-[#2E1065]"
                    : "text-sm text-stone-400"
                }
                aria-current={index === active ? "step" : undefined}
              >
                {label}
              </button>
              {index < fashionBagSteps.length - 1 && (
                <span className="text-stone-300" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
