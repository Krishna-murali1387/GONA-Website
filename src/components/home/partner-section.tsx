"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const PARTNERS = [
  {
    id: "delivery",
    label: "Delivery Partner",
    x: 48,
    y: 42,
    silhouette: "bag" as const,
  },
  {
    id: "repair",
    label: "Repair Technician",
    x: 280,
    y: 28,
    silhouette: "tool" as const,
  },
  {
    id: "vehicle",
    label: "Vehicle Partner",
    x: 430,
    y: 120,
    silhouette: "wheel" as const,
  },
  {
    id: "fashion",
    label: "Fashion Partner",
    x: 360,
    y: 260,
    silhouette: "store" as const,
  },
  {
    id: "local-community",
    label: "Local / Community Partner",
    x: 90,
    y: 250,
    silhouette: "people" as const,
  },
] as const;

const CENTER = { x: 250, y: 160 };

function Silhouette({ type }: { type: (typeof PARTNERS)[number]["silhouette"] }) {
  const stroke = "#FFD400";
  switch (type) {
    case "bag":
      return (
        <path
          d="M14 10 H26 V28 H14 Z M17 10 V8 H23 V10"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      );
    case "tool":
      return (
        <path
          d="M12 26 L20 12 L24 15 L16 28 Z M22 10 L28 14"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case "wheel":
      return (
        <>
          <circle cx="20" cy="20" r="9" fill="none" stroke={stroke} strokeWidth="1.8" />
          <circle cx="20" cy="20" r="3" fill={stroke} />
        </>
      );
    case "store":
      return (
        <path
          d="M10 16 L20 10 L30 16 V28 H10 Z M16 28 V20 H24 V28"
          fill="none"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      );
    case "people":
      return (
        <>
          <circle cx="14" cy="14" r="4" fill="none" stroke={stroke} strokeWidth="1.8" />
          <circle cx="26" cy="14" r="4" fill="none" stroke={stroke} strokeWidth="1.8" />
          <path
            d="M8 28 C8 22 11 20 14 20 C17 20 20 22 20 28 M20 28 C20 22 23 20 26 20 C29 20 32 22 32 28"
            fill="none"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      );
  }
}

/**
 * Partner ecosystem — stronger connection story for W4.1.
 */
export function PartnerSection() {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      aria-labelledby="partner-heading"
      className="relative overflow-hidden bg-[#EDE8DC] py-16 md:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F8F6F1] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(255,212,0,0.18),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#E8DFD0]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-12 xl:gap-16">
          <div className="max-w-lg">
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-gona-gray uppercase">
              Partners
            </p>
            <h2
              id="partner-heading"
              className="font-display text-4xl leading-[1.05] text-gona-black md:text-5xl lg:text-[3.25rem]"
            >
              Grow With
              <span className="mt-1 block">GONA.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gona-gray md:text-lg">
              Businesses, service providers and community partners can become
              part of the GONA ecosystem.
            </p>
            <p className="mt-4 text-sm font-medium tracking-wide text-gona-black/70">
              Different partners → connect into → one ecosystem
            </p>
          <Link
            href={siteConfig.routes.partners}
            className="gona-btn gona-btn-primary mt-8"
          >
            Partner With GONA
            <span aria-hidden="true">→</span>
          </Link>
          </div>

          {/* Desktop / tablet connection diagram */}
          <motion.div
            className="relative mx-auto hidden w-full max-w-xl sm:block"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.55 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 500 320" className="h-auto w-full">
              <defs>
                <radialGradient id="partnerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFD400" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx={CENTER.x} cy={CENTER.y} r="70" fill="url(#partnerGlow)" />

              {PARTNERS.map((p, i) => {
                const mx = (p.x + CENTER.x) / 2 + (i % 2 === 0 ? 18 : -18);
                const my = (p.y + CENTER.y) / 2 - 20;
                return (
                  <motion.path
                    key={p.id}
                    d={`M${p.x + 28} ${p.y + 28} Q${mx} ${my} ${CENTER.x} ${CENTER.y}`}
                    fill="none"
                    stroke="#FFD400"
                    strokeWidth="2"
                    strokeOpacity="0.55"
                    initial={reducedMotion ? false : { pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.9, delay: 0.08 * i }}
                  />
                );
              })}

              {/* Center hub */}
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r="36"
                fill="#FFD400"
                className="drop-shadow-sm"
              />
              <text
                x={CENTER.x}
                y={CENTER.y + 5}
                textAnchor="middle"
                fill="#111111"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-display), system-ui"
              >
                GONA
              </text>

              {PARTNERS.map((p, i) => (
                <motion.g
                  key={`${p.id}-node`}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.4, delay: 0.12 * i }}
                  style={{ transformOrigin: `${p.x + 28}px ${p.y + 28}px` }}
                >
                  <rect
                    x={p.x}
                    y={p.y}
                    width="56"
                    height="56"
                    rx="16"
                    fill="#111111"
                  />
                  <g transform={`translate(${p.x + 8}, ${p.y + 8})`}>
                    <Silhouette type={p.silhouette} />
                  </g>
                  {p.id === "local-community" ? (
                    <text
                      x={p.x + 28}
                      y={p.y + 72}
                      textAnchor="middle"
                      fill="#111111"
                      fontSize="11"
                      fontWeight="600"
                      fontFamily="var(--font-sans), system-ui"
                    >
                      <tspan x={p.x + 28} dy="0">
                        Local /
                      </tspan>
                      <tspan x={p.x + 28} dy="13">
                        Community
                      </tspan>
                    </text>
                  ) : (
                    <text
                      x={p.x + 28}
                      y={p.y + 74}
                      textAnchor="middle"
                      fill="#111111"
                      fontSize="11"
                      fontWeight="600"
                      fontFamily="var(--font-sans), system-ui"
                    >
                      {p.label}
                    </text>
                  )}
                </motion.g>
              ))}
            </svg>
          </motion.div>

          {/* Mobile: stacked readable partner list with path motif */}
          <ul className="space-y-3 sm:hidden" aria-label="Partner types">
            {PARTNERS.map((p, i) => (
              <motion.li
                key={p.id}
                className="flex items-center gap-3 rounded-2xl border border-gona-black/8 bg-gona-white/70 px-4 py-3.5"
                initial={reducedMotion ? false : { opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.4, delay: 0.06 * i }}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gona-black text-gona-yellow">
                  <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
                    <Silhouette type={p.silhouette} />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-gona-black">
                  {p.label}
                </span>
                <span
                  className="ml-auto h-px w-8 bg-gona-yellow"
                  aria-hidden="true"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function PartnerSectionPlaceholder() {
  return <PartnerSection />;
}
