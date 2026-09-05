import { cn } from "@/lib/cn";

/** Shared GONA CTA class helpers — use with Link/button/a. */
export const gonaButton = {
  base: "gona-btn",
  primary: "gona-btn gona-btn-primary",
  yellow: "gona-btn gona-btn-yellow",
  secondary: "gona-btn gona-btn-secondary",
  secondaryOnDark: "gona-btn gona-btn-secondary-on-dark",
} as const;

export const gonaChip = {
  base: "gona-chip",
  active: "gona-chip gona-chip-active",
} as const;

export function buttonClass(
  variant: "primary" | "yellow" | "secondary" | "secondaryOnDark" = "primary",
  className?: string,
) {
  return cn(gonaButton[variant], className);
}

export function chipClass(active: boolean, className?: string) {
  return cn(active ? gonaChip.active : gonaChip.base, className);
}
