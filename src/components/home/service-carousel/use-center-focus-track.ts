"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

import type { GonaService, ServiceId } from "@/config/site.config";
import {
  clamp,
  lerp,
  proximityFromDistance,
  resolveCardMetrics,
  revealBetween,
  wrapOffset,
  type TrackMetrics,
} from "@/components/home/service-carousel/track-math";

const COPIES = 3;
const AUTO_SPEED = 38; // px / second — premium browsing pace
const IDLE_RESUME_MS = 2200;
const DRAG_FRICTION = 0.92;

export type CardVisualState = {
  proximity: number;
  scale: number;
  opacity: number;
  blur: number;
  translateY: number;
  zIndex: number;
  glow: number;
};

type UseCenterFocusTrackArgs = {
  services: GonaService[];
  reducedMotion: boolean;
  enabled: boolean;
};

export type UseCenterFocusTrackResult = {
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  cardRefs: RefObject<Array<HTMLElement | null>>;
  metrics: TrackMetrics;
  focusedId: ServiceId;
  copyCount: number;
  totalCards: number;
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
  stepBy: (direction: -1 | 1) => void;
  pause: () => void;
  resume: () => void;
};

export function useCenterFocusTrack({
  services,
  reducedMotion,
  enabled,
}: UseCenterFocusTrackArgs): UseCenterFocusTrackResult {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastPointerX = useRef(0);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const resumeTimer = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const metricsRef = useRef<TrackMetrics>(resolveCardMetrics(1200));
  const focusedRef = useRef<ServiceId>(services[0]?.id ?? "grocery");

  const [metrics, setMetrics] = useState<TrackMetrics>(() =>
    resolveCardMetrics(1200),
  );
  const [focusedId, setFocusedId] = useState<ServiceId>(
    () => services[0]?.id ?? "grocery",
  );

  const totalCards = services.length * COPIES;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const next = resolveCardMetrics(viewport.clientWidth);
    metricsRef.current = next;
    setMetrics(next);

    // Position cards along track
    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      el.style.width = `${next.cardWidth}px`;
      el.style.left = `${index * next.stride}px`;
    });

    // Start centered on first service of middle copy
    const middleStart = services.length * next.stride;
    offsetRef.current = -(
      middleStart -
      next.viewportWidth / 2 +
      next.cardWidth / 2
    );
  }, [services.length]);

  const applyVisuals = useCallback(() => {
    const m = metricsRef.current;
    const track = trackRef.current;
    if (!track || m.stride <= 0) return;

    const offset = offsetRef.current;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;

    const viewportCenter = m.viewportWidth / 2;
    // Narrower influence than stride → only one card near peak scale
    const halfInfluence = m.stride * 0.68;
    let bestProximity = -1;
    let bestId = focusedRef.current;

    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const service = services[index % services.length];
      const cardCenter = offset + index * m.stride + m.cardWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);
      const proximity = proximityFromDistance(distance, halfInfluence);
      const visual = visualFromProximity(proximity, service.id === "local");
      const descReveal = revealBetween(proximity, 0.58, 0.88);
      const ctaReveal = revealBetween(proximity, 0.74, 0.94);
      const nameClarity = lerp(0.55, 1, proximity);

      el.style.transform = `translate3d(0, ${visual.translateY}px, 0) scale(${visual.scale})`;
      el.style.opacity = String(visual.opacity);
      el.style.filter =
        visual.blur > 0.12 ? `blur(${visual.blur}px)` : "none";
      el.style.zIndex = String(visual.zIndex);
      el.dataset.proximity = proximity.toFixed(3);
      el.style.setProperty("--gona-proximity", proximity.toFixed(3));
      el.style.setProperty("--gona-glow", visual.glow.toFixed(3));
      el.style.setProperty("--gona-name", nameClarity.toFixed(3));
      el.style.setProperty("--gona-desc", descReveal.toFixed(3));
      el.style.setProperty("--gona-cta", ctaReveal.toFixed(3));
      el.style.setProperty(
        "--gona-cta-pe",
        ctaReveal > 0.4 ? "auto" : "none",
      );

      if (proximity > bestProximity) {
        bestProximity = proximity;
        bestId = service.id;
      }
    });

    if (bestId !== focusedRef.current && bestProximity > 0.55) {
      focusedRef.current = bestId;
      setFocusedId(bestId);
    }
  }, [services]);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      pausedRef.current = false;
      velocityRef.current = 0;
    }, IDLE_RESUME_MS);
  }, []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  const resume = useCallback(() => {
    scheduleResume();
  }, [scheduleResume]);

  const stepBy = useCallback(
    (direction: -1 | 1) => {
      const m = metricsRef.current;
      pause();
      offsetRef.current = wrapOffset(
        offsetRef.current - direction * m.stride,
        m.segmentWidth,
      );
      applyVisuals();
      scheduleResume();
    },
    [applyVisuals, pause, scheduleResume],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("a,button")) return;

      draggingRef.current = true;
      pausedRef.current = true;
      velocityRef.current = 0;
      lastPointerX.current = event.clientX;
      event.currentTarget.setPointerCapture(event.pointerId);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    [reducedMotion],
  );

  useEffect(() => {
    measure();
    applyVisuals();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const ro = new ResizeObserver(() => {
      measure();
      applyVisuals();
    });
    ro.observe(viewport);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0.12;
      },
      { threshold: [0, 0.12, 0.35] },
    );
    io.observe(viewport);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [applyVisuals, measure]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = event.clientX - lastPointerX.current;
      lastPointerX.current = event.clientX;
      offsetRef.current += dx;
      velocityRef.current = dx;
      offsetRef.current = wrapOffset(
        offsetRef.current,
        metricsRef.current.segmentWidth,
      );
      applyVisuals();
    };

    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      scheduleResume();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [applyVisuals, scheduleResume]);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      applyVisuals();
      return;
    }

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (inViewRef.current) {
        if (draggingRef.current) {
          // visuals already applied on move
        } else if (Math.abs(velocityRef.current) > 0.2) {
          offsetRef.current += velocityRef.current;
          velocityRef.current *= DRAG_FRICTION;
          if (Math.abs(velocityRef.current) < 0.2) velocityRef.current = 0;
          offsetRef.current = wrapOffset(
            offsetRef.current,
            metricsRef.current.segmentWidth,
          );
          applyVisuals();
        } else if (!pausedRef.current) {
          offsetRef.current -= AUTO_SPEED * dt;
          offsetRef.current = wrapOffset(
            offsetRef.current,
            metricsRef.current.segmentWidth,
          );
          applyVisuals();
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, [applyVisuals, enabled, reducedMotion]);

  return {
    viewportRef,
    trackRef,
    cardRefs,
    metrics,
    focusedId,
    copyCount: COPIES,
    totalCards,
    onPointerDown,
    stepBy,
    pause,
    resume,
  };
}

function visualFromProximity(
  proximity: number,
  isLocal: boolean,
): CardVisualState {
  const t = proximity;
  // Peak ~1.08–1.10; LOCAL slightly higher. Neighbors fall off fast.
  const centerBoost = isLocal ? 1.11 : 1.09;
  return {
    proximity: t,
    scale: lerp(0.76, centerBoost, t),
    // Far ~28–35%, neighbors ~50–62%, center 100%
    opacity: lerp(0.3, 1, lerp(0.15, 1, t)),
    blur: lerp(0.55, 0, t),
    translateY: lerp(14, 0, t),
    zIndex: Math.round(lerp(1, 50, t * t)),
    glow: lerp(0, 1, t * t),
  };
}

export function getServiceAtIndex(
  services: GonaService[],
  index: number,
): GonaService {
  return services[((index % services.length) + services.length) % services.length];
}

export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}
