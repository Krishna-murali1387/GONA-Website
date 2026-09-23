"use client";

import {
  BizSecondaryCta,
  BizYellowCta,
  Reveal,
} from "@/components/business/business-ui";
import { cableSite } from "@/config/cable.config";

export function BusinessClosing() {
  return (
    <>
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Reveal>
            <h2 className="max-w-xl font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
              Different businesses.
              <span className="mt-1 block text-[#5A6570]">One operating philosophy.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              "Simple to operate.",
              "Built around real workflows.",
              "Designed for growing businesses.",
              "Powered by GONA.",
            ].map((line, i) => (
              <Reveal key={line} delay={i * 0.04}>
                <p className="border-l-2 border-[#FFD400] pl-4 font-[family-name:var(--font-gona-display)] text-xl font-semibold text-[#1A2332] sm:text-2xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 50% 110%, rgba(255,212,0,0.14), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.32em] text-[#FFD400] uppercase">
              GONA BUSINESS
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              Built for businesses
              <span className="mt-1 block">ready for what&apos;s next.</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BizYellowCta href={cableSite.productPath}>Explore GONA Cable</BizYellowCta>
              <BizSecondaryCta href={cableSite.registerPath} onDark>
                Register Your Network
              </BizSecondaryCta>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
