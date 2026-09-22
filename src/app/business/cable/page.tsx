import Link from "next/link";

import { cableSite } from "@/config/cable.config";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cable Network Software",
  description:
    "GONA Cable Network Management Software — register your cable network, manage customers and collections, billed as GONA Business Software.",
  path: cableSite.productPath,
});

export default function CableProductPage() {
  return (
    <main className="bg-[#111111] text-white">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255,212,0,0.25), transparent 55%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-end px-6 pb-16 pt-28">
          <p className="text-xs font-bold tracking-[0.35em] text-[#FFD400] uppercase">
            GONA · Business Software
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-gona-display)] text-4xl font-extrabold tracking-tight sm:text-6xl">
            Cable Network Management
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Operate your cable network on GONA — customers, connections, billing discipline, and
            team access — separate from consumer GONA services.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={cableSite.registerPath}
              className="inline-flex h-12 items-center rounded-full bg-[#FFD400] px-7 text-sm font-extrabold text-[#111111]"
            >
              Register Your Network
            </Link>
            <a
              href={cableSite.portalUrl}
              className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-sm font-bold text-white"
            >
              Owner sign in
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#161616]">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-3">
          {[
            {
              t: "Independent tenant",
              d: "Your network is its own business workspace — not tied to GONA service locations.",
            },
            {
              t: "Owner approval",
              d: "Register with email, submit network details, and go live after GONA Super Admin approval.",
            },
            {
              t: "Same GONA identity",
              d: "Use one GONA email account. After approval, open cable.gonasuperapp.com with the same password.",
            },
          ].map((item) => (
            <div key={item.t}>
              <h2 className="text-lg font-extrabold text-[#FFD400]">{item.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
