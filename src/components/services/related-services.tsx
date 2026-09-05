import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { ServiceId } from "@/config/site.config";
import { getServiceById, siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

type Props = {
  ids: ServiceId[];
  currentId?: ServiceId;
};

export function RelatedServices({ ids, currentId }: Props) {
  const related = ids
    .filter((id) => id !== currentId)
    .map((id) => getServiceById(id))
    .filter(Boolean)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-gona-white py-14 md:py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-gona-gray uppercase">
              Ecosystem
            </p>
            <h2 className="font-display text-2xl text-gona-black md:text-3xl">
              Explore More of GONA
            </h2>
          </div>
          <Link
            href={siteConfig.routes.services}
            className="text-sm font-semibold text-gona-black underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
          >
            All services →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((service) => (
            <li key={service!.id}>
              <Link
                href={service!.href}
                className={cn(
                  "block rounded-2xl border border-black/8 bg-gona-light/60 p-5 transition hover:border-gona-yellow/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow",
                  service!.id === "local" && "border-[#FF7A1A]/25",
                )}
              >
                <p
                  className={cn(
                    "text-[11px] font-semibold tracking-[0.16em] uppercase",
                    service!.id === "local" ? "text-[#FF7A1A]" : "text-gona-gray",
                  )}
                >
                  {service!.kind === "community" ? "Community" : "Service"}
                </p>
                <p className="mt-2 font-display text-xl text-gona-black">
                  {service!.name}
                </p>
                <p className="mt-2 text-sm text-gona-gray">{service!.carouselLine}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
