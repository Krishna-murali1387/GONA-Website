import {
  healthcareComingSoon,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { Container } from "@/components/ui/container";

export function HealthcareComingSoon() {
  return (
    <section className="bg-gona-white py-14 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: healthcareTokens.accent }}
          >
            On the horizon
          </p>
          <h2 className="font-display text-3xl text-gona-black md:text-4xl">
            More care, coming together.
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {healthcareComingSoon.map((item) => (
            <li
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-dashed border-[#93C5FD] bg-[#F8FAFC] px-6 py-7"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.06),transparent_60%)]"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl text-gona-black">{item.title}</h3>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase"
                    style={{ background: healthcareTokens.navy }}
                  >
                    Coming Soon
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gona-gray">{item.body}</p>
                <p className="mt-4 text-xs font-medium text-gona-gray/80">
                  Not available for ordering yet.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
