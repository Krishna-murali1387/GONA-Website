"use client";

import { useEffect, useState } from "react";

/**
 * True when the device can meaningfully hover (desktop mouse).
 * Starts false until mounted — base micro-story scenes must still
 * render faintly regardless (see StoryShell), so idle desktop is never blank.
 */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return canHover;
}
