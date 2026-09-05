"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  localMedia,
  localTokens,
  localTournament,
} from "@/components/local/local.content";
import { LocalMediaImage } from "@/components/local/local-media";
import { ChampionMark, LiveScoreArt } from "@/components/local/local-visuals";

type Phase =
  | "ground"
  | "score"
  | "four"
  | "six"
  | "wicket"
  | "complete"
  | "champions"
  | "hall";

function phaseFromProgress(v: number): Phase {
  if (v < 0.1) return "ground";
  if (v < 0.26) return "score";
  if (v < 0.38) return "four";
  if (v < 0.5) return "six";
  if (v < 0.62) return "wicket";
  if (v < 0.74) return "complete";
  if (v < 0.86) return "champions";
  return "hall";
}

/** Chapter 03 — Tournament Ground signature scroll (photo environment + HTML LIVE score) */
export function LocalChapterTournament() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [phase, setPhase] = useState<Phase>("ground");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = phaseFromProgress(v);
    setPhase((prev) => (prev === next ? prev : next));
  });

  const groundScale = useTransform(
    scrollYProgress,
    [0, 0.18],
    reduce ? [1, 1] : [1.02, 1.1],
  );
  const tournamentFade = useTransform(scrollYProgress, (v) => {
    if (reduce) return 0.25;
    if (v < 0.72) return 1;
    if (v < 0.86) return 1 - ((v - 0.72) / 0.14) * 0.85;
    return 0.15;
  });
  const championsReveal = useTransform(scrollYProgress, (v) => {
    if (reduce) return 1;
    if (v < 0.72) return 0;
    if (v < 0.88) return (v - 0.72) / 0.16;
    return 1;
  });
  const goldWash = useTransform(scrollYProgress, (v) => {
    if (reduce) return 0.35;
    if (v < 0.74) return 0;
    if (v < 0.9) return ((v - 0.74) / 0.16) * 0.4;
    return 0.4;
  });

  return (
    <section id="local-tournament" ref={ref} className="relative bg-[#1A2E28]">
      <div className="h-[280vh] md:h-[320vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-16">
          <motion.div className="absolute inset-0" style={{ scale: groundScale }}>
            <motion.div className="absolute inset-0" style={{ opacity: tournamentFade }}>
              <LocalMediaImage
                src={localMedia.tournament.src}
                objectPosition={localMedia.tournament.objectPosition}
                objectPositionMobile={localMedia.tournament.objectPositionMobile}
                alt="Local multi-sport tournament grounds with cricket, volleyball, kabaddi and esports"
                fill
                sizes="100vw"
              />
            </motion.div>
            <motion.div className="absolute inset-0" style={{ opacity: championsReveal }}>
              <LocalMediaImage
                src={localMedia.champions.src}
                objectPosition={localMedia.champions.objectPosition}
                objectPositionMobile={localMedia.champions.objectPositionMobile}
                alt="Champions prestige environment"
                fill
                sizes="100vw"
              />
            </motion.div>
          </motion.div>

          {/* Copy readability only — clean environment assets need no baked-UI suppression */}
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,23,42,0.58)_0%,rgba(15,23,42,0.28)_42%,rgba(26,46,40,0.12)_100%)]"
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(255,212,0,0.18)_0%,transparent_55%)]"
            style={{ opacity: goldWash }}
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-14">
            <div className="max-w-md text-white">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: localTokens.yellow }}
              >
                Tournament ground
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl">
                {localTournament.headline}
                <span className="mt-1 block text-[#5BC4BC]">
                  {localTournament.headlineAccent}
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                {phase === "hall"
                  ? localTournament.hallLine
                  : phase === "champions" || phase === "complete"
                    ? localTournament.championsLine
                    : localTournament.support}
              </p>
              <p className="mt-3 text-xs text-white/45">{localTournament.note}</p>
            </div>

            <div className="relative min-h-[18rem] flex-1 md:min-h-[24rem]">
              <ScoreStage phase={phase} reduce={!!reduce} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreStage({
  phase,
  reduce,
}: {
  phase: Phase;
  reduce: boolean;
}) {
  const showScore =
    phase === "ground" ||
    phase === "score" ||
    phase === "four" ||
    phase === "six" ||
    phase === "wicket";

  return (
    <div className="relative flex h-full min-h-[18rem] items-center justify-center md:min-h-[24rem]">
      {showScore && (
        <div className="relative w-full max-w-lg rounded-sm border border-white/15 bg-[#0F172A]/55 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[2px] md:p-4">
          <LiveScoreArt
            className="h-auto w-full"
            homeName={localTournament.home.name}
            homeScore={localTournament.home.score}
            homeOvers={localTournament.home.overs}
            awayName={localTournament.away.name}
            awayScore={localTournament.away.score}
          />
          <p className="mt-3 text-center text-[10px] tracking-[0.16em] text-white/45 uppercase">
            {localTournament.scoreLabel}
          </p>
        </div>
      )}

      <AnimatePresence>
        {!reduce && phase === "four" && (
          <motion.div
            key="four"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span className="font-display text-7xl text-[#FFD400] md:text-8xl">
              FOUR!
            </span>
            <motion.div
              className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[#FFD400]/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
        {!reduce && phase === "six" && (
          <motion.div
            key="six"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 40, scale: 0.75 }}
            animate={{ opacity: 1, y: 0, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-display text-7xl text-[#FFD400] drop-shadow-[0_0_40px_rgba(255,212,0,0.35)] md:text-8xl">
              SIX!
            </span>
            <div
              className="absolute size-48 rounded-full border-2 border-[#FFD400]/40 md:size-64"
              aria-hidden="true"
            />
          </motion.div>
        )}
        {!reduce && phase === "wicket" && (
          <motion.div
            key="wicket"
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0F172A]/25"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="font-display text-6xl tracking-wide text-white md:text-7xl">
              WICKET
            </span>
          </motion.div>
        )}
        {reduce && (phase === "four" || phase === "six" || phase === "wicket") && (
          <motion.div
            key={`rm-${phase}`}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="font-display text-5xl text-[#FFD400]">
              {phase === "four" ? "FOUR!" : phase === "six" ? "SIX!" : "WICKET"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === "complete" || phase === "champions") && (
        <motion.div
          className="rounded-sm border border-white/15 bg-[#0F172A]/55 px-8 py-10 text-center text-white backdrop-blur-[2px]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-[#5BC4BC] uppercase">
            Match complete
          </p>
          <p className="mt-3 font-display text-4xl md:text-5xl">
            Winner: {localTournament.winner}
          </p>
          {phase === "champions" && (
            <>
              <p
                className="mt-6 font-display text-3xl md:text-4xl"
                style={{ color: localTokens.yellow }}
              >
                CHAMPIONS
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-white/65">
                {localTournament.championsLine}
              </p>
              <div className="mx-auto mt-6 w-28">
                <ChampionMark className="h-auto w-full" />
              </div>
            </>
          )}
        </motion.div>
      )}

      {phase === "hall" && (
        <motion.div
          className="relative w-full max-w-lg overflow-hidden rounded-sm border border-[#FFD400]/30 bg-[#0B1C1A]/70 p-8 text-center text-white backdrop-blur-[2px]"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="relative z-10">
            <div className="mx-auto w-24">
              <ChampionMark className="h-auto w-full" hall />
            </div>
            <h3
              className="mt-5 font-display text-3xl md:text-4xl"
              style={{ color: localTokens.yellow }}
            >
              {localTournament.hallTitle}
            </h3>
            <p className="mt-3 text-sm text-white/75">{localTournament.hallLine}</p>
            <p className="mt-3 text-xs text-white/45">{localTournament.hallNote}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
