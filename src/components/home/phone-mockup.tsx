"use client";

import { motion } from "framer-motion";

import { PhoneScreenVideo } from "@/components/home/phone-screen-video";
import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  className?: string;
  float?: boolean;
};

/**
 * Hero smartphone frame. Screen content is the replaceable promotional video
 * at `/videos/gona-hero.mp4` — chrome, island, and float motion stay fixed.
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

      <div className="relative aspect-[9/19.2] overflow-hidden rounded-[2.55rem] bg-[#050505] shadow-[0_28px_60px_rgba(0,0,0,0.65),0_8px_24px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,212,0,0.12),inset_0_1px_0_rgba(255,255,255,0.14)]">
        {/* Outer metal edge highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2.55rem] ring-1 ring-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-[1px] rounded-[2.5rem] bg-gradient-to-br from-white/10 via-transparent to-black/40"
          aria-hidden="true"
        />

        {/* Dynamic island */}
        <div
          className="pointer-events-none absolute top-3.5 left-1/2 z-30 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
          aria-hidden="true"
        />

        {/* Screen — video fills this inset only (no nested phone frame) */}
        <div className="absolute inset-[8px] overflow-hidden rounded-[2.05rem] bg-[#101010]">
          <PhoneScreenVideo />
        </div>
      </div>
    </motion.div>
  );
}
