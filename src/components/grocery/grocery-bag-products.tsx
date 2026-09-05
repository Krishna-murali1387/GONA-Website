"use client";

import { useId } from "react";

type IconProps = { className?: string };

export function IconTomato({ className }: IconProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="55%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="36" rx="20" ry="18" fill={`url(#${id})`} />
      <ellipse cx="24" cy="28" rx="5" ry="3.5" fill="#FCA5A5" opacity="0.45" />
      <path
        d="M32 18c0 0 1.5-6 6-7 0 0-2 5-1 8"
        fill="none"
        stroke="#166534"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M28 20c-3-2-7-1-8 1 3-1 6 0 8 2Z" fill="#16A34A" />
      <path d="M36 20c3-2 7-1 8 1-3-1-6 0-8 2Z" fill="#15803D" />
    </svg>
  );
}

export function IconMilk({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
      <path
        d="M22 14h20l4 8v42c0 2.2-1.8 4-4 4H22c-2.2 0-4-1.8-4-4V22l4-8Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />
      <path d="M22 14h20l-1.5 5h-17L22 14Z" fill="#E2E8F0" />
      <rect x="20" y="28" width="24" height="18" rx="2" fill="#ECFDF3" />
      <rect x="24" y="33" width="16" height="3" rx="1.5" fill="#22C55E" opacity="0.85" />
      <rect x="26" y="40" width="12" height="2" rx="1" fill="#86EFAC" />
      <path
        d="M26 14V10c0-1.5 1.2-2.5 3-2.5h6c1.8 0 3 1 3 2.5v4"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function IconRice({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
      <path
        d="M18 20c0-4 4-8 14-8s14 4 14 8v40c0 3-3 6-14 6s-14-3-14-6V20Z"
        fill="#FEF3C7"
        stroke="#D6B56A"
        strokeWidth="1.4"
      />
      <path d="M18 28h28v8H18Z" fill="#F59E0B" opacity="0.9" />
      <path d="M24 32h16" stroke="#FFFBEB" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="32" cy="48" rx="8" ry="5" fill="#FDE68A" opacity="0.7" />
      <circle cx="28" cy="47" r="1.2" fill="#F8FAFC" />
      <circle cx="33" cy="49" r="1.1" fill="#F8FAFC" />
      <circle cx="36" cy="46.5" r="1" fill="#F8FAFC" />
    </svg>
  );
}

export function IconBread({ className }: IconProps) {
  return (
    <svg viewBox="0 0 72 48" className={className} aria-hidden="true">
      <ellipse cx="36" cy="28" rx="28" ry="14" fill="#D97706" />
      <ellipse cx="36" cy="24" rx="26" ry="12" fill="#F59E0B" />
      <ellipse cx="36" cy="20" rx="22" ry="9" fill="#FBBF24" />
      <path
        d="M20 18c2-3 5-4 8-3M32 15c2-2 5-3 8-2M44 17c2-2 5-2 8 0"
        fill="none"
        stroke="#B45309"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <ellipse cx="28" cy="26" rx="3" ry="2" fill="#FDE68A" opacity="0.5" />
    </svg>
  );
}

export function IconSnack({ className }: IconProps) {
  return (
    <svg viewBox="0 0 56 72" className={className} aria-hidden="true">
      <path
        d="M14 10h28c2 0 4 2 4 4v48c0 2-2 4-4 4H14c-2 0-4-2-4-4V14c0-2 2-4 4-4Z"
        fill="#FFF7ED"
        stroke="#FDBA74"
        strokeWidth="1.4"
      />
      <path d="M10 18h36v22H10Z" fill="#FB923C" />
      <path d="M18 26h20" stroke="#FFEDD5" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 33h12" stroke="#FED7AA" strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="48" width="20" height="8" rx="2" fill="#FFEDD5" />
      <circle cx="28" cy="52" r="2" fill="#F97316" opacity="0.7" />
    </svg>
  );
}

export function IconHomeCare({ className }: IconProps) {
  return (
    <svg viewBox="0 0 56 76" className={className} aria-hidden="true">
      <rect x="18" y="6" width="20" height="10" rx="2" fill="#94A3B8" />
      <rect x="24" y="2" width="8" height="6" rx="1.5" fill="#64748B" />
      <path
        d="M14 18h28l3 48c0 2.5-2 4.5-4.5 4.5h-25C13 70.5 11 68.5 11 66l3-48Z"
        fill="#E0F2FE"
        stroke="#7DD3FC"
        strokeWidth="1.3"
      />
      <rect x="17" y="28" width="22" height="20" rx="2" fill="#ECFDF3" />
      <rect x="21" y="34" width="14" height="3" rx="1.5" fill="#22C55E" opacity="0.8" />
      <rect x="23" y="41" width="10" height="2" rx="1" fill="#86EFAC" />
    </svg>
  );
}
