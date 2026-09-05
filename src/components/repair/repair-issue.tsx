"use client";

import { repairTokens } from "@/components/repair/repair.content";
import { DimensionalAc } from "@/components/repair/repair-visuals";

export function RepairIssue() {
  return (
    <section id="repair-issue" className="bg-[#FFF7ED] py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-md py-4">
            <DimensionalAc state="fault" large className="w-full" />
            <div
              className="mt-6 rounded-sm border-2 px-4 py-3"
              style={{
                background: repairTokens.warmWhite,
                borderColor: repairTokens.charcoal,
              }}
            >
              <p className="text-xs font-semibold tracking-[0.12em] text-stone-500 uppercase">
                Example description
              </p>
              <p className="mt-1 text-sm text-stone-800">Not cooling properly…</p>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="font-display text-3xl leading-tight text-[#1C1917] md:text-4xl lg:text-[3rem]">
              Tell us what&apos;s happening.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 md:text-lg">
              Describe the issue so the technician has useful context before
              inspection.
            </p>
            <p className="mt-3 text-sm text-stone-600">
              GONA does not diagnose issues automatically — inspection happens on
              site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
