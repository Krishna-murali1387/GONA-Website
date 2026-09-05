"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { healthcareTokens } from "@/components/healthcare/healthcare.content";
import { ReferralFlowArt } from "@/components/healthcare/healthcare-visuals";
import { Container } from "@/components/ui/container";

export function HealthcareReferral() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: true });
  const [animProgress, setAnimProgress] = useState(0);
  const progress = reduce ? 1 : animProgress;

  useEffect(() => {
    if (reduce || !inView) return;
    let frame = 0;
    let start = 0;
    const duration = 1400;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setAnimProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce]);

  return (
    <section ref={ref} className="bg-gona-white py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="max-w-lg">
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: healthcareTokens.accent }}
            >
              Referral continuity
            </p>
            <h2 className="font-display text-3xl text-gona-black md:text-4xl">
              From local care to specialist care.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gona-gray md:text-lg">
              When further care is needed, GONA can keep the journey connected from
              the initial consultation to specialist care — where participating
              providers are available.
            </p>
            <ol className="mt-8 space-y-3">
              {["Local doctor", "Referral", "Hospital / Specialist"].map(
                (label, i) => (
                  <li key={label} className="flex items-center gap-3">
                    <span
                      className="flex size-8 items-center justify-center rounded-full font-display text-xs font-bold text-white"
                      style={{ background: healthcareTokens.accent }}
                    >
                      {String(i + 1)}
                    </span>
                    <span className="font-display text-base text-gona-black">
                      {label}
                    </span>
                  </li>
                ),
              )}
            </ol>
          </div>

          <motion.div
            className="overflow-hidden rounded-[1.5rem] border border-[#BFDBFE] bg-white shadow-[0_22px_50px_rgba(30,58,95,0.1)]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduce ? 0 : 0.55 }}
          >
            <ReferralFlowArt progress={progress} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
