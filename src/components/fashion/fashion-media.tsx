"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { FASHION_FALLBACK_SRC } from "@/components/fashion/fashion.content";
import { cn } from "@/lib/cn";

type FashionMediaImageProps = Omit<ImageProps, "src" | "onError"> & {
  /** Preferred dedicated Fashion asset path */
  src: string;
  /** Intentional crop — applied as inline object-position */
  objectPosition?: string;
  fallbackSrc?: string;
};

/**
 * Next/Image wrapper: uses dedicated Fashion assets when present,
 * otherwise falls back to the shared fashion.webp artwork.
 */
export function FashionMediaImage({
  src,
  fallbackSrc = FASHION_FALLBACK_SRC,
  objectPosition,
  alt,
  className,
  style,
  ...rest
}: FashionMediaImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...rest}
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      className={cn("object-cover", className)}
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
