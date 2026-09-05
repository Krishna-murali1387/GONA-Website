"use client";

import Link from "next/link";

import { ServiceVisual } from "@/components/home/service-carousel/service-visual";
import type { GonaService } from "@/config/site.config";
import { cn } from "@/lib/cn";

type ServiceOrbitCardProps = {
  service: GonaService;
  /** Middle copy is announced to AT; clones are hidden */
  inertClone?: boolean;
  cardRef: (el: HTMLElement | null) => void;
};

const ACCENT_RING: Record<string, string> = {
  grocery: "rgba(120, 180, 70, 0.22)",
  healthcare: "rgba(140, 200, 210, 0.2)",
  repair: "rgba(255, 180, 60, 0.2)",
  "vehicle-booking": "rgba(120, 170, 220, 0.2)",
  fashion: "rgba(220, 180, 200, 0.18)",
  farming: "rgba(140, 180, 80, 0.2)",
  local: "rgba(255, 122, 26, 0.35)",
};

export function ServiceOrbitCard({
  service,
  inertClone = false,
  cardRef,
}: ServiceOrbitCardProps) {
  const isLocal = service.id === "local";
  const accent = ACCENT_RING[service.id] ?? "rgba(255,212,0,0.2)";

  return (
    <article
      ref={cardRef}
      className={cn(
        "gona-orbit-card absolute top-1/2 left-0 origin-center -translate-y-1/2 will-change-transform",
        "rounded-[1.75rem] border bg-[#121212] text-gona-white",
      )}
      style={{
        boxShadow: isLocal
          ? `0 22px 55px rgba(0,0,0,0.4), 0 0 calc(36px * var(--gona-glow, 0)) rgba(255,122,26,calc(0.28 * var(--gona-glow, 0)))`
          : `0 22px 55px rgba(0,0,0,0.4), 0 0 calc(32px * var(--gona-glow, 0)) rgba(255,212,0,calc(0.26 * var(--gona-glow, 0)))`,
        borderColor: isLocal
          ? `rgba(255, 122, 26, calc(0.12 + 0.5 * var(--gona-glow, 0)))`
          : `rgba(255, 212, 0, calc(0.08 + 0.42 * var(--gona-glow, 0)))`,
        backgroundImage: `radial-gradient(ellipse 80% 55% at 50% 0%, ${accent}, transparent 58%)`,
      }}
      aria-hidden={inertClone ? true : undefined}
      data-service={service.id}
    >
      <div className="flex h-full flex-col p-3.5 sm:p-4">
        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-[1.25rem] ring-1 ring-white/5">
          <ServiceVisual serviceId={service.id} inertClone={inertClone} />
        </div>

        <div className="flex min-h-[9.5rem] flex-1 flex-col px-1 pb-1">
          <p
            className={cn(
              "text-[0.65rem] font-semibold tracking-[0.18em] uppercase",
              isLocal ? "text-gona-local-orange" : "text-gona-yellow",
            )}
            style={{ opacity: "var(--gona-name, 0.7)" }}
          >
            {isLocal ? "Community" : "Service"}
          </p>
          <h3
            className="mt-1.5 font-display text-xl font-bold tracking-tight text-white sm:text-[1.35rem]"
            style={{ opacity: "var(--gona-name, 0.7)" }}
          >
            {service.name}
          </h3>

          {/* Description — only near center */}
          <p
            className="mt-2 text-sm leading-relaxed text-white/70"
            style={{
              opacity: "var(--gona-desc, 0)",
              maxHeight: "calc(var(--gona-desc, 0) * 3.4rem)",
              overflow: "hidden",
              transform: "translateY(calc((1 - var(--gona-desc, 0)) * 6px))",
            }}
          >
            {service.carouselLine}
          </p>

          <div
            className="mt-auto pt-3"
            style={{
              opacity: "var(--gona-cta, 0)",
              transform: "translateY(calc((1 - var(--gona-cta, 0)) * 12px))",
              pointerEvents: "var(--gona-cta-pe, none)" as React.CSSProperties["pointerEvents"],
            }}
          >
            <Link
              href={service.href}
              tabIndex={inertClone ? -1 : 0}
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-[transform,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow",
                isLocal
                  ? "bg-gona-local-orange text-gona-black hover:-translate-y-0.5"
                  : "bg-gona-yellow text-gona-black hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,212,0,0.28)]",
              )}
              data-orbit-cta="true"
              onClick={(event) => event.stopPropagation()}
            >
              Explore {service.shortName}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
