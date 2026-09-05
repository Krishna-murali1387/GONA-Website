"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

const PRINCIPLES = [
  {
    n: "01",
    title: "Built Local",
    body: "Designed around nearby communities.",
    emphasis: "hero" as const,
  },
  {
    n: "02",
    title: "Seven Services",
    body: "Everyday needs connected through one ecosystem.",
    emphasis: "mid" as const,
  },
  {
    n: "03",
    title: "Simple Experience",
    body: "Move between services without juggling multiple platforms.",
    emphasis: "mid" as const,
  },
  {
    n: "04",
    title: "Community Connected",
    body: "LOCAL keeps users closer to what is happening around them.",
    emphasis: "hero" as const,
  },
  {
    n: "05",
    title: "Secure by Design",
    body: "Built with responsible practices that prioritize user trust.",
    emphasis: "quiet" as const,
  },
];

/**
 * Editorial principles — composition redesign for W4.1.
 * Content unchanged; layout carries GONA identity after LOCAL.
 */
export function WhyGona() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      aria-labelledby="why-gona-heading"
      className="relative overflow-hidden bg-[#F8F6F1] py-16 md:py-20 lg:py-24"
    >
      {/* Soft exit from LOCAL dark */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#1A1410] via-[#3D342C]/55 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-gona-yellow/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-b from-transparent to-[#EDE8DC]"
        aria-hidden="true"
      />

      <Container className="relative pt-10 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.15fr] lg:gap-14 xl:gap-20">
          {/* Left statement */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-gona-gray uppercase">
              Principles
            </p>
            <h2
              id="why-gona-heading"
              className="font-display text-4xl leading-[1.05] text-gona-black md:text-5xl lg:text-[3.5rem]"
            >
              Why
              <span className="mt-1 block text-gona-black">GONA</span>
            </h2>
            <p className="mt-6 max-w-sm border-l-2 border-gona-yellow pl-4 text-base leading-relaxed text-gona-gray md:text-lg">
              A clearer local ecosystem — not more apps to manage.
            </p>

            {/* Vertical path accent */}
            <svg
              className="mt-10 hidden h-40 w-6 lg:block"
              viewBox="0 0 24 160"
              aria-hidden="true"
            >
              <motion.path
                d="M12 0 V160"
                fill="none"
                stroke="#FFD400"
                strokeWidth="3"
                strokeLinecap="round"
                initial={reducedMotion ? false : { pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              <circle cx="12" cy="8" r="4" fill="#FFD400" />
            </svg>
          </div>

          {/* Right asymmetric architecture */}
          <ul className="relative space-y-0">
            {PRINCIPLES.map((item, index) => (
              <motion.li
                key={item.title}
                className={cn(
                  "relative border-t border-gona-black/8 py-6 md:py-7",
                  index === PRINCIPLES.length - 1 && "border-b",
                  item.emphasis === "hero" && "md:pl-0",
                  item.emphasis === "mid" && "md:pl-8 lg:pl-14",
                  item.emphasis === "quiet" && "md:pl-4 lg:pl-8",
                )}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: reducedMotion ? 0 : 0.07 * index,
                }}
              >
                <div
                  className={cn(
                    "grid items-start gap-3 sm:grid-cols-[auto_1fr] sm:gap-5",
                    item.emphasis === "hero" && "sm:gap-6",
                  )}
                >
                  <span
                    className={cn(
                      "font-display tabular-nums text-gona-yellow",
                      item.emphasis === "hero"
                        ? "text-3xl md:text-4xl"
                        : "text-xl md:text-2xl",
                    )}
                  >
                    {item.n}
                  </span>
                  <div>
                    <h3
                      className={cn(
                        "font-display text-gona-black",
                        item.emphasis === "hero" &&
                          "text-2xl md:text-3xl lg:text-[2.1rem]",
                        item.emphasis === "mid" && "text-xl md:text-2xl",
                        item.emphasis === "quiet" && "text-lg md:text-xl",
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 leading-relaxed text-gona-gray",
                        item.emphasis === "hero"
                          ? "max-w-md text-base md:text-lg"
                          : "max-w-sm text-sm md:text-base",
                      )}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
                {/* Yellow marker tick */}
                <span
                  className="absolute top-6 -left-px h-8 w-0.5 bg-gona-yellow md:top-7"
                  aria-hidden="true"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function BenefitsPlaceholder() {
  return <WhyGona />;
}
