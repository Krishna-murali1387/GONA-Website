import {
  farmingMedia,
  farmingTokens,
} from "@/components/farming/farming.content";
import { FarmingMediaImage } from "@/components/farming/farming-media";

export function FarmingGuidance() {
  return (
    <section className="relative overflow-hidden bg-[#ECFCCB] py-24 md:py-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-14">
        <div className="relative min-h-[22rem] overflow-hidden md:min-h-[30rem] lg:min-h-[34rem]">
          <FarmingMediaImage
            src={farmingMedia.guidance.src}
            objectPosition={farmingMedia.guidance.objectPosition}
            alt="Farmer receiving practical field guidance"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(236,252,203,0.15),transparent_35%),linear-gradient(180deg,transparent_55%,rgba(54,83,20,0.45)_100%)]"
            aria-hidden="true"
          />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {["Crop guidance", "Farming questions", "Local support"].map(
              (label) => (
                <span
                  key={label}
                  className="bg-[#FFFCF5]/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#365314] uppercase"
                >
                  {label}
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: farmingTokens.foliage }}
          >
            Farmer + guidance
          </p>
          <h2 className="mt-3 font-display text-3xl text-[#1C1917] md:text-5xl">
            Questions from the field
            <span className="mt-1 block text-[#3F6212]">
              deserve practical support.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-stone-700 md:text-lg">
            GONA Farming is designed to connect farmers with useful guidance and
            support around farming needs.
          </p>
        </div>
      </div>
    </section>
  );
}
