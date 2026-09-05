import { farmingTokens } from "@/components/farming/farming.content";
import { SupportConstellationArt } from "@/components/farming/farming-visuals";

export function FarmingSupport() {
  return (
    <section className="bg-[#FAF6EE] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: farmingTokens.accent }}
        >
          Support constellation
        </p>
        <h2 className="mt-2 font-display text-2xl text-[#1C1917] md:text-3xl">
          Guidance around one field.
        </h2>
        <div className="mt-8 overflow-hidden">
          <div className="aspect-[900/300] min-h-[11rem] w-full md:min-h-[14rem]">
            <SupportConstellationArt className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
