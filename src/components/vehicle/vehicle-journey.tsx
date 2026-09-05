"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";

import {
  vehicleJourneyNodes,
  vehicleTokens,
} from "@/components/vehicle/vehicle.content";
import { JourneyRoadScene } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function VehicleJourney() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    setProgress(value);
  });

  const p = reduce ? 1 : progress;
  const active = Math.min(
    vehicleJourneyNodes.length - 1,
    Math.floor(p * vehicleJourneyNodes.length),
  );

  return (
    <section
      id="vehicle-journey"
      className="bg-[#0F172A] text-white"
    >
      {/* Mobile vertical journey */}
      <div className="py-16 md:py-20 lg:hidden">
        <Container>
          <Header />
          <div className="relative mt-10 pl-8">
            <div
              className="absolute top-2 bottom-2 left-3 w-1 rounded-full bg-[#334155]"
              aria-hidden="true"
            />
            <div
              className="absolute top-2 left-3 w-1 rounded-full bg-[#FFD400]"
              style={{ height: `${((active + 1) / vehicleJourneyNodes.length) * 100}%` }}
              aria-hidden="true"
            />
            <ol className="space-y-8">
              {vehicleJourneyNodes.map((node, index) => (
                <li key={node.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[1.65rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-white",
                      index <= active ? "bg-[#FFD400]" : "bg-[#334155]",
                    )}
                  />
                  <h3 className="font-display text-xl text-white">{node.label}</h3>
                  <p className="mt-1 text-sm text-slate-300">{node.body}</p>
                  {node.id === "verify" && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#FFD400]/50 bg-[#1E1B4B] px-3 py-2 text-[#FFD400]">
                      <span className="tracking-[0.35em]">••••</span>
                      <span className="text-xs text-slate-300">Verify start</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-8 overflow-hidden rounded-2xl border border-indigo-500/30">
              <div className="aspect-[11/4] min-h-[10rem]">
                <JourneyRoadScene progress={p} className="h-full w-full" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Desktop cinematic sticky road */}
      <div ref={pinRef} className="relative hidden lg:block">
        <div className="h-[240vh]">
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-center">
            <Container>
              <Header />
              <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-indigo-400/25 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="aspect-[11/3.4] min-h-[16rem] w-full xl:min-h-[18rem]">
                  <JourneyRoadScene progress={p} className="h-full w-full" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-6 gap-3">
                {vehicleJourneyNodes.map((node, index) => {
                  const on = index === active;
                  return (
                    <div
                      key={node.id}
                      className={cn(
                        "rounded-xl px-3 py-3 transition-colors",
                        on ? "bg-[#312E81]" : "bg-transparent",
                      )}
                    >
                      <p
                        className={cn(
                          "text-xs font-semibold tracking-wide uppercase",
                          on ? "text-[#FFD400]" : "text-slate-500",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3
                        className={cn(
                          "mt-1 font-display text-sm",
                          on ? "text-white" : "text-slate-400",
                        )}
                      >
                        {node.label}
                      </h3>
                      <p
                        className={cn(
                          "mt-1 text-xs leading-relaxed text-slate-400 transition-opacity",
                          on ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {on ? node.body : "\u00A0"}
                      </p>
                    </div>
                  );
                })}
              </div>
              {active >= 4 && (
                <motion.p
                  initial={false}
                  animate={{ opacity: 1 }}
                  className="mt-4 max-w-xl text-sm text-slate-300"
                >
                  <span className="font-semibold text-[#FFD400]">
                    Verify before the trip begins.
                  </span>{" "}
                  Trip Start verification helps confirm the correct booking
                  before the journey begins.
                </motion.p>
              )}
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="max-w-2xl">
      <p
        className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
        style={{ color: vehicleTokens.yellow }}
      >
        Signature journey
      </p>
      <h2 className="font-display text-3xl md:text-4xl">
        From pickup to trip start.
      </h2>
      <p className="mt-3 text-base text-slate-300">
        A storytelling route — not a live trip tracker. Follow how a booking
        moves from your location to journey start.
      </p>
    </div>
  );
}
