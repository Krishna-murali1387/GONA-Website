"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

import {
  localEmergencyContacts,
  localMedia,
  localStreamMoments,
  localTokens,
} from "@/components/local/local.content";
import { LocalMediaImage } from "@/components/local/local-media";
import { cn } from "@/lib/cn";

const MOMENT_COUNT = localStreamMoments.length;

function momentWeight(v: number, index: number) {
  const d = Math.abs(v - index);
  if (d < 0.45) return 1;
  if (d < 0.95) return 1 - (d - 0.45) / 0.5;
  return 0;
}

/** Chapter 02 — Community Stream over real community media */
export function LocalChapterStream() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const momentProgress = useTransform(
    scrollYProgress,
    [0.06, 0.94],
    [0, MOMENT_COUNT - 0.01],
  );

  return (
    <section id="local-stream" ref={ref} className="relative bg-[#0F172A]">
      <div className="h-[220vh] md:h-[260vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
          <div className="absolute inset-0">
            <LocalMediaImage
              src={localMedia.community.src}
              objectPosition={localMedia.community.objectPosition}
              objectPositionMobile={localMedia.community.objectPositionMobile}
              alt="Local community street activity in a Mandal"
              fill
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.62)_0%,rgba(15,23,42,0.35)_42%,rgba(15,23,42,0.18)_100%)]"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-14">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: localTokens.accentSoft }}
              >
                Community stream
              </p>
              <h2 className="mt-3 font-display text-3xl text-white md:text-5xl">
                Your Mandal
                <span
                  className="mt-1 block"
                  style={{ color: localTokens.accentSoft }}
                >
                  is alive.
                </span>
              </h2>
              <p className="mt-4 max-w-md text-base text-white/70">
                Scroll through local updates, important information, events and
                community visibility — illustrative examples only.
              </p>

              <ol className="mt-8 space-y-2.5">
                {localStreamMoments.map((moment, index) => (
                  <MomentItem
                    key={moment.id}
                    index={index}
                    progress={momentProgress}
                    reduce={!!reduce}
                    moment={moment}
                  />
                ))}
              </ol>
            </div>

            <div className="relative min-h-[16rem] md:min-h-[22rem] lg:min-h-[26rem]">
              <StreamVisual progress={momentProgress} reduce={!!reduce} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MomentItem({
  index,
  progress,
  reduce,
  moment,
}: {
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
  moment: (typeof localStreamMoments)[number];
}) {
  const opacity = useTransform(progress, (v) => {
    if (reduce) return index === localStreamMoments.length - 1 ? 1 : 0.4;
    const d = Math.abs(v - index);
    if (d < 0.5) return 1;
    if (d < 1.15) return 0.4;
    return 0.18;
  });
  const scale = useTransform(progress, (v) => {
    if (reduce) return 1;
    return Math.abs(v - index) < 0.5 ? 1 : 0.98;
  });

  return (
    <motion.li
      style={{ opacity, scale }}
      className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-[2px]"
    >
      <p
        className="text-[10px] font-semibold tracking-[0.18em] uppercase"
        style={{ color: localTokens.yellow }}
      >
        {moment.kind}
      </p>
      <p className="mt-1 font-display text-xl text-white">{moment.title}</p>
      <p className="mt-1 text-sm text-white/70">{moment.detail}</p>
      <p className="mt-2 text-[10px] tracking-wide text-white/40 uppercase">
        {moment.label}
      </p>
    </motion.li>
  );
}

function StreamVisual({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const panelOpacity = useTransform(progress, (v) => {
    if (reduce) return 1;
    return momentWeight(v, 2) > 0.5 ? 0 : 1;
  });
  const emergencyOpacity = useTransform(progress, (v) =>
    reduce ? 1 : momentWeight(v, 2),
  );

  return (
    <div className="relative h-full min-h-[16rem] w-full md:min-h-[22rem]">
      <motion.div
        className="absolute inset-0 flex flex-col justify-end rounded-sm border border-white/20 bg-[#0F172A]/35 p-6 backdrop-blur-[3px] md:p-8"
        style={{ opacity: panelOpacity }}
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#5BC4BC] uppercase">
          In the community
        </p>
        <div className="relative mt-3 min-h-[3.5rem]">
          {localStreamMoments.map((m, index) => (
            <FocusTitle
              key={m.id}
              label={m.title}
              index={index}
              progress={progress}
              reduce={reduce}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-white/65">
          Example community activity — not live data.
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ opacity: emergencyOpacity }}
      >
        <EmergencyPanel progress={progress} reduce={reduce} />
      </motion.div>
    </div>
  );
}

function FocusTitle({
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
    if (reduce) return index === 0 ? 1 : 0;
    return momentWeight(v, index);
  });

  return (
    <motion.p
      style={{ opacity }}
      className="absolute inset-x-0 top-0 font-display text-3xl text-white md:text-4xl"
    >
      {label}
    </motion.p>
  );
}

function EmergencyPanel({
  progress,
  reduce,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  return (
    <div className="flex h-full min-h-[16rem] flex-col justify-center gap-3 rounded-sm border border-[#0F9F94]/35 bg-[#0B1C1A]/85 p-6 md:min-h-[22rem] md:p-8">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-[#5BC4BC] uppercase">
        Emergency information
      </p>
      <p className="max-w-sm text-sm text-white/75">
        GONA helps surface useful local contact information. GONA does not
        operate ambulance, police, fire or government emergency services.
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {localEmergencyContacts.map((c, i) => (
          <EmergencyChip
            key={c.id}
            label={c.label}
            index={i}
            progress={progress}
            reduce={reduce}
          />
        ))}
      </ul>
      <p className="mt-3 text-[10px] tracking-wide text-white/40 uppercase">
        Example contact information · no phone numbers shown
      </p>
    </div>
  );
}

function EmergencyChip({
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
    const local = (v - 2) * 4;
    if (local < index * 0.7) return 0.2;
    if (local < index * 0.7 + 0.5) {
      return 0.2 + ((local - index * 0.7) / 0.5) * 0.8;
    }
    return 1;
  });

  return (
    <motion.li
      style={{ opacity }}
      className={cn(
        "rounded-xl border px-3 py-3 text-center text-sm font-semibold tracking-wide text-white",
        "border-[#0F9F94]/40 bg-[#0B7A72]/40",
      )}
    >
      {label}
    </motion.li>
  );
}
