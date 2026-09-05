"use client";

import Image from "next/image";

import type { ServiceId } from "@/config/site.config";
import { cn } from "@/lib/cn";

type ServiceVisualProps = {
  serviceId: ServiceId;
  className?: string;
  /** Duplicate track clones — decorative for AT */
  inertClone?: boolean;
};

const SERVICE_ARTWORK: Record<
  ServiceId,
  { src: string; alt: string }
> = {
  grocery: {
    src: "/services/grocery.webp",
    alt: "GONA Grocery Delivery",
  },
  healthcare: {
    src: "/services/healthcare.webp",
    alt: "GONA Healthcare Ecosystem",
  },
  repair: {
    src: "/services/repair.webp",
    alt: "GONA Repair",
  },
  "vehicle-booking": {
    src: "/services/vehicle.webp",
    alt: "GONA Vehicle Booking",
  },
  fashion: {
    src: "/services/fashion.webp",
    alt: "GONA Fashion",
  },
  farming: {
    src: "/services/farming.webp",
    alt: "GONA Farming",
  },
  local: {
    src: "/services/local.webp",
    alt: "GONA LOCAL",
  },
};

/**
 * Final approved service artwork — fills the existing 4:3 orbit card frame.
 */
export function ServiceVisual({
  serviceId,
  className,
  inertClone = false,
}: ServiceVisualProps) {
  const artwork = SERVICE_ARTWORK[serviceId];

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[1.35rem]",
        className,
      )}
    >
      <Image
        src={artwork.src}
        alt={inertClone ? "" : artwork.alt}
        fill
        sizes="(max-width: 480px) 240px, (max-width: 768px) 272px, (max-width: 1024px) 288px, 304px"
        className="object-cover object-center"
        draggable={false}
      />
    </div>
  );
}
