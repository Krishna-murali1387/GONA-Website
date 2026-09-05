import { siteConfig } from "@/config/site.config";

/**
 * Centralized legal metadata and page content for W6.
 * Canonical source for business identity, contact, jurisdiction, and policy copy.
 */

export const legalMeta = {
  /** Display + machine-friendly last-updated source */
  lastUpdatedISO: "2026-09-04",
  brand: siteConfig.brand.name,
  /** Operating enterprise — proprietorship (not a Pvt Ltd / LLP) */
  enterpriseName: "GONA TECHNOLOGIES",
  businessStructure: "proprietorship",
  region: "Andhra Pradesh, India",
  website: siteConfig.url,
  supportEmail: siteConfig.supportEmail,
  positioning: siteConfig.brand.positioning,
  minAge: 18,
  governingLaw: "Laws of India",
  disputeCourts: "courts in Andhra Pradesh, India",
  accountDeletionTargetDays: 30,
  fashionReturnDays: 3,
} as const;

export function formatLegalDate(iso = legalMeta.lastUpdatedISO): string {
  const date = new Date(`${iso}T12:00:00.000Z`);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export const legalIdentityLine = `${legalMeta.brand} is operated by ${legalMeta.enterpriseName}, a ${legalMeta.businessStructure} based in ${legalMeta.region}.`;

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
};

export type LegalDocument = {
  slug:
    | "privacy"
    | "terms"
    | "refund-policy"
    | "shipping-delivery-policy"
    | "delete-account";
  title: string;
  navLabel: string;
  description: string;
  path: string;
  intro: string[];
  sections: LegalSection[];
};

const servicesList =
  "Grocery, Healthcare, GONA Repair, Vehicle Booking, Fashion, Farming, and LOCAL";

