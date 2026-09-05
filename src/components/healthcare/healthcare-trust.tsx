import {
  healthcarePrinciples,
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { Container } from "@/components/ui/container";

export function HealthcareTrust() {
  return (
    <section className="border-y border-[#DBEAFE] bg-[#EFF6FF] py-10 md:py-12">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {healthcarePrinciples.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: healthcareTokens.accent }}
                aria-hidden="true"
              />
              <span className="font-display text-sm text-gona-black md:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
