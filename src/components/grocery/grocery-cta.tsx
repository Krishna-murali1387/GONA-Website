"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { groceryTokens } from "@/components/grocery/grocery.content";
import {
  GonaBag,
  GonaLeaf,
  GonaOrange,
  GonaTomato,
} from "@/components/grocery/grocery-visuals";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function GroceryCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(165deg,#166534_0%,#22C55E_45%,#86EFAC_100%)] py-20 text-white md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,212,0,0.16),transparent_45%)]"
        aria-hidden="true"
      />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/75 uppercase">
            GONA Grocery
          </p>
          <h2 className="font-display text-4xl md:text-5xl">
            Groceries. Sorted.
          </h2>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Everything you need, through GONA.
          </p>
          <div className="mt-8">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Availability depends on your location.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden="true">
          <div className="absolute inset-[12%] rounded-full bg-white/10 blur-2xl" />
          <motion.div
            className="absolute inset-[18%] z-10"
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -7, 0],
                    transition: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
                  }
            }
          >
            <GonaBag className="h-full w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]" />
          </motion.div>
          <motion.div
            className="absolute top-[12%] right-[10%] z-20 w-14"
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -9, 0],
                    transition: {
                      duration: 6.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4,
                    },
                  }
            }
          >
            <GonaTomato className="h-auto w-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.2)]" />
          </motion.div>
          <motion.div
            className="absolute bottom-[18%] left-[8%] z-20 w-12"
            animate={
              reduce
                ? undefined
                : {
                    y: [0, 6, 0],
                    transition: {
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.9,
                    },
                  }
            }
          >
            <GonaOrange className="h-auto w-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.18)]" />
          </motion.div>
          <motion.div
            className="absolute top-[28%] left-[12%] z-20 w-10 opacity-90"
            animate={
              reduce
                ? undefined
                : {
                    y: [0, -5, 0],
                    transition: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.2,
                    },
                  }
            }
          >
            <GonaLeaf className="h-auto w-full" />
          </motion.div>
          <div
            className="absolute right-[22%] bottom-[22%] size-3 rounded-full"
            style={{ backgroundColor: groceryTokens.yellow }}
          />
        </div>
      </Container>
    </section>
  );
}
