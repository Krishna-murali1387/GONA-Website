import {
  farmingMedia,
  farmingTokens,
} from "@/components/farming/farming.content";
import { FarmingMediaImage } from "@/components/farming/farming-media";

export function FarmingInputs() {
  return (
    <section className="relative overflow-hidden bg-[#FAF6EE] py-24 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,#ECFCCB,transparent)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12">
          <div className="max-w-md">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: farmingTokens.accent }}
            >
              Agricultural inputs
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#1C1917] md:text-5xl">
              Inputs for
              <span className="mt-1 block text-[#3F6212]">the work ahead.</span>
            </h2>
            <p className="mt-4 text-base text-stone-600 md:text-lg">
              Access to agricultural inputs can be presented through GONA based
              on service and location availability.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-stone-600">
              <li className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: farmingTokens.accent }}
                  aria-hidden="true"
                />
                Seeds and field supplies where available
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: farmingTokens.accent }}
                  aria-hidden="true"
                />
                Practical tools for farm work
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: farmingTokens.accent }}
                  aria-hidden="true"
                />
                Selection varies by location
              </li>
            </ul>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden border border-[#D9F99D]/80 md:min-h-[24rem] lg:min-h-[28rem]">
            <FarmingMediaImage
              src={farmingMedia.inputs.src}
              objectPosition={farmingMedia.inputs.objectPosition}
              alt="Agricultural inputs and farm storage context"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(120,53,15,0.35)_100%)]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
