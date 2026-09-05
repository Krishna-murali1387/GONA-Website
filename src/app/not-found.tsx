import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center bg-gona-white py-28 md:py-36">
      <Container className="max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-gona-gray uppercase">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl text-gona-black md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gona-gray">
          That page is not available. Return home or browse GONA services.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={siteConfig.routes.home} className="gona-btn gona-btn-primary">
            Back to Home
          </Link>
          <Link
            href={siteConfig.routes.services}
            className="gona-btn gona-btn-secondary"
          >
            Explore Services
          </Link>
        </div>
      </Container>
    </div>
  );
}
