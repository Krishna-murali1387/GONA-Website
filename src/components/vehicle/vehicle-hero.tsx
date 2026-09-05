"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { vehicleTokens } from "@/components/vehicle/vehicle.content";
import { HeroMobilityWorld } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function VehicleHero() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(reduce ? 0.7 : 0.12);

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    let start = 0;
    const settle = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 2200);
      setProgress(0.12 + p * 0.55);
      if (p < 1) frame = requestAnimationFrame(settle);
    };
    frame = requestAnimationFrame(settle);
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[#1E1B4B] pt-24 text-white md:min-h-[88vh] md:pt-28">
      <div className="absolute inset-0">
        <HeroMobilityWorld
          progress={progress}
          className="h-full min-h-[85vh] w-full object-cover"
        />
        <Image
          src="/services/vehicle.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover object-[70%_40%] opacity-[0.1] blur-[6px] mix-blend-luminosity"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.88)_0%,rgba(30,27,75,0.62)_48%,rgba(30,27,75,0.38)_100%)]"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10 flex min-h-[70vh] flex-col justify-center pb-16 md:pb-20">
        <motion.div
          className="max-w-xl"
          initial={false}
          animate={reduce ? undefined : { y: [12, 0] }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <p
            className="mb-4 text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: vehicleTokens.yellow }}
          >
            GONA Vehicle
          </p>
          <h1 className="font-display text-4xl leading-[1.05] md:text-5xl lg:text-[3.6rem]">
            Move people.
            <span className="mt-1 block text-[#C7D2FE]">Move goods.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-200 md:text-lg">
            Find available passenger and goods vehicles around you, book for now
            or schedule your journey through GONA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
            <a
              href="#vehicle-journey"
              className={buttonClass("secondaryOnDark")}
            >
              Explore the Journey
            </a>
          </div>
          <p className="mt-5 max-w-sm text-sm text-slate-300">
            Vehicle availability depends on your location and available
            providers.
          </p>
        </motion.div>
      </Container>

      {/* Route continuation cue */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.55))]"
        aria-hidden="true"
      />
    </section>
  );
}
