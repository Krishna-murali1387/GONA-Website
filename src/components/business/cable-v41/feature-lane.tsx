"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import type { FeatureCard } from "@/config/cable-product.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function MiniVisual({ visual }: { visual: FeatureCard["visual"] }) {
  const base = "rounded-md border border-[#111111]/8 bg-[#FAF8F5] px-2 py-1.5 text-[0.6rem] font-semibold text-[#111111]/7";
  switch (visual) {
    case "customers":
      return (
        <div className="mt-3 space-y-1">
          {["NAME", "CUSTOMER ID", "MOBILE", "STATUS"].map((t) => (
            <div key={t} className={base}>
              {t}
            </div>
          ))}
        </div>
      );
    case "dues":
      return (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["PAID", "PART PAID", "DUE"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#111111]/1 bg-white px-2 py-0.5 text-[0.58rem] font-bold tracking-wide text-[#111111]/7"
            >
              {t}
            </span>
          ))}
        </div>
      );
    case "collections":
      return (
        <div className="mt-3 flex gap-1.5">
          {["CASH", "UPI"].map((t) => (
            <span
              key={t}
              className="rounded-lg bg-[#111111] px-2.5 py-1 text-[0.6rem] font-bold text-white"
            >
              {t}
            </span>
          ))}
        </div>
      );
    case "invoice":
      return (
        <div className="mt-3 rounded-lg border border-[#111111]/1 bg-white p-2.5 shadow-sm">
          <p className="text-[0.65rem] font-extrabold tracking-wide">INVOICE</p>
          <p className="mt-1 text-[0.58rem] text-[#5A6570]">Billing Period</p>
          <p className="mt-0.5 text-[0.58rem] text-[#5A6570]">Status</p>
        </div>
      );
    case "receipt":
      return (
        <div className="mt-3 rounded-lg border border-[#111111]/1 bg-white p-2.5 shadow-sm">
          <p className="text-[0.65rem] font-extrabold tracking-wide">RECEIPT</p>
          <p className="mt-1 text-[0.58rem] text-[#5A6570]">Payment Recorded</p>
          <p className="mt-0.5 text-[0.58rem] font-bold text-[#111111]/7">CASH / UPI</p>
        </div>
      );
    case "whatsapp":
      return (
        <div className="mt-3 space-y-1.5 rounded-lg border border-[#111111]/08 bg-white p-2">
          <div className="h-1.5 w-[75%] rounded-full bg-[#111111]/1" />
          <div className="h-1.5 w-1/2 rounded-full bg-[#111111]/08" />
          <div className="h-1.5 w-[66%] rounded-full bg-[#111111]/06" />
        </div>
      );
    case "complaints":
      return (
        <div className="mt-3 flex flex-wrap gap-1">
          {["OPEN", "…", "RESOLVED"].map((t) => (
            <span key={t} className="text-[0.58rem] font-bold tracking-wide text-[#111111]/55">
              {t}
            </span>
          ))}
        </div>
      );
    case "devices":
      return (
        <div className="mt-3 flex gap-1.5">
          {["STB", "Smart Card"].map((t) => (
            <span key={t} className={base}>
              {t}
            </span>
          ))}
        </div>
      );
    case "search360":
      return (
        <div className="mt-3 rounded-lg border border-dashed border-[#111111]/15 bg-white px-2 py-2 text-[0.6rem] font-semibold text-[#5A6570]">
          Search identifiers → status · plan · devices
        </div>
      );
    default:
      return null;
  }
}

function FeatureCardView({ card }: { card: FeatureCard }) {
  return (
    <article
      className="cv41-feature-card relative shrink-0 overflow-hidden p-5"
      style={
        {
          "--card-accent": card.accent,
          background: `linear-gradient(165deg, color-mix(in srgb, ${card.accent} 7%, #ffffff) 0%, #ffffff 55%)`,
        } as CSSProperties
      }
    >
      <div
        className="cv41-card-icon flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: `color-mix(in srgb, ${card.accent} 14%, white)`,
          color: card.accent,
        }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: card.accent }} />
      </div>
      <h3 className="mt-3 font-[family-name:var(--font-gona-display)] text-xl font-bold tracking-tight text-[#111111]">
        {card.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#5A6570]">{card.body}</p>
      {card.tags ? (
        <div className="mt-3 flex flex-wrap gap-1">
          {card.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full px-2 py-0.5 text-[0.58rem] font-bold tracking-wide uppercase"
              style={{
                color: card.accent,
                background: `color-mix(in srgb, ${card.accent} 10%, white)`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
      <MiniVisual visual={card.visual} />
    </article>
  );
}

export function FeatureLane({
  label,
  direction,
  cards,
  desktopSpeed = 82,
  mobileSpeed = 52,
}: {
  label: string;
  direction: "rtl" | "ltr";
  cards: readonly FeatureCard[];
  desktopSpeed?: number;
  mobileSpeed?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();
    const sign = direction === "rtl" ? -1 : 1;

    const tick = (now: number) => {
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const base = mobile ? mobileSpeed : desktopSpeed;
      const speed = base * (hoveringRef.current && !mobile ? 0.55 : 1) * sign;
      offsetRef.current += speed * dt;

      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (sign < 0 && -offsetRef.current >= half) offsetRef.current += half;
        if (sign > 0 && offsetRef.current >= half) offsetRef.current -= half;
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, direction, desktopSpeed, mobileSpeed]);

  if (reduced) {
    return (
      <div className="mt-8">
        <p className="mb-3 px-5 text-xs font-bold tracking-[0.22em] text-[#241653]/70 uppercase sm:px-6">
          {label}
        </p>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 sm:px-6">
          {cards.map((c) => (
            <FeatureCardView key={c.id} card={c} />
          ))}
        </div>
      </div>
    );
  }

  const loop = [...cards, ...cards];

  return (
    <div
      className="mt-8"
      onPointerEnter={() => {
        hoveringRef.current = true;
      }}
      onPointerLeave={() => {
        hoveringRef.current = false;
      }}
    >
      <p className="mb-3 px-5 text-xs font-bold tracking-[0.22em] text-[#241653]/70 uppercase sm:px-6">
        {label}
      </p>
      <div className="cv41-lane-mask">
        <div ref={trackRef} className="cv41-lane-track flex w-max gap-4 px-5 sm:gap-5 sm:px-6">
          {loop.map((c, i) => (
            <FeatureCardView key={`${c.id}-${i < cards.length ? "a" : "b"}`} card={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      {children}
    </section>
  );
}
