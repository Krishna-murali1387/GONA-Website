"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

import { PhoneMockup } from "@/components/home/phone-mockup";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

type HeroEcosystemProps = {
  className?: string;
};

/**
 * Ecosystem composition around the phone:
 * multiple needs → connected → through GONA.
 * Abstract service cues only — not the W3 carousel.
 */
export function HeroEcosystem({ className }: HeroEcosystemProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const bgX = useSpring(rawX, { stiffness: 24, damping: 24, mass: 0.8 });
  const bgY = useSpring(rawY, { stiffness: 24, damping: 24, mass: 0.8 });
  const midX = useSpring(rawX, { stiffness: 34, damping: 22, mass: 0.6 });
  const midY = useSpring(rawY, { stiffness: 34, damping: 22, mass: 0.6 });
  const phoneX = useSpring(rawX, { stiffness: 48, damping: 26, mass: 0.45 });
  const phoneY = useSpring(rawY, { stiffness: 48, damping: 26, mass: 0.45 });
  const midShift = useMotionTemplate`translate(${midX}px, ${midY}px)`;

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion || !finePointer) return;
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 10);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 8);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [finePointer, rawX, rawY, reducedMotion]);

  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-[4/5] w-full max-w-[38rem] items-center justify-center sm:aspect-[5/6] lg:aspect-square lg:max-w-none",
        className,
      )}
    >
      {/* Background depth plane */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reducedMotion || !finePointer ? undefined : { x: bgX, y: bgY }}
      >
        <div className="absolute inset-[2%] rounded-[40%] bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.22),rgba(255,212,0,0.05)_42%,transparent_68%)] blur-3xl" />
        <div className="absolute inset-[10%] rounded-full border border-white/[0.035]" />
        <div className="absolute inset-[2%] rounded-[38%] border border-gona-yellow/[0.09]" />
        <div className="absolute inset-[22%] rounded-full border border-gona-yellow/[0.05]" />

        {/* Perspective community / map geometry */}
        <div
          className="absolute inset-[8%] opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,212,0,0.45) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(circle at 55% 48%, black 15%, transparent 70%)",
            transform: "perspective(600px) rotateX(48deg) scale(1.15)",
            transformOrigin: "center 70%",
          }}
        />
      </motion.div>

      {/* Midground: paths, streaks, nodes */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reducedMotion || !finePointer ? undefined : { transform: midShift }}
      >
        <EcosystemPaths reducedMotion={reducedMotion} />
        <SpeedStreaks reducedMotion={reducedMotion} />

        {/* Abstract service nodes — visual cues, not text badges */}
        <ServiceNode
          className="top-[11%] left-[12%] hidden sm:flex"
          size="md"
          accent="yellow"
          delay={0.45}
          reducedMotion={reducedMotion}
          shape="square"
        />
        <ServiceNode
          className="top-[16%] right-[9%] hidden sm:flex"
          size="sm"
          accent="yellow"
          delay={0.55}
          reducedMotion={reducedMotion}
          shape="circle"
        />
        <ServiceNode
          className="top-[42%] left-[4%] hidden md:flex"
          size="sm"
          accent="muted"
          delay={0.65}
          reducedMotion={reducedMotion}
          shape="diamond"
        />
        <ServiceNode
          className="right-[3%] bottom-[34%] hidden sm:flex"
          size="md"
          accent="yellow"
          delay={0.7}
          reducedMotion={reducedMotion}
          shape="circle"
        />
        <ServiceNode
          className="bottom-[14%] left-[10%] hidden sm:flex"
          size="lg"
          accent="local"
          delay={0.8}
          reducedMotion={reducedMotion}
          shape="pin"
        />
        <ServiceNode
          className="right-[14%] bottom-[12%] hidden md:flex"
          size="sm"
          accent="muted"
          delay={0.9}
          reducedMotion={reducedMotion}
          shape="square"
        />
        {/* Seventh subtle hint — barely there */}
        <ServiceNode
          className="top-[30%] right-[22%] hidden lg:flex"
          size="xs"
          accent="yellow"
          delay={1}
          reducedMotion={reducedMotion}
          shape="circle"
        />
      </motion.div>

      {/* Foreground phone — larger hero object */}
      <motion.div
        className="relative z-10 w-[78%] max-w-[320px] sm:w-[70%] sm:max-w-[340px] lg:w-[72%] lg:max-w-[360px]"
        style={
          reducedMotion || !finePointer ? undefined : { x: phoneX, y: phoneY }
        }
        initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <PhoneMockup float={!reducedMotion} />
      </motion.div>
    </div>
  );
}

