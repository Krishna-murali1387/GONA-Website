/**
 * Hero phone screen promotional video.
 * Replace the file at the stable public path to update the creative —
 * no component changes required for a same-named drop-in.
 */
export const heroVideoConfig = {
  /**
   * Stable public path: `public/videos/gona-hero.mp4`.
   * Query `v=` is a cache-buster only — bump when replacing the file so browsers
   * do not keep a previous same-name MP4. Playback behavior is unchanged.
   */
  src: "/videos/gona-hero.mp4?v=20261009c",
  /** Optional poster; omit when no still is available. */
  poster: null as string | null,
  ariaLabel: "GONA Super App promotional walkthrough",
} as const;
