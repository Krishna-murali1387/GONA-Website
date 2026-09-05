import type { ServiceId } from "@/config/site.config";

export type TrackMetrics = {
  cardWidth: number;
  gap: number;
  stride: number;
  segmentWidth: number;
  viewportWidth: number;
};

export type CardProximity = {
  index: number;
  serviceId: ServiceId;
  /** 1 at exact center, 0 when far */
  proximity: number;
  /** Absolute distance from viewport center in px */
  distance: number;
};

export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/** Sharper near-center peak — reduces dual-card dominance. */
export function easeCenterPeak(t: number): number {
  const x = clamp(t, 0, 1);
  return x ** 1.65;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Map center-distance to continuous visual proximity (0–1).
 * halfInfluence ~ 0.7 * stride keeps only one card near peak scale.
 */
export function proximityFromDistance(
  distance: number,
  halfInfluence: number,
): number {
  const t = clamp(1 - distance / halfInfluence, 0, 1);
  return easeCenterPeak(t);
}

export function wrapOffset(offset: number, segmentWidth: number): number {
  if (segmentWidth <= 0) return 0;
  let next = offset % segmentWidth;
  if (next > 0) next -= segmentWidth;
  return next;
}

/**
 * Wider gaps + slightly tighter cards so scaled center (≈1.1×)
 * does not collide with neighbors.
 */
export function resolveCardMetrics(viewportWidth: number): TrackMetrics {
  let cardWidth = 300;
  let gap = 48;

  if (viewportWidth < 480) {
    cardWidth = Math.min(268, viewportWidth * 0.74);
    gap = 36;
  } else if (viewportWidth < 768) {
    cardWidth = 288;
    gap = 42;
  } else if (viewportWidth < 1024) {
    cardWidth = 304;
    gap = 52;
  } else if (viewportWidth < 1280) {
    cardWidth = 320;
    gap = 58;
  } else {
    cardWidth = 336;
    gap = 64;
  }

  const stride = cardWidth + gap;
  return {
    cardWidth,
    gap,
    stride,
    segmentWidth: stride * 7,
    viewportWidth,
  };
}

/** Smoothstep-like threshold ramp for content layers. */
export function revealBetween(
  proximity: number,
  start: number,
  full: number,
): number {
  if (proximity <= start) return 0;
  if (proximity >= full) return 1;
  const t = (proximity - start) / (full - start);
  return t * t * (3 - 2 * t);
}