export const privacyDocument: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  navLabel: "Privacy Policy",
  description:
    "How GONA collects, uses, and protects information across the GONA local super-app ecosystem.",
  path: "/privacy",
  intro: [
    `This Privacy Policy explains how ${legalMeta.brand} (“GONA”, “we”, “us”) handles information in connection with the GONA mobile application and website at ${legalMeta.website}.`,
    legalIdentityLine,
    `GONA is a local super-app ecosystem — Seven Services. One GONA. — connecting ${servicesList} through one account experience.`,
    "We describe practices based on how the GONA product is designed to work. Availability of specific features may vary by location and as GONA expands.",
  ],
  sections: [
    {
      id: "information-we-collect",
      title: "1. Information we collect",
      paragraphs: [
        "Depending on how you use GONA, we may collect the categories of information below.",
      ],
      bullets: [
        "Account and authentication information — such as name, email address, and password credentials used to create and sign in to your GONA account.",
        "Profile information — such as phone number and profile photo when you choose to add or update them.",
        "Location and address information — such as village, mandal/city, pincode, and delivery or service addresses you enter; and, where you grant permission, device location to support location-dependent functionality.",
        "Order and booking information — details needed to place and fulfill grocery, fashion, and other applicable orders or bookings (for example service requests, appointments, vehicle bookings, farming requests, and related status history).",
        "Payment-related information — payment method selection, payment status, transaction/reference IDs, order linkage, refund status, and reconciliation information. Payment instruments and credentials (such as full card numbers, CVV, or UPI PIN) are processed by the applicable payment provider; GONA does not claim to store those complete credentials.",
        "Uploaded media and content — such as photos or documents you submit for profile, support, LOCAL/community, tournament, repair, farming, or other in-app flows that accept media.",
        "LOCAL and community content — information you view or submit in connection with alerts, events, offers, emergency contacts, featured businesses, tournaments, or related community features.",
        "Partner/provider information — information related to sellers, technicians, vehicle partners, healthcare participants, farming participants, delivery partners, or community partners when they participate through GONA.",
        "Device and notification information — information commonly processed through the app platform (for example push notification tokens and basic technical signals needed for authentication, security, and reliability).",
        "Support communications — messages you send to GONA support, including related contact details.",
      ],
    },
    {
      id: "how-collected",
      title: "2. How information is collected",
      paragraphs: [
        "We may collect information that you provide directly (for example during account creation, checkout, bookings, uploads, or support requests), information generated through your use of GONA (for example order status and in-app activity needed to operate the service), and information processed through service providers that help us run GONA.",
        "Where device location is used, it is requested through platform permissions. GONA is not designed to continuously track customers in the background as a default experience.",
      ],
    },
    {
      id: "how-we-use",
      title: "3. Purposes of processing",
      paragraphs: [
        "We use information to operate and improve GONA in ways that are reasonably necessary, including:",
      ],
      bullets: [
        "Creating and managing your account",
        "Providing GONA services across the seven-service ecosystem",
        "Fulfilling orders, bookings, and service requests",
        "Showing relevant local availability based on your selected area and addresses",
        "Enabling delivery, partner, and provider workflows where applicable",
        "Processing payments and refunds through authorized providers",
        "Sending service-related notifications (for example order, booking, or refund updates)",
        "Providing customer support",
        "Protecting security, preventing fraud or misuse, and enforcing platform rules",
        "Meeting legal, tax, accounting, and dispute-resolution needs",
        "Improving product reliability and user experience",
      ],
    },
    {
      id: "location",
      title: "4. Location information",
      paragraphs: [
        "GONA is location-sensitive because service availability and local experiences depend on where you are and which area you select.",
        "GONA may use saved addresses and, where you permit, device location to support location-dependent functionality such as local availability, weather context, delivery tracking, or partner operations.",
        "GONA does not claim continuous customer background GPS tracking as a default product behavior.",
      ],
    },
    {
      id: "payments",
      title: "5. Payments and payment providers",
      paragraphs: [
        "Where online payment is available, payments may be processed by authorized payment providers such as Razorpay.",
        "Payment instruments and credentials are processed by the applicable payment provider. GONA may retain transaction-related information such as payment status, transaction/reference IDs, order linkage, refund status, and reconciliation information as reasonably necessary.",
        "Cash on Delivery may be offered for certain product orders where supported in the ordering experience.",
      ],
    },
    {
      id: "third-parties",
      title: "6. Service providers and third parties",
      paragraphs: [
        "GONA uses trusted infrastructure and platform providers to operate the product. Depending on the feature, this may include:",
      ],
      bullets: [
        "Supabase — backend, authentication, database, and file-storage infrastructure",
        "Razorpay — payment processing where online payments apply",
        "Expo — application runtime and push-notification infrastructure where applicable",
        "Google Maps / mapping-location services — maps, geocoding, and location-related display where used",
      ],
      note: "These providers may process information according to their own privacy practices. Their involvement does not mean they endorse GONA.",
    },
    {
      id: "sharing",
      title: "7. Sharing of information",
      paragraphs: [
        "We may share information with:",
      ],
      bullets: [
        "Service providers and infrastructure partners who help us operate GONA",
        "Local partners, providers, sellers, technicians, or delivery partners as needed to fulfill your order, booking, or service request",
        "Authorities when required by law or to protect rights, safety, and security",
      ],
      note: "We do not sell your personal information.",
    },
    {
      id: "retention",
      title: "8. Data retention",
      paragraphs: [
        "GONA retains personal information only for as long as reasonably necessary for service delivery, account administration, transaction records, legal obligations, tax/accounting, payments, security and fraud prevention, dispute handling, and regulatory requirements.",
        "When information is no longer reasonably necessary, it may be deleted or anonymized as appropriate, subject to applicable law and legitimate retention requirements.",
        "Exact fixed retention periods are not published for every data category because retention needs can vary by record type and legal obligation.",
      ],
    },
    {
      id: "security",
      title: "9. Security",
      paragraphs: [
        "We use reasonable technical and organizational measures designed to protect information. No method of transmission or storage is completely secure, and we do not claim absolute or certified “100% secure” protection.",
      ],
    },
    {
      id: "deletion",
      title: "10. Account deletion",
      paragraphs: [
        `You may request deletion of your GONA account by emailing ${legalMeta.supportEmail}. See our Account Deletion page for the current process, verification steps, and the target timeline of ${legalMeta.accountDeletionTargetDays} days after a valid request.`,
        "Some records may still need to be retained where reasonably necessary or legally required (for example tax/accounting, payment records, fraud/security, dispute resolution, or regulatory obligations).",
      ],
    },
    {
      id: "your-choices",
      title: "11. Your rights and requests",
      paragraphs: [
        "Subject to applicable law, you may contact us regarding access to or correction of account information, privacy questions, or deletion requests.",
        `Email: ${legalMeta.supportEmail}`,
        "Please do not send passwords, OTPs, payment PINs, Aadhaar, PAN, or full card details by email.",
      ],
    },
    {
      id: "children",
      title: "12. Children and minors",
      paragraphs: [
        `Users must generally be at least ${legalMeta.minAge} years old to independently create and use a GONA account.`,
        "Where legally appropriate, minors may access relevant services only through or under the responsibility/supervision of a parent or legal guardian. This does not mean minors may independently enter contracts, make regulated transactions, or access age-restricted services.",
        "If you believe a child has provided personal information inappropriately, contact us and we will review the concern.",
      ],
    },
    {
      id: "changes",
      title: "13. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will change when we do. Continued use of GONA after an update means you should review the revised policy.",
      ],
    },
    {
      id: "contact",
      title: "14. Contact",
      paragraphs: [
        `Privacy questions: ${legalMeta.supportEmail}`,
        `Website: ${legalMeta.website}`,
        `Geographic identification: ${legalMeta.region}`,
      ],
    },
  ],
};

