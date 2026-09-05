import { HealthcareAccess } from "@/components/healthcare/healthcare-access";
import { HealthcareComingSoon } from "@/components/healthcare/healthcare-coming-soon";
import { HealthcareCta } from "@/components/healthcare/healthcare-cta";
import { HealthcareFamily } from "@/components/healthcare/healthcare-family";
import { HealthcareHero } from "@/components/healthcare/healthcare-hero";
import { HealthcareJourney } from "@/components/healthcare/healthcare-journey";
import { HealthcareReferral } from "@/components/healthcare/healthcare-referral";
import { HealthcareTrust } from "@/components/healthcare/healthcare-trust";
import { HealthcareVeterinary } from "@/components/healthcare/healthcare-veterinary";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Healthcare-only premium connected-care experience.
 * Grocery and other services keep their own layouts.
 */
export function HealthcarePageExperience() {
  const content = getServicePage("healthcare");

  return (
    <article>
      <HealthcareHero />
      <HealthcareAccess />
      <HealthcareJourney />
      <HealthcareReferral />
      <HealthcareFamily />
      <HealthcareVeterinary />
      <HealthcareComingSoon />
      <HealthcareTrust />
      <HealthcareCta />
      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />
      <RelatedServices ids={content.relatedIds} currentId="healthcare" />
    </article>
  );
}
