"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { GROCERY_FALLBACK_SRC } from "@/components/grocery/grocery.content";
import { cn } from "@/lib/cn";

type GroceryMediaImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  objectPosition?: string;
  objectPositionMobile?: string;
  fallbackSrc?: string;
};

/**
 * Next/Image wrapper for dedicated Grocery assets with safe fallback to grocery.webp.
 */
export function GroceryMediaImage({
  src,
  fallbackSrc = GROCERY_FALLBACK_SRC,
  objectPosition = "50% 50%",
  objectPositionMobile,
  alt,
  className,
  style,
  ...rest
}: GroceryMediaImageProps) {
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
        "[object-position:var(--grocery-op-m)] md:[object-position:var(--grocery-op)]",
        className,
      )}
      style={{
        ...style,
        ["--grocery-op" as string]: objectPosition,
        ["--grocery-op-m" as string]: mobilePos,
      }}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