export const termsDocument: LegalDocument = {
  slug: "terms",
  title: "Terms & Conditions",
  navLabel: "Terms & Conditions",
  description:
    "Terms governing use of the GONA local super-app ecosystem and related website.",
  path: "/terms",
  intro: [
    `These Terms & Conditions (“Terms”) govern your access to and use of GONA services through the GONA app and website (${legalMeta.website}).`,
    legalIdentityLine,
    "By creating an account or using GONA, you agree to these Terms. If you do not agree, do not use GONA.",
  ],
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      paragraphs: [
        "These Terms form a binding agreement between you and GONA TECHNOLOGIES operating GONA. Additional in-app notices, order confirmations, or service-specific terms may also apply to a particular transaction.",
      ],
    },
    {
      id: "eligibility",
      title: "2. Eligibility (18+)",
      paragraphs: [
        `You must generally be at least ${legalMeta.minAge} years old to independently create and use a GONA account.`,
        "Where legally appropriate, minors may access relevant services only through or under the responsibility/supervision of a parent or legal guardian. Minors may not independently enter contracts, make regulated transactions, or access age-restricted services through GONA.",
      ],
    },
    {
      id: "account",
      title: "3. Accounts and security",
      paragraphs: [
        "You are responsible for providing accurate account information and for keeping your login credentials secure.",
        "You are responsible for activity that occurs under your account, except where unauthorized access results from a security issue outside your reasonable control that you promptly report to us.",
        "You must use GONA only for lawful purposes and in accordance with these Terms.",
      ],
    },
    {
      id: "hybrid-model",
      title: "4. Hybrid platform model",
      paragraphs: [
        "GONA is a hybrid platform. Depending on the particular service or order:",
      ],
      bullets: [
        "GONA TECHNOLOGIES may directly sell or provide the product or service; or",
        "An independent shop, professional, technician, vehicle provider, healthcare provider, farming provider, organizer, or other partner may sell or provide the product or service through GONA.",
      ],
      note: "Where relevant, the applicable seller or service provider should be identifiable through the transaction or order information. Partner businesses and providers remain responsible for obligations that legally apply to them. GONA remains responsible for obligations legally applicable to GONA. These Terms do not use blanket liability waivers.",
    },
    {
      id: "ecosystem",
      title: "5. Seven-service ecosystem",
      paragraphs: [
        `Official customer services include ${servicesList}. LOCAL is the seventh official GONA service. Preferred positioning: Seven Services. One GONA.`,
        "GONA may also enable participation by partners such as sellers, healthcare providers, repair technicians, vehicle partners, farming partners, delivery partners, and local businesses or community organizers. Partner participation is separate from the seven customer services.",
        "Feature availability can depend on your location and on what is currently offered in your area. The ordering, booking, and fulfillment experience in the app controls what is available for a specific request.",
      ],
    },
    {
      id: "orders-payments",
      title: "6. Orders, bookings, pricing, and payments",
      paragraphs: [
        "When you place an order or booking, you agree to provide accurate details and to pay applicable amounts shown in the app experience.",
        "Prices, taxes, fees, delivery charges, platform charges, or other applicable charges should be displayed as applicable to the specific transaction. Where legally required, appropriate tax or invoice information will be provided according to applicable law.",
        "Online payments may be processed by authorized payment providers such as Razorpay. Cash on Delivery may be available for certain product orders where offered.",
        "Cancellation and refund handling is described in our Cancellation & Refund Policy. Shipping and delivery for physical goods is described in our Shipping / Delivery Policy.",
      ],
    },
    {
      id: "healthcare",
      title: "7. Healthcare safeguards",
      paragraphs: [
        "GONA Healthcare features are intended to help you discover and connect with healthcare-related experiences in your community.",
        "GONA does not replace professional medical advice, diagnosis, or treatment. Do not disregard medical advice or delay seeking care because of information in the app or on the website.",
        "GONA does not guarantee doctor availability, medicine availability, clinical outcomes, or emergency response. In an emergency, contact local emergency services immediately.",
      ],
    },
    {
      id: "vehicle",
      title: "8. Vehicle Booking",
      paragraphs: [
        "Vehicle Booking connects journeys and vehicle partners through GONA. Availability, timing, and pricing depend on the specific booking experience shown in the app.",
        "GONA does not guarantee drivers, fleet inventory, or arrival times on this website.",
      ],
    },
    {
      id: "local",
      title: "9. LOCAL, community, and tournaments",
      paragraphs: [
        "LOCAL may include community information such as tournaments, events, local alerts, emergency contacts, local offers, and featured businesses.",
        "Community information may be supplied or updated by organizers, businesses, administrators, or other participants. Content can change and may not always be complete or current.",
        "Emergency contact listings are informational aids and do not replace official emergency services.",
        "Paid tournament registrations are subject to the Cancellation & Refund Policy.",
      ],
    },
    {
      id: "providers",
      title: "10. Partner and provider responsibilities",
      paragraphs: [
        "Where an independent partner provides goods or services, that party is responsible for the quality and performance of what they supply, subject to remedies available through GONA and applicable law.",
        "GONA works to operate a trustworthy platform experience, including support and operational workflows, but does not guarantee the conduct of every independent participant.",
      ],
    },
    {
      id: "content",
      title: "11. User-submitted content",
      paragraphs: [
        "If you submit content (for example photos, text, listings, or community information), you confirm you have the rights to submit it and that it does not violate law or third-party rights.",
        "You must not submit unlawful, harmful, misleading, infringing, or abusive content. GONA may remove or restrict content that violates these Terms or creates risk for users or the platform.",
      ],
    },
    {
      id: "prohibited",
      title: "12. Acceptable use and prohibited misuse",
      paragraphs: [
        "You agree not to:",
      ],
      bullets: [
        "Attempt unauthorized access to accounts, systems, or data",
        "Interfere with platform security, payments, or fulfillment workflows",
        "Use GONA for fraud, scams, or illegal activity",
        "Harass others or misuse LOCAL/community features",
        "Misrepresent your identity, business, or credentials",
      ],
    },
    {
      id: "availability",
      title: "13. Service availability",
      paragraphs: [
        "GONA services may be unavailable, delayed, or limited due to location coverage, partner availability, maintenance, network issues, or events outside reasonable control.",
        "Estimated delivery or service times shown in GONA are estimates, not universal guarantees, and can vary due to distance, availability, preparation, traffic, weather, demand, and operational conditions.",
        "We may update, suspend, or discontinue features as the product evolves.",
      ],
    },
    {
      id: "ip",
      title: "14. Intellectual property",
      paragraphs: [
        "GONA branding, logos, product design, and related materials are owned by GONA TECHNOLOGIES or its licensors. You may not copy or use them except as needed to use the service or with prior permission.",
      ],
    },
    {
      id: "account-actions",
      title: "15. Suspension and termination",
      paragraphs: [
        "We may suspend or restrict access where reasonably necessary to address misuse, fraud risk, legal requirements, or serious Terms violations. Where practical, we will provide information about how to contact support.",
        `You may request account deletion as described on the Account Deletion page and by emailing ${legalMeta.supportEmail}.`,
      ],
    },
    {
      id: "disclaimers",
      title: "16. Disclaimers",
      paragraphs: [
        "GONA is provided on an “as available” basis. To the fullest extent permitted by law, we disclaim warranties that are not expressly stated in these Terms.",
        "Nothing in these Terms excludes rights that cannot be limited under applicable law, including mandatory consumer rights.",
      ],
    },
    {
      id: "liability",
      title: "17. Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by applicable law, GONA is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.",
        "Our aggregate liability for claims relating to the service is limited to amounts you paid to GONA for the specific transaction giving rise to the claim during the three months before the claim, or another minimum amount required by applicable law if higher.",
        "These limitations apply only to the extent permitted by law and do not override mandatory consumer protections.",
      ],
    },
    {
      id: "indemnity",
      title: "18. Indemnity",
      paragraphs: [
        "To the extent permitted by applicable law, you agree to indemnify GONA TECHNOLOGIES against reasonable losses arising from your unlawful misuse of GONA, your submitted content that infringes third-party rights, or your material breach of these Terms, except to the extent caused by GONA’s own unlawful conduct.",
      ],
    },
    {
      id: "governing-law",
      title: "19. Governing law and disputes",
      paragraphs: [
        `These Terms are governed by the ${legalMeta.governingLaw}.`,
        `Subject to mandatory consumer rights and any jurisdiction that applicable law requires, disputes may be brought before appropriate ${legalMeta.disputeCourts}.`,
        "Nothing in this section attempts to eliminate consumer-forum rights or other protections that cannot lawfully be waived.",
      ],
    },
    {
      id: "changes-terms",
      title: "20. Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. The “Last updated” date will change when we do. Material changes may also be communicated through the app or website where appropriate.",
      ],
    },
    {
      id: "contact",
      title: "21. Contact",
      paragraphs: [
        `Questions about these Terms: ${legalMeta.supportEmail}`,
        `Geographic identification: ${legalMeta.region}`,
      ],
    },
  ],
};

