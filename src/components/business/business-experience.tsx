"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { BusinessProductIcon } from "@/components/business/business-icons";
import {
  businessCopy,
  futureProducts,
  type FutureProductId,
} from "@/config/business.config";
import { cn } from "@/lib/cn";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryCta({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 min-h-12 items-center justify-center rounded-full bg-[#FFD400] px-7 text-sm font-extrabold tracking-wide text-[#111111] transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD400]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function SecondaryCta({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const internal = href.startsWith("/") || href.startsWith("#");
  const classes = cn(
    "inline-flex h-12 min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-7 text-sm font-bold tracking-wide text-white/90 transition hover:border-white/35 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50",
    className,
  );
  if (internal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

function HeroSystemVisual() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      aria-hidden
    >
      <div className="absolute inset-[8%] rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[18%] rounded-full border border-white/[0.08]" />
      <div className="absolute inset-[30%] rounded-full border border-[#FFD400]/20" />
      <div
        className={cn(
          "absolute inset-[38%] rounded-full bg-gradient-to-br from-[#FFD400]/25 via-[#FFD400]/05 to-transparent",
          !reduce && "animate-[pulse_6s_ease-in-out_infinite]",
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-[#161616]/90 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <p className="text-[0.65rem] font-bold tracking-[0.28em] text-[#FFD400]/90 uppercase">
            GONA BUSINESS
          </p>
          <p className="mt-2 font-[family-name:var(--font-gona-display)] text-lg font-bold text-white">
            Operating system
            <span className="mt-0.5 block text-sm font-medium text-white/45">
              for real businesses
            </span>
          </p>
        </div>
      </div>
      {/* Orbit nodes — abstract product family, not fake UI */}
      {[
        { label: "Cable", active: true, top: "8%", left: "42%" },
        { label: "Schools", active: false, top: "28%", left: "78%" },
        { label: "Industry", active: false, top: "62%", left: "82%" },
        { label: "Finance", active: false, top: "84%", left: "48%" },
        { label: "Events", active: false, top: "62%", left: "10%" },
        { label: "Workforce", active: false, top: "28%", left: "6%" },
      ].map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: node.top, left: node.left }}
        >
          <div
            className={cn(
              "rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide",
              node.active
                ? "border-[#FFD400]/45 bg-[#FFD400]/15 text-[#FFD400] shadow-[0_0_24px_rgba(255,212,0,0.25)]"
                : "border-white/10 bg-[#111111]/80 text-white/40",
            )}
          >
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CableProductWindow() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-3 text-[0.65rem] font-medium tracking-wide text-white/35">
          GONA Cable · Operations
        </span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {["Customers", "Collections", "Operators"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-4"
          >
            <div className="h-1.5 w-10 rounded-full bg-[#FFD400]/70" />
            <p className="mt-3 text-xs font-semibold text-white/80">{label}</p>
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/8" />
              <div className="h-1.5 w-[80%] rounded-full bg-white/6" />
              <div className="h-1.5 w-[60%] rounded-full bg-white/5" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-white/8">
            <div className="h-full w-[66%] rounded-full bg-[#FFD400]/55" />
          </div>
          <span className="text-[0.65rem] font-medium text-white/35">Live network</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,212,0,0.12),transparent_55%)]" />
    </div>
  );
}

function EcosystemOrbit() {
  const reduce = useReducedMotion();
  const items = businessCopy.ecosystem.products;
  // Positions around a circle for desktop; stack on mobile handled by CSS grid fallback
  const angles = [-90, -38, 14, 66, 118, 170, -142];

  return (
    <div className="relative mx-auto min-h-[320px] w-full max-w-3xl sm:min-h-[420px]">
      <div className="absolute inset-[12%] hidden rounded-full border border-white/[0.07] sm:block" />
      <div className="absolute inset-[22%] hidden rounded-full border border-white/[0.05] sm:block" />

      <div className="absolute left-1/2 top-1/2 z-10 w-[min(100%,14rem)] -translate-x-1/2 -translate-y-1/2">
        <div
          className={cn(
            "rounded-2xl border border-[#FFD400]/30 bg-[#141414] px-5 py-5 text-center shadow-[0_0_40px_rgba(255,212,0,0.12)]",
            !reduce && "shadow-[0_0_48px_rgba(255,212,0,0.14)]",
          )}
        >
          <p className="text-[0.65rem] font-bold tracking-[0.28em] text-[#FFD400] uppercase">
            {businessCopy.ecosystem.center}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/50">
            Professional software for operators of the real world.
          </p>
        </div>
      </div>

      {/* Desktop orbit */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
        {items.map((item, i) => {
          const angle = ((angles[i] ?? 0) * Math.PI) / 180;
          const r = 42;
          const x = 50 + r * Math.cos(angle);
          const y = 50 + r * Math.sin(angle);
          return (
            <div
              key={item.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide",
                  item.active
                    ? "border-[#FFD400]/50 bg-[#FFD400]/12 text-[#FFD400] shadow-[0_0_28px_rgba(255,212,0,0.28)]"
                    : "border-white/10 bg-[#111111]/90 text-white/40",
                )}
              >
                {item.label}
                {!item.active ? (
                  <span className="ml-1.5 text-[0.6rem] font-medium tracking-wider text-white/25 uppercase">
                    Soon
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile compact list under center */}
      <ul className="relative z-0 mx-auto mt-[11.5rem] grid max-w-sm grid-cols-2 gap-2 sm:hidden">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-center text-xs font-semibold",
              item.active
                ? "border-[#FFD400]/40 bg-[#FFD400]/10 text-[#FFD400]"
                : "border-white/8 bg-white/[0.02] text-white/40",
            )}
          >
            {item.label}
            {!item.active ? (
              <span className="mt-0.5 block text-[0.6rem] font-medium tracking-wider text-white/25 uppercase">
                Coming soon
              </span>
            ) : (
              <span className="mt-0.5 block text-[0.6rem] font-medium tracking-wider text-[#FFD400]/70 uppercase">
                Available
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BusinessExperience() {
  const { hero, flagship, future, philosophy, closing, links } = businessCopy;

  return (
    <main className="overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 10%, rgba(255,212,0,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 30%, rgba(255,255,255,0.04), transparent 50%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-32">
          <div>
            <p className="text-xs font-bold tracking-[0.35em] text-[#FFD400] uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl font-[family-name:var(--font-gona-display)] text-[2.15rem] leading-[1.12] font-extrabold tracking-tight sm:text-5xl lg:text-[3.35rem]">
              <span className="block">{hero.headline[0]}</span>
              <span className="mt-1 block text-white/88">{hero.headline[1]}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
              {hero.support}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryCta href={links.cableProduct}>{hero.primaryCta}</PrimaryCta>
              <SecondaryCta href={`#${future.id}`}>{hero.secondaryCta}</SecondaryCta>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroSystemVisual />
          </div>
        </div>
      </section>

      {/* ─── Flagship Cable ─── */}
      <section className="relative border-t border-white/8">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              <div>
                <span className="inline-flex items-center rounded-full border border-[#FFD400]/35 bg-[#FFD400]/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.22em] text-[#FFD400] uppercase">
                  {flagship.badge}
                </span>
                <h2 className="mt-5 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {flagship.name}
                </h2>
                <p className="mt-2 text-sm font-semibold tracking-wide text-white/45 sm:text-base">
                  {flagship.subtitle}
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
                  {flagship.line}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryCta href={links.cableProduct}>{flagship.explore}</PrimaryCta>
                  <SecondaryCta href={links.cableRegister}>{flagship.register}</SecondaryCta>
                </div>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(255,212,0,0.12),transparent_65%)]" />
                <CableProductWindow />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Future products ─── */}
      <section
        id={future.id}
        className="scroll-mt-24 border-t border-white/8 bg-[#101010]"
      >
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <h2 className="max-w-2xl font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block">{future.heading[0]}</span>
              <span className="mt-1 block text-white/75">{future.heading[1]}</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/55">
              {future.support}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {futureProducts.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 0.06, 0.3)}>
                <article
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent p-5 transition hover:border-white/14"
                  style={{
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px transparent`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl transition group-hover:opacity-45"
                    style={{ background: product.accent }}
                  />
                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/30"
                      style={{ color: product.accent }}
                    >
                      <BusinessProductIcon
                        id={product.id as FutureProductId}
                        className="h-7 w-7"
                        accent={product.accent}
                      />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.18em] text-white/40 uppercase">
                      Coming soon
                    </span>
                  </div>
                  <h3 className="relative mt-5 font-[family-name:var(--font-gona-display)] text-lg font-bold tracking-tight text-white/90">
                    {product.name}
                  </h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-white/45">
                    {product.subtitle}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Philosophy ─── */}
      <section className="border-t border-white/8">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <h2 className="max-w-xl font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block">{philosophy.heading[0]}</span>
              <span className="mt-1 block text-white/75">{philosophy.heading[1]}</span>
            </h2>
          </Reveal>
          <ol className="mt-12 space-y-0 border-t border-white/10">
            {philosophy.principles.map((line, index) => (
              <Reveal key={line} delay={index * 0.05}>
                <li className="group flex items-baseline gap-5 border-b border-white/10 py-6 sm:gap-8 sm:py-8">
                  <span className="w-8 shrink-0 font-mono text-xs tracking-widest text-[#FFD400]/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-[family-name:var(--font-gona-display)] text-xl font-semibold tracking-tight text-white/88 transition group-hover:text-white sm:text-2xl md:text-3xl">
                    {line}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Ecosystem ─── */}
      <section className="border-t border-white/8 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <p className="text-center text-xs font-bold tracking-[0.3em] text-white/35 uppercase">
              The GONA Business family
            </p>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <EcosystemOrbit />
          </Reveal>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <section className="relative overflow-hidden border-t border-white/8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,212,0,0.12), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.35em] text-[#FFD400] uppercase">
              {closing.eyebrow}
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              <span className="block">{closing.headline[0]}</span>
              <span className="mt-1 block">{closing.headline[1]}</span>
            </h2>
            <p className="mt-5 text-base text-white/55">{closing.support}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PrimaryCta href={links.cableProduct}>{closing.explore}</PrimaryCta>
              <SecondaryCta href={links.cableRegister}>{closing.register}</SecondaryCta>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
