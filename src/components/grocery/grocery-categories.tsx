"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import {
  groceryCategories,
  groceryTokens,
} from "@/components/grocery/grocery.content";
import { CategoryObject } from "@/components/grocery/grocery-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const DESKTOP_LAYOUT: Record<
  (typeof groceryCategories)[number]["id"],
  string
> = {
  produce: "lg:left-[4%] lg:top-[10%] lg:w-[150px]",
  dairy: "lg:left-[34%] lg:top-[0%] lg:w-[130px]",
  staples: "lg:right-[6%] lg:top-[8%] lg:w-[140px]",
  snacks: "lg:left-[10%] lg:bottom-[6%] lg:w-[135px]",
  household: "lg:left-[40%] lg:bottom-[0%] lg:w-[140px]",
  personal: "lg:right-[8%] lg:bottom-[12%] lg:w-[130px]",
};

export function GroceryCategories() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="grocery-categories"
      className="relative scroll-mt-24 overflow-hidden bg-gona-white py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: groceryTokens.leaf }}
          >
            Categories
          </p>
          <h2 className="font-display text-3xl text-gona-black md:text-4xl">
            Find what you need.
          </h2>
          <p className="mt-3 text-base text-gona-gray md:text-lg">
            From everyday essentials to your weekly basket.
          </p>
          <p className="mt-2 text-sm text-gona-gray/80">
            Illustrative storytelling — live categories are managed in the GONA
            app.
          </p>
        </div>

        <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          {groceryCategories.map((cat) => (
            <li
              key={cat.id}
              className="w-[68%] max-w-[220px] shrink-0 snap-center sm:w-[42%]"
            >
              <CategoryObjectCard
                id={cat.id}
                label={cat.label}
                interactive={false}
                dimmed={false}
              />
            </li>
          ))}
        </ul>

        <div className="relative mx-auto mt-14 hidden h-[32rem] max-w-5xl lg:block xl:h-[34rem]">
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${groceryTokens.soft} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
          {groceryCategories.map((cat, index) => {
            const isActive = active === cat.id;
            const dimmed = Boolean(active && !isActive);
            return (
              <motion.div
                key={cat.id}
                className={cn("absolute", DESKTOP_LAYOUT[cat.id])}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setActive(cat.id)}
                onHoverEnd={() => setActive(null)}
                animate={
                  reduce
                    ? { scale: dimmed ? 0.94 : isActive ? 1.06 : 1, opacity: dimmed ? 0.45 : 1 }
                    : {
                        y: [0, index % 2 === 0 ? -7 : 6, 0],
                        scale: dimmed ? 0.94 : isActive ? 1.07 : 1,
                        opacity: dimmed ? 0.45 : 1,
                        transition: {
                          y: {
                            duration: 6.5 + index * 0.45,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.25,
                          },
                          scale: { duration: 0.22 },
                          opacity: { duration: 0.22 },
                        },
                      }
                }
                style={{ zIndex: isActive ? 20 : 10 }}
              >
                <CategoryObjectCard
                  id={cat.id}
                  label={cat.label}
                  interactive
                  dimmed={dimmed}
                  emphasized={isActive}
                />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function CategoryObjectCard({
  id,
  label,
  interactive,
  dimmed,
  emphasized = false,
}: {
  id: (typeof groceryCategories)[number]["id"];
  label: string;
  interactive: boolean;
  dimmed: boolean;
  emphasized?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center transition-[filter] duration-200",
        interactive && !dimmed && "cursor-default",
        emphasized && "drop-shadow-[0_22px_40px_rgba(17,17,17,0.14)]",
      )}
    >
      <div
        className={cn(
          "relative flex size-[7.5rem] items-center justify-center rounded-[2rem] bg-[#FFFEF9]/80 shadow-[0_16px_36px_rgba(17,17,17,0.08)] ring-1 ring-black/5 backdrop-blur-[1px] transition-shadow duration-200 sm:size-32",
          emphasized && "shadow-[0_24px_50px_rgba(17,17,17,0.14)] ring-[#22C55E]/25",
        )}
        aria-hidden="true"
      >
        <CategoryObject id={id} className="h-[72%] w-[72%]" />
      </div>
      <p
        className={cn(
          "mt-3 max-w-[9.5rem] font-display text-base text-gona-black transition-opacity duration-200",
          dimmed && "opacity-60",
          emphasized && "opacity-100",
        )}
      >
        {label}
      </p>
    </div>
  );
}
