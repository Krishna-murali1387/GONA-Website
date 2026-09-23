"use client";

import { useEffect, useRef } from "react";

import { V3_PRODUCTS } from "@/components/business/immersive/business-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const FUTURE = V3_PRODUCTS.filter((p) => p.status === "soon");

export function FutureSpotlight() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const raf = useRef(0);
  const target = useRef({ x: 50, y: 40 });
  const current = useRef({ x: 50, y: 40 });
  const litIndex = useRef(0);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;

    const fine = window.matchMedia("(pointer: fine)").matches;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      el.style.setProperty("--biz-mx", `${current.current.x}%`);
      el.style.setProperty("--biz-my", `${current.current.y}%`);
      el.style.setProperty("--biz-spot", "1");

      if (fine) {
        const items = el.querySelectorAll<HTMLElement>("[data-future-item]");
        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const cx = ((rect.left + rect.right) / 2 / window.innerWidth) * 100;
          const cy = ((rect.top + rect.bottom) / 2 / window.innerHeight) * 100;
          const dx = cx - current.current.x;
          const dy = cy - current.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          item.dataset.lit = dist < 18 ? "true" : "false";
        });
      }

      raf.current = requestAnimationFrame(tick);
    };

    if (fine) {
      const onMove = (e: PointerEvent) => {
        target.current.x = (e.clientX / window.innerWidth) * 100;
        target.current.y = (e.clientY / window.innerHeight) * 100;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      raf.current = requestAnimationFrame(tick);
      return () => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf.current);
      };
    }

    // Touch / coarse: illuminate one product via intersection observer
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-future-item]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((item) => {
              item.dataset.lit = item === entry.target ? "true" : "false";
            });
            litIndex.current = items.indexOf(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0.55, rootMargin: "-20% 0px -20% 0px" },
    );
    items.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="biz-v3-spotlight biz-v3-root relative scroll-mt-24 border-y border-white/5 py-20 sm:py-28"
      aria-labelledby="biz-whats-next"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-bold tracking-[0.32em] text-[#FFD400]/80 uppercase">
            What&apos;s next
          </p>
          <h2
            id="biz-whats-next"
            className="mt-4 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Move through the future of GONA Business.
          </h2>
          <p className="mt-4 text-base text-white/45">
            Concepts only — not available products. Discover them with light
            {reduced ? "." : " as you explore."}
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE.map((p) => (
            <li
              key={p.id}
              data-future-item
              data-lit={reduced ? "true" : "false"}
              className="biz-v3-future-item rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-[0.6rem] font-bold tracking-[0.2em] text-white/35 uppercase">
                Coming soon
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-gona-display)] text-xl font-bold text-white/90">
                {p.name}
              </h3>
              <p className="mt-1.5 text-sm text-white/40">{p.subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
