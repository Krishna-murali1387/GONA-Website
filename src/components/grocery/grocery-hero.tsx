"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { groceryTokens } from "@/components/grocery/grocery.content";
import {
  GonaBag,
  GonaBread,
  GonaLeaf,
  GonaMilk,
  GonaOrange,
  GonaTomato,
} from "@/components/grocery/grocery-visuals";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function GroceryHero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const stage = stageRef.current;
    if (!stage) return;

    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    if (!mq.matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * 8;
      targetY = ny * 6;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      stage.style.setProperty("--gx", `${currentX.toFixed(2)}px`);
      stage.style.setProperty("--gy", `${currentY.toFixed(2)}px`);
      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      stage.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,#FFFEF9_0%,#ECFDF3_48%,#F7F3EB_100%)] pt-28 pb-16 md:pt-32 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_28%,rgba(34,197,94,0.18),transparent_52%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[18%] right-[8%] size-40 rounded-full bg-[#FFD400]/15 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="relative z-10 max-w-xl">
          <p
            className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: groceryTokens.leaf }}
          >
            GONA Grocery Delivery
          </p>
          <h1 className="font-display text-4xl leading-[1.05] text-gona-black md:text-5xl lg:text-[3.35rem]">
            Everyday essentials,
            <span className="mt-1 block" style={{ color: groceryTokens.leaf }}>
              closer to you.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-gona-gray md:text-lg">
            Browse everyday groceries, check availability and get your essentials
            delivered through GONA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={downloadHref()} className={buttonClass("primary")}>
              Download GONA
            </Link>
            <a href="#grocery-categories" className={buttonClass("secondary")}>
              Explore Grocery
            </a>
          </div>
          <p className="mt-5 text-sm text-gona-gray">
            Availability depends on your location.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative mx-auto aspect-[5/4] w-full max-w-md sm:max-w-lg lg:max-w-none"
          style={
            {
              "--gx": "0px",
              "--gy": "0px",
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          <HeroComposition reduced={Boolean(reduce)} />
        </div>
      </Container>
    </section>
  );
}

function HeroComposition({ reduced }: { reduced: boolean }) {
  const float = (delay: number, amplitude = 8, duration = 7) =>
    reduced
      ? undefined
      : {
          y: [0, -amplitude, 0],
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <div className="absolute inset-0">
      {/* Soft atmosphere — not a hard card frame */}
      <div className="absolute top-[12%] right-[6%] size-48 rounded-full bg-[#22C55E]/15 blur-3xl" />
      <div className="absolute bottom-[10%] left-[8%] size-40 rounded-full bg-[#FFD400]/12 blur-3xl" />

      {/* Hero artwork with soft edge merge */}
      <motion.div
        className="absolute top-[10%] left-[8%] z-10 w-[58%] max-w-[280px] sm:left-[12%] sm:w-[54%]"
        style={{
          transform:
            "translate3d(calc(var(--gx) * -0.3), calc(var(--gy) * -0.22), 0)",
        }}
        animate={float(0, 6, 8)}
      >
        <div
          className="relative aspect-[4/3] overflow-hidden shadow-[0_28px_60px_rgba(17,17,17,0.16)]"
          style={{
            borderRadius: "1.75rem 1.35rem 1.9rem 1.45rem",
            maskImage:
              "radial-gradient(ellipse 92% 88% at 50% 48%, #000 58%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 92% 88% at 50% 48%, #000 58%, transparent 100%)",
          }}
        >
          <Image
            src="/services/grocery.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 300px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ECFDF3]/35 via-transparent to-transparent" />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[8%] right-[4%] z-20 w-16 sm:w-20"
        style={{
          transform: "translate3d(calc(var(--gx) * 0.55), calc(var(--gy) * 0.4), 0)",
        }}
        animate={float(0.5, 9, 6.5)}
      >
        <GonaTomato className="h-auto w-full drop-shadow-[0_14px_24px_rgba(185,28,28,0.28)]" />
      </motion.div>

      <motion.div
        className="absolute top-[42%] right-[2%] z-20 w-12 sm:w-14"
        style={{
          transform: "translate3d(calc(var(--gx) * 0.7), calc(var(--gy) * 0.5), 0)",
        }}
        animate={float(1.2, 7, 7.5)}
      >
        <GonaLeaf className="h-auto w-full drop-shadow-[0_10px_18px_rgba(22,101,52,0.2)]" />
      </motion.div>

      <motion.div
        className="absolute right-[18%] bottom-[8%] z-20 w-12 sm:w-14"
        style={{
          transform: "translate3d(calc(var(--gx) * 0.45), calc(var(--gy) * 0.35), 0)",
        }}
        animate={float(0.8, 6, 8.2)}
      >
        <GonaMilk className="h-auto w-full drop-shadow-[0_12px_20px_rgba(14,165,233,0.22)]" />
      </motion.div>

      <motion.div
        className="absolute bottom-[6%] left-[6%] z-20 w-20 sm:w-24"
        style={{
          transform: "translate3d(calc(var(--gx) * -0.4), calc(var(--gy) * 0.3), 0)",
        }}
        animate={float(1.4, 5, 9)}
      >
        <GonaBread className="h-auto w-full drop-shadow-[0_12px_20px_rgba(180,83,9,0.2)]" />
      </motion.div>

      <motion.div
        className="absolute top-[58%] left-[2%] z-20 w-12 sm:w-[3.25rem]"
        style={{
          transform: "translate3d(calc(var(--gx) * -0.5), calc(var(--gy) * 0.25), 0)",
        }}
        animate={float(0.3, 8, 6.8)}
      >
        <GonaOrange className="h-auto w-full drop-shadow-[0_12px_18px_rgba(194,65,12,0.22)]" />
      </motion.div>

      <motion.div
        className="absolute right-[8%] bottom-[36%] z-[8] w-16 opacity-90 sm:w-20"
        style={{
          transform: "translate3d(calc(var(--gx) * 0.25), calc(var(--gy) * 0.2), 0)",
        }}
        animate={float(1.8, 5, 8.5)}
      >
        <GonaBag className="h-auto w-full drop-shadow-[0_16px_28px_rgba(21,128,61,0.25)]" />
      </motion.div>
    </div>
  );
}
