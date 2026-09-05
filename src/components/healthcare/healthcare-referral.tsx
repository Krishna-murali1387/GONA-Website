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
  healthcareReferralLabels,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { HealthcareMediaImage } from "@/components/healthcare/healthcare-media";

/**
 * 07 — Referral
 * THREAD = primary explanation · PHOTO = human/clinical evidence.
 * Avoid stacking HTML medical-record UI over the photo’s embedded tablet.
 */
export function HealthcareReferral() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const branchProgress = useTransform(
    scrollYProgress,
    [0.15, 0.7],
    reduce ? [1, 1] : [0, 1],
  );
  const reconnect = useTransform(
    scrollYProgress,
    [0.65, 0.9],
    reduce ? [1, 1] : [0, 1],
  );
  const labelOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.45],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={ref}
      data-care-chapter="refer"
      className="relative bg-[#F1F5F9]"
    >
      <div className="px-5 py-14 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: healthcareTokens.accent }}
        >
          07 / Referral
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Your care moves forward.
          <span className="mt-1 block text-[#1E3A5F]">
            Your history doesn&apos;t start over.
          </span>
        </h2>
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.25rem]">
          <HealthcareMediaImage
            src={healthcareMedia.referral.src}
            objectPosition={healthcareMedia.referral.objectPositionMobile}
            objectPositionMobile={healthcareMedia.referral.objectPositionMobile}
            alt="Care continuity between local and specialist providers"
            fill
            sizes="100vw"
          />
        </div>
        <div className="mt-8 space-y-4">
          <p className="font-display text-xl text-gona-black">
            General / Local Care
          </p>
          <div className="h-8 w-px bg-[#3B82F6]" />
          <p className="font-display text-xl text-[#3B82F6]">
            Specialist / Hospital
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {healthcareReferralLabels.map((label) => (
            <li
              key={label}
              className="text-[0.7rem] font-semibold tracking-[0.14em] text-[#64748B] uppercase"
            >
              {label}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-[#94A3B8]">
          Connected GONA care context where participating providers are
          available.
        </p>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-[190vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-[1.05fr_0.95fr] items-center gap-10 px-8 lg:px-14">
              <div>
                <p
                  className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: healthcareTokens.accent }}
                >
                  07 / Referral
                </p>
                <h2 className="mt-4 max-w-xl font-display text-4xl text-gona-black xl:text-5xl">
                  Your care moves forward.
                  <span className="mt-2 block text-[#1E3A5F]">
                    Your history doesn&apos;t start over.
                  </span>
                </h2>

                <div className="relative mt-12 h-52">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 640 200"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M24 100 H220"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d="M220 100 C300 100 330 36 420 36 H560"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ pathLength: branchProgress }}
                    />
                    <motion.path
                      d="M220 100 C300 100 330 164 420 164 H560"
                      stroke="#93C5FD"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ pathLength: branchProgress }}
                    />
                    <motion.path
                      d="M560 36 C590 36 605 70 620 100 M560 164 C590 164 605 130 620 100"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ pathLength: reconnect }}
                    />
                    <circle cx="24" cy="100" r="6" fill="#3B82F6" />
                    <circle cx="220" cy="100" r="6" fill="#3B82F6" />
                    <motion.circle
                      cx="620"
                      cy="100"
                      r="7"
                      fill="#3B82F6"
                      style={{ opacity: reconnect }}
                    />
                  </svg>

                  <div className="absolute top-[4.6rem] left-6">
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-[#64748B] uppercase">
                      From
                    </p>
                    <p className="font-display text-lg text-gona-black">
                      General / Local Care
                    </p>
                  </div>
                  <div className="absolute top-1 right-4">
                    <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-[#64748B] uppercase">
                      Toward
                    </p>
                    <p className="font-display text-lg text-[#1E3A5F]">
                      Specialist / Hospital
                    </p>
                  </div>
                </div>

                <motion.ul
                  className="mt-2 flex flex-wrap gap-5"
                  style={{ opacity: labelOpacity }}
                >
                  {healthcareReferralLabels.map((label) => (
                    <li
                      key={label}
                      className="text-[0.7rem] font-semibold tracking-[0.14em] text-[#64748B] uppercase"
                    >
                      {label}
                    </li>
                  ))}
                </motion.ul>

                <p className="mt-8 text-xs text-[#94A3B8]">
                  Conceptual continuity through GONA — where participating
                  providers are available. Not a claim of universal record
                  transfer.
                </p>
              </div>

              {/* Photo evidence panel — no extra medical-record UI overlay */}
              <div className="relative h-[70vh] max-h-[34rem] overflow-hidden rounded-[1.5rem]">
                <HealthcareMediaImage
                  src={healthcareMedia.referral.src}
                  objectPosition={healthcareMedia.referral.objectPosition}
                  objectPositionMobile={healthcareMedia.referral.objectPositionMobile}
                  alt="Local and specialist care continuity through GONA"
                  fill
                  sizes="(max-width: 1280px) 45vw, 520px"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(15,23,42,0.28)_100%)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
