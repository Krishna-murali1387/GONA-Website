"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  className?: string;
  float?: boolean;
};

/**
 * Polished abstract GONA super-app visualization for marketing.
 * Not a real production screenshot — designed to be replaceable later.
 */
export function PhoneMockup({ className, float = true }: PhoneMockupProps) {
  return (
    <motion.div
      className={cn("relative mx-auto w-full", className)}
      animate={float ? { y: [0, -6, 0] } : undefined}
      transition={
        float
          ? { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      {/* Soft ground shadow — physical presence */}
      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-[100%] bg-black/55 blur-2xl"
        aria-hidden="true"
      />

      <div
        className="relative aspect-[9/19.2] overflow-hidden rounded-[2.55rem] bg-[#050505] shadow-[0_28px_60px_rgba(0,0,0,0.65),0_8px_24px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,212,0,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]"
        aria-hidden="true"
      >
        {/* Outer metal edge highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.55rem] ring-1 ring-white/10" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-black/40" />

        {/* Dynamic island */}
        <div className="absolute top-3.5 left-1/2 z-30 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />

        {/* Screen */}
        <div className="absolute inset-[8px] overflow-hidden rounded-[2.05rem] bg-[#101010]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,212,0,0.22),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_18%,transparent_82%,rgba(0,0,0,0.35))]" />

          <div className="relative flex h-full flex-col px-3.5 pt-11 pb-3">
            {/* Top identity + location */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={siteConfig.assets.logo}
                  alt=""
                  width={26}
                  height={26}
                  className="rounded-[22%] shadow-[0_0_12px_rgba(255,212,0,0.25)]"
                />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] text-gona-yellow uppercase">
                    GONA
                  </p>
                  <div className="mt-0.5 flex items-center gap-1">
                    <span className="size-1 rounded-full bg-gona-yellow/80" />
                    <span className="text-[9px] text-white/45">Your mandal</span>
                  </div>
                </div>
              </div>
              <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                <span className="size-2 rounded-full bg-white/35" />
              </div>
            </div>

            {/* Search / discovery */}
            <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <span className="size-3.5 rounded-full border border-gona-yellow/50" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-[58%] rounded-full bg-white/25" />
                <div className="h-1 w-[38%] rounded-full bg-white/10" />
              </div>
              <span className="rounded-lg bg-gona-yellow/90 px-1.5 py-1 text-[8px] font-bold tracking-wide text-gona-black">
                GO
              </span>
            </div>

            {/* Featured promo surface — abstract imagery, no fake data */}
            <div className="relative mb-3 overflow-hidden rounded-[1.15rem] border border-gona-yellow/20">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a1608_0%,#2a220c_40%,#FFD400_160%)]" />
              <div className="absolute -right-6 -bottom-8 size-28 rounded-full bg-gona-yellow/35 blur-2xl" />
              <div className="absolute top-3 right-3 h-10 w-16 rounded-xl bg-white/10 backdrop-blur-sm" />
              <div className="relative space-y-2 p-3.5">
                <div className="inline-flex rounded-full bg-gona-yellow px-2 py-0.5 text-[8px] font-bold tracking-[0.12em] text-gona-black uppercase">
                  One app
                </div>
                <div className="h-2 w-28 rounded-full bg-white/70" />
                <div className="h-1.5 w-20 rounded-full bg-white/35" />
                <div className="mt-3 flex gap-1.5">
                  <div className="h-6 flex-1 rounded-lg bg-black/25" />
                  <div className="h-6 w-10 rounded-lg bg-gona-yellow/90" />
                </div>
              </div>
            </div>

            {/* Service discovery — rich abstract cards (not all seven) */}
            <div className="mb-2.5 grid grid-cols-2 gap-2">
              <ServiceTile
                title="Grocery"
                motif="basket"
                wash="from-[#2a2410] to-[#15130c]"
              />
              <ServiceTile
                title="Health"
                motif="pulse"
                wash="from-[#1c2418] to-[#10140f]"
              />
              <ServiceTile
                title="Repair"
                motif="tool"
                wash="from-[#241c14] to-[#14100c]"
              />
              <ServiceTile
                title="Ride"
                motif="wheel"
                wash="from-[#141820] to-[#0e1014]"
              />
            </div>

            {/* LOCAL community surface */}
            <div className="mb-3 overflow-hidden rounded-[1.05rem] border border-gona-local-orange/30 bg-gradient-to-r from-gona-local-orange/15 via-[#1a120e] to-transparent p-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex size-9 items-center justify-center rounded-xl bg-gona-local-orange/25">
                  <span className="size-2 rounded-full bg-gona-local-orange" />
                  <span className="absolute inset-1 rounded-lg border border-gona-local-orange/35" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold tracking-[0.14em] text-gona-local-orange uppercase">
                    LOCAL
                  </p>
                  <div className="mt-1.5 h-1.5 w-24 rounded-full bg-white/25" />
                  <div className="mt-1 h-1 w-16 rounded-full bg-white/12" />
                </div>
                    <div className="grid grid-cols-2 gap-1">
                      <span className="size-2 rounded-sm bg-white/15" />
                      <span className="size-2 rounded-sm bg-gona-local-orange/50" />
                      <span className="size-2 rounded-sm bg-gona-yellow/40" />
                      <span className="size-2 rounded-sm bg-white/10" />
                    </div>
              </div>
            </div>

            {/* Compact fashion / farming hint row */}
            <div className="mb-3 flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2">
                <span className="size-6 rounded-lg bg-gradient-to-br from-gona-yellow/50 to-white/10" />
                <div className="space-y-1">
                  <div className="h-1 w-10 rounded-full bg-white/30" />
                  <div className="h-1 w-7 rounded-full bg-white/12" />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-2.5 py-2">
                <span className="size-6 rounded-lg bg-gradient-to-br from-[#3d5a2a]/70 to-gona-yellow/20" />
                <div className="space-y-1">
                  <div className="h-1 w-10 rounded-full bg-white/30" />
                  <div className="h-1 w-7 rounded-full bg-white/12" />
                </div>
              </div>
            </div>

            {/* Bottom navigation suggestion */}
            <div className="mt-auto rounded-2xl border border-white/8 bg-black/45 px-2 py-2 backdrop-blur-md">
              <div className="flex items-center justify-between px-1">
                {["Home", "Services", "LOCAL", "You"].map((item, index) => (
                  <div
                    key={item}
                    className="flex flex-col items-center gap-1 px-1.5"
                  >
                    <span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-lg",
                        index === 0
                          ? "bg-gona-yellow text-gona-black"
                          : index === 2
                            ? "bg-gona-local-orange/20"
                            : "bg-white/5",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          index === 0
                            ? "bg-gona-black"
                            : index === 2
                              ? "bg-gona-local-orange"
                              : "bg-white/35",
                        )}
                      />
                    </span>
                    <span
                      className={cn(
                        "text-[7px] tracking-wide",
                        index === 0 ? "text-gona-yellow" : "text-white/35",
                      )}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceTile({
  title,
  motif,
  wash,
}: {
  title: string;
  motif: "basket" | "pulse" | "tool" | "wheel";
  wash: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.05rem] border border-white/10 bg-gradient-to-br p-2.5",
        wash,
      )}
    >
      <div className="absolute -top-4 -right-3 size-14 rounded-full bg-gona-yellow/15 blur-xl" />
      <div className="relative mb-2.5 flex h-14 items-end justify-between rounded-xl border border-white/8 bg-black/25 p-2">
        <MotifShape motif={motif} />
        <div className="space-y-1 opacity-70">
          <div className="h-1 w-6 rounded-full bg-white/25" />
          <div className="h-1 w-4 rounded-full bg-white/15" />
        </div>
      </div>
      <p className="text-[10px] font-medium tracking-wide text-white/70">{title}</p>
      <div className="mt-1.5 h-1 w-10 rounded-full bg-gona-yellow/55" />
    </div>
  );
}

function MotifShape({ motif }: { motif: "basket" | "pulse" | "tool" | "wheel" }) {
  if (motif === "basket") {
    return (
      <div className="relative size-8">
        <div className="absolute inset-x-1 top-2 h-5 rounded-md border border-gona-yellow/70 bg-gona-yellow/20" />
        <div className="absolute top-1 left-1/2 h-2 w-4 -translate-x-1/2 rounded-t-full border border-gona-yellow/50" />
      </div>
    );
  }
  if (motif === "pulse") {
    return (
      <div className="flex size-8 items-center justify-center">
        <div className="h-3 w-6 rounded-full border border-emerald-300/50 bg-emerald-400/20" />
      </div>
    );
  }
  if (motif === "tool") {
    return (
      <div className="relative size-8">
        <div className="absolute top-1.5 left-2 h-5 w-1.5 rotate-45 rounded-full bg-gona-yellow/70" />
        <div className="absolute right-1.5 bottom-2 size-3 rounded-sm border border-gona-yellow/50" />
      </div>
    );
  }
  return (
    <div className="flex size-8 items-center justify-center">
      <div className="size-5 rounded-full border-2 border-sky-300/40">
        <div className="m-[3px] size-2 rounded-full bg-sky-300/50" />
      </div>
    </div>
  );
}
