"use client";

import { useState } from "react";

import {
  healthcareFamilyMembers,
  healthcareRecordTypes,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { FamilyCareArt } from "@/components/healthcare/healthcare-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function HealthcareFamily() {
  const [active, setActive] =
    useState<(typeof healthcareFamilyMembers)[number]["id"]>("you");

  return (
    <section className="bg-[#F8FAFC] py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: healthcareTokens.accent }}
            >
              Family healthcare
            </p>
            <h2 className="font-display text-3xl text-gona-black md:text-4xl">
              Your family&apos;s care, connected.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-gona-gray md:text-lg">
              Keep important health context together — for you and the people you
              care for — through one GONA healthcare experience.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Family members"
            >
              {healthcareFamilyMembers.map((member) => {
                const on = active === member.id;
                return (
                  <button
                    key={member.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(member.id)}
                    onFocus={() => setActive(member.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                      on
                        ? "border-[#3B82F6] bg-[#EFF6FF] text-[#1E3A5F]"
                        : "border-black/10 bg-white text-gona-gray hover:border-[#BFDBFE]",
                    )}
                    style={{ outlineColor: healthcareTokens.accent }}
                  >
                    {member.label}
                  </button>
                );
              })}
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3">
              {healthcareRecordTypes.map((type) => (
                <li
                  key={type}
                  className="rounded-xl border border-[#BFDBFE] bg-white px-4 py-3 text-sm font-medium text-gona-black"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[#BFDBFE] bg-white shadow-[0_22px_50px_rgba(30,58,95,0.1)]">
            <div className="aspect-[7/5] min-h-[18rem] w-full lg:min-h-[22rem]">
              <FamilyCareArt active={active} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
