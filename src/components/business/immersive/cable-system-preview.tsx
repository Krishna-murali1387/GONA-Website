"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import {
  BizSecondaryCta,
  BizYellowCta,
  SoftWindow,
} from "@/components/business/business-ui";
import { cableSite } from "@/config/cable.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CableSystemPreview() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ownerX = useTransform(scrollYProgress, [0.15, 0.55], [0, -40]);
  const ownerZ = useTransform(scrollYProgress, [0.15, 0.55], [0, -30]);
  const opY = useTransform(scrollYProgress, [0.2, 0.6], [20, -10]);
  const opScale = useTransform(scrollYProgress, [0.2, 0.6], [0.92, 1.05]);
  const custX = useTransform(scrollYProgress, [0.15, 0.55], [0, 40]);
  const reconnect = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF8F5] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.28em] text-[#8A7400] uppercase">
            GONA Cable
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl">
            One network.
            <span className="mt-1 block text-[#5A6570]">Three connected experiences.</span>
          </h2>
        </div>

        <div className="relative mt-12 grid gap-5 lg:grid-cols-3 lg:items-end">
          <motion.div
            style={reduced ? undefined : { x: ownerX, y: ownerZ }}
            className="relative z-[1]"
          >
            <p className="mb-2 text-[0.65rem] font-bold tracking-[0.18em] text-[#8A7400] uppercase">
              Owner web
            </p>
            <SoftWindow title="Owner">
              <div className="grid grid-cols-2 gap-2">
                {["Overview", "Customers", "Billing", "Collections", "Communications", "Reports"].map(
                  (l) => (
                    <div
                      key={l}
                      className="rounded-lg border border-[#111111]/6 bg-[#FAF8F5] px-2 py-2 text-[0.65rem] font-semibold text-[#111111]/7"
                    >
                      {l}
                    </div>
                  ),
                )}
              </div>
            </SoftWindow>
          </motion.div>

          <motion.div
            style={reduced ? undefined : { y: opY, scale: opScale }}
            className="relative z-[2]"
          >
            <p className="mb-2 text-[0.65rem] font-bold tracking-[0.18em] text-[#8A7400] uppercase">
              Operator
            </p>
            <SoftWindow title="Field" tone="field">
              <div className="mx-auto max-w-[11rem] space-y-2">
                {["Customers", "Collect", "Complaints", "My Cash"].map((l, i) => (
                  <div
                    key={l}
                    className={`rounded-lg px-3 py-2 text-center text-[0.7rem] font-semibold ${
                      i === 1
                        ? "bg-[#111111] text-[#FFD400]"
                        : "border border-[#111111]/1 bg-white/80 text-[#111111]/7"
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </SoftWindow>
          </motion.div>

          <motion.div
            style={reduced ? undefined : { x: custX }}
            className="relative z-[1]"
          >
            <p className="mb-2 text-[0.65rem] font-bold tracking-[0.18em] text-[#8A7400] uppercase">
              Customer portal
            </p>
            <SoftWindow title="Customer">
              <div className="space-y-2">
                {["Home", "Bills", "Connection", "Support", "Notices"].map((l) => (
                  <div
                    key={l}
                    className="flex items-center justify-between rounded-lg border border-[#111111]/6 bg-[#FAF8F5] px-3 py-2 text-[0.7rem] font-semibold text-[#111111]/7"
                  >
                    {l}
                    <span className="h-1 w-6 rounded-full bg-[#FFD400]/70" />
                  </div>
                ))}
              </div>
            </SoftWindow>
          </motion.div>
        </div>

        <motion.div
          style={reduced ? undefined : { opacity: reconnect }}
          className="mt-10 text-center"
        >
          <p className="font-[family-name:var(--font-gona-display)] text-lg font-bold tracking-[0.08em] text-[#111111] sm:text-xl">
            ONE NETWORK. THREE CONNECTED EXPERIENCES.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <BizYellowCta href={cableSite.productPath}>Explore GONA Cable</BizYellowCta>
            <BizSecondaryCta href={cableSite.registerPath}>Register Your Network</BizSecondaryCta>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
