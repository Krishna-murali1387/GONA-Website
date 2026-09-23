"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

import { SoftFrame } from "@/components/business/v4/v4-ui";
import { useIsFinePointer } from "@/components/business/v4/v4-hooks";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function Chip({ children }: { children: string }) {
  return (
    <div className="rounded-lg border border-[#111111]/8 bg-[#FAF9F6] px-2.5 py-2 text-[0.7rem] font-semibold text-[#111111]/75">
      {children}
    </div>
  );
}

export function HeroProductComposition({ animateIn }: { animateIn: boolean }) {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 120, damping: 24 });
  const sy = useSpring(ny, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: PointerEvent) => {
      nx.set((e.clientX / window.innerWidth) * 2 - 1);
      ny.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduced, nx, ny]);

  const ox = useSpring(0, { stiffness: 120, damping: 24 });
  const oy = useSpring(0, { stiffness: 120, damping: 24 });
  const px = useSpring(0, { stiffness: 120, damping: 24 });
  const py = useSpring(0, { stiffness: 120, damping: 24 });
  const cx = useSpring(0, { stiffness: 120, damping: 24 });
  const cy = useSpring(0, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (!fine || reduced) return;
    const unsubX = sx.on("change", (v) => {
      ox.set(v * 4);
      px.set(v * 8);
      cx.set(v * 11);
    });
    const unsubY = sy.on("change", (v) => {
      oy.set(v * 3);
      py.set(v * 6);
      cy.set(v * 5);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [fine, reduced, sx, sy, ox, oy, px, py, cx, cy]);

  const enter = (delay: number, fromX: number, fromY: number) =>
    reduced
      ? { opacity: 1, x: 0, y: 0 }
      : animateIn
        ? {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
          }
        : { opacity: 0, x: fromX, y: fromY };

  return (
    <div className="relative mx-auto min-h-[22rem] w-full max-w-lg sm:min-h-[26rem]" aria-hidden>
      <motion.div
        className="relative z-[1] w-[88%]"
        initial={false}
        animate={enter(0.12, 48, 16)}
        style={fine && !reduced ? { x: ox, y: oy } : undefined}
      >
        <SoftFrame title="Owner web">
          <div className="grid grid-cols-2 gap-2">
            {["Overview", "Customers", "Billing", "Collections", "Reports"].map((l) => (
              <Chip key={l}>{l}</Chip>
            ))}
          </div>
        </SoftFrame>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-2 z-[2] w-[44%] sm:left-4"
        initial={false}
        animate={enter(0.26, 0, 56)}
        style={fine && !reduced ? { x: px, y: py } : undefined}
      >
        <SoftFrame title="Operator" tone="field">
          <div className="space-y-1.5">
            {["Customers", "Collect", "Complaints", "My Cash"].map((l, i) => (
              <div
                key={l}
                className={`rounded-md px-2 py-1.5 text-center text-[0.65rem] font-semibold ${
                  i === 1 ? "bg-[#111111] text-[#FFD400]" : "bg-white/80 text-[#111111]/7"
                }`}
              >
                {l}
              </div>
            ))}
          </div>
        </SoftFrame>
      </motion.div>

      <motion.div
        className="absolute top-8 right-0 z-[3] w-[48%]"
        initial={false}
        animate={enter(0.36, 56, 12)}
        style={fine && !reduced ? { x: cx, y: cy } : undefined}
      >
        <SoftFrame title="Customer" tone="customer">
          <div className="space-y-1.5">
            {["Bills", "Connection", "Support", "Notices"].map((l) => (
              <div
                key={l}
                className="flex items-center justify-between rounded-md border border-[#111111]/6 bg-[#FAF9F6] px-2 py-1.5 text-[0.65rem] font-semibold text-[#111111]/7"
              >
                {l}
                <span className="h-1 w-5 rounded-full bg-[#FFD400]/75" />
              </div>
            ))}
          </div>
        </SoftFrame>
      </motion.div>
    </div>
  );
}
