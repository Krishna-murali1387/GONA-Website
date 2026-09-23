"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";

import { GonaLogo } from "@/components/brand/gona-logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

function downloadHref(pathname: string): string {
  if (siteConfig.download.playStoreUrl) {
    return siteConfig.download.playStoreUrl;
  }
  return pathname === "/"
    ? siteConfig.download.anchor
    : `/${siteConfig.download.anchor}`;
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Subtle active match — Home exact; Services includes detail routes. */
function isPrimaryNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/services") {
    return pathname === "/services" || pathname.startsWith("/services/");
  }
  if (href === "/business") {
    return pathname === "/business" || pathname.startsWith("/business/");
  }
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const menuId = useId();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const onDarkSurface = isHome;
  const onDarkHero = onDarkSurface && !scrolled && !open;
  const downloadTarget = downloadHref(pathname);
  const downloadExternal = isExternalHref(downloadTarget);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const headerSurface = onDarkSurface
    ? onDarkHero
      ? "border-transparent bg-transparent"
      : "border-white/8 bg-[#111111]/92 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    : scrolled
      ? "border-black/8 bg-gona-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl"
      : "border-black/5 bg-gona-white/90 backdrop-blur-xl";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          headerSurface,
        )}
      >
        <Container className="relative flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <GonaLogo priority size={36} onDark={onDarkSurface} />

          <nav
            className="absolute left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3.5 lg:flex xl:gap-6"
            aria-label="Primary"
          >
            {siteConfig.nav.primary.map((item) => {
              const active = isPrimaryNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gona-yellow",
                    onDarkSurface
                      ? "text-white/72 hover:text-gona-white"
                      : "text-gona-black/70 hover:text-gona-black",
                    active && (onDarkSurface ? "text-gona-yellow" : "text-gona-black"),
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100",
                      active && "scale-x-100",
                      onDarkSurface ? "text-gona-yellow" : "text-gona-black",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href={downloadTarget}
              {...(downloadExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="gona-btn gona-btn-yellow gap-2 px-3.5 py-2 text-xs sm:px-4 sm:text-sm"
            >
              <DownloadIcon className="size-3.5" />
              <span>{siteConfig.download.ctaLabel}</span>
            </Link>

            <button
              type="button"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                onDarkSurface
                  ? "border-white/15 text-gona-white hover:border-gona-yellow/50 hover:text-gona-yellow"
                  : "border-black/10 text-gona-black hover:border-gona-black/30",
              )}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            className="fixed inset-0 z-40 lg:hidden"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col border-l border-white/10 bg-[#111111] shadow-2xl"
              initial={reducedMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reducedMotion ? undefined : { x: "100%" }}
              transition={{
                type: "tween",
                duration: reducedMotion ? 0 : 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <GonaLogo onDark size={32} />
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-gona-white"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <MenuIcon open />
                </button>
              </div>

              <nav
                className="flex flex-1 flex-col gap-1 px-4 py-6"
                aria-label="Mobile"
              >
                {siteConfig.nav.primary.map((item, index) => {
                  const active = isPrimaryNavActive(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reducedMotion ? 0 : 0.04 * index,
                        duration: 0.35,
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex min-h-12 items-center rounded-xl px-4 text-lg font-medium transition-colors hover:bg-white/5 hover:text-gona-yellow",
                          active ? "bg-white/5 text-gona-yellow" : "text-white/85",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="border-t border-white/8 p-5">
                <Link
                  href={downloadTarget}
                  onClick={() => setOpen(false)}
                  {...(downloadExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="gona-btn gona-btn-yellow min-h-12 w-full"
                >
                  {siteConfig.download.ctaLabel}
                </Link>
                <p className="mt-3 text-center text-xs text-white/45">
                  {siteConfig.download.comingSoonLabel}
                </p>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 2.5v7.2M8 9.7 5.4 7.1M8 9.7l2.6-2.6M3.2 12.5h9.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-4" aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300",
          open ? "top-[7px] rotate-45" : "top-[3px]",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-[7px] block h-[1.5px] w-4 bg-current transition-opacity duration-200",
          open && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300",
          open ? "top-[7px] -rotate-45" : "top-[11px]",
        )}
      />
    </span>
  );
}
