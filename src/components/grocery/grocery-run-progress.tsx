"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

import {
  groceryRunChapters,
  groceryTokens,
  type GroceryRunChapterId,
} from "@/components/grocery/grocery.content";
import { cn } from "@/lib/cn";

type GroceryRunProgressProps = {
  targetRef: RefObject<HTMLElement | null>;
};

/**
 * Subtle journey indicator for THE GROCERY RUN.
 * Desktop: thin right-edge rail. Mobile: compact top progress bar.
 */
export function GroceryRunProgress({ targetRef }: GroceryRunProgressProps) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<GroceryRunChapterId>("fresh");

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const root = targetRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-grocery-chapter]"),
    );
    if (!nodes.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-grocery-chapter");
          if (!id) continue;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }

        let bestId: GroceryRunChapterId | null = null;
        let bestRatio = 0;
        for (const chapter of groceryRunChapters) {
          const ratio = visible.get(chapter.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = chapter.id;
          }
        }
        if (bestId) {
          setActiveId((prev) => (prev === bestId ? prev : bestId));
        }
      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: "-18% 0px -28% 0px",
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [targetRef]);

  const activeIndex = groceryRunChapters.findIndex((c) => c.id === activeId);

  return (
    <>
      {/* Mobile — compact horizontal progress */}
      <div
        className="pointer-events-none fixed top-[4.25rem] right-0 left-0 z-30 px-5 lg:hidden"
        aria-hidden="true"
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-3">
          <p className="shrink-0 text-[0.65rem] font-semibold tracking-[0.18em] text-[#666666] uppercase">
            {groceryRunChapters[activeIndex]?.index}{" "}
            {groceryRunChapters[activeIndex]?.label}
          </p>
          <div className="relative h-px flex-1 bg-black/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#22C55E]"
              style={reduce ? { width: `${((activeIndex + 1) / groceryRunChapters.length) * 100}%` } : { width: fillWidth }}
            />
          </div>
        </div>
      </div>

      {/* Desktop — thin right-edge rail */}
      <aside
        className="pointer-events-none fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 lg:block xl:right-8"
        aria-hidden="true"
      >
        <div className="relative flex flex-col items-end gap-0">
          <div className="absolute top-2 right-[5px] bottom-2 w-px bg-black/10">
            <motion.div
              className="absolute top-0 left-0 w-full origin-top bg-[#22C55E]"
              style={
                reduce
                  ? {
                      height: `${((activeIndex + 1) / groceryRunChapters.length) * 100}%`,
                    }
                  : { height: fillHeight }
              }
            />
          </div>

          <ul className="relative space-y-5">
            {groceryRunChapters.map((chapter, index) => {
              const on = chapter.id === activeId;
              const past = index < activeIndex;
              return (
                <li key={chapter.id} className="flex items-center justify-end gap-3">
                  <span
                    className={cn(
                      "text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-opacity duration-300",
                      on ? "opacity-100" : "opacity-0",
                    )}
                    style={{ color: on ? groceryTokens.green : groceryTokens.muted }}
                  >
                    {chapter.label}
                  </span>
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      on
                        ? "size-2.5 bg-[#22C55E] shadow-[0_0_0_3px_rgba(34,197,94,0.22)]"
                        : past
                          ? "size-1.5 bg-[#22C55E]/70"
                          : "size-1.5 bg-black/20",
                    )}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
