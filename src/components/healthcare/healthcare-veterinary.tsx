import {
  healthcareTokens,
} from "@/components/healthcare/healthcare.content";
import { VeterinaryScene } from "@/components/healthcare/healthcare-visuals";
import { Container } from "@/components/ui/container";

export function HealthcareVeterinary() {
  return (
    <section className="bg-[linear-gradient(165deg,#FFF7ED_0%,#FFFFFF_55%,#EFF6FF_100%)] py-16 md:py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#FED7AA] bg-white shadow-[0_22px_50px_rgba(154,52,18,0.08)]">
            <VeterinaryScene className="aspect-[5/3] min-h-[16rem] w-full lg:min-h-[20rem]" />
          </div>
          <div className="max-w-lg lg:order-first">
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: healthcareTokens.warmAccent }}
            >
              Veterinary home visits
            </p>
            <h2 className="font-display text-3xl text-gona-black md:text-4xl">
              Care for them, too.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gona-gray md:text-lg">
              Find eligible veterinary care and request home visits for animals
              where available — as a meaningful part of the GONA Healthcare
              ecosystem.
            </p>
            <p className="mt-5 text-sm text-gona-gray">
              Availability depends on participating veterinary providers in your
              area.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
