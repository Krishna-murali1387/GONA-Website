"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { BusinessClosing } from "@/components/business/immersive/business-closing";
import { CableSystemPreview } from "@/components/business/immersive/cable-system-preview";
import { FutureSpotlight } from "@/components/business/immersive/future-spotlight";
import { clamp01 } from "@/components/business/immersive/business-motion";
import {
  BizSecondaryCta,
  BizYellowCta,
} from "@/components/business/business-ui";
import { cableSite } from "@/config/cable.config";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import "./business-v3.css";

const Business3DScene = dynamic(
  () =>
    import("@/components/business/immersive/business-3d-scene").then(
      (m) => m.Business3DScene,
    ),
  { ssr: false, loading: () => <HeroFallbackMark /> },
);

function HeroFallbackMark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0c]">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={siteConfig.assets.logo}
          alt=""
          width={96}
          height={96}
          className="rounded-[22%] opacity-90 shadow-[0_0_40px_rgba(255,212,0,0.15)]"
          priority
        />
        <div className="h-px w-16 overflow-hidden bg-white/10">
          <div className="h-full w-1/2 animate-pulse bg-[#FFD400]/70" />
        </div>
      </div>
    </div>
  );
}

function StaticImmersionFallback() {
  return (
    <section className="relative overflow-hidden bg-[#0c0c0c] px-5 py-28 text-white sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <Image
          src={siteConfig.assets.logo}
          alt="GONA"
          width={88}
          height={88}
          className="rounded-[22%] shadow-[0_0_48px_rgba(255,212,0,0.18)]"
          priority
        />
        <p className="mt-8 text-xs font-bold tracking-[0.32em] text-[#FFD400] uppercase">
          GONA BUSINESS
        </p>
        <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-gona-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
          Software for the real world.
        </h1>
        <p className="mt-4 max-w-lg text-base text-white/50">
          Professional operating software for businesses — starting with GONA Cable.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BizYellowCta href={cableSite.productPath}>Explore GONA Cable</BizYellowCta>
          <BizSecondaryCta href={cableSite.registerPath} onDark>
            Register Your Network
          </BizSecondaryCta>
        </div>
      </div>
    </section>
  );
}

export function BusinessV3Experience() {
  const trackRef = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const reduced = usePrefersReducedMotion();
  const rafScroll = useRef(0);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ok = !!(
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
      );
      setWebglOk(ok);
    } catch {
      setWebglOk(false);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const raw = total > 0 ? -rect.top / total : 0;
      setProgress(clamp01(raw));
      setVisible(rect.bottom > 0 && rect.top < window.innerHeight);
      rafScroll.current = 0;
    };

    const onScroll = () => {
      if (rafScroll.current) return;
      rafScroll.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafScroll.current) cancelAnimationFrame(rafScroll.current);
    };
  }, []);

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const show3d = webglOk && !reduced;
  const heroOpacity = progress < 0.2 ? 1 : Math.max(0, 1 - (progress - 0.2) / 0.2);
  const universeCopyOpacity =
    progress > 0.22 && progress < 0.58
      ? Math.min(1, (progress - 0.22) / 0.12) * Math.min(1, (0.58 - progress) / 0.08)
      : 0;
  const cableTransitionOpacity =
    progress > 0.55 ? Math.min(1, (progress - 0.55) / 0.18) : 0;

  return (
    <main className="overflow-x-hidden bg-[#0a0a0a]">
      {/* Semantic always-present summary for SEO / a11y */}
      <div className="sr-only">
        <h1>GONA Business</h1>
        <p>
          Professional software for the real world. GONA Cable is available now. Future products
          include Schools, Restaurants, Industry, Events, Workforce and Finance — coming soon.
        </p>
        <a href={cableSite.productPath}>Explore GONA Cable</a>
        <a href={cableSite.registerPath}>Register Your Network</a>
      </div>

      {!show3d ? <StaticImmersionFallback /> : null}

      {show3d ? (
        <section ref={trackRef} className="relative h-[280vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Business3DScene
              scrollProgress={progress}
              pointer={pointer}
              reducedMotion={reduced}
              mobile={mobile}
              visible={visible}
            />

            {/* Entrance copy */}
            <div
              className="pointer-events-none absolute inset-x-0 top-[12%] z-10 px-5 text-center sm:top-[14%]"
              style={{ opacity: heroOpacity }}
            >
              <p className="text-xs font-bold tracking-[0.35em] text-[#FFD400] uppercase">
                GONA BUSINESS
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Software for the real world.
              </h2>
              <p className="mt-4 text-sm text-white/40">Scroll to enter</p>
            </div>

            {/* Universe copy */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-[10%] z-10 px-5 text-center"
              style={{ opacity: universeCopyOpacity }}
            >
              <p className="text-xs font-bold tracking-[0.28em] text-white/50 uppercase">
                GONA Business ecosystem
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
                Cable is available now. Six more systems are concepts for what comes next.
              </p>
            </div>

            {/* Cable transition copy */}
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-5 text-center"
              style={{ opacity: cableTransitionOpacity }}
            >
              <p className="text-xs font-bold tracking-[0.28em] text-[#FFD400] uppercase">
                The first system is already here
              </p>
              <p className="mt-3 font-[family-name:var(--font-gona-display)] text-4xl font-extrabold text-white sm:text-5xl">
                GONA Cable
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Return to light bridge */}
      <section className="bg-gradient-to-b from-[#0a0a0a] via-[#2a2a2a] to-[#FAF8F5] px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.28em] text-[#FFD400] uppercase">
            Available now
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            The first system is already here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/55">
            GONA Cable — professional cable network management for owners, operators and
            customers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BizYellowCta href={cableSite.productPath}>Explore GONA Cable</BizYellowCta>
            <BizSecondaryCta href={cableSite.registerPath} onDark>
              Register Your Network
            </BizSecondaryCta>
          </div>
        </div>
      </section>

      <FutureSpotlight />

      <section className="bg-[#FAF8F5] px-5 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl border-t border-[#111111]/8 pt-16 text-center sm:pt-20">
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
            The first system is already here.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[#5A6570]">GONA Cable</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BizYellowCta href={cableSite.productPath}>Explore GONA Cable</BizYellowCta>
            <BizSecondaryCta href={cableSite.registerPath}>Register Your Network</BizSecondaryCta>
          </div>
        </div>
      </section>

      <CableSystemPreview />
      <BusinessClosing />
    </main>
  );
}
