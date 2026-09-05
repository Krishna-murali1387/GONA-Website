import { fashionMedia, fashionTokens } from "@/components/fashion/fashion.content";
import { FashionMediaImage } from "@/components/fashion/fashion-media";

export function FashionEditorial() {
  return (
    <section className="bg-[#FAF7F2] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase"
          style={{ color: fashionTokens.accent }}
        >
          Editorial discovery
        </p>
        <h2 className="mt-3 max-w-lg font-display text-4xl text-[#0F0A1A] md:text-5xl">
          Discover your next look.
        </h2>

        {/* Asymmetric mosaic — dedicated editorial + category crops */}
        <div className="mt-10 grid grid-cols-12 gap-3 md:gap-4">
          <figure className="relative col-span-12 row-span-2 min-h-[22rem] overflow-hidden md:col-span-5 md:min-h-[32rem]">
            <FashionMediaImage
              src={fashionMedia.editorial01.src}
              objectPosition={fashionMedia.editorial01.objectPosition}
              alt="Editorial fashion look"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <figcaption className="absolute bottom-4 left-4 bg-[#0F0A1A]/75 px-3 py-1.5 text-[10px] tracking-[0.2em] text-white uppercase">
              New looks
            </figcaption>
          </figure>

          <div className="col-span-12 flex flex-col justify-end bg-[#2E1065] p-6 text-white md:col-span-3 md:min-h-[14rem]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#E9D5FF]">
              01
            </p>
            <p className="mt-3 font-display text-3xl leading-tight">
              Everyday
              <br />
              layers.
            </p>
          </div>

          <figure className="relative col-span-6 min-h-[12rem] overflow-hidden md:col-span-4 md:min-h-[14rem]">
            <FashionMediaImage
              src={fashionMedia.footwear.src}
              objectPosition={fashionMedia.footwear.objectPosition}
              alt="Footwear editorial crop"
              fill
              sizes="40vw"
            />
            <figcaption className="absolute top-3 left-3 text-[10px] tracking-[0.2em] text-white uppercase drop-shadow">
              Footwear
            </figcaption>
          </figure>

          <figure className="relative col-span-6 min-h-[12rem] overflow-hidden md:col-span-4 md:col-start-9 md:row-start-2 md:min-h-[16rem]">
            <FashionMediaImage
              src={fashionMedia.accessories.src}
              objectPosition={fashionMedia.accessories.objectPosition}
              alt="Accessories editorial detail"
              fill
              sizes="40vw"
            />
            <figcaption className="absolute bottom-3 right-3 text-[10px] tracking-[0.2em] text-white uppercase drop-shadow">
              Accessories
            </figcaption>
          </figure>

          <div className="col-span-12 flex items-center justify-between border border-[#E9D5FF] bg-[#FFFCFA] px-5 py-6 md:col-span-3 md:col-start-6 md:row-start-2">
            <p className="max-w-[10rem] text-sm leading-relaxed text-stone-600">
              Editorial spreads for browsing style — not live inventory labels.
            </p>
            <span
              className="font-display text-4xl text-[#A855F7]"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
