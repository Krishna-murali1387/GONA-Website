"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  healthcareConsultStages,
  healthcareMedia,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { HealthcareMediaImage } from "@/components/healthcare/healthcare-media";

/** 04 — Consultation · human care moment photography */
export function HealthcareConsultation() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setActive(0);
      return;
    }
    const next = Math.min(
      healthcareConsultStages.length - 1,
      Math.floor(v * healthcareConsultStages.length),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.01, 1.05],
  );
  const stage = reduce ? 0 : active;
  const current = healthcareConsultStages[stage] ?? healthcareConsultStages[0];

  return (
    <section
      ref={ref}
      data-care-chapter="consult"
      className="relative bg-[#0B1220] text-white"
    >
      <div className="relative overflow-hidden py-14 lg:hidden">
        <div className="absolute inset-0">
          <HealthcareMediaImage
            src={healthcareMedia.consultation.src}
            objectPosition={healthcareMedia.consultation.objectPositionMobile}
            objectPositionMobile={healthcareMedia.consultation.objectPositionMobile}
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.55)_0%,rgba(11,18,32,0.78)_100%)]" />
        </div>
        <div className="relative z-10 px-5">
          <p
            className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
            style={{ color: healthcareTokens.yellow }}
          >
            04 / Consult
          </p>
          <h2 className="mt-3 font-display text-3xl">
            The appointment is one moment.
            <span className="mt-1 block text-[#93C5FD]">
              The care story continues.
            </span>
          </h2>
          <ul className="mt-10 space-y-5">
            {healthcareConsultStages.map((s) => (
              <li key={s.id} className="font-display text-2xl tracking-[0.04em]">
                {s.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-[180vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
              <HealthcareMediaImage
                src={healthcareMedia.consultation.src}
                objectPosition={healthcareMedia.consultation.objectPosition}
                objectPositionMobile={healthcareMedia.consultation.objectPositionMobile}
                alt="Doctor consultation through GONA Healthcare"
                fill
                sizes="100vw"
              />
            </motion.div>
            {/* Localized left wash — keep doctor/patient faces clear on the right */}
            <div
              className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,18,32,0.78)_0%,rgba(11,18,32,0.35)_42%,rgba(11,18,32,0.12)_68%,rgba(11,18,32,0.28)_100%)]"
              aria-hidden="true"
            />

            {/* Care Thread with soft backing */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-[18%] w-px"
              aria-hidden="true"
            >
              <span className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-white/30 blur-[2px]" />
              <span className="absolute inset-y-0 w-px bg-[#1E3A5F]/50" />
              <motion.div
                className="absolute inset-x-0 top-0 origin-top bg-[#3B82F6]"
                style={{ height: "100%", scaleY: scrollYProgress }}
              />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-8 lg:px-14">
              <p
                className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                style={{ color: healthcareTokens.yellow }}
              >
                04 / Consult
              </p>
              <h2 className="mt-4 max-w-xl font-display text-4xl xl:text-5xl">
                The appointment is one moment.
                <span className="mt-2 block text-[#93C5FD]">
                  The care story continues.
                </span>
              </h2>

              <div className="mt-16">
                <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-[#60A5FA] uppercase">
                  Stage {String(stage + 1).padStart(2, "0")}
                </p>
                <p
                  key={current.id}
                  className="mt-3 font-display text-5xl tracking-[0.03em] xl:text-6xl"
                >
                  {current.label}
                </p>
              </div>

              <ul className="mt-12 flex gap-8" aria-hidden="true">
                {healthcareConsultStages.map((s, i) => (
                  <li
                    key={s.id}
                    className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase"
                    style={{
                      color: i === stage ? "#3B82F6" : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
