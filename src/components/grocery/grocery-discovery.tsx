"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import {
  groceryDemoProducts,
  groceryTokens,
} from "@/components/grocery/grocery.content";
import { ProductVisual } from "@/components/grocery/grocery-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function GroceryDiscovery() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#F7F3EB] py-16 md:py-24">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-md">
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: groceryTokens.leaf }}
            >
              Product discovery
            </p>
            <h2 className="font-display text-3xl text-gona-black md:text-4xl">
              Everything you&apos;re looking for.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gona-gray md:text-lg">
              Browse categories, search products and check real inventory-backed
              availability before you order.
            </p>
            <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {["Browse", "Search", "Choose", "Add"].map((step, i) => (
                <li
                  key={step}
                  className="rounded-2xl border border-black/6 bg-white/70 px-4 py-3"
                >
                  <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-gona-gray uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-display text-lg text-gona-black">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <div className="flex items-end justify-center gap-3 sm:gap-5">
              {groceryDemoProducts.map((product, index) => {
                const isCenter = index === 1;
                const isHovered = hovered === product.id;
                const dim = hovered && !isHovered;

                return (
                  <motion.div
                    key={product.id}
                    className={cn(
                      "relative w-[31%] max-w-[12rem] rounded-[1.5rem] border border-black/6 bg-white p-3 shadow-[0_18px_40px_rgba(17,17,17,0.08)] sm:p-4",
                      isCenter && "z-10",
                    )}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setHovered(product.id)}
                    onHoverEnd={() => setHovered(null)}
                    animate={
                      reduce
                        ? undefined
                        : {
                            y: isCenter ? -14 : 0,
                            scale: isHovered ? 1.035 : dim ? 0.95 : isCenter ? 1.04 : 1,
                            x: isCenter ? 0 : index === 0 ? -4 : 4,
                            transition: { duration: 0.22 },
                          }
                    }
                    style={{
                      opacity: dim ? 0.72 : 1,
                      filter: dim ? "saturate(0.85)" : "none",
                      transition: "opacity 0.22s ease, filter 0.22s ease",
                    }}
                  >
                    <ProductVisual
                      kind={product.kind}
                      className="mb-3 aspect-[4/5]"
                    />
                    <p className="font-display text-sm text-gona-black sm:text-base">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gona-gray sm:text-xs">
                      {product.unit}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-gona-black">
                        {product.price}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                        style={{
                          backgroundColor: groceryTokens.soft,
                          color: groceryTokens.leaf,
                        }}
                      >
                        {product.meta}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "mt-3 overflow-hidden transition-all duration-200",
                        isHovered ? "max-h-10 opacity-100" : "max-h-0 opacity-0",
                      )}
                      aria-hidden="true"
                    >
                      <span
                        className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: groceryTokens.green }}
                      >
                        + Add
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-6 text-center text-xs text-gona-gray">
              Demonstration only — ordering happens in the GONA app.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
