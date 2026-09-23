"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { BizSecondaryCta, BizYellowCta, Reveal } from "@/components/business/business-ui";
import { FeatureLane, SectionShell } from "@/components/business/cable-v41/feature-lane";
import {
  cableFeatureLanes,
  cableIdentity as CV,
  cableProductCopy as c,
} from "@/config/cable-product.config";

import "./cable-v41.css";

const NAV = [
  { id: "cable-overview", label: "Overview" },
  { id: "cable-owner", label: "Owner" },
  { id: "cable-operator", label: "Operator" },
  { id: "cable-customer", label: "Customer" },
  { id: "cable-billing", label: "Billing" },
  { id: "cable-comms", label: "Communication" },
  { id: "cable-ops", label: "Operations" },
  { id: "cable-start", label: "Get Started" },
] as const;

function BackToBusiness({ className = "" }: { className?: string }) {
  return (
    <Link
      href={c.backHref}
      className={`cv41-back focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD400] ${className}`}
      aria-label="Back to GONA Business"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M10 3L5 8l5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {c.backLabel}
    </Link>
  );
}

function CableStickyNav() {
  const [active, setActive] = useState<string>(NAV[0].id);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Cable product sections" className="cv41-sticky sticky top-16 z-30 md:top-[4.5rem]">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {NAV.map((item) => {
          const on = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD400] ${
                on ? "text-white" : "text-[#5A6570] hover:bg-[#6D4AFF]/8 hover:text-[#241653]"
              }`}
              style={on ? { background: CV.accent } : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function SoftPad({
  title,
  children,
  className = "",
  deep,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  deep?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-[0_18px_40px_rgba(36,22,83,0.1)] ${className}`}
      style={{
        borderColor: deep ? "rgba(255,255,255,0.12)" : `${CV.accent}28`,
        background: deep ? "rgba(255,255,255,0.06)" : "#fff",
      }}
    >
      <div
        className="flex items-center gap-1.5 border-b px-4 py-2.5"
        style={{
          borderColor: deep ? "rgba(255,255,255,0.1)" : `${CV.accent}18`,
          background: deep ? "rgba(255,255,255,0.04)" : CV.soft,
        }}
      >
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]/80" />
        <span
          className="ml-2 text-[0.65rem] font-bold tracking-wide"
          style={{ color: deep ? "rgba(255,255,255,0.7)" : CV.deep }}
        >
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function HeroComposition() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto mt-12 max-w-5xl" aria-hidden>
      <motion.div
        className="relative z-10"
        initial={reduce ? false : { opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <SoftPad title="Owner · Web" className="mx-auto max-w-xl">
          <div className="grid grid-cols-3 gap-2">
            {["Overview", "Customers", "Billing", "Collections", "Team", "Reports"].map((l, i) => (
              <div
                key={l}
                className="rounded-xl border px-2.5 py-2.5 text-center text-[0.7rem] font-semibold text-[#111111]/75"
                style={{
                  borderColor: i === 0 ? `${CV.accent}55` : "rgba(17,17,17,0.06)",
                  background: i === 0 ? CV.soft : "#FAF8F5",
                }}
              >
                {l}
              </div>
            ))}
          </div>
        </SoftPad>
      </motion.div>

      <motion.div
        className="absolute top-10 -right-1 z-20 w-[9.5rem] sm:right-6 sm:w-44"
        initial={reduce ? false : { opacity: 0, x: 40, y: 24 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="rounded-[1.6rem] border-2 bg-[#1a1230] p-2 shadow-[0_20px_40px_rgba(36,22,83,0.25)]"
          style={{ borderColor: `${CV.accent}55` }}
        >
          <div className="rounded-[1.2rem] bg-white p-2.5">
            <p className="text-center text-[0.55rem] font-bold tracking-wide text-[#241653]">
              OPERATOR
            </p>
            <div className="mt-2 space-y-1.5">
              {["Customers", "Collect", "My Cash"].map((l, i) => (
                <div
                  key={l}
                  className="rounded-lg px-2 py-1.5 text-center text-[0.62rem] font-semibold"
                  style={
                    i === 1
                      ? { background: CV.deep, color: CV.soft }
                      : { background: CV.soft, color: CV.deep }
                  }
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-16 -left-1 z-0 w-40 opacity-95 sm:left-2 sm:w-48"
        initial={reduce ? false : { opacity: 0, x: -36 }}
        animate={{ opacity: 0.95, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <SoftPad title="Customer Portal">
          <div className="space-y-2">
            <div className="h-1.5 w-10 rounded-full" style={{ background: CV.accent }} />
            {["Bills", "Connection", "Notices"].map((l) => (
              <div
                key={l}
                className="rounded-lg border border-[#111111]/06 bg-[#FAF8F5] px-2 py-1.5 text-[0.65rem] font-semibold text-[#111111]/7"
              >
                {l}
              </div>
            ))}
          </div>
        </SoftPad>
      </motion.div>
    </div>
  );
}

function OwnerCapabilityRail({ items }: { items: readonly string[] }) {
  const loop = [...items, ...items];
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className="mt-8 flex flex-wrap gap-2">
        {items.map((a) => (
          <span
            key={a}
            className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold text-white/85"
          >
            {a}
          </span>
        ))}
      </div>
    );
  }
  return (
      <div className="cv41-lane-mask mt-8">
      <div className="cv41-owner-rail flex w-max gap-2">
        {loop.map((a, i) => (
          <span
            key={`${a}-${i}`}
            className="shrink-0 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold text-white/85"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

function PlaceholderSearch() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % c.search360.placeholders.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);
  const label = c.search360.placeholders[i];
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-[0_12px_30px_rgba(36,22,83,0.08)]"
      style={{ borderColor: `${CV.accent}30` }}
    >
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: CV.accent }} />
      <p className="text-sm font-semibold text-[#5A6570]">
        Search by <span style={{ color: CV.deep }}>{label}</span>
      </p>
    </div>
  );
}

export function CableV41Experience() {
  const reduce = useReducedMotion();

  return (
    <main className="cv41-root">
      <CableStickyNav />

      {/* Hero */}
      <SectionShell id="cable-overview" className="relative overflow-hidden border-b border-[#6D4AFF]/12 bg-[linear-gradient(180deg,#F8F6FF_0%,#F1EEFF_55%,#F8F6FF_100%)]">
        <div className="mx-auto max-w-6xl px-5 pt-8 pb-16 sm:px-6 sm:pt-10 sm:pb-20 lg:pb-24">
          <BackToBusiness className="mb-8" />
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold tracking-[0.28em] uppercase" style={{ color: CV.deep }}>
                {c.hero.eyebrow}
              </p>
              <span
                className="rounded-full border px-3 py-1 text-[0.6rem] font-bold tracking-[0.16em] uppercase"
                style={{
                  borderColor: `${CV.accent}45`,
                  background: CV.soft,
                  color: CV.deep,
                }}
              >
                {c.hero.badge}
              </span>
            </div>
            <h1 className="mt-5 font-[family-name:var(--font-gona-display)] text-5xl font-extrabold tracking-tight text-[#111111] sm:text-7xl">
              {c.hero.headline[0]}
            </h1>
            <p className="mt-2 text-sm font-semibold tracking-wide text-[#5A6570]">
              {c.hero.subtitle}
            </p>
            <div className="mt-4 h-0.5 w-14 rounded-full" style={{ background: CV.accent }} />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5A6570] sm:text-lg">
              {c.hero.support}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BizYellowCta href={c.links.register}>{c.hero.primaryCta}</BizYellowCta>
              <BizSecondaryCta href={c.links.portal} external>
                {c.hero.secondaryCta}
              </BizSecondaryCta>
            </div>
            <a
              href={`#${c.features.id}`}
              className="mt-6 inline-flex text-sm font-semibold text-[#241653]/70 underline-offset-4 hover:text-[#241653] hover:underline"
            >
              {c.hero.tertiaryCta} ↓
            </a>
          </Reveal>
          <HeroComposition />
        </div>
      </SectionShell>

      {/* Core message */}
      <SectionShell className="bg-[#241653] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.core.heading[0]}
              <span className="mt-2 block text-[#F1EEFF]">{c.core.heading[1]}</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              {c.core.roles.map((role, i) => (
                <div key={role} className="flex items-center gap-3 sm:gap-5">
                  <span
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.18em]"
                    style={{ color: i === 0 ? CV.yellow : "#fff" }}
                  >
                    {role}
                  </span>
                  {i < c.core.roles.length - 1 ? (
                    <span className="hidden h-px w-8 bg-white/25 sm:block" aria-hidden />
                  ) : null}
                </div>
              ))}
            </div>
            <svg className="mx-auto mt-8 h-8 w-full max-w-md" viewBox="0 0 400 32" aria-hidden>
              <path
                d="M20 16 H380"
                stroke={CV.accent}
                strokeWidth="2"
                strokeDasharray="6 8"
                opacity="0.7"
              />
              {[40, 200, 360].map((x) => (
                <circle key={x} cx={x} cy="16" r="5" fill={CV.yellow} />
              ))}
            </svg>
          </Reveal>
        </div>
      </SectionShell>

      {/* Feature lanes */}
      <SectionShell id={c.features.id} className="overflow-x-clip bg-[#F8F6FF] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.features.heading[0]}
              <span className="mt-1 block">{c.features.heading[1]}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[#5A6570]">{c.features.support}</p>
          </Reveal>
        </div>
        {cableFeatureLanes.map((lane) => (
          <FeatureLane
            key={lane.id}
            label={lane.label}
            direction={lane.direction}
            cards={lane.cards}
          />
        ))}
        <div id="cable-billing" className="sr-only" aria-hidden />
      </SectionShell>

      {/* Experiences intro */}
      <SectionShell id={c.experiences.id} className="bg-[#F1EEFF] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
            {c.experiences.heading[0]}
            <span className="mt-1 block">{c.experiences.heading[1]}</span>
          </h2>
        </div>
      </SectionShell>

      {/* Owner */}
      <SectionShell id={c.experiences.owner.id} className="bg-[#241653] py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.28em] text-[#FFD400] uppercase">
              {c.experiences.owner.label}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.experiences.owner.heading[0]}
              <span className="mt-1 block">{c.experiences.owner.heading[1]}</span>
            </h2>
            <p className="mt-4 text-base text-white/75">{c.experiences.owner.support}</p>
            <OwnerCapabilityRail items={c.experiences.owner.areas} />
          </Reveal>
          <Reveal delay={0.08}>
            <SoftPad title="Owner workspace" deep>
              <div className="grid grid-cols-2 gap-2">
                {["Customers", "Billing", "Collections", "Team", "Complaints", "Reports"].map(
                  (l) => (
                    <div
                      key={l}
                      className="rounded-xl border border-white/10 bg-white/8 px-3 py-3 text-xs font-semibold text-white/85"
                    >
                      {l}
                    </div>
                  ),
                )}
              </div>
            </SoftPad>
          </Reveal>
        </div>
      </SectionShell>

      {/* Operator */}
      <SectionShell id={c.experiences.operator.id} className="bg-[#F1EEFF] py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="mx-auto w-full max-w-[15rem]">
              <div
                className="rounded-[1.8rem] border-2 bg-[#1a1230] p-2.5 shadow-[0_24px_50px_rgba(36,22,83,0.2)]"
                style={{ borderColor: `${CV.accent}50` }}
              >
                <div className="rounded-[1.4rem] bg-white p-3">
                  <p className="text-center text-[0.65rem] font-bold tracking-[0.2em] text-[#241653]">
                    OPERATOR
                  </p>
                  <div className="mt-3 space-y-2">
                    {c.experiences.operator.areas.map((a, i) => (
                      <div
                        key={a}
                        className="rounded-xl px-3 py-2.5 text-center text-xs font-semibold"
                        style={
                          i === 2
                            ? { background: CV.deep, color: "#fff" }
                            : { background: CV.soft, color: CV.deep }
                        }
                      >
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-xs font-bold tracking-[0.28em] uppercase" style={{ color: CV.deep }}>
              {c.experiences.operator.label}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.experiences.operator.heading[0]}
              <span className="mt-1 block text-[#5A6570]">{c.experiences.operator.heading[1]}</span>
            </h2>
            <p className="mt-4 text-base text-[#5A6570]">{c.experiences.operator.support}</p>
          </Reveal>
        </div>
      </SectionShell>

      {/* Customer */}
      <SectionShell id={c.experiences.customer.id} className="border-y border-[#6D4AFF]/12 bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.28em] uppercase" style={{ color: CV.deep }}>
              {c.experiences.customer.label}
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.experiences.customer.heading[0]}
              <span className="mt-1 block">{c.experiences.customer.heading[1]}</span>
            </h2>
            <p className="mt-4 text-base text-[#5A6570]">{c.experiences.customer.support}</p>
            <p className="mt-3 text-xs font-bold tracking-[0.16em] uppercase" style={{ color: CV.accent }}>
              {c.experiences.customer.note}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <SoftPad title="Customer Portal · Web">
              <div
                className="mb-3 h-12 rounded-xl"
                style={{
                  background: `linear-gradient(90deg, ${CV.soft}, ${CV.accent}33)`,
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                {c.experiences.customer.areas.map((a) => (
                  <div
                    key={a}
                    className="rounded-xl border border-[#111111]/06 bg-[#F8F6FF] px-3 py-3 text-xs font-semibold text-[#241653]"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </SoftPad>
          </Reveal>
        </div>
      </SectionShell>

      {/* Documents */}
      <SectionShell id={c.documents.id} className="bg-[#F8F6FF] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.documents.heading[0]}
              <span className="mt-1 block">{c.documents.heading[1]}</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold tracking-[0.14em] uppercase">
              {c.documents.flow.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className="rounded-full px-3 py-1.5"
                    style={{ background: CV.soft, color: CV.deep }}
                  >
                    {step}
                  </span>
                  {i < c.documents.flow.length - 1 ? (
                    <span style={{ color: CV.accent }}>↓</span>
                  ) : null}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="relative mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <motion.div
              className="cv41-doc w-full max-w-xs p-5"
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: CV.accent }}>
                INVOICE
              </p>
              <p className="mt-4 text-sm font-semibold text-[#111111]">Billing Period</p>
              <p className="mt-1 text-sm text-[#5A6570]">Status</p>
              <div className="mt-6 h-px bg-[#111111]/08" />
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded-full bg-[#111111]/06" />
                <div className="h-2 w-2/3 rounded-full bg-[#111111]/05" />
              </div>
            </motion.div>
            <motion.div
              className="cv41-doc w-full max-w-xs p-5 sm:-ml-8 sm:mt-10"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: CV.accent }}>
                RECEIPT
              </p>
              <p className="mt-4 text-sm font-semibold text-[#111111]">Payment Recorded</p>
              <p className="mt-1 text-sm text-[#5A6570]">CASH / UPI</p>
              <div className="mt-6 h-px bg-[#111111]/08" />
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded-full bg-[#111111]/06" />
                <div className="h-2 w-1/2 rounded-full bg-[#111111]/05" />
              </div>
            </motion.div>
          </div>
        </div>
      </SectionShell>

      {/* Communication */}
      <SectionShell id={c.communications.id} className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.communications.heading[0]}
              <span className="mt-1 block">{c.communications.heading[1]}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {c.communications.channels.map((ch, i) => (
              <Reveal key={ch.title} delay={i * 0.05}>
                <article
                  className="h-full rounded-2xl border p-5"
                  style={{
                    borderColor: `${CV.accent}22`,
                    background: i === 0 ? CV.soft : "#F8F6FF",
                  }}
                >
                  <p
                    className="text-xs font-bold tracking-[0.2em] uppercase"
                    style={{ color: CV.deep }}
                  >
                    {ch.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5A6570]">{ch.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* Customer 360 */}
      <SectionShell id={c.search360.id} className="bg-[#F1EEFF] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.search360.heading[0]}
              <span className="mt-1 block">{c.search360.heading[1]}</span>
            </h2>
            <div className="mt-8 max-w-lg">
              <PlaceholderSearch />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-5">
            {c.search360.view.map((v) => (
              <div
                key={v}
                className="rounded-xl border bg-white px-3 py-4 text-center text-xs font-bold tracking-wide text-[#241653]"
                style={{ borderColor: `${CV.accent}22` }}
              >
                {v}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.search360.actions.map((a) => (
              <span
                key={a}
                className="rounded-full px-3 py-1.5 text-[0.7rem] font-bold"
                style={{ background: CV.deep, color: CV.soft }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* Complaints */}
      <SectionShell id={c.complaints.id} className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              {c.complaints.heading}
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
              {c.complaints.stages.map((stage, i) => (
                <motion.div
                  key={stage}
                  className="flex items-center gap-2 sm:gap-3"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <span
                    className="rounded-full px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.12em] uppercase text-white"
                    style={{ background: "#EA580C" }}
                  >
                    {stage}
                  </span>
                  {i < c.complaints.stages.length - 1 ? (
                    <span className="text-[#EA580C]/70" aria-hidden>
                      →
                    </span>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* Trio */}
      <SectionShell id={c.trio.id} className="bg-[#F8F6FF] py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-6 md:grid-cols-3">
          {[
            { ...c.trio.import, accent: "#D97706" },
            { ...c.trio.branding, accent: "#C026D3" },
            { ...c.trio.reports, accent: "#1D4ED8" },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article
                className="h-full rounded-2xl border bg-white p-5"
                style={{ borderColor: `${item.accent}30` }}
              >
                <div
                  className="h-1 w-10 rounded-full"
                  style={{ background: item.accent }}
                  aria-hidden
                />
                <h3 className="mt-4 font-[family-name:var(--font-gona-display)] text-xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#5A6570]">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* Security */}
      <SectionShell id={c.security.id} className="bg-[#241653] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.security.heading[0]}
              <span className="mt-1 block">{c.security.heading[1]}</span>
              <span className="mt-1 block text-[#FFD400]">{c.security.heading[2]}</span>
            </h2>
            <p className="mt-5 text-base text-white/75">{c.security.support}</p>
          </Reveal>
        </div>
      </SectionShell>

      {/* Onboarding */}
      <SectionShell id={c.onboarding.id} className="bg-[#F1EEFF] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              {c.onboarding.heading}
            </h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.onboarding.steps.map((s) => (
                <li
                  key={s.n}
                  className="rounded-2xl border bg-white p-5"
                  style={{ borderColor: `${CV.accent}22` }}
                >
                  <span className="font-mono text-xs font-bold" style={{ color: CV.accent }}>
                    {s.n}
                  </span>
                  <p className="mt-3 text-sm font-bold text-[#111111]">{s.title}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </SectionShell>

      {/* Closing */}
      <SectionShell className="bg-[#241653] py-20 text-white sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-6">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.32em] text-[#FFD400] uppercase">
              {c.closing.eyebrow}
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              {c.closing.headline[0]}
              <span className="mt-1 block">{c.closing.headline[1]}</span>
              <span className="mt-1 block">{c.closing.headline[2]}</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BizYellowCta href={c.links.register}>{c.closing.primaryCta}</BizYellowCta>
              <BizSecondaryCta href={c.links.portal} external onDark>
                {c.closing.secondaryCta}
              </BizSecondaryCta>
            </div>
            <div className="mt-10">
              <BackToBusiness className="!text-white/80 hover:!text-[#FFD400]" />
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </main>
  );
}
