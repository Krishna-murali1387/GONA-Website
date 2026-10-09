"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { heroVideoConfig } from "@/config/hero-video.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

/**
 * Fills the existing phone screen inset — not a second device frame.
 * Muted autoplay + loop; sound only after an explicit user gesture.
 */
export function PhoneScreenVideo() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed || reducedMotion) return;

    video.muted = muted;

    if (inView) {
      const playAttempt = video.play();
      if (playAttempt !== undefined) {
        void playAttempt.catch(() => {
          /* Autoplay can be blocked until interaction; stay muted and wait. */
        });
      }
    } else {
      video.pause();
    }
  }, [failed, inView, muted, reducedMotion]);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const nextMuted = !muted;
    setMuted(nextMuted);
    video.muted = nextMuted;
    if (!nextMuted) {
      void video.play().catch(() => undefined);
    }
  }, [failed, muted]);

  if (failed) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#101010] px-4"
        role="img"
        aria-label={heroVideoConfig.ariaLabel}
      >
        <FallbackPoster />
        <p className="mt-3 text-center text-[10px] text-white/45">
          Video unavailable
        </p>
      </div>
    );
  }

  if (reducedMotion) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 bg-[#101010]"
        role="img"
        aria-label={heroVideoConfig.ariaLabel}
      >
        <FallbackPoster />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#101010]">
      {!ready ? <FallbackPoster /> : null}

      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center",
          !ready && "opacity-0",
        )}
        src={heroVideoConfig.src}
        poster={heroVideoConfig.poster ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={heroVideoConfig.ariaLabel}
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
      />

      <button
        type="button"
        onClick={toggleSound}
        className="absolute right-2.5 bottom-2.5 z-40 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-[0_4px_14px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-[background-color,transform] hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow active:scale-95"
        aria-label={muted ? "Unmute promotional video" : "Mute promotional video"}
        aria-pressed={!muted}
      >
        {muted ? <MuteIcon /> : <SoundIcon />}
      </button>
    </div>
  );
}

function FallbackPoster() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,212,0,0.18),transparent_55%),#101010]"
      aria-hidden="true"
    >
      <span className="text-sm font-bold tracking-[0.28em] text-gona-yellow uppercase">
        GONA
      </span>
      <span className="mt-2 max-w-[10rem] text-center text-[10px] leading-relaxed text-white/40">
        Everything You Need.
      </span>
    </div>
  );
}

function MuteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m16 9.5 5 5M21 9.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
