"use client";

import type { ReactNode } from "react";

import {
  BizSecondaryCta,
  BizYellowCta,
  LabelChip,
  Reveal,
  SoftWindow,
} from "@/components/business/business-ui";
import { cableProductCopy } from "@/config/cable-product.config";

function TripleExperienceVisual() {
  return (
    <div className="relative grid gap-3 sm:grid-cols-3" aria-hidden>
      <SoftWindow title="Owner web" tone="light">
        <div className="space-y-2">
          {["Overview", "Customers", "Billing", "Team"].map((l) => (
            <div
              key={l}
              className="rounded-lg border border-[#111111]/6 bg-[#FAF8F5] px-2.5 py-2 text-[0.7rem] font-semibold text-[#111111]/7"
            >
              {l}
            </div>
          ))}
        </div>
      </SoftWindow>
      <SoftWindow title="Operator mobile" tone="field" className="sm:mt-6">
        <div className="mx-auto max-w-[9.5rem] space-y-2">
          <div className="rounded-lg bg-white px-2.5 py-2 text-center text-[0.65rem] font-semibold text-[#111111]/65">
            Search customer
          </div>
          <div className="rounded-lg bg-[#111111] px-2.5 py-2.5 text-center text-[0.7rem] font-bold text-[#FFD400]">
            Collect
          </div>
          <div className="rounded-lg border border-[#111111]/1 bg-white/70 px-2.5 py-2 text-center text-[0.65rem] text-[#111111]/55">
            My Cash
          </div>
        </div>
      </SoftWindow>
      <SoftWindow title="Customer portal" tone="light" className="sm:mt-3">
        <div className="space-y-2">
          <div className="h-1.5 w-10 rounded-full bg-[#FFD400]" />
          <p className="text-[0.7rem] font-semibold text-[#111111]/75">Bills</p>
          <div className="h-1 w-full rounded-full bg-[#111111]/06" />
          <p className="text-[0.7rem] font-semibold text-[#111111]/75">Notices</p>
          <div className="h-1 w-[70%] rounded-full bg-[#111111]/05" />
          <p className="text-[0.7rem] font-semibold text-[#111111]/75">Connection</p>
        </div>
      </SoftWindow>
    </div>
  );
}

