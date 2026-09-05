"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  groceryJourneySteps,
  groceryTokens,
} from "@/components/grocery/grocery.content";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function GroceryJourney() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    const next = Math.min(
      groceryJourneySteps.length - 1,
      Math.floor(value * groceryJourneySteps.length),
    );
    setActive((prev) => (prev === next ? prev : next));
  });

  const routeProgress = useTransform(scrollYProgress, [0.72, 1], [0, 1]);

  return (
    <section className="bg-gona-white">
      <div className="py-16 md:py-20 lg:hidden">
        <Container>
          <Header />
          <ol className="mt-10 space-y-8">
            {groceryJourneySteps.map((step, index) => (
              <li
                key={step.n}
                className="grid gap-5 sm:grid-cols-[1fr_0.95fr] sm:items-center"
              >
                <div>
                  <p
                    className="font-display text-sm"
                    style={{ color: groceryTokens.leaf }}
                  >
                    {step.n}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-gona-black">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gona-gray">
                    {step.body}
                  </p>
                </div>
                <JourneyStage stage={index} reduced />
              </li>
            ))}
          </ol>
        </Container>
      </div>

      <div ref={pinRef} className="relative hidden lg:block">
        <div className="h-[320vh]">
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center">
            <Container className="grid w-full grid-cols-[0.95fr_1.05fr] items-center gap-10 xl:gap-12">
              <div>
                <Header />
                <ol className="mt-10 space-y-3">
                  {groceryJourneySteps.map((step, index) => {
                    const on = index === active;
                    return (
                      <li key={step.n}>
                        <div
                          className={cn(
                            "rounded-2xl border px-4 py-3 transition-colors duration-300",
                            on
                              ? "border-[#22C55E]/40 bg-[#ECFDF3]"
                              : "border-transparent bg-transparent",
                          )}
                        >
                          <div className="flex items-baseline gap-3">
                            <span
                              className="font-display text-sm"
                              style={{
                                color: on ? groceryTokens.leaf : "#9CA3AF",
                              }}
                            >
                              {step.n}
                            </span>
                            <h3
                              className={cn(
                                "font-display text-xl transition-colors",
                                on ? "text-gona-black" : "text-gona-gray",
                              )}
                            >
                              {step.title}
                            </h3>
                          </div>
                          <p
                            className={cn(
                              "mt-1 max-w-md text-sm leading-relaxed text-gona-gray transition-opacity",
                              on ? "opacity-100" : "opacity-0",
                            )}
                          >
                            {on ? step.body : "\u00A0"}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <motion.div className="w-full">
                <JourneyStage
                  stage={reduce ? groceryJourneySteps.length - 1 : active}
                  reduced={Boolean(reduce)}
                  routeProgress={reduce ? undefined : routeProgress}
                />
              </motion.div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="max-w-lg">
      <p
        className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
        style={{ color: groceryTokens.leaf }}
      >
        Cart to door
      </p>
      <h2 className="font-display text-3xl text-gona-black md:text-4xl">
        From basket to your doorstep.
      </h2>
      <p className="mt-3 text-base text-gona-gray md:text-lg">
        A clear grocery journey — browse, order, prepare and deliver through
        GONA.
      </p>
    </div>
  );
}

/**
 * Rendering pitfalls fixed here:
 * 1) Duplicate SVG paint-server IDs across mobile+desktop instances
 *    made `fill="url(#…)"` resolve to hidden defs — use solid fills only.
 * 2) Framer Motion opacity on nested SVG <g> desynced from `stage`
 *    (bag fill updated, but layers stayed stuck at wrong opacity).
 *    Stage visibility uses plain SVG opacity + CSS transition instead.
 */
function JourneyStage({
  stage,
  reduced,
  routeProgress,
}: {
  stage: number;
  reduced: boolean;
  routeProgress?: MotionValue<number>;
}) {
  const packed = stage >= 3;
  const delivering = stage >= 4;
  const showAddress = stage >= 1;
  const showOrder = stage >= 2 && !delivering;
  const showProduce = !packed;
  const showPrep = stage === 3;
  const fade = reduced ? undefined : "opacity 0.35s ease";

  return (
    <div
      className="relative aspect-[4/3] min-h-[18rem] w-full overflow-hidden rounded-[1.75rem] border border-black/10 bg-[#ECFDF3] shadow-[0_28px_60px_rgba(17,17,17,0.12)] sm:min-h-[21rem] lg:min-h-[28rem]"
      aria-hidden="true"
      data-journey-stage={stage}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 450"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Atmosphere — solid paints only (no url(#) paint servers) */}
        <circle cx="300" cy="200" r="160" fill="#D1FAE5" opacity="0.65" />
        <ellipse cx="270" cy="400" rx="160" ry="22" fill="#111111" opacity="0.14" />

        {/* HOME + PIN */}
        <g
          style={{
            opacity: showAddress ? 1 : 0,
            transition: fade,
          }}
        >
          <path
            d="M400 200 L470 148 L540 200 V290 H400 Z"
            fill={delivering ? "#ECFDF3" : "#FFFFFF"}
            stroke="#111111"
            strokeWidth="4"
          />
          <path
            d="M400 200 L470 148 L540 200"
            fill="none"
            stroke="#22C55E"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <rect
            x="448"
            y="228"
            width="44"
            height="62"
            rx="4"
            fill={delivering ? "#22C55E" : "#E5E7EB"}
            stroke="#111111"
            strokeWidth="3"
          />
          <path
            d="M470 108 C470 78 430 78 430 108 C430 136 450 160 450 160 C450 160 470 136 470 108 Z"
            fill="#111111"
          />
          <circle cx="450" cy="106" r="14" fill="#FFD400" />
          <circle cx="450" cy="106" r="5" fill="#111111" />
        </g>

        <path
          d="M330 260 C380 230 420 190 445 150"
          fill="none"
          stroke="#16A34A"
          strokeWidth="4"
          strokeDasharray="8 9"
          strokeLinecap="round"
          style={{
            opacity: stage === 1 ? 1 : 0,
            transition: fade,
          }}
        />

        {/* ORDER confirmation */}
        <g
          style={{
            opacity: showOrder ? 1 : 0,
            transition: fade,
          }}
        >
          <rect x="24" y="48" width="200" height="64" rx="32" fill="#111111" />
          <circle cx="68" cy="80" r="18" fill="#FFD400" />
          <path
            d="M58 80 L66 88 L80 70"
            fill="none"
            stroke="#111111"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="148"
            y="76"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="17"
            fontFamily="system-ui, sans-serif"
            fontWeight="700"
          >
            Order placed
          </text>
          <text
            x="148"
            y="96"
            textAnchor="middle"
            fill="#FFD400"
            fontSize="12"
            fontFamily="system-ui, sans-serif"
            fontWeight="600"
          >
            GONA Grocery
          </text>
          <rect
            x="48"
            y="128"
            width="140"
            height="84"
            rx="12"
            fill="#FFFFFF"
            stroke="#111111"
            strokeWidth="3"
          />
          <rect x="64" y="146" width="80" height="8" rx="3" fill="#9CA3AF" />
          <rect x="64" y="164" width="60" height="8" rx="3" fill="#D1D5DB" />
          <rect x="64" y="182" width="96" height="8" rx="3" fill="#D1D5DB" />
          <rect x="64" y="198" width="48" height="10" rx="3" fill="#FFD400" />
        </g>

        {/* Groceries */}
        <g
          style={{
            opacity: showProduce ? 1 : 0,
            transition: fade,
          }}
        >
          <circle cx="170" cy="170" r="34" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
          <ellipse cx="156" cy="156" rx="10" ry="6" fill="#FFFFFF" opacity="0.28" />
          <path
            d="M170 136 C162 148 148 150 140 146 C152 156 162 156 170 150 C178 156 188 156 200 146 C192 150 178 148 170 136 Z"
            fill="#16A34A"
          />

          <circle cx="245" cy="148" r="28" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <ellipse cx="234" cy="138" rx="8" ry="5" fill="#FFFFFF" opacity="0.25" />

          <path
            d="M320 155 C288 140 276 108 292 88 C318 72 346 92 344 120 C342 144 330 156 320 155 Z"
            fill="#22C55E"
            stroke="#14532D"
            strokeWidth="2"
          />

          <path
            d="M350 155 H392 L400 230 H342 Z"
            fill="#F0F9FF"
            stroke="#0284C7"
            strokeWidth="3"
          />
          <path d="M356 138 H386 L392 155 H350 Z" fill="#0284C7" />

          <ellipse
            cx="145"
            cy="236"
            rx="40"
            ry="20"
            fill="#F59E0B"
            stroke="#92400E"
            strokeWidth="2"
          />
          <ellipse cx="145" cy="228" rx="28" ry="9" fill="#FEF3C7" opacity="0.55" />

          <rect
            x="268"
            y="198"
            width="50"
            height="70"
            rx="10"
            fill="#FBBF24"
            stroke="#92400E"
            strokeWidth="3"
          />
          <rect x="268" y="198" width="50" height="20" rx="10" fill="#78350F" />
          <circle cx="293" cy="246" r="11" fill="#FFFBEB" />
        </g>

        {/* LARGE bag — solid fills only */}
        <path
          d="M130 230 H370 L340 390 H160 Z"
          fill={packed ? "#14532D" : "#22C55E"}
          stroke="#052E16"
          strokeWidth="4"
        />
        <path
          d="M160 230 C182 160 318 160 340 230"
          fill="none"
          stroke="#FFD400"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <rect
          x="220"
          y="292"
          width="80"
          height="20"
          rx="5"
          fill="#FFD400"
          stroke="#CA8A04"
          strokeWidth="1.5"
        />

        <path
          d="M148 236 H352 L330 278 H170 Z"
          fill="#052E16"
          stroke="#14532D"
          strokeWidth="2"
          style={{ opacity: packed ? 1 : 0, transition: fade }}
        />
        <rect
          x="236"
          y="248"
          width="48"
          height="12"
          rx="3"
          fill="#FFD400"
          style={{ opacity: packed ? 1 : 0, transition: fade }}
        />
        <g style={{ opacity: showPrep ? 1 : 0, transition: fade }}>
          <rect
            x="210"
            y="188"
            width="120"
            height="34"
            rx="17"
            fill="#FFD400"
            stroke="#111111"
            strokeWidth="2"
          />
          <text
            x="270"
            y="210"
            textAnchor="middle"
            fill="#111111"
            fontSize="14"
            fontFamily="system-ui, sans-serif"
            fontWeight="700"
          >
            Preparing
          </text>
        </g>

        {/* Route — motion only for pathLength */}
        {routeProgress && !reduced ? (
          <motion.path
            d="M260 400 C330 415 400 380 455 305"
            fill="none"
            stroke="#14532D"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="10 11"
            style={{ pathLength: routeProgress }}
          />
        ) : (
          <motion.path
            d="M260 400 C330 415 400 380 455 305"
            fill="none"
            stroke="#14532D"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="10 11"
            initial={false}
            animate={{ pathLength: delivering ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.7 }}
          />
        )}

        {/* Scooter */}
        <g style={{ opacity: delivering ? 1 : 0, transition: fade }}>
          <circle cx="320" cy="378" r="18" fill="#111111" />
          <circle cx="320" cy="378" r="7" fill="#9CA3AF" />
          <circle cx="400" cy="378" r="18" fill="#111111" />
          <circle cx="400" cy="378" r="7" fill="#9CA3AF" />
          <path
            d="M330 352 H392 L412 326 H360 Z"
            fill="#FFD400"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          <rect
            x="352"
            y="308"
            width="52"
            height="34"
            rx="7"
            fill="#22C55E"
            stroke="#14532D"
            strokeWidth="3"
          />
          <circle cx="362" cy="300" r="10" fill="#166534" />
          <rect x="372" y="318" width="18" height="10" rx="2" fill="#FFD400" />
        </g>

        <circle
          cx="470"
          cy="230"
          r="88"
          fill="none"
          stroke="#22C55E"
          strokeWidth="5"
          style={{ opacity: delivering ? 0.7 : 0, transition: fade }}
        />
      </svg>
    </div>
  );
}
