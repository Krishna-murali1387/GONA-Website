"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  groceryTokens,
  groceryTrackingStages,
} from "@/components/grocery/grocery.content";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function GroceryTracking() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#FFFEF9] py-16 md:py-24">
      <Container className="max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: groceryTokens.leaf }}
          >
            Order tracking
          </p>
          <h2 className="font-display text-3xl text-gona-black md:text-4xl">
            Know where your order stands.
          </h2>
          <p className="mt-3 text-base text-gona-gray md:text-lg">
            Follow each stage in the GONA app — from confirmation to delivery.
          </p>
        </div>

        <div className="relative mt-12 rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-[0_20px_50px_rgba(17,17,17,0.05)] md:p-10">
          <ol className="relative grid gap-8 sm:grid-cols-5 sm:gap-2">
            <div
              className="pointer-events-none absolute top-5 right-[8%] left-[8%] hidden h-px bg-black/8 sm:block"
              aria-hidden="true"
            />
            {groceryTrackingStages.map((stage, index) => {
              const isLast = index === groceryTrackingStages.length - 1;
              return (
                <li key={stage} className="relative text-center">
                  <motion.div
                    className={cn(
                      "relative z-10 mx-auto flex size-11 items-center justify-center rounded-full border-2 font-display text-sm shadow-[0_8px_20px_rgba(34,197,94,0.12)]",
                    )}
                    style={{
                      borderColor: isLast ? groceryTokens.yellow : groceryTokens.green,
                      color: isLast ? groceryTokens.ink : groceryTokens.leaf,
                      backgroundColor: isLast ? groceryTokens.yellow : groceryTokens.soft,
                    }}
                    initial={reduce ? false : { scale: 0.88, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: index * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {index + 1}
                  </motion.div>
                  <p className="mt-3 text-sm font-medium leading-snug text-gona-black">
                    {stage}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="relative mt-10 h-2 overflow-hidden rounded-full bg-[#ECFDF3]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #22C55E 0%, #4ADE80 70%, #FFD400 100%)",
              }}
              initial={reduce ? { width: "100%" } : { width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: reduce ? 0 : 1.35, ease: "easeOut" }}
            />
          </div>
          <p className="mt-4 text-center text-xs text-gona-gray">
            Product demonstration of the in-app tracking experience.
          </p>
        </div>
      </Container>
    </section>
  );
}