function SectionShell({
  id,
  children,
  tone = "warm",
}: {
  id?: string;
  children: ReactNode;
  tone?: "warm" | "white" | "soft" | "dark";
}) {
  const bg =
    tone === "white"
      ? "bg-white"
      : tone === "soft"
        ? "bg-[#F3F0EA]"
        : tone === "dark"
          ? "bg-[#141414] text-white"
          : "bg-[#FAF8F5]";
  return (
    <section id={id} className={`border-b border-[#111111]/6 ${bg}`}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16 lg:py-20">{children}</div>
    </section>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-[#5A6570]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD400]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CableProductExperience() {
  const c = cableProductCopy;

  return (
    <main className="overflow-x-hidden bg-[#FAF8F5] text-[#111111]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#111111]/6 bg-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 90% 0%, rgba(255,212,0,0.16), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-14 sm:px-6 sm:pb-16 lg:pt-32 lg:pb-20">
          <Reveal>
            <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-[#8A7400]/80 uppercase">
              GONA Business · Available now
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold tracking-[0.32em] text-[#8A7400] uppercase">
                {c.hero.eyebrow}
              </p>
              <span className="rounded-full border border-[#FFD400]/45 bg-[#FFD400]/18 px-3 py-1 text-[0.6rem] font-bold tracking-[0.18em] text-[#6B5A00] uppercase">
                {c.hero.badge}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-gona-display)] text-[2.15rem] leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-[3.2rem]">
              <span className="block">{c.hero.headline[0]}</span>
              <span className="mt-1 block">{c.hero.headline[1]}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#5A6570] sm:text-lg">
              {c.hero.support}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BizYellowCta href={c.links.register}>{c.hero.primaryCta}</BizYellowCta>
              <BizSecondaryCta href={c.links.portal} external>
                {c.hero.secondaryCta}
              </BizSecondaryCta>
            </div>
            <a
              href={`#${c.links.featuresId}`}
              className="mt-6 inline-flex text-sm font-semibold text-[#111111]/55 underline-offset-4 hover:text-[#111111] hover:underline"
            >
              {c.hero.tertiaryCta} ↓
            </a>
          </Reveal>
          <Reveal className="mt-12" delay={0.08}>
            <TripleExperienceVisual />
          </Reveal>
        </div>
      </section>

      {/* Three experiences */}
      <SectionShell id={c.links.featuresId} tone="warm">
        <Reveal>
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">{c.experiences.heading[0]}</span>
            <span className="mt-1 block text-[#5A6570]">{c.experiences.heading[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-14">
          {/* Owner */}
          <Reveal>
            <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div>
                <LabelChip active>{c.experiences.owner.role}</LabelChip>
                <h3 className="mt-4 font-[family-name:var(--font-gona-display)] text-2xl font-bold tracking-tight sm:text-3xl">
                  {c.experiences.owner.title}
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {c.experiences.owner.groups.map((g) => (
                    <div
                      key={g.title}
                      className="rounded-2xl border border-[#111111]/8 bg-white p-4 shadow-[0_10px_30px_rgba(17,17,17,0.04)]"
                    >
                      <p className="text-xs font-bold tracking-wide text-[#8A7400] uppercase">
                        {g.title}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {g.items.map((item) => (
                          <li key={item} className="text-sm font-medium text-[#1A2332]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <SoftWindow title="Owner workspace" className="lg:sticky lg:top-28">
                <div className="grid grid-cols-2 gap-2">
                  {["Overview", "Customers", "Billing", "Collections", "Team", "Reports"].map(
                    (l) => (
                      <div
                        key={l}
                        className="rounded-xl border border-[#111111]/6 bg-[#FAF8F5] px-3 py-3 text-xs font-semibold text-[#111111]/7"
                      >
                        {l}
                      </div>
                    ),
                  )}
                </div>
              </SoftWindow>
            </div>
          </Reveal>

          {/* Operator */}
          <Reveal>
            <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <SoftWindow title="Operator field workspace" tone="field" className="order-2 lg:order-1">
                <div className="mx-auto max-w-[14rem] space-y-2.5">
                  {["Customer search", "Check dues", "Collect", "Complaints", "My Cash"].map(
                    (l, i) => (
                      <div
                        key={l}
                        className={`rounded-xl px-3 py-2.5 text-center text-xs font-semibold ${
                          i === 2
                            ? "bg-[#111111] text-[#FFD400]"
                            : "border border-[#111111]/1 bg-white/80 text-[#111111]/7"
                        }`}
                      >
                        {l}
                      </div>
                    ),
                  )}
                </div>
              </SoftWindow>
              <div className="order-1 lg:order-2">
                <LabelChip>{c.experiences.operator.role}</LabelChip>
                <h3 className="mt-4 font-[family-name:var(--font-gona-display)] text-2xl font-bold tracking-tight sm:text-3xl">
                  {c.experiences.operator.title}
                </h3>
                <FeatureList items={c.experiences.operator.items} />
              </div>
            </div>
          </Reveal>

          {/* Customer */}
          <Reveal>
            <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div>
                <LabelChip>{c.experiences.customer.role}</LabelChip>
                <h3 className="mt-4 font-[family-name:var(--font-gona-display)] text-2xl font-bold tracking-tight sm:text-3xl">
                  {c.experiences.customer.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-[#8A7400]">{c.experiences.customer.note}</p>
                <FeatureList items={c.experiences.customer.items} />
              </div>
              <SoftWindow title="Customer portal">
                <div className="space-y-3">
                  {["Connection", "Bills", "Notices", "Support"].map((l) => (
                    <div
                      key={l}
                      className="flex items-center justify-between rounded-xl border border-[#111111]/6 bg-[#FAF8F5] px-3 py-3"
                    >
                      <span className="text-xs font-semibold text-[#111111]/75">{l}</span>
                      <span className="h-1.5 w-8 rounded-full bg-[#FFD400]/70" />
                    </div>
                  ))}
                </div>
              </SoftWindow>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* Customer 360 */}
      <SectionShell tone="white">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              {c.search360.heading}
            </h2>
            <p className="mt-4 text-base text-[#5A6570]">{c.search360.support}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {c.search360.searchBy.map((s) => (
                <LabelChip key={s}>{s}</LabelChip>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <SoftWindow title="Customer 360">
              <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {c.search360.view.map((v) => (
                  <div
                    key={v}
                    className="rounded-lg border border-[#111111]/6 bg-[#FAF8F5] px-2.5 py-2 text-center text-[0.7rem] font-semibold text-[#111111]/7"
                  >
                    {v}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {c.search360.actions.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-[#111111] px-3 py-1.5 text-[0.7rem] font-bold text-[#FFD400]"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </SoftWindow>
          </Reveal>
        </div>
      </SectionShell>

      {/* Billing */}
      <SectionShell tone="soft">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block">{c.billing.heading[0]}</span>
              <span className="mt-1 block text-[#5A6570]">{c.billing.heading[1]}</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5A6570]">
              {c.billing.support}
            </p>
            <FeatureList items={c.billing.items} />
          </Reveal>
          <Reveal delay={0.05}>
            <SoftWindow title="Billing & collections">
              <div className="flex flex-wrap gap-2">
                {["Paid", "Part Paid", "Due", "CASH", "UPI", "Receipt"].map((l) => (
                  <LabelChip key={l} active={l === "Due" || l === "CASH"}>
                    {l}
                  </LabelChip>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#5A6570]">
                Manual CASH and UPI recording for field collections — not an online checkout or
                payment gateway.
              </p>
            </SoftWindow>
          </Reveal>
        </div>
      </SectionShell>

      {/* Communications */}
      <SectionShell tone="white">
        <Reveal>
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.communications.heading}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {c.communications.channels.map((ch, i) => (
            <Reveal key={ch.title} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-[#111111]/8 bg-[#FAF8F5] p-5">
                <h3 className="font-[family-name:var(--font-gona-display)] text-lg font-bold">
                  {ch.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5A6570]">{ch.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* Documents */}
      <SectionShell tone="soft">
        <Reveal>
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.documents.heading}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {c.documents.items.map((item) => (
              <LabelChip key={item} active>
                {item}
              </LabelChip>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      {/* Team */}
      <SectionShell tone="white">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block">{c.team.heading[0]}</span>
              <span className="mt-1 block text-[#5A6570]">{c.team.heading[1]}</span>
            </h2>
            <FeatureList items={c.team.items} />
          </Reveal>
          <Reveal delay={0.05}>
            <SoftWindow title="Team access">
              <div className="space-y-3">
                <div className="rounded-xl border border-[#111111]/8 bg-[#FAF8F5] px-4 py-3">
                  <p className="text-xs font-bold tracking-wide text-[#8A7400] uppercase">Owner</p>
                  <p className="mt-1 text-sm text-[#5A6570]">Invites operators · full network control</p>
                </div>
                <div className="rounded-xl border border-[#111111]/8 bg-[#FAF8F5] px-4 py-3">
                  <p className="text-xs font-bold tracking-wide text-[#8A7400] uppercase">
                    Operator
                  </p>
                  <p className="mt-1 text-sm text-[#5A6570]">
                    Own account · capability-based field access
                  </p>
                </div>
              </div>
            </SoftWindow>
          </Reveal>
        </div>
      </SectionShell>

      {/* Complaints */}
      <SectionShell tone="soft">
        <Reveal>
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.complaints.heading}
          </h2>
          <ol className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            {c.complaints.stages.map((stage, index) => (
              <li
                key={stage}
                className="flex items-center gap-2 rounded-full border border-[#111111]/1 bg-white px-3 py-2 text-sm font-semibold text-[#1A2332] shadow-sm"
              >
                <span className="font-mono text-[0.65rem] text-[#8A7400]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {stage}
              </li>
            ))}
          </ol>
        </Reveal>
      </SectionShell>

      {/* Branding + Reports */}
      <SectionShell tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight">
              <span className="block">{c.branding.heading[0]}</span>
              <span className="mt-1 block text-[#5A6570]">{c.branding.heading[1]}</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5A6570]">{c.branding.support}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight">
              {c.reports.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5A6570]">{c.reports.support}</p>
          </Reveal>
        </div>
      </SectionShell>

      {/* Import */}
      <SectionShell tone="soft">
        <Reveal>
          <h2 className="max-w-2xl font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.import.heading}
          </h2>
          <FeatureList items={c.import.items} />
          <p className="mt-4 text-sm text-[#5A6570]">{c.import.note}</p>
        </Reveal>
      </SectionShell>

      {/* Security */}
      <SectionShell tone="white">
        <Reveal>
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.security.heading}
          </h2>
          <FeatureList items={c.security.items} />
        </Reveal>
      </SectionShell>

      {/* Onboarding */}
      <SectionShell tone="soft">
        <Reveal>
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            {c.onboarding.heading}
          </h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.onboarding.steps.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-[#111111]/8 bg-white p-4 shadow-[0_10px_30px_rgba(17,17,17,0.03)]"
              >
                <span className="font-mono text-xs font-bold tracking-widest text-[#8A7400]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-semibold text-[#1A2332]">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </SectionShell>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 50% 110%, rgba(255,212,0,0.16), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.32em] text-[#FFD400] uppercase">
              {c.closing.eyebrow}
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              <span className="block">{c.closing.headline[0]}</span>
              <span className="mt-1 block">{c.closing.headline[1]}</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BizYellowCta href={c.links.register}>{c.closing.primaryCta}</BizYellowCta>
              <BizSecondaryCta href={c.links.portal} external onDark>
                {c.closing.secondaryCta}
              </BizSecondaryCta>
            </div>
            <p className="mt-6 text-sm text-white/45">{c.closing.note}</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
