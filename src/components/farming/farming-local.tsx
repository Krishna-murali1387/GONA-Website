import {
  farmingMedia,
  farmingTokens,
} from "@/components/farming/farming.content";
import { FarmingMediaImage } from "@/components/farming/farming-media";

export function FarmingLocal() {
  return (
    <section className="relative overflow-hidden bg-[#E0F2FE] py-24 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-12">
          <div className="max-w-md">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: farmingTokens.foliage }}
            >
              Local landscape
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#1C1917] md:text-5xl">
              Support shaped around
              <span className="mt-1 block text-[#3F6212]">where you farm.</span>
            </h2>
            <p className="mt-4 text-base text-stone-700 md:text-lg">
              Farming services can be made available based on location, local
              operations and supported service coverage.
            </p>
          </div>

          <div className="relative min-h-[18rem] overflow-hidden md:min-h-[24rem] lg:min-h-[28rem]">
            <FarmingMediaImage
              src={farmingMedia.local.src}
              objectPosition={farmingMedia.local.objectPosition}
              alt="Local agricultural landscape and farming context"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(224,242,254,0.55)_0%,transparent_28%),linear-gradient(180deg,transparent_60%,rgba(54,83,20,0.3)_100%)]"
              aria-hidden="true"
            />
            {/* Restrained location cue — not a map */}
            <div className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-[#FFFCF5]/90 px-3 py-1.5 text-xs font-semibold text-[#365314]">
              <span
                className="size-2 rounded-full"
                style={{ background: farmingTokens.yellow }}
                aria-hidden="true"
              />
              Local availability
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
