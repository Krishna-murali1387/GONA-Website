import { vehicleTokens } from "@/components/vehicle/vehicle.content";
import { PassengerStoryArt } from "@/components/vehicle/vehicle-visuals";
import { Container } from "@/components/ui/container";

export function VehiclePassenger() {
  return (
    <section className="bg-[#FFF7ED] py-24 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <p
              className="mb-3 text-xs font-semibold tracking-[0.18em] uppercase"
              style={{ color: vehicleTokens.accent }}
            >
              Passenger
            </p>
            <h2 className="font-display text-3xl text-slate-900 md:text-4xl lg:text-[3rem]">
              For the journeys that move people.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 md:text-lg">
              Everyday passenger travel — home to town, local destinations, and
              the trips that keep life moving — where passenger vehicles are
              available around you.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem]">
            <div className="aspect-[1000/460] min-h-[16rem] w-full md:min-h-[22rem] lg:min-h-[26rem]">
              <PassengerStoryArt className="h-full w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
