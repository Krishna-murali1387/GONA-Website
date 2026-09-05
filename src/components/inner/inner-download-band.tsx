import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

/** Lightweight download band for inner pages — not the homepage cinematic CTA. */
export function InnerDownloadBand() {
  const playUrl = siteConfig.download.playStoreUrl;

  return (
    <section className="bg-gona-black py-14 text-gona-white md:py-16">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gona-yellow uppercase">
            Download
          </p>
          <h2 className="mt-2 font-display text-2xl text-gona-white md:text-3xl">
            Everything You Need. One GONA.
          </h2>
          <p className="mt-2 text-sm text-white/55 md:text-base">
            Your everyday services and local community, connected in one app.
          </p>
        </div>
        {playUrl ? (
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gona-btn gona-btn-yellow"
          >
            Google Play
          </a>
        ) : (
          <div className="rounded-full border border-gona-yellow/40 bg-gona-yellow/10 px-5 py-3 text-center">
            <p className="text-sm font-semibold text-gona-yellow">Google Play</p>
            <p className="text-[11px] tracking-wide text-gona-yellow/75 uppercase">
              Coming Soon
            </p>
          </div>
        )}
      </Container>
      <Container className="mt-4">
        <Link
          href="/#download"
          className="text-xs text-white/40 transition hover:text-gona-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
        >
          Back to homepage download
        </Link>
      </Container>
    </section>
  );
}
