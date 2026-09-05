"use client";

import Link from "next/link";
import { useState } from "react";

import {
  InnerCtaLink,
  InnerPageHero,
} from "@/components/inner/inner-page-hero";
import { Container } from "@/components/ui/container";
import {
  partnerCta,
  partnerTypes,
  type PartnerId,
  type PartnerType,
} from "@/config/partners.content";
import { getServiceById } from "@/config/site.config";
import { cn } from "@/lib/cn";

export function PartnersExperience() {
  const [activeId, setActiveId] = useState<PartnerId>("delivery");
  const active = partnerTypes.find((p) => p.id === activeId) ?? partnerTypes[0];

  return (
    <article>
      <InnerPageHero
        tone="warm"
        eyebrow="Partners"
        title={
          <>
            Grow With
            <span className="mt-1 block">GONA.</span>
          </>
        }
        description="Choose how you'd like to become part of the GONA ecosystem."
        actions={
          <InnerCtaLink href={partnerCta.contactHref} variant="primary">
            {partnerCta.contactFallbackLabel} →
          </InnerCtaLink>
        }
      />

      <section className="bg-[#EDE8DC] py-14 md:py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl text-gona-black md:text-4xl">
              Who can partner?
            </h2>
            <p className="mt-3 text-base text-gona-gray">
              Select a partner type to see how it connects into GONA. Partner
              types are not additional customer services — they are ways to
              participate in the seven-service ecosystem.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            {/* Selector */}
            <ul className="flex flex-col gap-2" role="listbox" aria-label="Partner types">
              {partnerTypes.map((partner) => {
                const selected = partner.id === active.id;
                return (
                  <li key={partner.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => setActiveId(partner.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow",
                        selected
                          ? "border-gona-black bg-gona-black text-gona-white"
                          : "border-black/10 bg-gona-white/80 text-gona-black hover:border-gona-black/30",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          selected
                            ? "bg-gona-yellow text-gona-black"
                            : "bg-gona-yellow/30 text-gona-black",
                        )}
                        aria-hidden="true"
                      >
                        {partner.shortLabel.slice(0, 1)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">
                          {partner.title}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-xs",
                            selected ? "text-white/60" : "text-gona-gray",
                          )}
                        >
                          {partner.relatesLabel}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <PartnerDetailPanel partner={active} />
          </div>
        </Container>
      </section>

      <section className="bg-gona-white py-14 md:py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl text-gona-black md:text-3xl">
            Simple path to partner
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {["Choose your path", "Contact GONA", "Join when onboarding opens"].map(
              (step, i) => (
                <li key={step} className="border-t-2 border-gona-yellow pt-4">
                  <p className="font-display text-sm text-gona-yellow">
                    0{i + 1}
                  </p>
                  <p className="mt-2 font-display text-lg text-gona-black">
                    {step}
                  </p>
                </li>
              ),
            )}
          </ol>
          <p className="mt-8 text-sm text-gona-gray">
            Online partner registration is not live yet.{" "}
            <span className="font-medium text-gona-black">
              {partnerCta.comingSoonLabel}.
            </span>
          </p>
        </Container>
      </section>
    </article>
  );
}

function PartnerDetailPanel({ partner }: { partner: PartnerType }) {
  const related = Array.isArray(partner.relatesTo)
    ? partner.relatesTo.map((id) => getServiceById(id)).filter(Boolean)
    : [getServiceById(partner.relatesTo)].filter(Boolean);

  const ctaHref = partnerCta.onboardingUrl ?? partnerCta.contactHref;

  return (
    <div
      className="rounded-[1.75rem] border border-black/8 bg-gona-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:p-8"
      aria-live="polite"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-gona-gray uppercase">
        Selected path
      </p>
      <h3 className="mt-3 font-display text-3xl text-gona-black">
        {partner.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-gona-gray">
        {partner.description}
      </p>

      <div className="mt-6 rounded-2xl bg-[#F3F0E8] p-4">
        <p className="text-xs font-semibold tracking-[0.14em] text-gona-gray uppercase">
          Connects into
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {related.map((service) => (
            <Link
              key={service!.id}
              href={service!.href}
              className="gona-chip"
            >
              {service!.name}
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-gona-black/80">
        {partner.participation}
      </p>

      <ol className="mt-6 space-y-3">
        {partner.process.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm text-gona-gray">
            <span className="font-display text-gona-yellow">0{i + 1}</span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={ctaHref}
          className="gona-btn gona-btn-primary"
        >
          {partnerCta.contactFallbackLabel} →
        </Link>
      </div>
    </div>
  );
}
