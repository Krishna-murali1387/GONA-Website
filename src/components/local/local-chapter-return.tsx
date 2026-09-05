"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import {
  localBusinessCopy,
  localCalendar,
  localFinale,
  localMedia,
  localPulloutLabels,
  localTokens,
} from "@/components/local/local.content";
import { LocalMediaImage } from "@/components/local/local-media";
import { siteConfig } from "@/config/site.config";
import { buttonClass } from "@/lib/ui";

function downloadHref(): string {
  return siteConfig.download.playStoreUrl ?? "/#download";
}

/** Chapter 04 — Community returns, business, calendar, final pull-out */
export function LocalChapterReturn() {
  return (
    <>
      <BusinessMoment />
      <LivingCalendar />
      <FinalPullout />
    </>
  );
}

function BusinessMoment() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const surfaceIndex = useTransform(scrollYProgress, [0.12, 0.88], [0, 3.2]);
  const panX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -28],
  );

  return (
    <section ref={ref} className="relative bg-[#1C1917]">
      <div className="h-[160vh] md:h-[180vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
          <motion.div className="absolute inset-0" style={{ x: panX }}>
            <LocalMediaImage
              src={localMedia.business.src}
              objectPosition={localMedia.business.objectPosition}
              objectPositionMobile={localMedia.business.objectPositionMobile}
              alt="Local business street with shops and community visibility"
              fill
              sizes="100vw"
              className="scale-105"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(245,237,224,0.92)_0%,rgba(245,237,224,0.72)_38%,rgba(245,237,224,0.28)_70%,rgba(28,25,23,0.2)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-14">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: localTokens.accent }}
              >
                Local visibility
              </p>
              <h2 className="mt-3 font-display text-3xl text-[#1C1917] md:text-5xl">
                {localBusinessCopy.headline}
                <span
                  className="mt-1 block"
                  style={{ color: localTokens.accentDeep }}
                >
                  {localBusinessCopy.headlineAccent}
                </span>
              </h2>
              <p className="mt-4 max-w-md text-base text-stone-700">
                {localBusinessCopy.support}
              </p>
              <p className="mt-3 max-w-md text-sm text-stone-600">
                {localBusinessCopy.note}
              </p>

              <ul className="mt-8 space-y-2">
                {localBusinessCopy.surfaces.map((label, index) => (
                  <SurfaceItem
                    key={label}
                    label={label}
                    index={index}
                    progress={surfaceIndex}
                    reduce={!!reduce}
                  />
                ))}
              </ul>
            </div>

            <div className="relative hidden min-h-[16rem] overflow-hidden rounded-sm border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.2)] md:block md:min-h-[22rem] lg:min-h-[26rem]">
              <LocalMediaImage
                src={localMedia.business.src}
                objectPosition="52% 42%"
                objectPositionMobile="50% 40%"
                alt=""
                fill
                sizes="50vw"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(15,23,42,0.55)_100%)]"
                aria-hidden="true"
              />
              <p className="absolute bottom-5 left-5 text-[10px] font-semibold tracking-[0.18em] text-[#FFD400] uppercase">
                Local street · example
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SurfaceItem({
  label,
  index,
  progress,
  reduce,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, (v) => {
    if (reduce) return 1;
    const d = Math.abs(v - index);
    if (d < 0.45) return 1;
    if (d < 1) return 0.45;
    return 0.25;
  });

  return (
    <motion.li
      style={{ opacity }}
      className="border-l-2 border-[#0F9F94] pl-3 text-sm font-semibold text-[#0B7A72]"
    >
      {label}
    </motion.li>
  );
}

function LivingCalendar() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dateProgress = useTransform(
    scrollYProgress,
    [0.12, 0.88],
    [0, localCalendar.length - 0.01],
  );

  return (
    <section ref={ref} className="relative bg-[#D6EEEB]">
      <div className="h-[140vh] md:h-[160vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
          <div className="absolute inset-0 opacity-[0.18]">
            <LocalMediaImage
              src={localMedia.community.src}
              objectPosition={localMedia.community.objectPosition}
              objectPositionMobile={localMedia.community.objectPositionMobile}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
            />
          </div>
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,#D6EEEB_0%,rgba(214,238,235,0.92)_45%,#D6EEEB_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-14">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: localTokens.accentDeep }}
            >
              Living calendar
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#1C1917] md:text-5xl">
              What&apos;s coming
              <span className="mt-1 block text-[#0F9F94]">in your Mandal.</span>
            </h2>
            <p className="mt-3 text-sm text-stone-500">
              Illustrative dates only — not a live community calendar.
            </p>

            <div className="relative mt-12 min-h-[14rem] rounded-sm border border-[#0F9F94]/20 bg-white/55 p-6 backdrop-blur-[2px] md:min-h-[18rem] md:p-8">
              {localCalendar.map((item, index) => (
                <CalendarSlide
                  key={item.id}
                  item={item}
                  index={index}
                  progress={dateProgress}
                  reduce={!!reduce}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalendarSlide({
  item,
  index,
  progress,
  reduce,
}: {
  item: (typeof localCalendar)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, (v) => {
    if (reduce) return index === 0 ? 1 : 0;
    const d = Math.abs(v - index);
    if (d < 0.4) return 1;
    if (d < 0.9) return 1 - (d - 0.4) / 0.5;
    return 0;
  });
  const y = useTransform(progress, (v) => {
    if (reduce) return 0;
    return (v - index) * -36;
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-end gap-8 p-6 md:gap-12 md:p-8"
      style={{ opacity, y }}
    >
      <div>
        <p className="font-display text-7xl leading-none text-[#0B7A72] md:text-8xl">
          {item.day}
        </p>
        <p className="mt-2 text-sm font-semibold tracking-[0.28em] text-[#0F9F94]">
          {item.month}
        </p>
      </div>
      <div className="pb-3">
        <p className="font-display text-3xl text-[#1C1917] md:text-4xl">
          {item.title}
        </p>
      </div>
    </motion.div>
  );
}

function FinalPullout() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduce ? [1.06, 1] : [1.14, 1],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [24, -12],
  );
  const labelsOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.62],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      id="local-cta"
      ref={ref}
      className="relative bg-[#2A3544] text-white"
    >
      <div className="h-[150vh] md:h-[170vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
          <motion.div className="absolute inset-0" style={{ scale, y }}>
            <LocalMediaImage
              src={localMedia.mandal.src}
              objectPosition={localMedia.mandal.objectPosition}
              objectPositionMobile={localMedia.mandal.objectPositionMobile}
              alt="Complete Mandal community at dusk"
              fill
              sizes="100vw"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.82)_0%,rgba(42,53,68,0.45)_48%,rgba(42,53,68,0.55)_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-14">
            <motion.div style={{ opacity: labelsOpacity }} className="mb-8">
              <ul className="flex flex-wrap gap-2">
                {localPulloutLabels.map((label) => (
                  <li
                    key={label}
                    className="rounded-full border border-[#FFD400]/35 bg-[#0F9F94]/20 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#FFD400] uppercase"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </motion.div>

            <p
              className="mb-4 text-xs font-semibold tracking-[0.26em] uppercase"
              style={{ color: localTokens.yellow }}
            >
              {localFinale.brand}
            </p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
              {localFinale.headline}
              <span className="mt-1 block text-[#5BC4BC]">
                {localFinale.headlineAccent}
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/75">{localFinale.support}</p>
            <div className="mt-8">
              <Link href={downloadHref()} className={buttonClass("yellow")}>
                {localFinale.cta}
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/50">{localFinale.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
