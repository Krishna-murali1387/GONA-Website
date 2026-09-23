"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { SoftFrame, V4Cta } from "@/components/business/v4/v4-ui";
import {
  clamp01,
  useIsFinePointer,
  useIsMobileLayout,
  usePointerCssVars,
} from "@/components/business/v4/v4-hooks";
import { BusinessProductIcon } from "@/components/business/business-icons";
import {
  futureProducts,
  productColors,
  type FutureProductId,
  type ProductColorId,
} from "@/config/business.config";
import { cableSite } from "@/config/cable.config";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import "./business-v4.css";

const PHILOSOPHY_WORDS = ["OPERATIONS", "PEOPLE", "CUSTOMERS", "MONEY"] as const;
const CABLE = productColors.cable;

const FAMILY = [
  {
    id: "cable" as ProductColorId,
    index: "01",
    name: "GONA Cable",
    subtitle: "Cable Network Management",
    status: "available" as const,
    href: cableSite.productPath,
    ...productColors.cable,
  },
  ...futureProducts.map((p, i) => ({
    id: p.id as ProductColorId,
    index: String(i + 2).padStart(2, "0"),
    name: p.name,
    subtitle: p.subtitle,
    status: "soon" as const,
    href: undefined as string | undefined,
    accent: p.accent,
    accentSoft: p.accentSoft,
    accentDark: p.accentDark,
  })),
];

function MaskedLines({
  lines,
  className,
  active,
}: {
  lines: string[];
  className?: string;
  active: boolean;
}) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span
          key={line}
          className="v4-mask-line"
          data-in={active ? "true" : "false"}
          style={{ transitionDelay: active ? `${i * 80}ms` : "0ms" }}
        >
          <span>{line}</span>
        </span>
      ))}
    </h1>
  );
}

