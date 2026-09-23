"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useIsFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return fine;
}

export function useIsMobileLayout(breakpoint = 1024) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [breakpoint]);
  return mobile;
}

/** Pointer position as CSS vars on an element — no React re-render per move. */
export function usePointerCssVars(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  vars = { x: "--v4-mx", y: "--v4-my" },
) {
  const target = useRef({ x: 50, y: 40 });
  const current = useRef({ x: 50, y: 40 });
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1;
      current.current.y += (target.current.y - current.current.y) * 0.1;
      el.style.setProperty(vars.x, `${current.current.x}%`);
      el.style.setProperty(vars.y, `${current.current.y}%`);
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.current.x = ((e.clientX - rect.left) / rect.width) * 100;
      target.current.y = ((e.clientY - rect.top) / rect.height) * 100;
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [ref, enabled, vars.x, vars.y]);
}

export function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
