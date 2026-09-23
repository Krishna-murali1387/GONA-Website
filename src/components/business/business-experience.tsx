"use client";

import { BusinessProductIcon } from "@/components/business/business-icons";
import {
  BizPrimaryCta,
  BizSecondaryCta,
  BizYellowCta,
  LabelChip,
  Reveal,
  SoftWindow,
} from "@/components/business/business-ui";
import {
  businessCopy,
  futureProducts,
  type FutureProductId,
} from "@/config/business.config";

function HeroComposition() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden>
      <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,212,0,0.22),transparent_55%)]" />
      <div className="relative grid gap-4">
        <SoftWindow title="GONA Business · Owner" tone="light">
          <div className="grid grid-cols-3 gap-2">
            {["Customers", "Billing", "Team"].map((label) => (
              <div
                key={label}
                className="rounded-xl border border-[#111111]/6 bg-[#FAF8F5] px-2.5 py-3"
              >
                <div className="h-1.5 w-8 rounded-full bg-[#FFD400]" />
                <p className="mt-2 text-[0.7rem] font-semibold text-[#111111]/75">{label}</p>
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-full rounded-full bg-[#111111]/06" />
                  <div className="h-1 w-[70%] rounded-full bg-[#111111]/05" />
                </div>
              </div>
            ))}
          </div>
        </SoftWindow>

        <div className="grid grid-cols-[1fr_0.85fr] gap-3">
          <SoftWindow title="Field · Operator" tone="field" className="scale-[0.98]">
            <div className="space-y-2">
              <div className="rounded-lg bg-white/80 px-3 py-2 text-[0.7rem] font-semibold text-[#111111]/7">
                Customer search
              </div>
              <div className="rounded-lg bg-[#111111] px-3 py-2 text-center text-[0.7rem] font-bold text-[#FFD400]">
                Collect payment
              </div>
              <div className="rounded-lg border border-[#111111]/8 bg-white/60 px-3 py-2 text-[0.7rem] text-[#111111]/55">
                My Cash
              </div>
            </div>
          </SoftWindow>
          <SoftWindow title="Customer portal" tone="light" className="mt-4">
            <div className="space-y-2">
              <div className="h-1.5 w-12 rounded-full bg-[#FFD400]/80" />
              <p className="text-[0.7rem] font-semibold text-[#111111]/8">Bills</p>
              <div className="h-1 w-full rounded-full bg-[#111111]/06" />
              <p className="text-[0.7rem] font-semibold text-[#111111]/8">Notices</p>
              <div className="h-1 w-[75%] rounded-full bg-[#111111]/05" />
            </div>
          </SoftWindow>
        </div>
      </div>
    </div>
  );
}

function FlagshipComposition() {
  return (
    <SoftWindow title="GONA Cable · Network operations" className="w-full">
      <div className="mb-3 flex flex-wrap gap-2">
        <LabelChip active>AVAILABLE NOW</LabelChip>
        <LabelChip>Owner</LabelChip>
        <LabelChip>Operator</LabelChip>
        <LabelChip>Customer</LabelChip>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          "Customers",
          "Connections",
          "Billing",
          "Collections",
          "Complaints",
          "Communications",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-xl border border-[#111111]/6 bg-[#FAF8F5] px-3 py-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
            <span className="text-xs font-semibold text-[#111111]/75">{item}</span>
          </div>
        ))}
      </div>
    </SoftWindow>
  );
}

