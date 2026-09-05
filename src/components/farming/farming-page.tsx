import { FarmingCropJourney } from "@/components/farming/farming-crop-journey";
import { FarmingCta } from "@/components/farming/farming-cta";
import { FarmingField } from "@/components/farming/farming-field";
import { FarmingGuidance } from "@/components/farming/farming-guidance";
import { FarmingHero } from "@/components/farming/farming-hero";
import { FarmingInputs } from "@/components/farming/farming-inputs";
import { FarmingLocal } from "@/components/farming/farming-local";
import { FarmingSupport } from "@/components/farming/farming-support";
import {
  FarmingEmerge,
  FarmingUnderground,
} from "@/components/farming/farming-underground";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Farming-only Living Field experience.
 * Grocery / Healthcare / Repair / Vehicle / Fashion keep their own layouts.
 */
export function FarmingPageExperience() {
  const content = getServicePage("farming");

  return (
    <article>
      <FarmingHero />
      <FarmingField />
      <FarmingCropJourney />
      <FarmingGuidance />
      <FarmingInputs />
      <FarmingUnderground />
      <FarmingEmerge />
      <FarmingLocal />
      <FarmingSupport />
      <FarmingCta />
      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />
      <RelatedServices ids={content.relatedIds} currentId="farming" />
    </article>
  );
}
