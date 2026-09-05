import Link from "next/link";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/lib/ui";

type InnerPageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark" | "warm" | "local";
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
};

const toneStyles = {
  light: "bg-gona-white text-gona-black",
  dark: "bg-gona-black text-gona-white",
  warm: "bg-[#F3F0E8] text-gona-black",
  local: "bg-[#1A1410] text-gona-white",
} as const;

export function InnerPageHero({
  eyebrow,
  title,
  description,
  tone = "warm",
  actions,
  visual,
  className,
}: InnerPageHeroProps) {
  const onDark = tone === "dark" || tone === "local";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-20",
        toneStyles[tone],
        className,
      )}
    >
      {tone === "local" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,122,26,0.18),transparent_50%),radial-gradient(ellipse_at_80%_60%,rgba(255,212,0,0.08),transparent_45%)]"
          aria-hidden="true"
        />
      ) : null}
      {tone === "dark" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,212,0,0.14),transparent_55%)]"
          aria-hidden="true"
        />
      ) : null}

      <Container
        className={cn(
          "relative grid items-center gap-10",
          visual ? "lg:grid-cols-[1.05fr_0.95fr] lg:gap-14" : undefined,
        )}
      >
        <div className="max-w-2xl">
          {eyebrow ? (
            <p
              className={cn(
                "mb-4 text-xs font-semibold tracking-[0.2em] uppercase",
                tone === "local"
                  ? "text-[#FF7A1A]"
                  : onDark
                    ? "text-gona-yellow"
                    : "text-gona-gray",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-display text-4xl leading-[1.05] md:text-5xl lg:text-[3.4rem]",
              onDark ? "text-gona-white" : "text-gona-black",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "mt-5 max-w-xl text-base leading-relaxed md:text-lg",
                onDark ? "text-white/65" : "text-gona-gray",
              )}
            >
              {description}
            </p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {visual ? <div className="relative">{visual}</div> : null}
      </Container>
    </section>
  );
}

export function InnerCtaLink({
  href,
  children,
  variant = "primary",
  onDark = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "yellow";
  /** Secondary CTAs on dark/local heroes */
  onDark?: boolean;
}) {
  const resolved =
    variant === "secondary" && onDark
      ? "secondaryOnDark"
      : variant === "secondary"
        ? "secondary"
        : variant;

  return (
    <Link href={href} className={buttonClass(resolved)}>
      {children}
    </Link>
  );
}
