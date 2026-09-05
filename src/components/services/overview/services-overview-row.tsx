"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";

import {
  FashionMicroStory,
  FarmingMicroStory,
  GroceryMicroStory,
  HealthcareMicroStory,
  LocalMicroStory,
  RepairMicroStory,
  VehicleMicroStory,
} from "@/components/services/overview/micro-stories";
import { useCanHover } from "@/components/services/overview/use-can-hover";
import type { GonaService } from "@/config/site.config";
import { cn } from "@/lib/cn";

type ServicesOverviewRowProps = {
  service: GonaService;
  index: number;
};

function MicroStoryForService({
  id,
  active,
  reduce,
  mobileStatic,
}: {
  id: string;
  active: boolean;
  reduce: boolean;
  mobileStatic: boolean;
}) {
  const props = { active, reduce, mobileStatic };
  switch (id) {
    case "grocery":
      return <GroceryMicroStory {...props} />;
    case "healthcare":
      return <HealthcareMicroStory {...props} />;
    case "repair":
      return <RepairMicroStory {...props} />;
    case "vehicle-booking":
      return <VehicleMicroStory {...props} />;
    case "fashion":
      return <FashionMicroStory {...props} />;
    case "farming":
      return <FarmingMicroStory {...props} />;
    case "local":
      return <LocalMicroStory {...props} />;
    default:
      return null;
  }
}

/** /services overview row only — does not affect locked detail pages. */
export function ServicesOverviewRow({ service, index }: ServicesOverviewRowProps) {
  const reduce = !!useReducedMotion();
  const canHover = useCanHover();
  const [active, setActive] = useState(false);
  const isLocal = service.id === "local";
  const reverse = index % 2 === 1;

  // Touch / no-hover: static end pose. Desktop: base visible, travel on hover.
  const mobileStatic = !canHover;
  // Play travel whenever the row is active on a hover-capable device,
  // OR when reduced-motion users focus (story still reveals via reduce path).
  const storyActive = active && (canHover || reduce);

  const activate = useCallback(() => setActive(true), []);
  const deactivate = useCallback(() => setActive(false), []);

  return (
    <li>
      <Link
        href={service.href}
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        onPointerEnter={activate}
        onPointerLeave={deactivate}
        onFocus={activate}
        onBlur={deactivate}
        className={cn(
          "group relative grid items-center gap-5 rounded-[1.5rem] border p-6 transition md:grid-cols-[auto_minmax(0,1.05fr)_minmax(12rem,18rem)_auto] md:gap-6 md:p-8",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow",
          isLocal
            ? "border-[#FF7A1A]/30 bg-[#1A1410] text-gona-white hover:border-[#FF7A1A]/55"
            : "border-black/8 bg-gona-light/50 hover:border-gona-yellow/50 hover:bg-gona-white",
        )}
      >
        <span
          className={cn(
            "relative z-20 flex size-10 items-center justify-center rounded-full font-display text-sm font-bold md:size-12",
            isLocal
              ? "bg-[#FF7A1A] text-gona-black"
              : "bg-gona-yellow text-gona-black",
            reverse && "md:order-2",
          )}
        >
          {String(service.order).padStart(2, "0")}
        </span>

        <div
          className={cn(
            "relative z-20",
            reverse && "md:order-1 md:text-right",
            !reverse && "md:order-2",
          )}
        >
          <p
            className={cn(
              "text-[11px] font-semibold tracking-[0.16em] uppercase",
              isLocal ? "text-[#FF7A1A]" : "text-gona-gray",
            )}
          >
            {isLocal ? "Community" : "Service"}
          </p>
          <h2
            className={cn(
              "mt-2 font-display text-2xl md:text-3xl",
              isLocal ? "text-gona-white" : "text-gona-black",
            )}
          >
            {service.name}
          </h2>
          <p
            className={cn(
              "mt-2 max-w-xl text-sm md:text-base",
              isLocal ? "text-white/65" : "text-gona-gray",
              reverse && "md:ml-auto",
            )}
          >
            {service.summary}
          </p>
        </div>

        <div
          className={cn(
            "relative z-10 min-h-24 w-full justify-self-stretch md:min-h-28",
            "md:order-3",
          )}
        >
          <MicroStoryForService
            id={service.id}
            active={storyActive}
            reduce={reduce}
            mobileStatic={mobileStatic}
          />
        </div>

        <span
          className={cn(
            "relative z-20 inline-flex items-center gap-2 text-sm font-semibold md:order-4",
            isLocal ? "text-gona-yellow" : "text-gona-black",
          )}
        >
          Explore
          <span
            aria-hidden="true"
            className={cn(
              "inline-block transition-transform duration-300 ease-out",
              "group-hover:translate-x-1.5 group-focus-within:translate-x-1.5",
              active && !reduce && "translate-x-1.5",
              reduce && "translate-x-0 group-hover:translate-x-0",
            )}
          >
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
