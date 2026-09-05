import { FashionBagJourney } from "@/components/fashion/fashion-bag-journey";
import { FashionCta } from "@/components/fashion/fashion-cta";
import { FashionDelivery } from "@/components/fashion/fashion-delivery";
import { FashionEditorial } from "@/components/fashion/fashion-editorial";
import { FashionHero } from "@/components/fashion/fashion-hero";
import { FashionLookBuilder } from "@/components/fashion/fashion-look-builder";
import { FashionLookbook } from "@/components/fashion/fashion-lookbook";
import { FashionOrders } from "@/components/fashion/fashion-orders";
import { FashionShowroom } from "@/components/fashion/fashion-showroom";
import { FashionTrust } from "@/components/fashion/fashion-trust";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Fashion-only interactive editorial lookbook.
 * Grocery / Healthcare / Repair / Vehicle keep their own layouts.
 */
export function FashionPageExperience() {
  const content = getServicePage("fashion");

  return (
    <article>
      <FashionHero />
      <FashionLookbook />
      <FashionShowroom />
      <FashionLookBuilder />
      <FashionEditorial />
      <FashionBagJourney />
      <FashionOrders />
      <FashionDelivery />
      <FashionTrust />
      <FashionCta />
      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />
      <RelatedServices ids={content.relatedIds} currentId="fashion" />
    </article>
  );
}
