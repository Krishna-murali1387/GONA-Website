"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import type { FeatureCard } from "@/config/cable-product.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Enough copies for 1920px+ viewports even with shorter lanes. */
const LOOP_COPIES = 3;

function MiniVisual({ visual }: { visual: FeatureCard["visual"] }) {
  const base =
    "rounded-md border border-[#111111]/8 bg-white/70 px-2 py-1.5 text-[0.6rem] font-semibold text-[#111111]/75";
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
              className="rounded-full border border-[#111111]/1 bg-white/80 px-2 py-0.5 text-[0.58rem] font-bold tracking-wide text-[#111111]/75"
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
        <div className="mt-3 rounded-lg border border-[#111111]/1 bg-white/85 p-2.5 shadow-sm">
          <p className="text-[0.65rem] font-extrabold tracking-wide">INVOICE</p>
          <p className="mt-1 text-[0.58rem] text-[#5A6570]">Billing Period</p>
          <p className="mt-0.5 text-[0.58rem] text-[#5A6570]">Status</p>
        </div>
      );
    case "receipt":
      return (
        <div className="mt-3 rounded-lg border border-[#111111]/1 bg-white/85 p-2.5 shadow-sm">
          <p className="text-[0.65rem] font-extrabold tracking-wide">RECEIPT</p>
          <p className="mt-1 text-[0.58rem] text-[#5A6570]">Payment Recorded</p>
          <p className="mt-0.5 text-[0.58rem] font-bold text-[#111111]/7">CASH / UPI</p>
        </div>
      );
    case "whatsapp":
      return (
        <div className="mt-3 space-y-1.5 rounded-lg border border-[#111111]/08 bg-white/85 p-2">
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
        <div className="mt-3 rounded-lg border border-dashed border-[#111111]/15 bg-white/80 px-2 py-2 text-[0.6rem] font-semibold text-[#5A6570]">
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
          background: `linear-gradient(165deg, color-mix(in srgb, ${card.accent} 22%, #ffffff) 0%, color-mix(in srgb, ${card.accent} 10%, #ffffff) 48%, #ffffff 100%)`,
        } as CSSProperties
      }
    >
      <div
        className="cv41-card-icon flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: `color-mix(in srgb, ${card.accent} 28%, white)`,
          color: card.accent,
          boxShadow: `0 0 0 1px color-mix(in srgb, ${card.accent} 25%, transparent)`,
        }}
      >
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: card.accent }} />
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
                background: `color-mix(in srgb, ${card.accent} 18%, white)`,
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

function measureSetWidth(track: HTMLElement, cardsPerSet: number): number {
  const kids = Array.from(track.children) as HTMLElement[];
  if (kids.length < cardsPerSet) return track.scrollWidth / LOOP_COPIES;
  const first = kids[0];
  const lastInSet = kids[cardsPerSet - 1];
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
  // Distance from start of first card to start of first card of next set
  return lastInSet.offsetLeft + lastInSet.offsetWidth + gap - first.offsetLeft;
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
  const setWidthRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      setWidthRef.current = measureSetWidth(track, cards.length);
      // LTR must start on a full set so content already fills the left edge
      if (direction === "ltr" && setWidthRef.current > 0) {
        offsetRef.current = -setWidthRef.current;
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      } else if (direction === "rtl") {
        offsetRef.current = 0;
        track.style.transform = "translate3d(0, 0, 0)";
      }
    };

    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(track);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      const setW = setWidthRef.current;
      if (setW <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const base = mobile ? mobileSpeed : desktopSpeed;
      const speed = base * (hoveringRef.current && !mobile ? 0.55 : 1);

      if (direction === "rtl") {
        offsetRef.current -= speed * dt;
        if (offsetRef.current <= -setW) {
          offsetRef.current += setW;
        }
      } else {
        offsetRef.current += speed * dt;
        if (offsetRef.current >= 0) {
          offsetRef.current -= setW;
        }
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [reduced, direction, desktopSpeed, mobileSpeed, cards.length]);

  if (reduced) {
    return (
      <div className="mt-8">
        <p className="mb-3 px-5 text-xs font-bold tracking-[0.22em] text-[#241653]/70 uppercase sm:px-6">
          {label}
        </p>
        <div className="flex gap-4 overflow-x-auto px-5 pb-2 sm:px-6">
          {cards.map((card) => (
            <FeatureCardView key={card.id} card={card} />
          ))}
        </div>
      </div>
    );
  }

  const loop = Array.from({ length: LOOP_COPIES }, () => cards).flat();

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
      <div className="cv41-lane-mask px-5 sm:px-6">
        <div
          ref={trackRef}
          className="cv41-lane-track flex w-max gap-4 sm:gap-5"
          aria-label={`${label} feature cards`}
        >
          {loop.map((card, i) => (
            <FeatureCardView
              key={`${card.id}-${Math.floor(i / cards.length)}-${i % cards.length}`}
              card={card}
            />
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
