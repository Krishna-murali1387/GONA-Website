"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { healthcareTokens } from "@/components/healthcare/healthcare.content";
import { CareHeroScene } from "@/components/healthcare/healthcare-visuals";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function HealthcareHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,#FFFFFF_0%,#EFF6FF_52%,#F8FAFC_100%)] pt-28 pb-16 md:pt-32 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(59,130,246,0.14),transparent_55%)]"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="relative z-10 max-w-xl">
          <p
            className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: healthcareTokens.accent }}
          >
            GONA Healthcare Ecosystem
          </p>
          <h1 className="font-display text-4xl leading-[1.08] text-gona-black md:text-5xl lg:text-[3.35rem]">
            Care that
            <span className="mt-1 block" style={{ color: healthcareTokens.navy }}>
              stays connected.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-gona-gray md:text-lg">
            Discover local doctors, book appointments, access specialist care and
            keep important health records connected through GONA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={downloadHref()} className={buttonClass("primary")}>
              Download GONA
            </Link>
            <a href="#healthcare-access" className={buttonClass("secondary")}>
              Explore Healthcare
            </a>
          </div>
          <p className="mt-5 text-sm text-gona-gray">
            Healthcare availability depends on your location and participating
            providers.
          </p>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#BFDBFE] bg-white shadow-[0_28px_60px_rgba(30,58,95,0.12)]">
            <CareHeroScene className="aspect-[5/4] w-full min-h-[20rem] sm:min-h-[24rem] lg:min-h-[28rem]" />
            <div className="pointer-events-none absolute inset-[12%] overflow-hidden rounded-[1.25rem]">
              <Image
                src="/services/healthcare.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="scale-110 object-cover object-[48%_28%] opacity-[0.12] blur-[1.5px] mix-blend-multiply"
                priority
              />
            </div>
            {!reduce && (
              <motion.span
                className="pointer-events-none absolute top-[48%] left-[62%] size-3.5 rounded-full bg-[#FFD400] shadow-[0_0_0_7px_rgba(255,212,0,0.22)]"
                aria-hidden="true"
                animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
