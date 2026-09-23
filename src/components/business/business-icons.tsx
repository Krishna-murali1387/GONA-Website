import type { ReactNode } from "react";

import type { FutureProductId } from "@/config/business.config";

type IconProps = { className?: string; accent?: string };

function Frame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function BusinessProductIcon({
  id,
  className,
  accent = "currentColor",
}: { id: FutureProductId | "cable" } & IconProps) {
  switch (id) {
    case "cable":
      return (
        <Frame className={className}>
          <circle cx="24" cy="24" r="14" stroke={accent} strokeWidth="1.75" opacity="0.9" />
          <circle cx="24" cy="24" r="5" fill={accent} />
          <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
        </Frame>
      );
    case "schools":
      return (
        <Frame className={className}>
          <path
            d="M8 20 L24 12 L40 20 L24 28 Z"
            stroke={accent}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M14 24v8c4 3 16 3 20 0v-8" stroke={accent} strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M40 20v12" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
        </Frame>
      );
    case "restaurants":
      return (
        <Frame className={className}>
          <path d="M16 10v16c0 4 3 7 8 7s8-3 8-7V10" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
          <path d="M16 18h16" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
          <path d="M24 33v5" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
          <path d="M18 38h12" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
        </Frame>
      );
    case "industry":
      return (
        <Frame className={className}>
          {/* Factory / production line abstraction */}
          <path
            d="M6 36V22l8 5V18l9 6V12h14v24H6Z"
            stroke={accent}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M34 16v-5M38 16V8M42 16v-3" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14 36v-4M22 36v-6M30 36v-3" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <circle cx="18" cy="28" r="1.5" fill={accent} opacity="0.8" />
          <circle cx="26" cy="26" r="1.5" fill={accent} opacity="0.8" />
        </Frame>
      );
    case "events":
      return (
        <Frame className={className}>
          <rect x="10" y="14" width="28" height="24" rx="3" stroke={accent} strokeWidth="1.75" />
          <path d="M10 22h28M18 10v8M30 10v8" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="18" cy="28" r="1.75" fill={accent} />
          <circle cx="24" cy="28" r="1.75" fill={accent} />
          <circle cx="30" cy="28" r="1.75" fill={accent} />
        </Frame>
      );
    case "workforce":
      return (
        <Frame className={className}>
          <circle cx="24" cy="16" r="5" stroke={accent} strokeWidth="1.75" />
          <path d="M12 36c2-7 8-10 12-10s10 3 12 10" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="20" r="3.5" stroke={accent} strokeWidth="1.5" opacity="0.7" />
          <circle cx="36" cy="20" r="3.5" stroke={accent} strokeWidth="1.5" opacity="0.7" />
        </Frame>
      );
    case "finance":
      return (
        <Frame className={className}>
          <rect x="12" y="12" width="24" height="28" rx="2" stroke={accent} strokeWidth="1.75" />
          <path d="M18 20h12M18 26h12M18 32h8" stroke={accent} strokeWidth="1.75" strokeLinecap="round" />
          <path d="M28 34l4-4 4 6" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </Frame>
      );
    default:
      return null;
  }
}
