import { vehicleTokens } from "@/components/vehicle/vehicle.content";
import { GoodsStoryArt } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";

export function VehicleGoods() {
  return (
    <section className="bg-[#EEF2FF] py-24 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="order-2 overflow-hidden rounded-[1.5rem] lg:order-1">
            <div className="aspect-[1000/460] min-h-[16rem] w-full md:min-h-[22rem] lg:min-h-[26rem]">
              <GoodsStoryArt className="h-full w-full" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: vehicleTokens.accent }}
            >
              Goods
            </p>
            <h2 className="font-display text-3xl text-slate-900 md:text-4xl lg:text-[3rem]">
              For the things that need to move too.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 md:text-lg">
              Request suitable goods and load transport where available through
              GONA — from shops, homes, and local businesses to nearby
              destinations.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
