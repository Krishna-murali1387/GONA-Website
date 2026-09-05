import { RepairCta } from "@/components/repair/repair-cta";
import { RepairHistory } from "@/components/repair/repair-history";
import { RepairHero } from "@/components/repair/repair-hero";
import { RepairIssue } from "@/components/repair/repair-issue";
import { RepairServices } from "@/components/repair/repair-services";
import { RepairTechnician } from "@/components/repair/repair-technician";
import { RepairTiming } from "@/components/repair/repair-timing";
import { RepairTransform } from "@/components/repair/repair-transform";
import { RepairVerify } from "@/components/repair/repair-verify";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Repair V2 — THE REPAIR TRANSFORM (problem → fixed).
 * Other services keep their own layouts.
 */
export function RepairPageExperience() {
  const content = getServicePage("repair");

  return (
    <article>
      <RepairHero />
      <RepairServices />
      <RepairIssue />
      <RepairTiming />
      <RepairTechnician />
      <RepairTransform />
      <RepairVerify />
      <RepairHistory />
      <RepairCta />
      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />
      <RelatedServices ids={content.relatedIds} currentId="repair" />
    </article>
  );
}
