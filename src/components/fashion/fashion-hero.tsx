"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { fashionMedia, fashionTokens } from "@/components/fashion/fashion.content";
import { FashionMediaImage } from "@/components/fashion/fashion-media";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

export function FashionHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#0F0A1A] pt-24 text-white md:min-h-[90vh] md:pt-28">
      {/* Dominant campaign crop — fashion-hero slot */}
      <motion.div
        className="absolute inset-y-0 right-[-4%] w-[72%] md:w-[65%] lg:w-[60%]"
        initial={false}
        animate={reduce ? undefined : { scale: [1.04, 1], x: [24, 0] }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <FashionMediaImage
            src={fashionMedia.hero.src}
            objectPosition={fashionMedia.hero.objectPosition}
            alt="Fashion editorial look featured in GONA Fashion"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 60vw"
            className="scale-105"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(90deg,#0F0A1A_0%,rgba(15,10,26,0.55)_18%,rgba(15,10,26,0.12)_42%,transparent_62%),linear-gradient(180deg,transparent_55%,rgba(46,16,101,0.35)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(15,10,26,0.4),transparent)]"
            aria-hidden="true"
          />
        </div>
      </motion.div>

      {/* Secondary edge crop — independent look slot */}
      <motion.div
        className="absolute bottom-[12%] left-[4%] hidden h-44 w-36 overflow-hidden border border-white/15 md:block lg:h-56 lg:w-44"
        initial={false}
        animate={reduce ? undefined : { opacity: [0, 1], y: [20, 0] }}
        transition={{ duration: 0.9, delay: 0.25 }}
      >
        <FashionMediaImage
          src={fashionMedia.heroInset.src}
          objectPosition={fashionMedia.heroInset.objectPosition}
          alt=""
          fill
          sizes="180px"
          className="opacity-90"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-purple-900/25" aria-hidden="true" />
      </motion.div>

      <div
        className="pointer-events-none absolute top-[18%] left-[20%] h-64 w-64 rounded-full bg-[#A855F7]/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-5 pb-16 sm:px-8 lg:px-10">
        <div className="max-w-md lg:max-w-lg">
          <p
            className="mb-5 text-xs font-semibold tracking-[0.28em] uppercase"
            style={{ color: fashionTokens.yellow }}
          >
            GONA Fashion
          </p>
          <h1 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-[4.5rem]">
            Style,
            <span className="mt-1 block text-[#E9D5FF]">closer</span>
            <span className="mt-1 block">to home.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-white/75 md:text-lg">
            Discover fashion from approved stores available around you, choose
            the right variant and shop through GONA.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={downloadHref()} className={buttonClass("yellow")}>
              Download GONA
            </Link>
            <a href="#fashion-lookbook" className={buttonClass("secondaryOnDark")}>
              Explore Fashion
            </a>
          </div>
          <p className="mt-5 max-w-xs text-sm text-white/55">
            Fashion selection varies by location and participating stores.
          </p>
        </div>
      </div>
    </section>
  );
}