function EcosystemPaths({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg
      viewBox="0 0 420 420"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gonaPathA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD400" stopOpacity="0" />
          <stop offset="40%" stopColor="#FFD400" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gonaPathB" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD400" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF7A1A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d="M48 260C110 180 165 145 210 205C255 265 305 295 372 225"
        fill="none"
        stroke="url(#gonaPathA)"
        strokeWidth="1.6"
        initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
      />
      <motion.path
        d="M40 155C105 105 165 85 215 155C265 225 315 175 380 120"
        fill="none"
        stroke="url(#gonaPathA)"
        strokeWidth="1.15"
        initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.45 }}
      />
      <motion.path
        d="M70 330C145 305 185 255 215 210C250 155 305 115 365 155"
        fill="none"
        stroke="url(#gonaPathB)"
        strokeWidth="1.2"
        initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 2.7, ease: "easeOut", delay: 0.55 }}
      />

      {/* Energy pulse traveling along main path */}
      {!reducedMotion ? (
        <motion.circle
          r="3.2"
          fill="#FFD400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "linear" }}
        >
          <animateMotion
            dur="4.8s"
            repeatCount="indefinite"
            path="M48 260C110 180 165 145 210 205C255 265 305 295 372 225"
          />
        </motion.circle>
      ) : null}
    </svg>
  );
}

function SpeedStreaks({ reducedMotion }: { reducedMotion: boolean }) {
  const streaks: Array<{
    top: string;
    left?: string;
    right?: string;
    width: number;
    rotate: number;
  }> = [
    { top: "22%", left: "6%", width: 42, rotate: -18 },
    { top: "48%", left: "2%", width: 28, rotate: -12 },
    { top: "28%", right: "5%", width: 36, rotate: 16 },
    { top: "58%", right: "4%", width: 48, rotate: 10 },
  ];

  return (
    <>
      {streaks.map((streak, index) => (
        <motion.span
          key={index}
          className="absolute hidden h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-gona-yellow/70 to-transparent sm:block"
          style={{
            top: streak.top,
            left: streak.left,
            right: streak.right,
            width: streak.width,
            transform: `rotate(${streak.rotate}deg)`,
          }}
          initial={reducedMotion ? false : { opacity: 0, x: -8 }}
          animate={
            reducedMotion
              ? { opacity: 0.45 }
              : { opacity: [0.15, 0.7, 0.15], x: [-6, 8, -6] }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 5.5 + index * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.35,
                }
          }
        />
      ))}
    </>
  );
}

function ServiceNode({
  className,
  size,
  accent,
  delay,
  reducedMotion,
  shape,
}: {
  className?: string;
  size: "xs" | "sm" | "md" | "lg";
  accent: "yellow" | "local" | "muted";
  delay: number;
  reducedMotion: boolean;
  shape: "circle" | "square" | "diamond" | "pin";
}) {
  const dim =
    size === "xs"
      ? "size-5"
      : size === "sm"
        ? "size-8"
        : size === "md"
          ? "size-11"
          : "size-14";

  const tone =
    accent === "local"
      ? "border-gona-local-orange/40 bg-gona-local-orange/15 shadow-[0_0_24px_rgba(255,122,26,0.2)]"
      : accent === "muted"
        ? "border-white/15 bg-white/[0.04]"
        : "border-gona-yellow/35 bg-gona-yellow/10 shadow-[0_0_28px_rgba(255,212,0,0.18)]";

  return (
    <motion.div
      className={cn(
        "absolute z-[5] items-center justify-center rounded-2xl border backdrop-blur-md",
        dim,
        tone,
        shape === "circle" && "rounded-full",
        shape === "diamond" && "rotate-45 rounded-lg",
        className,
      )}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={
        reducedMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: [1, 1.04, 1],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : {
              opacity: { duration: 0.7, delay },
              scale: {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 0.8,
              },
            }
      }
    >
      {shape === "pin" ? (
        <span className="relative flex size-3 items-center justify-center">
          <span className="absolute size-3 rounded-full border border-gona-local-orange/60" />
          <span className="size-1.5 rounded-full bg-gona-local-orange" />
        </span>
      ) : (
        <span
          className={cn(
            "rounded-full",
            size === "lg" ? "size-2.5" : "size-1.5",
            accent === "local"
              ? "bg-gona-local-orange"
              : accent === "muted"
                ? "bg-white/40"
                : "bg-gona-yellow",
            shape === "diamond" && "-rotate-45",
          )}
        />
      )}
    </motion.div>
  );
}