export function BusinessExperience() {
  const { hero, positioning, software, flagship, future, brand, closing, links } =
    businessCopy;

  return (
    <main className="overflow-x-hidden bg-[#FAF8F5] text-[#111111]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#111111]/6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 85% 15%, rgba(255,212,0,0.18), transparent 60%), linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-32">
          <div>
            <p className="text-xs font-bold tracking-[0.32em] text-[#8A7400] uppercase">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-xl font-[family-name:var(--font-gona-display)] text-[2.2rem] leading-[1.1] font-extrabold tracking-tight text-[#111111] sm:text-5xl lg:text-[3.25rem]">
              <span className="block">{hero.headline[0]}</span>
              <span className="mt-1 block">{hero.headline[1]}</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#5A6570] sm:text-lg">
              {hero.support}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BizYellowCta href={`#${software.id}`}>{hero.primaryCta}</BizYellowCta>
              <BizSecondaryCta href={links.cableProduct}>{hero.secondaryCta}</BizSecondaryCta>
            </div>
            <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-[#111111]/40 uppercase">
              {hero.trust}
            </p>
          </div>
          <div className="hidden lg:block">
            <HeroComposition />
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 sm:py-20">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block">{positioning.heading[0]}</span>
              <span className="mt-1 block text-[#5A6570]">{positioning.heading[1]}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#5A6570]">
              {positioning.support}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Software showcase */}
      <section id={software.id} className="scroll-mt-24 border-y border-[#111111]/6 bg-[#F3F0EA]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <Reveal>
            <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              {software.heading}
            </h2>
          </Reveal>

          <Reveal className="mt-10" delay={0.05}>
            <article className="overflow-hidden rounded-[1.75rem] border border-[#111111]/8 bg-white shadow-[0_30px_80px_rgba(17,17,17,0.07)]">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-6 sm:p-8 lg:p-10">
                  <span className="inline-flex rounded-full border border-[#FFD400]/45 bg-[#FFD400]/18 px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-[#6B5A00] uppercase">
                    {flagship.badge}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight">
                    {flagship.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold tracking-wide text-[#5A6570]">
                    {flagship.subtitle}
                  </p>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-[#5A6570]">
                    {flagship.line}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <BizPrimaryCta href={links.cableProduct}>{flagship.explore}</BizPrimaryCta>
                    <BizSecondaryCta href={links.cableRegister}>
                      {flagship.register}
                    </BizSecondaryCta>
                  </div>
                </div>
                <div className="border-t border-[#111111]/6 bg-[#FAF8F5] p-6 sm:p-8 lg:border-t-0 lg:border-l">
                  <FlagshipComposition />
                </div>
              </div>
            </article>
          </Reveal>

          {/* Future */}
          <div id={future.id} className="mt-16 scroll-mt-24 sm:mt-20">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.28em] text-[#8A7400] uppercase">
                {future.heading}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5A6570]">
                {future.support}
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {futureProducts.map((product, index) => (
                <Reveal key={product.id} delay={Math.min(index * 0.05, 0.25)}>
                  <article className="relative h-full overflow-hidden rounded-2xl border border-[#111111]/8 bg-white p-5 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
                    <div
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                      style={{ background: product.accent }}
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl border bg-[#FAF8F5]"
                        style={{
                          color: product.accent,
                          borderColor: `${product.accent}40`,
                          background: product.accentSoft,
                        }}
                      >
                        <BusinessProductIcon
                          id={product.id as FutureProductId}
                          className="h-7 w-7"
                          accent={product.accent}
                        />
                      </div>
                      <span
                        className="rounded-full border px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.16em] uppercase"
                        style={{
                          color: product.accentDark,
                          borderColor: `${product.accent}40`,
                          background: product.accentSoft,
                        }}
                      >
                        Coming soon
                      </span>
                    </div>
                    <h3 className="relative mt-5 font-[family-name:var(--font-gona-display)] text-lg font-bold tracking-tight">
                      {product.name}
                    </h3>
                    <p className="relative mt-1.5 text-sm leading-relaxed text-[#5A6570]">
                      {product.subtitle}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <h2 className="max-w-xl font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block">{brand.heading[0]}</span>
              <span className="mt-1 block text-[#5A6570]">{brand.heading[1]}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {brand.principles.map((line, index) => (
              <Reveal key={line} delay={index * 0.04}>
                <p className="border-l-2 border-[#FFD400] pl-4 font-[family-name:var(--font-gona-display)] text-xl font-semibold tracking-tight text-[#1A2332] sm:text-2xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — controlled dark */}
      <section className="relative overflow-hidden bg-[#141414] text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 120%, rgba(255,212,0,0.14), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.32em] text-[#FFD400] uppercase">
              {closing.eyebrow}
            </p>
            <h2 className="mt-5 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
              <span className="block">{closing.headline[0]}</span>
              <span className="mt-1 block">{closing.headline[1]}</span>
            </h2>
            <p className="mt-5 text-base text-white/55">{closing.support}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <BizYellowCta href={links.cableProduct}>{closing.explore}</BizYellowCta>
              <BizSecondaryCta href={links.cableRegister} onDark>
                {closing.register}
              </BizSecondaryCta>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
