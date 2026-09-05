"use client";

import Image from "next/image";

import { repairTokens } from "@/components/repair/repair.content";
import { ToolBag } from "@/components/repair/repair-visuals";

export function RepairTechnician() {
  return (
    <section id="repair-technician" className="bg-[#FAF8F5] py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12">
          <div className="max-w-md">
            <h2 className="font-display text-3xl leading-tight text-[#1C1917] md:text-4xl lg:text-[3rem]">
              The right help,
              <span className="mt-1 block" style={{ color: repairTokens.deep }}>
                closer to the job.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 md:text-lg">
              GONA connects supported repair requests with available service
              professionals based on location and service availability.
            </p>
          </div>

          <div className="relative min-h-[300px] overflow-hidden md:min-h-[400px]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg,#FAF8F5 0%,#E7E5E4 55%,#D6D3D1 100%)",
              }}
              aria-hidden="true"
            />
            {/* Modest doorway cue — not oversized */}
            <div
              className="absolute bottom-[12%] left-[6%] h-[55%] w-[16%] max-w-[90px] rounded-t-md border-[3px]"
              style={{
                background: "#44403C",
                borderColor: repairTokens.charcoal,
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-y-0 right-0 w-[72%]">
              <Image
                src="/services/repair.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 80vw, 50vw"
                className="object-cover"
                style={{ objectPosition: "80% 22%" }}
                aria-hidden="true"
              />
              <div className="absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(90deg,#E7E5E4,transparent)]" />
              <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,transparent,#D6D3D1)]" />
            </div>
            <div className="absolute bottom-5 left-[26%] w-16 md:w-20">
              <ToolBag className="h-auto w-full drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
