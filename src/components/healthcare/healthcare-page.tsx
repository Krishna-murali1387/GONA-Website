"use client";

import { useRef } from "react";

import { HealthcareBookingTime } from "@/components/healthcare/healthcare-booking-time";
import { CareThreadProgress } from "@/components/healthcare/healthcare-care-thread";
import { HealthcareConsultation } from "@/components/healthcare/healthcare-consultation";
import { HealthcareConvergence } from "@/components/healthcare/healthcare-convergence";
import { HealthcareFamily } from "@/components/healthcare/healthcare-family";
import { HealthcareFuture } from "@/components/healthcare/healthcare-future";
import { HealthcareHero } from "@/components/healthcare/healthcare-hero";
import { HealthcareHistory } from "@/components/healthcare/healthcare-history";
import { HealthcareMedication } from "@/components/healthcare/healthcare-medication";
import { HealthcareNearbyCare } from "@/components/healthcare/healthcare-nearby-care";
import { HealthcarePrescription } from "@/components/healthcare/healthcare-prescription";
import { HealthcareReferral } from "@/components/healthcare/healthcare-referral";
import { HealthcareVeterinary } from "@/components/healthcare/healthcare-veterinary";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";
import { getServicePage } from "@/config/services.content";

/**
 * Healthcare V2 — THE CARE THREAD
 * Continuous connected-care storytelling. Grocery and other services untouched.
 */
export function HealthcarePageExperience() {
  const content = getServicePage("healthcare");
  const runRef = useRef<HTMLDivElement | null>(null);

  return (
    <article>
      <div ref={runRef} id="care-thread" className="relative">
        <CareThreadProgress targetRef={runRef} />
        <HealthcareHero />
        <HealthcareNearbyCare />
        <HealthcareBookingTime />
        <HealthcareConsultation />
        <HealthcarePrescription />
        <HealthcareMedication />
        <HealthcareReferral />
        <HealthcareHistory />
        <HealthcareFamily />
        <HealthcareVeterinary />
        <HealthcareFuture />
      </div>
      <HealthcareConvergence />
      <PartnerConnection
        partnerId={content.partnerId}
        heading={content.partnerHeading}
        body={content.partnerBody}
      />
      <RelatedServices ids={content.relatedIds} currentId="healthcare" />
    </article>
  );
}