export const refundDocument: LegalDocument = {
  slug: "refund-policy",
  title: "Cancellation & Refund Policy",
  navLabel: "Cancellation & Refund Policy",
  description:
    "Service-specific cancellation and refund rules for the GONA ecosystem.",
  path: "/refund-policy",
  intro: [
    "This policy explains cancellation and refund handling across GONA. Because GONA includes different service types, rules are not identical for every experience.",
    legalIdentityLine,
    "Where the app shows order- or booking-specific cancellation options, those in-app controls and statuses remain important for a specific request.",
    "This policy does not remove statutory consumer rights relating to defective goods, damaged goods, incorrect products, failed services, duplicate charges, or other legally mandated remedies.",
  ],
  sections: [
    {
      id: "general",
      title: "1. General principles",
      paragraphs: [
        "Cancellations are generally available only while an order or booking remains in an eligible early stage. After fulfillment has materially begun or completed, cancellation or refund eligibility may change.",
        "GONA does not use a blanket “no refunds” policy. Certain transactions may become non-refundable once fulfillment has materially begun or completed, subject to the service rules below and applicable law.",
        "Approved refunds will be initiated as soon as reasonably possible. After GONA or the payment provider initiates a refund, final credit timing can depend on the payment provider, bank, card network, UPI/payment method, or other financial-institution processing. GONA does not control bank processing time.",
      ],
    },
    {
      id: "failed-partial",
      title: "2. Failed or partial fulfillment",
      paragraphs: [
        "If an order or service cannot be fulfilled, is only partially fulfilled, has unavailable items, is incorrectly charged, or fails for another verified reason, GONA may provide an appropriate full or partial refund for the affected amount after verification.",
        "A refund will not exceed the amount actually paid for the affected transaction or portion.",
      ],
    },
    {
      id: "grocery",
      title: "3. Grocery",
      paragraphs: [
        "Customers may cancel a Grocery order while it remains in an eligible early fulfillment stage.",
        "Once preparation, packing, dispatch, or other material fulfillment has begun, cancellation may no longer be available.",
        "GONA does not promise a universal fixed grocery cancellation clock (for example 5 or 10 minutes), because fulfillment timing can vary.",
        "For eligible prepaid cancellations, an applicable refund may be initiated through the original or applicable payment process.",
        "Consumed or perishable products generally cannot be returned merely due to change of mind, subject to defective, wrong, or damaged items and applicable law.",
      ],
    },
    {
      id: "fashion",
      title: "4. Fashion",
      paragraphs: [
        `Fashion / shopping orders may be cancelled while they remain in eligible early statuses shown in the app.`,
        `After delivery, Fashion may support a return request within ${legalMeta.fashionReturnDays} days after delivery, reflecting the currently configured product behavior.`,
        "Returns remain subject to applicable eligibility requirements, such as product condition and category restrictions. Not every Fashion product is automatically returnable.",
        "Statutory consumer rights are preserved.",
      ],
    },
    {
      id: "healthcare",
      title: "5. Healthcare",
      paragraphs: [
        "Cancellation may generally be allowed before the consultation or healthcare service begins, subject to applicable provider or service terms.",
        "Once a consultation or healthcare service has begun or been completed, it is generally non-refundable.",
        "Exceptions may include appropriate verified situations such as service failure, duplicate payment, incorrect charge, inability to provide the booked service, or another legally required or approved case.",
        "GONA does not provide medical guarantees and does not publish an unverified fixed “2-hour cancellation” rule.",
      ],
    },
    {
      id: "vehicle",
      title: "6. Vehicle Booking",
      paragraphs: [
        "Vehicle bookings may generally be cancelled before the trip or service starts.",
        "For advance or prepaid bookings, refund eligibility may depend on booking status, whether a vehicle or provider was already confirmed, whether fulfillment costs were already incurred, and the circumstances of cancellation.",
        "GONA does not advertise a fixed vehicle cancellation fee because one has not been finalized as a public schedule.",
        "Once a trip or service has started, payment is generally non-refundable except for genuine service failure, incorrect or duplicate charge, legally required cases, or another approved case.",
      ],
    },
    {
      id: "repair-farming",
      title: "7. GONA Repair & Farming",
      paragraphs: [
        "Before work or service begins, cancellation may be allowed.",
        "After work begins, refund eligibility may depend on work already performed, technician or provider time, parts or materials already used or procured, and other genuine fulfillment costs.",
        "After completed service, transactions are generally non-refundable except appropriate verified cases such as genuine service failure, duplicate payment, incorrect charge, or a legally required remedy.",
        "GONA does not invent fixed refund percentages for Repair or Farming.",
      ],
    },
    {
      id: "local",
      title: "8. LOCAL / tournament payments",
      paragraphs: [
        "For paid tournament registrations: once registration or payment has been verified or confirmed and a player or team slot has been reserved, voluntary withdrawal is generally non-refundable.",
        "Possible exceptions include tournament cancelled by organizer/GONA, duplicate payment, incorrect charge, confirmed registration that cannot be fulfilled, a legally required remedy, or another approved genuine case.",
        "Not every tournament payment is refundable, and not every tournament payment is absolutely non-refundable regardless of circumstances.",
      ],
    },
    {
      id: "how-to-request",
      title: "9. How to get help",
      paragraphs: [
        "First check the order or booking screen in the GONA app for available cancel/return actions.",
        `If you need help, email ${legalMeta.supportEmail} with your registered email, order/booking reference, and a short description of the issue.`,
        "Do not include passwords, OTPs, or full card details in email.",
      ],
    },
  ],
};

