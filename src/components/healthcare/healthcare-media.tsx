"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { HEALTHCARE_FALLBACK_SRC } from "@/components/healthcare/healthcare.content";
import { cn } from "@/lib/cn";

type HealthcareMediaImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string;
  objectPosition?: string;
  objectPositionMobile?: string;
  fallbackSrc?: string;
};

/** Next/Image wrapper with safe fallback to healthcare.webp. */
export function HealthcareMediaImage({
  src,
  fallbackSrc = HEALTHCARE_FALLBACK_SRC,
  objectPosition = "50% 50%",
  objectPositionMobile,
  alt,
  className,
  style,
  ...rest
}: HealthcareMediaImageProps) {
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
        "[object-position:var(--hc-op-m)] md:[object-position:var(--hc-op)]",
        className,
      )}
      style={{
        ...style,
        ["--hc-op" as string]: objectPosition,
        ["--hc-op-m" as string]: mobilePos,
      }}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