function TextBelt() {
  const items = [
    { word: "BUSINESS", color: "#6D4AFF" },
    { word: "OPERATIONS", color: "#334155" },
    { word: "PEOPLE", color: "#B45309" },
    { word: "CUSTOMERS", color: "#0F766E" },
    { word: "MONEY", color: "#7C3AED" },
    { word: "GROWTH", color: "#15803D" },
  ] as const;
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#111111]/8 bg-[#FAF9F6] py-5" aria-hidden>
      <div className="v4-belt">
        {row.map((item, i) => (
          <span key={`${item.word}-${i}`} className="v4-belt-item">
            <span className="v4-belt-word" style={{ color: item.color }}>
              {item.word}
            </span>
            <span className="v4-belt-sep"> ·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SceneHero() {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(reduced);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="v4-hero relative overflow-hidden bg-[#FAF9F6] pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="v4-hero-bg" aria-hidden>
        <Image
          src="/images/business/gona-business-hero-final.png"
          alt=""
          fill
          priority
          className="v4-hero-bg-img"
          sizes="100vw"
        />
      </div>
      <div className="v4-hero-readability" aria-hidden />

      <div className="v4-hero-content relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-xl lg:max-w-[min(100%,28rem)] xl:max-w-[min(100%,30rem)]">
          <p className="text-xs font-bold tracking-[0.32em] text-[#8A7400] uppercase">
            GONA BUSINESS
          </p>
          <MaskedLines
            active={ready}
            className="mt-5 font-[family-name:var(--font-gona-display)] text-[2.2rem] leading-[1.05] font-extrabold tracking-tight text-[#111111] sm:text-5xl lg:text-[3.4rem]"
            lines={["WE BUILD SOFTWARE", "AROUND THE WAY", "BUSINESSES ACTUALLY WORK."]}
          />
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5A6570] sm:text-lg">
            From cable networks to the industries we&apos;re building software for next — GONA turns
            everyday operations into simpler, connected systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <V4Cta href="#our-software" variant="yellow">
              Explore our software
            </V4Cta>
            <V4Cta href={cableSite.productPath} variant="outline">
              GONA Cable
            </V4Cta>
          </div>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-[#111111]/35 uppercase">
            Built by GONA TECHNOLOGIES
          </p>
        </div>
      </div>
    </section>
  );
}

function ScenePhilosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduced) return;
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(PHILOSOPHY_WORDS.length - 1, Math.floor(v * PHILOSOPHY_WORDS.length));
      setWord(idx);
      if (ref.current) ref.current.style.setProperty("--v4-progress", String(clamp01(v)));
    });
  }, [scrollYProgress, reduced]);

  return (
    <section ref={ref} className="relative bg-[#FAF9F6]">
      <div className="mx-auto grid min-h-[180vh] max-w-6xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="max-w-md font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight text-[#111111] sm:text-5xl">
            GOOD SOFTWARE
            <span className="mt-1 block">STARTS BY</span>
            <span className="mt-1 block">UNDERSTANDING</span>
            <span className="mt-1 block text-[#5A6570]">THE BUSINESS.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm text-[#5A6570]">
            Different businesses have different problems.
          </p>
        </div>
        <div className="relative flex min-h-[70vh] items-center lg:min-h-screen">
          <div className="absolute top-10 bottom-10 left-0 w-px bg-[#111111]/1">
            <div className="v4-progress-line h-full w-full bg-[#FFD400]" />
          </div>
          <div className="pl-8">
            {PHILOSOPHY_WORDS.map((w, i) => (
              <motion.p
                key={w}
                className="font-[family-name:var(--font-gona-display)] text-4xl font-extrabold tracking-tight sm:text-6xl"
                animate={
                  reduced
                    ? { opacity: 1, y: 0 }
                    : {
                        opacity: i === word ? 1 : 0.12,
                        y: i === word ? 0 : i < word ? -18 : 18,
                      }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneCableFlagship() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="our-software"
      ref={ref}
      className="v4-cable-soft-surface scroll-mt-24 overflow-hidden py-20 sm:py-28"
      style={
        {
          "--v4-product-accent": CABLE.accent,
          "--v4-product-soft": CABLE.accentSoft,
          "--v4-product-dark": CABLE.accentDark,
        } as CSSProperties
      }
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <p
            className="text-xs font-bold tracking-[0.28em] uppercase"
            style={{ color: CABLE.accentDark }}
          >
            01
          </p>
          <span className="v4-cable-badge">AVAILABLE NOW</span>
        </div>
        <h2 className="mt-4 font-[family-name:var(--font-gona-display)] text-5xl font-extrabold tracking-tight text-[#111111] sm:text-7xl">
          GONA CABLE
        </h2>
        <p className="mt-2 text-sm font-semibold tracking-wide text-[#5A6570]">
          Cable Network Management
        </p>
        <div
          className="mt-4 h-0.5 w-16 rounded-full"
          style={{ background: CABLE.accent }}
          aria-hidden
        />
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5A6570]">
          Customers. Connections. Billing. Collections. Operators. Complaints. Communication.
          <span className="mt-2 block font-semibold text-[#111111]">One professional system.</span>
        </p>

        <motion.div
          className="mt-10 origin-center"
          initial={false}
          animate={
            reduced || inView
              ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1 }
              : { clipPath: "inset(15% 18% 15% 18%)", scale: 0.96, opacity: 0.7 }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <SoftFrame title="GONA Cable · Owner" className="mx-auto max-w-3xl">
            <div className="grid gap-2 sm:grid-cols-3">
              {["Overview", "Customers", "Billing", "Collections", "Team", "Communications"].map(
                (l, i) => (
                  <div
                    key={l}
                    className="rounded-xl border bg-[#FAF9F6] px-3 py-3 text-sm font-semibold text-[#111111]/75"
                    style={{
                      borderColor:
                        i === 0
                          ? `${CABLE.accent}55`
                          : "rgba(17, 17, 17, 0.08)",
                      boxShadow:
                        i === 0
                          ? `inset 0 0 0 1px ${CABLE.accent}22, 0 0 18px ${CABLE.accent}18`
                          : undefined,
                    }}
                  >
                    {l}
                  </div>
                ),
              )}
            </div>
          </SoftFrame>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-3">
          <V4Cta href={cableSite.productPath} variant="black">
            Explore GONA Cable
          </V4Cta>
          <V4Cta href={cableSite.registerPath} variant="outline">
            Register Your Network
          </V4Cta>
        </div>
      </div>
    </section>
  );
}

function SceneConnected() {
  const ref = useRef<HTMLElement>(null);
  const mobile = useIsMobileLayout();
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced || mobile) return;
    return scrollYProgress.on("change", (v) => {
      if (v < 0.22) setStep(0);
      else if (v < 0.45) setStep(1);
      else if (v < 0.68) setStep(2);
      else setStep(3);
    });
  }, [scrollYProgress, reduced, mobile]);

  const copy = [
    {
      role: "OWNER",
      title: "Run your network from one place.",
      labels: ["Customers", "Billing", "Collections", "Team", "Reports", "Communications"],
    },
    {
      role: "OPERATOR",
      title: "Built for your team in the field.",
      labels: ["Customer Search", "Collect", "Complaints", "My Cash"],
    },
    {
      role: "CUSTOMER",
      title: "Give every customer their own digital space.",
      labels: ["Bills", "Connection", "Support", "Notices"],
    },
    {
      role: "CONNECTED",
      title: "ONE CABLE NETWORK.",
      labels: ["Owner", "Operator", "Customer"],
    },
  ][mobile || reduced ? 3 : step];

  if (mobile || reduced) {
    return (
      <section className="bg-[#FAF9F6] py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
            ONE NETWORK.
            <span className="mt-1 block text-[#5A6570]">THREE CONNECTED EXPERIENCES.</span>
          </h2>
          <div className="mt-10 space-y-8">
            {[
              { t: "Owner web", labels: ["Customers", "Billing", "Collections", "Team"] },
              { t: "Operator", labels: ["Customer Search", "Collect", "Complaints", "My Cash"] },
              { t: "Customer portal", labels: ["Bills", "Connection", "Support", "Notices"] },
            ].map((b) => (
              <div key={b.t}>
                <p className="text-xs font-bold tracking-[0.2em] text-[#8A7400] uppercase">{b.t}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {b.labels.map((l) => (
                    <span
                      key={l}
                      className="rounded-full border border-[#111111]/1 bg-white px-3 py-1.5 text-xs font-semibold"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <p className="font-[family-name:var(--font-gona-display)] text-xl font-bold">
              ONE CABLE NETWORK.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-[#FAF9F6]">
      <div className="h-[320vh]">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-4xl">
                ONE NETWORK.
                <span className="mt-1 block text-[#5A6570]">THREE CONNECTED EXPERIENCES.</span>
              </h2>
              <p className="mt-8 text-xs font-bold tracking-[0.24em] text-[#FFD400] uppercase">
                {copy.role}
              </p>
              <p className="mt-3 font-[family-name:var(--font-gona-display)] text-2xl font-bold tracking-tight">
                {copy.title}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {copy.labels.map((l) => (
                  <span
                    key={l}
                    className="rounded-full border border-[#111111]/1 bg-white px-3 py-1.5 text-xs font-semibold"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto h-[22rem] w-full max-w-xl">
              <motion.div
                className="absolute inset-x-0 top-0"
                animate={{
                  x: step === 0 ? 0 : step >= 3 ? -20 : -70,
                  scale: step === 0 ? 1 : 0.88,
                  opacity: step === 0 ? 1 : 0.55,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <SoftFrame title="Owner">
                  <div className="grid grid-cols-3 gap-2">
                    {["Overview", "Customers", "Billing", "Collections", "Team", "Reports"].map(
                      (l) => (
                        <div
                          key={l}
                          className="rounded-lg bg-[#FAF9F6] px-2 py-2 text-[0.65rem] font-semibold"
                        >
                          {l}
                        </div>
                      ),
                    )}
                  </div>
                </SoftFrame>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-[28%] w-[44%]"
                animate={{
                  y: step >= 1 ? 0 : 120,
                  x: step >= 3 ? -10 : step >= 2 ? -30 : 0,
                  scale: step === 1 ? 1.05 : 1,
                  opacity: step >= 1 ? 1 : 0,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <SoftFrame title="Operator" tone="field">
                  <div className="space-y-1.5">
                    {["Customers", "Collect", "Complaints", "My Cash"].map((l, i) => (
                      <div
                        key={l}
                        className={`rounded-md px-2 py-1.5 text-center text-[0.65rem] font-semibold ${
                          i === 1 ? "bg-[#111111] text-[#FFD400]" : "bg-white/80"
                        }`}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                </SoftFrame>
              </motion.div>

              <motion.div
                className="absolute top-8 right-0 w-[46%]"
                animate={{
                  x: step >= 2 ? 0 : 90,
                  opacity: step >= 2 ? 1 : 0,
                  scale: step === 2 ? 1.02 : 1,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <SoftFrame title="Customer" tone="customer">
                  <div className="space-y-1.5">
                    {["Bills", "Connection", "Support", "Notices"].map((l) => (
                      <div
                        key={l}
                        className="rounded-md border border-[#111111]/6 bg-[#FAF9F6] px-2 py-1.5 text-[0.65rem] font-semibold"
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                </SoftFrame>
              </motion.div>

              <svg
                className="pointer-events-none absolute inset-0"
                viewBox="0 0 400 320"
                aria-hidden
              >
                <motion.path
                  d="M80 70 L180 230 L320 90"
                  fill="none"
                  stroke="#FFD400"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: step >= 3 ? 1 : 0, opacity: step >= 3 ? 0.9 : 0 }}
                  transition={{ duration: 0.7 }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FutureArt({ id }: { id: FutureProductId }) {
  return (
    <div className="v4-future-art relative mt-auto flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 55%)",
        }}
        aria-hidden
      />
      <BusinessProductIcon id={id} className="relative h-20 w-20 sm:h-24 sm:w-24" accent="rgba(255,255,255,0.92)" />
    </div>
  );
}

function FuturePanel({
  product,
  index,
  layout = "marquee",
}: {
  product: (typeof futureProducts)[number];
  index: number;
  layout?: "marquee" | "stack";
}) {
  const label = String(index + 2).padStart(2, "0");
  const widthClass =
    layout === "stack"
      ? "w-full max-w-xl"
      : "w-[min(78vw,26rem)] shrink-0 sm:w-[26rem]";
  return (
    <article
      className={`v4-future-panel relative flex flex-col overflow-hidden rounded-[1.5rem] p-6 sm:p-8 ${widthClass}`}
      style={
        {
          "--panel-accent": product.accent,
          "--panel-dark": product.accentDark,
          background: `radial-gradient(ellipse 100% 80% at 12% -10%, color-mix(in srgb, #ffffff 22%, ${product.accent}), transparent 52%), linear-gradient(165deg, color-mix(in srgb, #ffffff 10%, ${product.accent}) 0%, ${product.accent} 42%, color-mix(in srgb, ${product.accentDark} 55%, ${product.accent}) 100%)`,
        } as CSSProperties
      }
    >
      <span
        className="pointer-events-none absolute top-3 right-4 font-[family-name:var(--font-gona-display)] text-7xl font-extrabold leading-none text-white/[0.08] select-none sm:text-8xl"
        aria-hidden
      >
        {label}
      </span>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-50"
        style={{
          background: `linear-gradient(to top, color-mix(in srgb, ${product.accentDark} 45%, transparent), transparent)`,
        }}
        aria-hidden
      />

      <p className="relative text-xs font-bold tracking-[0.28em] text-white/70 uppercase">{label}</p>
      <h3 className="relative mt-4 font-[family-name:var(--font-gona-display)] text-3xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-4xl">
        {product.name}
      </h3>
      <p className="relative mt-3 max-w-[16rem] text-sm leading-relaxed text-white/85">{product.subtitle}</p>
      <p className="relative mt-5 inline-flex w-fit rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[0.65rem] font-bold tracking-[0.18em] text-white/95 uppercase backdrop-blur-[2px]">
        Coming soon
      </p>
      <div className="relative mt-8">
        <FutureArt id={product.id} />
      </div>
    </article>
  );
}

function FutureStaticStack() {
  return (
    <div className="mt-10 space-y-5">
      {futureProducts.map((p, i) => (
        <FuturePanel key={p.id} product={p} index={i} layout="stack" />
      ))}
    </div>
  );
}

function SceneFuture() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      // ~one panel through focus every ~4s desktop / ~5.5s mobile
      const basePxPerSec = mobile ? 78 : 112;
      const speed = basePxPerSec * (hoveringRef.current && !mobile ? 0.52 : 1);

      offsetRef.current -= speed * dt;
      const half = track.scrollWidth / 2;
      if (half > 0 && -offsetRef.current >= half) {
        offsetRef.current += half;
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const loopItems = [...futureProducts, ...futureProducts];

  return (
    <section className="v4-future-section overflow-x-clip bg-[#FAF9F6] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
          WHAT WE&apos;RE
          <span className="mt-1 block">BUILDING NEXT.</span>
        </h2>
        <p className="mt-3 text-sm text-[#5A6570]">The GONA Business family is just beginning.</p>
      </div>

      {reduced ? (
        <div className="mx-auto mt-2 max-w-6xl px-5 sm:px-6">
          <FutureStaticStack />
        </div>
      ) : (
        <div
          className="v4-future-showcase mt-10"
          onPointerEnter={() => {
            hoveringRef.current = true;
          }}
          onPointerLeave={() => {
            hoveringRef.current = false;
          }}
        >
          <div className="v4-future-mask">
            <div
              ref={trackRef}
              className="v4-future-track flex w-max gap-5 will-change-transform sm:gap-6"
              aria-label="GONA Business software products coming soon"
            >
              {loopItems.map((p, i) => (
                <FuturePanel
                  key={`${p.id}-${i < futureProducts.length ? "a" : "b"}`}
                  product={p}
                  index={i % futureProducts.length}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SceneWhy() {
  const ref = useRef<HTMLElement>(null);
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  usePointerCssVars(ref, fine && !reduced);

  const lines = [
    "SOFTWARE SHOULD MAKE",
    "RUNNING A BUSINESS",
    "SIMPLER.",
    "NOT MORE COMPLICATED.",
  ];
  const points = [
    "Simple to learn.",
    "Built around real workflows.",
    "Connected across teams.",
    "Designed to grow.",
    "Powered by GONA.",
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#181818] py-24 text-white sm:py-28"
    >
      {!reduced && fine ? <div className="v4-ambient" aria-hidden /> : null}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6">
        <p className="text-xs font-bold tracking-[0.28em] text-[#FFD400] uppercase">
          WHY GONA BUSINESS
        </p>
        <div className="mt-6 space-y-1">
          {lines.map((line, i) => (
            <motion.p
              key={line}
              className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <ol className="mt-14 space-y-0 border-t border-white/10">
          {points.map((p, i) => (
            <motion.li
              key={p}
              className="flex items-baseline gap-5 border-b border-white/10 py-5"
              initial={reduced ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <span className="font-mono text-xs text-[#FFD400]/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-[family-name:var(--font-gona-display)] text-xl font-semibold sm:text-2xl">
                {p}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SceneOperations() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mobile = useIsMobileLayout(768);
  const nodes = ["BUSINESS", "PEOPLE", "OPERATIONS", "CUSTOMERS", "GROWTH"];

  return (
    <section ref={ref} className="bg-[#FAF9F6] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
          BUILT CLOSE TO
          <span className="mt-1 block">REAL BUSINESSES.</span>
        </h2>
        <p className="mt-3 text-sm font-semibold text-[#5A6570]">
          Designed for serious operations.
        </p>

        <div className="mt-12">
          {mobile ? (
            <ol className="relative space-y-6 border-l-2 border-[#111111]/1 pl-6">
              <motion.div
                className="absolute top-0 left-[-2px] w-0.5 origin-top bg-[#FFD400]"
                initial={false}
                animate={{ height: inView ? "100%" : "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
              {nodes.map((n) => (
                <li key={n} className="font-[family-name:var(--font-gona-display)] text-xl font-bold">
                  {n}
                </li>
              ))}
            </ol>
          ) : (
            <svg viewBox="0 0 1000 120" className="w-full" aria-hidden>
              <motion.path
                d="M40 60 H960"
                fill="none"
                stroke="#FFD400"
                strokeWidth="3"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              {nodes.map((n, i) => {
                const x = 40 + i * 230;
                return (
                  <g key={n}>
                    <circle cx={x} cy={60} r="8" fill="#111111" />
                    <circle cx={x} cy={60} r="4" fill="#FFD400" />
                    <text
                      x={x}
                      y={100}
                      textAnchor="middle"
                      className="fill-[#111111] text-[14px] font-bold"
                    >
                      {n}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>
        <p className="mt-10 max-w-xl text-base text-[#5A6570]">
          GONA Business starts with how work actually happens — then builds software around it.
        </p>
      </div>
    </section>
  );
}

function SceneFamily() {
  return (
    <section className="bg-[#FAF9F6] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <h2 className="font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight sm:text-5xl">
          THE GONA
          <span className="mt-1 block">BUSINESS FAMILY.</span>
        </h2>
        <ul className="mt-12 divide-y divide-[#111111]/1 border-y border-[#111111]/1">
          {FAMILY.map((row) => {
            const available = row.status === "available";
            const rowStyle = {
              "--row-accent": row.accent,
              "--row-soft": row.accentSoft,
              "--row-dark": row.accentDark,
            } as CSSProperties;

            const inner = (
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="v4-family-index font-mono text-xs text-[#8A7400]">
                    {row.index}
                  </span>
                  <div>
                    <p className="v4-family-category font-[family-name:var(--font-gona-display)] text-xl font-bold text-[#111111] sm:text-2xl">
                      {row.name}
                    </p>
                    <p className="mt-1 text-sm text-[#5A6570] opacity-100 sm:opacity-80">
                      {row.subtitle}
                    </p>
                  </div>
                </div>
                <span
                  className={`v4-family-badge shrink-0 text-[0.65rem] font-bold tracking-[0.16em] uppercase ${
                    available ? "" : "text-[#5A6570]/70"
                  }`}
                >
                  {available ? "Available now" : "Coming soon"}
                </span>
              </div>
            );

            if (available && row.href) {
              return (
                <li key={row.id}>
                  <Link
                    href={row.href}
                    className="v4-family-row block px-1 pl-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD400]"
                    data-available="true"
                    style={rowStyle}
                  >
                    {inner}
                  </Link>
                </li>
              );
            }

            return (
              <li key={row.id}>
                <div
                  className="v4-family-row px-1 pl-3"
                  data-soon="true"
                  aria-disabled
                  style={rowStyle}
                >
                  {inner}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SceneFinal() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = usePrefersReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div
        className="bg-[#FFD400] px-5 py-24 text-[#111111] sm:px-6 sm:py-28"
        initial={false}
        animate={
          reduced || inView
            ? { clipPath: "inset(0% 0% 0% 0%)" }
            : { clipPath: "inset(100% 0% 0% 0%)" }
        }
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Image
            src={siteConfig.assets.logo}
            alt="GONA"
            width={72}
            height={72}
            className="rounded-[22%] shadow-sm"
          />
          <p className="mt-8 text-xs font-bold tracking-[0.32em] uppercase">GONA BUSINESS</p>
          <h2 className="mt-4 font-[family-name:var(--font-gona-display)] text-4xl font-extrabold tracking-tight sm:text-6xl">
            THE FIRST SYSTEM
            <span className="mt-1 block">IS ALREADY RUNNING.</span>
          </h2>
          <p className="mt-5 text-sm font-bold tracking-wide">
            GONA Cable ·{" "}
            <span style={{ color: CABLE.accentDark }}>AVAILABLE NOW</span>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <V4Cta href={cableSite.productPath} variant="black">
              Explore GONA Cable
            </V4Cta>
            <V4Cta href={cableSite.registerPath} variant="outline">
              Register Your Network
            </V4Cta>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function BusinessV4Experience() {
  return (
    <main className="v4-root">
      <div className="sr-only">
        <h1>GONA Business</h1>
        <p>
          Professional software for real businesses. GONA Cable is available now. Future products
          are coming soon.
        </p>
      </div>
      <SceneHero />
      <TextBelt />
      <ScenePhilosophy />
      <SceneCableFlagship />
      <SceneConnected />
      <SceneFuture />
      <SceneWhy />
      <SceneOperations />
      <SceneFamily />
      <SceneFinal />
    </main>
  );
}
