"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { FARMING_FALLBACK_SRC } from "@/components/farming/farming.content";
import { cn } from "@/lib/cn";

type FarmingMediaImageProps = Omit<ImageProps, "src" | "onError"> & {
  /** Preferred dedicated Farming asset path */
  src: string;
  /** Intentional crop — applied as inline object-position */
  objectPosition?: string;
  fallbackSrc?: string;
};

/**
 * Next/Image wrapper: uses dedicated Farming assets when present,
 * otherwise falls back to the shared farming.webp artwork.
 */
export function FarmingMediaImage({
  src,
  fallbackSrc = FARMING_FALLBACK_SRC,
  objectPosition,
  alt,
  className,
  style,
  ...rest
}: FarmingMediaImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const hasObjectFit = Boolean(
    className && /\bobject-(contain|cover|fill|none|scale-down)\b/.test(className),
  );

  return (
    <Image
      {...rest}
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      className={cn(!hasObjectFit && "object-cover", className)}
      style={{
        ...style,
        objectPosition: objectPosition ?? style?.objectPosition,
      }}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
