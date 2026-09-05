import { fashionTokens } from "@/components/fashion/fashion.content";
import { DeliveryMomentArt } from "@/components/fashion/fashion-visuals";

export function FashionDelivery() {
  return (
    <section className="bg-[#F3E8FF] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.22em] uppercase"
              style={{ color: fashionTokens.accent }}
            >
              Local delivery
            </p>
            <h2 className="mt-3 font-display text-3xl text-[#0F0A1A] md:text-4xl">
              Local fashion, delivered through GONA.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-600">
              Delivery options depend on your location, participating seller and
              order availability.
            </p>
          </div>
          <div className="overflow-hidden">
            <DeliveryMomentArt className="h-auto w-full min-h-[12rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
