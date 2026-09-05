"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const STEPS = [
  {
    n: "01",
    title: "Choose Your Location",
    body: "GONA understands what is available around your area.",
  },
  {
    n: "02",
    title: "Choose What You Need",
    body: "Explore GONA's seven connected services.",
  },
  {
    n: "03",
    title: "Get Connected",
    body: "Access the relevant local service experience through GONA.",
  },
] as const;

export function HowItWorks() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="how-gona-works-heading"
      className="relative overflow-hidden bg-[#F7F5F0] py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gona-white to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#EFE8DC] to-[#E8DFD0]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mb-10 max-w-xl md:mb-14">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gona-gray uppercase">
            Simple path
          </p>
          <h2
            id="how-gona-works-heading"
            className="font-display text-4xl text-gona-black md:text-5xl"
          >
            How GONA Works
          </h2>
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute top-[2.6rem] right-[6%] left-[6%] hidden h-10 md:block"
            viewBox="0 0 900 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M30 20 H870"
              fill="none"
              stroke="#FFD400"
              strokeWidth="3"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.25 }}
              animate={inView ? { pathLength: 1, opacity: 0.95 } : undefined}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            {/* Direction ticks */}
            {[300, 600].map((x) => (
              <motion.polygon
                key={x}
                points={`${x - 6},14 ${x + 8},20 ${x - 6},26`}
                fill="#FFD400"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.7 }}
              />
            ))}
          </svg>

          <ol className="grid gap-10 md:grid-cols-3 md:gap-10">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.n}
                className="relative pt-1"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.55,
                  delay: reducedMotion ? 0 : 0.12 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-full border-[3px] border-gona-yellow bg-[#F7F5F0] font-display text-base font-bold text-gona-black shadow-[0_0_0_6px_rgba(255,212,0,0.12)]">
                  {step.n}
                </span>
                <h3 className="mt-6 font-display text-xl text-gona-black md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-gona-gray md:text-base">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export function HowItWorksPlaceholder() {
  return <HowItWorks />;
}
