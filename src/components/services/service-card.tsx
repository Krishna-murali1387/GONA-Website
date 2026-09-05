import type { GonaService } from "@/config/site.config";

type ServiceCardProps = {
  service: GonaService;
};

/**
 * W1 structural placeholder.
 * Real service marks must use supplied logos — never fabricate.
 */
export function ServiceCardPlaceholder({ service }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-black/8 bg-gona-white p-5">
      <p className="text-xs font-semibold tracking-[0.14em] text-gona-gray uppercase">
        {service.kind === "community" ? "Community" : "Service"}
      </p>
      <h3 className="mt-2 text-xl">{service.name}</h3>
      <p className="mt-2 text-sm text-gona-gray">{service.summary}</p>
      <p className="mt-4 text-xs text-gona-gray">
        Logo asset pending · route ready
      </p>
    </article>
  );
}
