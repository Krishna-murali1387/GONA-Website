"use client";

import { useRef } from "react";

import { GroceryBag } from "@/components/grocery/grocery-bag";
import { GroceryCategories } from "@/components/grocery/grocery-categories";
import { GroceryCta } from "@/components/grocery/grocery-cta";
import { GroceryDiscovery } from "@/components/grocery/grocery-discovery";
import { GroceryDoorstep } from "@/components/grocery/grocery-doorstep";
import { GroceryFulfilment } from "@/components/grocery/grocery-fulfilment";
import { GroceryHero } from "@/components/grocery/grocery-hero";
import { GroceryRunProgress } from "@/components/grocery/grocery-run-progress";
import { GroceryTrust } from "@/components/grocery/grocery-trust";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Grocery V3 — THE GROCERY RUN
 * Continuous premium scroll story. Other services untouched.
 */
export function GroceryPageExperience() {
  const content = getServicePage("grocery");
  const runRef = useRef<HTMLDivElement | null>(null);

  return (
    <article>
      <div ref={runRef} id="grocery-run" className="relative">
        <GroceryRunProgress targetRef={runRef} />
        <GroceryHero />
        <GroceryCategories />
        <GroceryDiscovery />
        <GroceryBag />
        <GroceryFulfilment />
        <GroceryDoorstep />
      </div>
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
