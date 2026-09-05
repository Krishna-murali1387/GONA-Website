"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export const storyEase: Transition["ease"] = [0.22, 1, 0.36, 1];

export const travelTransition: Transition = {
  duration: 1.25,
  ease: [0.33, 0.08, 0.22, 1],
};

export const routeTransition: Transition = {
  duration: 0.55,
  ease: storyEase,
};

export const fadeTransition: Transition = {
  duration: 0.28,
  ease: storyEase,
};

type StoryShellProps = {
  /** Hover / focus story playing */
  active: boolean;
  reduce: boolean;
  /** Touch: hold end pose, no travel */
  mobileStatic: boolean;
  softBg: string;
  className?: string;
  children: ReactNode;
};

/**
 * Shared viewport. Base scene stays faintly visible on desktop idle
 * so QA can confirm mount; hover boosts contrast and plays travel.
 */
export function StoryShell({
  active,
  reduce,
  mobileStatic,
  softBg,
  className,
  children,
}: StoryShellProps) {
  // Idle desktop: visible base (~0.45). Hover/touch/reduced: full.
  const shellOpacity = active || mobileStatic || reduce ? 1 : 0.48;

  return (
    <div
      className={cn(
        "pointer-events-none relative z-10 mx-auto h-24 w-full max-w-[18rem] overflow-visible sm:h-[6.5rem] md:mx-0 md:h-28",
        className,
      )}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ backgroundColor: softBg }}
        initial={false}
        animate={{ opacity: shellOpacity * (active || mobileStatic || reduce ? 1 : 0.85) }}
        transition={fadeTransition}
      />
      <motion.svg
        viewBox="0 0 280 96"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={false}
        animate={{ opacity: shellOpacity }}
        transition={fadeTransition}
      >
        {children}
      </motion.svg>
    </div>
  );
}

type AnimatedRouteProps = {
  d: string;
  color: string;
  active: boolean;
  reduce: boolean;
  mobileStatic: boolean;
};

export function AnimatedRoute({
  d,
  color,
  active,
  reduce,
  mobileStatic,
}: AnimatedRouteProps) {
  const drawn = active || mobileStatic || reduce;
  // Base route always faintly present on desktop
  const idle = !drawn;

  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={2.25}
      strokeLinecap="round"
      // Do NOT set strokeDasharray manually — conflicts with Framer pathLength
      initial={false}
      animate={{
        pathLength: drawn ? 1 : 0.55,
        opacity: drawn ? 0.85 : idle ? 0.4 : 0,
      }}
      transition={
        reduce || mobileStatic
          ? { duration: 0.2 }
          : { ...routeTransition, delay: active ? 0.08 : 0 }
      }
    />
  );
}

type DestinationPulseProps = {
  cx: number;
  cy: number;
  color: string;
  active: boolean;
  reduce: boolean;
  mobileStatic: boolean;
  delay?: number;
};

export function DestinationPulse({
  cx,
  cy,
  color,
  active,
  reduce,
  mobileStatic,
  delay = 1.1,
}: DestinationPulseProps) {
  const full = active || mobileStatic || reduce;

  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={7}
        fill={color}
        initial={false}
        animate={{
          opacity: full ? 1 : 0.45,
          scale: full ? 1 : 0.85,
        }}
        transition={
          reduce || mobileStatic
            ? { duration: 0.2 }
            : { duration: 0.35, delay: active ? delay : 0, ease: storyEase }
        }
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {!reduce && !mobileStatic && active ? (
        <motion.circle
          cx={cx}
          cy={cy}
          r={7}
          stroke={color}
          strokeWidth={1.5}
          fill="none"
          initial={{ opacity: 0.75, scale: 1 }}
          animate={{ opacity: 0, scale: 2.4 }}
          transition={{ duration: 0.55, delay, ease: storyEase }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ) : null}
    </g>
  );
}

type TravelerProps = {
  active: boolean;
  reduce: boolean;
  mobileStatic: boolean;
  fromX: number;
  toX: number;
  y?: number;
  children: ReactNode;
};

/** Horizontal travel in SVG user units via CSS px approx 1:1 at this viewBox width. */
export function Traveler({
  active,
  reduce,
  mobileStatic,
  fromX,
  toX,
  y = 0,
  children,
}: TravelerProps) {
  const atEnd = reduce || mobileStatic;
  const x = atEnd ? toX : active ? toX : fromX;

  return (
    <motion.g
      initial={false}
      animate={{ x, y }}
      transition={
        atEnd
          ? { duration: 0.2 }
          : {
              x: {
                ...travelTransition,
                delay: active ? 0.22 : 0,
              },
              y: { duration: 0.2 },
            }
      }
    >
      {children}
    </motion.g>
  );
}

type SpinWheelProps = {
  cx: number;
  cy: number;
  r?: number;
  color: string;
  spinning: boolean;
};

export function SpinWheel({
  cx,
  cy,
  r = 6,
  color,
  spinning,
}: SpinWheelProps) {
  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      animate={spinning ? { rotate: 360 } : { rotate: 0 }}
      transition={
        spinning
          ? { duration: 0.5, repeat: Infinity, ease: "linear" }
          : { duration: 0.2 }
      }
    >
      <circle cx={cx} cy={cy} r={r} fill="#1C1917" stroke={color} strokeWidth={1.6} />
      <path d={`M ${cx} ${cy - r} L ${cx} ${cy + r}`} stroke={color} strokeWidth={1.25} />
      <path d={`M ${cx - r} ${cy} L ${cx + r} ${cy}`} stroke={color} strokeWidth={1.25} />
    </motion.g>
  );
}

/** Soft always-on cue for origin buildings etc. */
export function BaseCue({
  active,
  reduce,
  mobileStatic,
  children,
}: {
  active: boolean;
  reduce: boolean;
  mobileStatic: boolean;
  children: ReactNode;
}) {
  const full = active || mobileStatic || reduce;
  return (
    <motion.g
      initial={false}
      animate={{ opacity: full ? 1 : 0.55 }}
      transition={fadeTransition}
    >
      {children}
    </motion.g>
  );
}
