"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

export type LocalFeatureId =
  | "tournaments"
  | "events"
  | "alerts"
  | "emergency"
  | "offers"
  | "businesses";

const LOCAL_FEATURES: {
  id: LocalFeatureId;
  label: string;
  hint: string;
}[] = [
  {
    id: "tournaments",
    label: "Tournaments",
    hint: "Local competition grounds and match moments.",
  },
  {
    id: "events",
    label: "Events",
    hint: "Community gatherings and shared occasions.",
  },
  {
    id: "alerts",
    label: "Local Alerts",
    hint: "Timely updates from around your mandal.",
  },
  {
    id: "emergency",
    label: "Emergency Contacts",
    hint: "Reach critical help when it matters.",
  },
  {
    id: "offers",
    label: "Local Offers",
    hint: "Nearby deals from trusted local spots.",
  },
  {
    id: "businesses",
    label: "Featured Businesses",
    hint: "Discover places connected in your community.",
  },
];

function isActive(active: LocalFeatureId | null, id: LocalFeatureId) {
  return active === id;
}

function nodeGlow(active: boolean, accent: string) {
  return active
    ? { filter: `drop-shadow(0 0 10px ${accent})`, opacity: 1 }
    : { filter: "none", opacity: 0.88 };
}

export function LocalExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState<LocalFeatureId | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={titleId}
      className="relative overflow-hidden bg-[#1A1410] py-20 text-gona-white md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#EFE8DC] via-[#C4A882]/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,122,26,0.14),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(255,212,0,0.08),transparent_50%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#FF7A1A] uppercase">
            LOCAL · Seventh service
          </p>
          <h2
            id={titleId}
            className="font-display text-3xl text-gona-white md:text-5xl"
          >
            Your Mandal.
            <span className="mt-1 block text-gona-yellow">Now Digital.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
            LOCAL brings community information, activities and nearby
            opportunities into one connected space inside GONA.
          </p>
        </div>

        <div
          className={cn(
            isDesktop
              ? "grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]"
              : "flex flex-col",
          )}
        >
          <LocalWorld
            active={active}
            inView={inView}
            reducedMotion={reducedMotion}
            compact={!isDesktop}
          />
          <FeatureRail
            active={active}
            onSelect={setActive}
            orientation={isDesktop ? "vertical" : "horizontal"}
            className={cn(!isDesktop && "mt-8")}
          />
        </div>
      </Container>
    </section>
  );
}