export const shippingDocument: LegalDocument = {
  slug: "shipping-delivery-policy",
  title: "Shipping / Delivery Policy",
  navLabel: "Shipping / Delivery Policy",
  description:
    "How delivery works for GONA physical goods versus non-shipping service bookings.",
  path: "/shipping-delivery-policy",
  intro: [
    "This policy covers GONA experiences that involve physical goods or local order fulfillment. Not every GONA service is a shipped-product service.",
    legalIdentityLine,
  ],
  sections: [
    {
      id: "scope",
      title: "1. Scope",
      paragraphs: [
        "Physical goods delivery may apply to Grocery, Fashion, and other eligible products offered through GONA.",
        "Non-shipping / service categories include Healthcare consultations or services, GONA Repair, Vehicle Booking, Farming services, and LOCAL community or tournament functionality where applicable.",
        "Service bookings are fulfilled through appointments, visits, journeys, or community participation — they are not described as physically “shipped.”",
      ],
    },
    {
      id: "availability",
      title: "2. Service area and availability",
      paragraphs: [
        "Delivery and service availability can depend on your selected location and on what is currently available nearby. Availability may change as GONA expands.",
        "GONA does not promise nationwide delivery or a fixed delivery radius on this website.",
      ],
    },
    {
      id: "delivery-info",
      title: "3. Delivery information you provide",
      paragraphs: [
        "You are responsible for providing accurate delivery or service address details, including reachable phone contact information where requested.",
        "Incorrect or incomplete address information can delay or prevent successful delivery.",
      ],
    },
    {
      id: "timing-charges",
      title: "4. Timing and charges",
      paragraphs: [
        "Estimated delivery or service times may be displayed in GONA. These are estimates, not universal guarantees.",
        "Estimates can vary due to distance, product or service availability, partner preparation, traffic, weather, demand, operational conditions, and circumstances outside reasonable control.",
        "GONA does not legally guarantee “30-minute delivery” or any other universal delivery time on this website.",
        "Prices, taxes, fees, delivery charges, platform charges, or other applicable charges should be displayed as applicable to the specific transaction.",
      ],
    },
    {
      id: "fulfillment",
      title: "5. Fulfillment and status",
      paragraphs: [
        "Order or service status may be available in GONA. Where delivery partners are involved, progress updates may be shown while an order is out for delivery.",
        "If you are unavailable at the delivery point, follow any in-app instructions or contact support so the delivery attempt can be handled appropriately.",
      ],
    },
    {
      id: "failed",
      title: "6. Failed or partial fulfillment",
      paragraphs: [
        "Failed, partial, unavailable-item, or incorrect-charge situations are handled under the Cancellation & Refund Policy after verification.",
      ],
    },
    {
      id: "issues",
      title: "7. Delivery issues",
      paragraphs: [
        `If a delivery is delayed, missing, or incorrect, check the order status in the app and contact ${legalMeta.supportEmail} with your order reference.`,
      ],
    },
  ],
};

