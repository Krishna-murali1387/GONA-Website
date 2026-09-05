import {
  vehicleTokens,
  vehicleTrustPoints,
} from "@/components/vehicle/vehicle.content";
import { Container } from "@/components/ui/container";

export function VehicleTrust() {
  return (
    <section className="border-y border-slate-200 bg-white py-10 md:py-12">
      <Container>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <p
            className="shrink-0 text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: vehicleTokens.accent }}
          >
            Along the route
          </p>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {vehicleTrustPoints.map((point, index) => (
              <li key={point} className="flex items-center gap-2">
                {index > 0 && (
                  <span
                    className="hidden h-px w-6 bg-[#C7D2FE] sm:block"
                    aria-hidden="true"
                  />
                )}
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        index === 0
                          ? vehicleTokens.yellow
                          : vehicleTokens.accent,
                    }}
                    aria-hidden="true"
                  />
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
