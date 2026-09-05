"use client";

import Link from "next/link";
import { useMemo } from "react";

import { ServiceOrbitCard } from "@/components/home/service-carousel/service-orbit-card";
import { useCenterFocusTrack } from "@/components/home/service-carousel/use-center-focus-track";
import { Container } from "@/components/ui/container";
import { siteConfig, type ServiceId } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

const ENV_TINT: Record<ServiceId, string> = {
  grocery: "rgba(255, 212, 0, 0.08)",
  healthcare: "rgba(180, 210, 220, 0.07)",
  repair: "rgba(210, 170, 110, 0.07)",
  "vehicle-booking": "rgba(140, 180, 220, 0.07)",
  fashion: "rgba(220, 180, 210, 0.07)",
  farming: "rgba(150, 190, 110, 0.08)",
  local: "rgba(255, 122, 26, 0.12)",
};

/**
 * Signature GONA seven-service continuous center-focus experience.
 */
export function ServiceCarousel() {
  const reducedMotion = usePrefersReducedMotion();
  const services = siteConfig.services;
  const {
    viewportRef,
    trackRef,
    cardRefs,
    metrics,
    focusedId,
    copyCount,
    onPointerDown,
    stepBy,
  } = useCenterFocusTrack({
    services,
    reducedMotion,
    enabled: true,
  });

  const cards = useMemo(() => {
    const list: Array<{
      key: string;
      service: (typeof services)[number];
      copyIndex: number;
      index: number;
    }> = [];
    for (let copy = 0; copy < copyCount; copy += 1) {
      services.forEach((service, serviceIndex) => {
        const index = copy * services.length + serviceIndex;
        list.push({
          key: `${copy}-${service.id}`,
          service,
          copyIndex: copy,
          index,
        });
      });
    }
    return list;
  }, [services, copyCount]);

  const middleCopy = Math.floor(copyCount / 2);
  const focusedService =
    services.find((service) => service.id === focusedId) ?? services[0];
  const trackWidth = Math.max(metrics.segmentWidth * copyCount, 1);

  return (
    <section
      id="explore"
      aria-labelledby="gona-ecosystem-heading"
      className="relative scroll-mt-24 overflow-hidden bg-gona-light py-16 md:py-20 lg:py-24"
    >
      {/* Soft gallery atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 50% 62%, ${ENV_TINT[focusedId]}, transparent 68%),
            radial-gradient(ellipse 40% 30% at 50% 55%, rgba(255,212,0,0.06), transparent 70%)
          `,
          transition: "background 700ms ease",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-[8%] top-[42%] h-px bg-gradient-to-r from-transparent via-gona-yellow/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-[18%] top-[58%] opacity-[0.12]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(17,17,17,0.35) 0.7px, transparent 0.7px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 72%)",
          height: "38%",
        }}
      />

      {/* LOCAL-only environmental response outside the card */}
      {focusedId === "local" ? (
        <div
          className="pointer-events-none absolute top-[48%] left-1/2 z-[5] h-[22rem] w-[min(92%,34rem)] -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-gona-local-orange/10 blur-3xl" />
          <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 320">
            <path
              d="M200 160 L80 70 M200 160 L320 75 M200 160 L70 230 M200 160 L330 235"
              fill="none"
              stroke="rgba(255,122,26,0.35)"
              strokeWidth="1"
            />
            <circle cx="80" cy="70" r="3" fill="rgba(255,212,0,0.55)" />
            <circle cx="320" cy="75" r="3" fill="rgba(255,255,255,0.4)" />
            <circle cx="70" cy="230" r="3" fill="rgba(255,122,26,0.7)" />
            <circle cx="330" cy="235" r="3" fill="rgba(255,212,0,0.5)" />
          </svg>
        </div>
      ) : null}

      <Container className="relative z-10 mb-8 md:mb-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gona-gray uppercase">
          The GONA Ecosystem
        </p>
        <h2
          id="gona-ecosystem-heading"
          className="max-w-xl font-display text-3xl text-gona-black md:text-4xl lg:text-[2.75rem]"
        >
          Seven Services.
          <span className="block">One GONA.</span>
        </h2>
        <p className="mt-3 max-w-xl text-base text-gona-gray md:text-lg">
          Everyday needs, local services and your community — connected through
          one ecosystem.
        </p>
      </Container>

      <div
        ref={viewportRef}
        className={cn(
          "relative z-10 mx-auto h-[30rem] w-full touch-pan-y select-none sm:h-[32rem] md:h-[34rem] lg:h-[36rem]",
          "cursor-grab active:cursor-grabbing",
        )}
        onPointerDown={onPointerDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="GONA seven services"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            stepBy(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            stepBy(1);
          }
        }}
      >
        {/* Soft depth plate behind center */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[82%] w-[min(90%,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-[2.2rem] bg-gona-yellow/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.08)] ring-1 ring-gona-yellow/10"
          aria-hidden="true"
        />

        <div
          ref={trackRef}
          className="absolute inset-y-0 left-0 will-change-transform"
          style={{
            width: trackWidth,
            height: "100%",
          }}
        >
          {cards.map((card) => (
            <ServiceOrbitCard
              key={card.key}
              service={card.service}
              inertClone={card.copyIndex !== middleCopy}
              cardRef={(el) => {
                cardRefs.current[card.index] = el;
              }}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-gona-light to-transparent sm:w-20 md:w-28"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-gona-light to-transparent sm:w-20 md:w-28"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-gona-gray">
            {reducedMotion
              ? "Use arrows to move between services."
              : "Drag, swipe, or use arrow keys. Auto-moves when idle."}
          </p>
          <Link
            href={focusedService.href}
            className="text-sm font-semibold text-gona-black underline decoration-gona-yellow/70 underline-offset-4 hover:decoration-gona-yellow"
          >
            Explore {focusedService.name}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ControlButton label="Previous service" onClick={() => stepBy(-1)}>
            ←
          </ControlButton>
          <ControlButton label="Next service" onClick={() => stepBy(1)}>
            →
          </ControlButton>
        </div>
      </Container>

      <p className="sr-only" aria-live="polite">
        Focused service: {focusedService.name}
      </p>
    </section>
  );
}

function ControlButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-gona-white text-gona-black transition-colors hover:border-gona-yellow hover:bg-gona-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
    >
      {children}
    </button>
  );
}

/** @deprecated — W3 replaces placeholder */
export function ServiceCarouselPlaceholder() {
  return <ServiceCarousel />;
}