function FeatureRail({
  active,
  onSelect,
  orientation,
  className,
}: {
  active: LocalFeatureId | null;
  onSelect: (id: LocalFeatureId | null) => void;
  orientation: "vertical" | "horizontal";
  className?: string;
}) {
  const horizontal = orientation === "horizontal";

  return (
    <ul
      className={cn(
        horizontal
          ? "flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "flex flex-col gap-2.5",
        className,
      )}
      role="list"
    >
      {LOCAL_FEATURES.map((feature) => {
        const selected = active === feature.id;
        return (
          <li
            key={feature.id}
            className={cn(horizontal && "min-w-[11.5rem] shrink-0")}
          >
            <button
              type="button"
              aria-pressed={selected}
              onMouseEnter={() => onSelect(feature.id)}
              onMouseLeave={() => onSelect(null)}
              onFocus={() => onSelect(feature.id)}
              onBlur={() => onSelect(null)}
              onClick={() => onSelect(selected ? null : feature.id)}
              className={cn(
                "w-full rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow",
                selected
                  ? "border-[#FF7A1A]/55 bg-[#FF7A1A]/15 text-gona-white"
                  : "border-white/10 bg-white/[0.04] text-white/80 hover:border-white/20 hover:bg-white/[0.07]",
              )}
            >
              <span className="block text-sm font-semibold tracking-wide">
                {feature.label}
              </span>
              <span className="mt-1 block text-xs leading-snug text-white/50">
                {feature.hint}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function LocalWorld({
  active,
  inView,
  reducedMotion,
  compact = false,
}: {
  active: LocalFeatureId | null;
  inView: boolean;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  const breathe = !reducedMotion && inView && !active;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#120E0B]",
        compact ? "aspect-[4/3]" : "aspect-[16/11]",
      )}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        animate={
          breathe
            ? { scale: [1, 1.012, 1], opacity: [1, 0.97, 1] }
            : { scale: 1, opacity: 1 }
        }
        transition={
          breathe
            ? { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        <svg
          viewBox="0 0 800 550"
          className="h-full w-full"
          role="img"
          aria-label="Abstract miniature LOCAL community world"
        >
          <defs>
            <linearGradient id="localGround" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E1814" />
              <stop offset="55%" stopColor="#161210" />
              <stop offset="100%" stopColor="#0F0C0A" />
            </linearGradient>
            <linearGradient id="roadGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFD400" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#FF7A1A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFD400" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <rect width="800" height="550" fill="url(#localGround)" />

          <ellipse
            cx="620"
            cy="420"
            rx="140"
            ry="70"
            fill="#1A2418"
            opacity="0.55"
          />

          <path
            d="M40 320 C180 300 260 260 400 250 C540 240 620 280 760 300"
            fill="none"
            stroke="url(#roadGlow)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity={active ? 0.45 : 0.7}
          />
          <path
            d="M200 80 C220 180 240 280 260 480"
            fill="none"
            stroke="#FFD400"
            strokeWidth="8"
            strokeOpacity="0.22"
            strokeLinecap="round"
          />
          <path
            d="M400 60 C390 160 410 280 450 500"
            fill="none"
            stroke="#FF7A1A"
            strokeWidth="6"
            strokeOpacity="0.18"
            strokeLinecap="round"
          />

          <g opacity="0.9">
            <rect x="90" y="160" width="70" height="50" rx="6" fill="#2A2420" />
            <rect x="175" y="145" width="55" height="65" rx="6" fill="#322C27" />
            <rect x="100" y="230" width="90" height="40" rx="6" fill="#25201C" />
          </g>

          <g style={nodeGlow(isActive(active, "offers"), "#FFD400")}>
            <rect
              x="300"
              y="300"
              width="100"
              height="55"
              rx="8"
              fill={isActive(active, "offers") ? "#3A3218" : "#2C2618"}
              stroke={isActive(active, "offers") ? "#FFD400" : "#FFD40055"}
              strokeWidth="1.5"
            />
            <rect x="315" y="315" width="20" height="25" rx="2" fill="#FFD40066" />
            <rect x="345" y="315" width="20" height="25" rx="2" fill="#FFD40044" />
            <rect x="375" y="315" width="12" height="25" rx="2" fill="#FF7A1A55" />
          </g>

          <g style={nodeGlow(isActive(active, "businesses"), "#FFD400")}>
            <rect
              x="520"
              y="160"
              width="48"
              height="70"
              rx="6"
              fill={isActive(active, "businesses") ? "#3A2E18" : "#2A241C"}
              stroke={isActive(active, "businesses") ? "#FFD400" : "transparent"}
              strokeWidth="1.5"
            />
            <rect
              x="580"
              y="175"
              width="42"
              height="55"
              rx="6"
              fill={isActive(active, "businesses") ? "#352818" : "#26201A"}
              stroke={isActive(active, "businesses") ? "#FFD400" : "transparent"}
              strokeWidth="1.5"
            />
            <rect
              x="635"
              y="150"
              width="55"
              height="80"
              rx="6"
              fill={isActive(active, "businesses") ? "#3D3018" : "#2E261E"}
              stroke={isActive(active, "businesses") ? "#FFD400" : "transparent"}
              strokeWidth="1.5"
            />
          </g>

          <g style={nodeGlow(isActive(active, "events"), "#FF7A1A")}>
            <ellipse
              cx="420"
              cy="170"
              rx="70"
              ry="36"
              fill={isActive(active, "events") ? "#3A2818" : "#241C16"}
              stroke={isActive(active, "events") ? "#FF7A1A" : "#FF7A1A44"}
              strokeWidth="1.5"
            />
            <circle
              cx="400"
              cy="165"
              r="4"
              fill="#FFD400"
              opacity={isActive(active, "events") ? 1 : 0.5}
            />
            <circle
              cx="430"
              cy="172"
              r="4"
              fill="#FF7A1A"
              opacity={isActive(active, "events") ? 1 : 0.45}
            />
            <circle
              cx="450"
              cy="160"
              r="3.5"
              fill="#FFD400"
              opacity={isActive(active, "events") ? 1 : 0.4}
            />
          </g>

          <g style={nodeGlow(isActive(active, "tournaments"), "#FFD400")}>
            <ellipse
              cx="620"
              cy="380"
              rx="95"
              ry="48"
              fill={isActive(active, "tournaments") ? "#243018" : "#1A2216"}
              stroke={isActive(active, "tournaments") ? "#FFD400" : "#FFD40033"}
              strokeWidth="2"
            />
            <ellipse
              cx="620"
              cy="380"
              rx="55"
              ry="28"
              fill="none"
              stroke="#FFD400"
              strokeOpacity={isActive(active, "tournaments") ? 0.7 : 0.25}
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
          </g>

          <g style={nodeGlow(isActive(active, "emergency"), "#FF7A1A")}>
            <rect
              x="130"
              y="360"
              width="70"
              height="55"
              rx="8"
              fill={isActive(active, "emergency") ? "#3A2018" : "#2A1C18"}
              stroke={isActive(active, "emergency") ? "#FF7A1A" : "#FF7A1A55"}
              strokeWidth="1.5"
            />
            <path
              d="M157 378 H173 M165 370 V386"
              stroke="#FF7A1A"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={isActive(active, "emergency") ? 1 : 0.65}
            />
          </g>

          <g style={nodeGlow(isActive(active, "alerts"), "#FF7A1A")}>
            <circle
              cx="280"
              cy="120"
              r={isActive(active, "alerts") ? 14 : 11}
              fill={isActive(active, "alerts") ? "#FF7A1A" : "#FF7A1A99"}
            />
            <circle
              cx="280"
              cy="120"
              r="22"
              fill="none"
              stroke="#FF7A1A"
              strokeOpacity={isActive(active, "alerts") ? 0.55 : 0.2}
              strokeWidth="1.5"
            >
              {!reducedMotion && isActive(active, "alerts") ? (
                <animate
                  attributeName="r"
                  values="16;28;16"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              ) : null}
            </circle>
          </g>

          <g>
            <motion.g
              animate={
                !reducedMotion && inView ? { y: [0, -3, 0] } : { y: 0 }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M400 255 C388 255 378 265 378 277 C378 292 400 318 400 318 C400 318 422 292 422 277 C422 265 412 255 400 255 Z"
                fill="#FF7A1A"
              />
              <circle cx="400" cy="275" r="7" fill="#111111" />
              <circle cx="400" cy="275" r="3.5" fill="#FFD400" />
            </motion.g>
            {!reducedMotion && inView ? (
              <circle
                cx="400"
                cy="300"
                r="18"
                fill="none"
                stroke="#FF7A1A"
                strokeOpacity="0.35"
              >
                <animate
                  attributeName="r"
                  values="12;26;12"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.45;0;0.45"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
            ) : null}
          </g>

          <circle cx="470" cy="320" r="3" fill="#FFD400" opacity="0.5" />
          <circle cx="350" cy="210" r="2.5" fill="#FF7A1A" opacity="0.45" />
          <circle cx="560" cy="300" r="2.5" fill="#FFD400" opacity="0.4" />
        </svg>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#120E0B] to-transparent" />
    </div>
  );
}

export function LocalExperiencePlaceholder() {
  return <LocalExperience />;
}
