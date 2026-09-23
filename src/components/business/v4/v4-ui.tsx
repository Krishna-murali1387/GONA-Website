"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { useIsFinePointer } from "@/components/business/v4/v4-hooks";
import { cn } from "@/lib/cn";

type CtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "yellow" | "black" | "outline" | "outlineDark";
  external?: boolean;
  magnetic?: boolean;
};

export function V4Cta({
  href,
  children,
  className,
  variant = "yellow",
  external,
  magnetic = true,
}: CtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useIsFinePointer();
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || !fine) return;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      target.current.x = Math.max(-4, Math.min(4, dx * 0.08));
      target.current.y = Math.max(-3, Math.min(3, dy * 0.08));
    };
    const onLeave = () => {
      target.current.x = 0;
      target.current.y = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf.current = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf.current);
      el.style.transform = "";
    };
  }, [magnetic, fine]);

  const styles = {
    yellow:
      "bg-[#FFD400] text-[#111111] hover:brightness-105 focus-visible:outline-[#111111]",
    black:
      "bg-[#111111] text-white hover:bg-[#222] focus-visible:outline-[#FFD400]",
    outline:
      "border border-[#111111]/20 bg-transparent text-[#111111] hover:border-[#111111]/45 focus-visible:outline-[#111111]",
    outlineDark:
      "border border-white/25 bg-transparent text-white hover:border-white/45 focus-visible:outline-white",
  } as const;

  const classes = cn(
    "group inline-flex h-12 min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-extrabold tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-4",
    styles[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("#")) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={classes}>
      {content}
    </Link>
  );
}

export function SoftFrame({
  title,
  children,
  className,
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "field" | "customer";
}) {
  const tones = {
    light: "border-[#111111]/10 bg-white shadow-[0_24px_60px_rgba(17,17,17,0.08)]",
    field: "border-[#111111]/10 bg-[#F3EFE6] shadow-[0_20px_50px_rgba(17,17,17,0.08)]",
    customer: "border-[#111111]/10 bg-[#FFFEFA] shadow-[0_20px_50px_rgba(17,17,17,0.07)]",
  } as const;
  return (
    <div className={cn("overflow-hidden rounded-2xl border", tones[tone], className)}>
      <div className="flex items-center gap-1.5 border-b border-[#111111]/06 px-3 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#111111]/2" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#111111]/2" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#111111]/2" />
        <span className="ml-2 text-[0.65rem] font-semibold tracking-wide text-[#111111]/4">
          {title}
        </span>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}
