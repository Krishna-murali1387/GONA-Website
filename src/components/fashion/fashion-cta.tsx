import Link from "next/link";

import { fashionMedia, fashionTokens } from "@/components/fashion/fashion.content";
import { FashionMediaImage } from "@/components/fashion/fashion-media";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function FashionCta() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#0F0A1A] py-20 text-white md:min-h-[78vh]">
      <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
        <FashionMediaImage
          src={fashionMedia.cta.src}
          objectPosition={fashionMedia.cta.objectPosition}
          alt="Fashion campaign finale"
          fill
          sizes="(max-width: 768px) 100vw, 58vw"
          className="opacity-90"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,#0F0A1A_0%,rgba(15,10,26,0.75)_35%,rgba(76,29,149,0.25)_70%,transparent_100%)] md:bg-[linear-gradient(90deg,#0F0A1A_0%,rgba(15,10,26,0.55)_40%,transparent_72%)]"
          aria-hidden="true"
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#A855F7]/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl items-center px-5 sm:px-8 lg:px-10">
        <div className="max-w-md">
          <p
            className="mb-4 text-xs font-semibold tracking-[0.28em] uppercase"
            style={{ color: fashionTokens.yellow }}
          >
            GONA Fashion
          </p>
          <h2 className="font-display text-4xl leading-[1.02] md:text-6xl">
            Wear what
            <span className="mt-1 block text-[#E9D5FF]">feels like you.</span>
          </h2>
          <p className="mt-5 text-base text-white/70">
            Discover Fashion available around you through GONA.
          </p>
          <div className="mt-8">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
          </div>
          <p className="mt-5 text-sm text-white/50">
            Selection and availability vary by location and participating
            stores.
          </p>
        </div>
      </div>
    </section>
  );
}
