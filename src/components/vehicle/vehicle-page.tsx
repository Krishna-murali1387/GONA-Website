import { VehicleBay } from "@/components/vehicle/vehicle-bay";
import { VehicleCta } from "@/components/vehicle/vehicle-cta";
import { VehicleDiscovery } from "@/components/vehicle/vehicle-discovery";
import { VehicleGoods } from "@/components/vehicle/vehicle-goods";
import { VehicleHero } from "@/components/vehicle/vehicle-hero";
import { VehicleJourney } from "@/components/vehicle/vehicle-journey";
import { VehiclePassenger } from "@/components/vehicle/vehicle-passenger";
import { VehicleSplit } from "@/components/vehicle/vehicle-split";
import { VehicleTiming } from "@/components/vehicle/vehicle-timing";
import { VehicleTrust } from "@/components/vehicle/vehicle-trust";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Vehicle-only mobility road-world experience.
 * Grocery / Healthcare / Repair keep their own layouts.
 */
export function VehiclePageExperience() {
  const content = getServicePage("vehicle-booking");

  return (
    <article>
      <VehicleHero />
      <VehicleSplit />
      <VehicleDiscovery />
      <VehicleTiming />
      <VehicleBay />
      <VehicleJourney />
      <VehiclePassenger />
      <VehicleGoods />
      <VehicleTrust />
      <VehicleCta />
      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />
      <RelatedServices ids={content.relatedIds} currentId="vehicle-booking" />
    </article>
  );
}
