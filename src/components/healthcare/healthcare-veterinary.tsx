"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import {
  healthcareMedia,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { HealthcareMediaImage } from "@/components/healthcare/healthcare-media";

/** 10 — Veterinary · family care extension photography */
export function HealthcareVeterinary() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const branch = useTransform(
    scrollYProgress,
    [0.2, 0.55],
    reduce ? [1, 1] : [0, 1],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0.15, 0.7],
    reduce ? [1, 1] : [1.01, 1.04],
  );

  return (
    <section
      ref={ref}
      data-care-chapter="vet"
      className="relative overflow-hidden bg-[#0B1220] text-white"
    >
      <div className="relative py-14 lg:py-0">
        <div className="lg:hidden">
          <div className="absolute inset-0">
            <HealthcareMediaImage
              src={healthcareMedia.veterinary.src}
              objectPosition={healthcareMedia.veterinary.objectPositionMobile}
              objectPositionMobile={healthcareMedia.veterinary.objectPositionMobile}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.45)_0%,rgba(11,18,32,0.78)_100%)]" />
          </div>
          <div className="relative z-10 px-5">
            <p
              className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
              style={{ color: healthcareTokens.yellow }}
            >
              10 / Veterinary
            </p>
            <p className="mt-4 text-sm text-white/65">
              Care can extend beyond people.
            </p>
            <h2 className="mt-3 font-display text-3xl">Veterinary Care</h2>
            <p className="mt-4 max-w-sm text-sm text-white/75">
              Local veterinary care and appointments — including home-visit
              requests where eligible.
            </p>
          </div>
        </div>

        <div className="relative hidden min-h-[88svh] lg:block">
          <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
            <HealthcareMediaImage
              src={healthcareMedia.veterinary.src}
              objectPosition={healthcareMedia.veterinary.objectPosition}
              objectPositionMobile={healthcareMedia.veterinary.objectPositionMobile}
              alt="Veterinary home care through GONA Healthcare"
              fill
              sizes="100vw"
            />
          </motion.div>
          {/* Localized left wash — keep vet/animal/family readable */}
          <div
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(11,18,32,0.78)_0%,rgba(11,18,32,0.35)_40%,rgba(11,18,32,0.1)_65%,rgba(11,18,32,0.35)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-[1280px] items-center px-8 lg:px-14">
            <div className="max-w-lg">
              <p
                className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                style={{ color: healthcareTokens.yellow }}
              >
                10 / Veterinary
              </p>
              <p className="mt-5 text-sm text-white/60">
                Care can extend beyond people.
              </p>
              <h2 className="mt-3 font-display text-4xl xl:text-5xl">
                Veterinary Care
              </h2>
              <p className="mt-4 text-base text-white/75">
                Local veterinary care and appointments — including home-visit
                requests where eligible.
              </p>

              <svg
                className="mt-10 h-16 w-64 drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]"
                viewBox="0 0 260 64"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 32 H90"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M90 32 C140 32 160 12 210 12"
                  stroke="#60A5FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ pathLength: branch }}
                />
                <circle cx="8" cy="32" r="4" fill="#3B82F6" />
                <motion.circle
                  cx="210"
                  cy="12"
                  r="5"
                  fill="#60A5FA"
                  style={{ opacity: branch }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
