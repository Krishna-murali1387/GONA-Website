"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { LOCAL_FALLBACK_SRC } from "@/components/local/local.content";
import { cn } from "@/lib/cn";

type LocalMediaImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  objectPosition?: string;
  objectPositionMobile?: string;
  fallbackSrc?: string;
};

/**
 * Next/Image wrapper for dedicated LOCAL assets with safe fallback to local.webp.
 * Mobile can use a tighter subject crop via objectPositionMobile.
 */
export function LocalMediaImage({
  src,
  fallbackSrc = LOCAL_FALLBACK_SRC,
  objectPosition = "50% 50%",
  objectPositionMobile,
  alt,
  className,
  style,
  ...rest
}: LocalMediaImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const hasObjectFit = Boolean(
    className && /\bobject-(contain|cover|fill|none|scale-down)\b/.test(className),
  );
  const mobilePos = objectPositionMobile ?? objectPosition;

  return (
    <Image
      {...rest}
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      className={cn(
        !hasObjectFit && "object-cover",
        "[object-position:var(--local-op-m)] md:[object-position:var(--local-op)]",
        className,
      )}
      style={{
        ...style,
        ["--local-op" as string]: objectPosition,
        ["--local-op-m" as string]: mobilePos,
      }}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
