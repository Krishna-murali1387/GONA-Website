"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function BizPrimaryCta({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex h-12 min-h-12 items-center justify-center rounded-full bg-[#111111] px-7 text-sm font-extrabold tracking-wide text-white transition hover:bg-[#222222] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD400]",
    className,
  );
  if (external) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function BizYellowCta({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex h-12 min-h-12 items-center justify-center rounded-full bg-[#FFD400] px-7 text-sm font-extrabold tracking-wide text-[#111111] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]",
    className,
  );
  if (external) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function BizSecondaryCta({
  href,
  children,
  className,
  external,
  onDark,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onDark?: boolean;
}) {
  const classes = cn(
    "inline-flex h-12 min-h-12 items-center justify-center rounded-full border px-7 text-sm font-bold tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-4",
    onDark
      ? "border-white/25 bg-white/[0.04] text-white hover:border-white/40 focus-visible:outline-white/60"
      : "border-[#111111]/15 bg-white text-[#111111] hover:border-[#111111]/35 focus-visible:outline-[#111111]",
    className,
  );
  if (external || href.startsWith("http") || href.startsWith("#")) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} className={classes} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function SoftWindow({
  title,
  children,
  className,
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark" | "field";
}) {
  const tones = {
    light: "border-[#111111]/8 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.08)]",
    dark: "border-white/10 bg-[#161616] shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
    field: "border-[#111111]/10 bg-[#F7F4EE] shadow-[0_20px_50px_rgba(17,17,17,0.08)]",
  } as const;
  const bar =
    tone === "dark"
      ? "border-white/8 text-white/40"
      : "border-[#111111]/6 text-[#111111]/35";
  const dots = tone === "dark" ? "bg-white/20" : "bg-[#111111]/15";

  return (
    <div className={cn("overflow-hidden rounded-2xl border", tones[tone], className)}>
      <div className={cn("flex items-center gap-1.5 border-b px-4 py-3", bar)}>
        <span className={cn("h-2 w-2 rounded-full", dots)} />
        <span className={cn("h-2 w-2 rounded-full", dots)} />
        <span className={cn("h-2 w-2 rounded-full", dots)} />
        <span className="ml-3 text-[0.65rem] font-semibold tracking-wide">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function LabelChip({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-bold tracking-wide",
        active
          ? "border-[#FFD400]/50 bg-[#FFD400]/15 text-[#6B5A00]"
          : "border-[#111111]/10 bg-white text-[#111111]/55",
      )}
    >
      {children}
    </span>
  );
}