export const deleteAccountDocument: LegalDocument = {
  slug: "delete-account",
  title: "Delete Your GONA Account",
  navLabel: "Account Deletion",
  description:
    "How to request deletion of your GONA account and related personal data.",
  path: "/delete-account",
  intro: [
    "This page explains how to request deletion of your GONA account.",
    legalIdentityLine,
    "GONA currently processes account deletion through a support request. There is no verified in-app one-tap deletion control published as a self-serve website action, so this page does not offer a fake “Delete Now” button.",
  ],
  sections: [
    {
      id: "how-to-request",
      title: "1. How to request deletion",
      paragraphs: [
        `Email ${legalMeta.supportEmail} from the email address associated with your GONA account.`,
        "Use the subject line: GONA Account Deletion Request",
      ],
      bullets: [
        "The email address registered with GONA",
        "A clear statement that you want your GONA account deleted",
        "Your full name as shown on the account (helpful for verification)",
      ],
      note: "Do not send passwords, OTP codes, payment PINs, Aadhaar, PAN, or full card details.",
    },
    {
      id: "verification",
      title: "2. Verification",
      paragraphs: [
        "We may ask for limited additional information to verify that you own the account before processing deletion. This helps protect users from unauthorized deletion requests.",
      ],
    },
    {
      id: "timeline",
      title: "3. Processing timeline",
      paragraphs: [
        `Target processing: within ${legalMeta.accountDeletionTargetDays} days after a valid request and any reasonably necessary identity or security verification.`,
      ],
    },
    {
      id: "what-deletion-means",
      title: "4. What is deleted or anonymized",
      paragraphs: [
        "When an account deletion request is processed, GONA will work to remove or deactivate account access and associated personal profile data that is no longer needed to provide the service.",
        "Categories that may be deleted or anonymized as appropriate can include account credentials/access, profile details no longer required, and personal identifiers that are not subject to legitimate retention needs.",
      ],
    },
    {
      id: "retention",
      title: "5. What may be retained",
      paragraphs: [
        "Certain records may need to be retained where reasonably necessary or legally required for tax/accounting, payment records, fraud/security, dispute resolution, or regulatory/legal obligations.",
        "GONA does not claim immediate destruction of every database record in all cases.",
      ],
    },
    {
      id: "after-you-request",
      title: "6. After you request",
      paragraphs: [
        "After we receive a valid request, our support team will confirm next steps by email.",
        "Once deletion is completed, you may lose access to your GONA account and in-app history tied to that account.",
      ],
    },
    {
      id: "contact",
      title: "7. Contact",
      paragraphs: [
        `Account deletion and privacy requests: ${legalMeta.supportEmail}`,
        `Website: ${legalMeta.website}`,
        `Geographic identification: ${legalMeta.region}`,
      ],
    },
  ],
};

export const legalDocuments = [
  privacyDocument,
  termsDocument,
  refundDocument,
  shippingDocument,
  deleteAccountDocument,
] as const;

export function getLegalDocument(
  slug: LegalDocument["slug"],
): LegalDocument {
  const doc = legalDocuments.find((d) => d.slug === slug);
  if (!doc) {
    throw new Error(`Unknown legal document: ${slug}`);
  }
  return doc;
}
