import { repairTokens } from "@/components/repair/repair.content";
import { VerifyScene } from "@/components/repair/repair-visuals";

export function RepairVerify() {
  return (
    <section id="repair-verify" className="bg-[#F5F5F4] py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="max-w-md">
            <h2 className="font-display text-3xl leading-tight text-[#1C1917] md:text-4xl lg:text-[3rem]">
              Clear from start
              <span className="mt-1 block" style={{ color: repairTokens.deep }}>
                to completion.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-700 md:text-lg">
              Key moments — like starting work and finishing the job — can be
              verified so everyone stays aligned.
            </p>
          </div>
          <div className="min-h-[200px] overflow-hidden md:min-h-[260px]">
            <VerifyScene className="h-full min-h-[200px] w-full md:min-h-[260px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
