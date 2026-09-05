import { GroceryCategories } from "@/components/grocery/grocery-categories";
import { GroceryCta } from "@/components/grocery/grocery-cta";
import { GroceryDiscovery } from "@/components/grocery/grocery-discovery";
import { GroceryHero } from "@/components/grocery/grocery-hero";
import { GroceryJourney } from "@/components/grocery/grocery-journey";
import { GroceryTracking } from "@/components/grocery/grocery-tracking";
import { GroceryTrust } from "@/components/grocery/grocery-trust";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Grocery-only premium storytelling experience.
 * Other service pages keep the shared ServiceDetailLayout.
 */
export function GroceryPageExperience() {
  const content = getServicePage("grocery");

  return (
    <article>
      <GroceryHero />
      <GroceryCategories />
      <GroceryDiscovery />
      <GroceryJourney />
      <GroceryTracking />
      <GroceryTrust />
      <GroceryCta />
      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />
      <RelatedServices ids={content.relatedIds} currentId="grocery" />
    </article>
  );
}
