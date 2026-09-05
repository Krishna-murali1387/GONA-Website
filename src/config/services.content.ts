import type { ServiceId } from "@/config/site.config";
import type { PartnerId } from "@/config/partners.content";

export type ServiceCapability = {
  title: string;
  body: string;
};

export type ServiceHowStep = {
  n: string;
  title: string;
  body: string;
};

export type ServicePageContent = {
  id: Exclude<ServiceId, "local">;
  eyebrow: string;
  heroPrimary: string;
  heroAccent: string;
  intro: string;
  aboutTitle: string;
  aboutBody: string;
  capabilitiesTitle: string;
  capabilities: ServiceCapability[];
  howTitle: string;
  howSteps: ServiceHowStep[];
  partnerId: PartnerId;
  partnerHeading: string;
  partnerBody: string;
  relatedIds: ServiceId[];
  visual: "grocery" | "healthcare" | "repair" | "vehicle" | "fashion" | "farming";
  metaDescription: string;
};

export const servicePages: Record<
  Exclude<ServiceId, "local">,
  ServicePageContent
> = {
  grocery: {
    id: "grocery",
    eyebrow: "Grocery",
    heroPrimary: "Everyday Essentials.",
    heroAccent: "Closer to You.",
    intro:
      "GONA Grocery brings everyday essentials into the same local ecosystem as your other GONA services.",
    aboutTitle: "What GONA Grocery is",
    aboutBody:
      "Grocery is the essentials-shopping part of GONA — helping you discover and manage everyday needs through one trusted account, connected to your local area.",
    capabilitiesTitle: "Core experience",
    capabilities: [
      {
        title: "Everyday essentials",
        body: "Browse daily needs as part of your connected GONA experience.",
      },
      {
        title: "Grocery discovery",
        body: "Explore essentials through a simple local shopping journey.",
      },
      {
        title: "Cart & order flow",
        body: "Move from browsing to checkout inside the GONA app experience.",
      },
      {
        title: "Local fulfillment concept",
        body: "Orders are designed around nearby availability as GONA expands.",
      },
    ],
    howTitle: "How it works",
    howSteps: [
      {
        n: "01",
        title: "Choose your location",
        body: "GONA uses your area to understand what can be offered nearby.",
      },
      {
        n: "02",
        title: "Explore essentials",
        body: "Browse grocery needs within the GONA Grocery experience.",
      },
      {
        n: "03",
        title: "Complete your order",
        body: "Follow the in-app journey to place and track your order.",
      },
    ],
    partnerId: "delivery",
    partnerHeading: "Interested in delivering with GONA?",
    partnerBody:
      "Delivery partners help move everyday essentials through the GONA ecosystem.",
    relatedIds: ["fashion", "farming", "local"],
    visual: "grocery",
    metaDescription:
      "GONA Grocery — everyday essentials closer to you, connected through one local ecosystem.",
  },
  healthcare: {
    id: "healthcare",
    eyebrow: "Healthcare",
    heroPrimary: "Healthcare.",
    heroAccent: "Closer to Your Community.",
    intro:
      "GONA Healthcare connects community health needs into one responsible local ecosystem experience.",
    aboutTitle: "What GONA Healthcare is",
    aboutBody:
      "Healthcare is the health-support part of GONA — helping people discover and access community healthcare experiences through one account, without replacing professional medical judgment.",
    capabilitiesTitle: "Core experience",
    capabilities: [
      {
        title: "Healthcare discovery",
        body: "Explore healthcare-related support connected to your local area.",
      },
      {
        title: "Pharmacy access concept",
        body: "Medicine and pharmacy pathways designed as part of the broader ecosystem.",
      },
      {
        title: "Consultation ecosystem",
        body: "Connect with healthcare experiences through GONA where available.",
      },
      {
        title: "Broader care support",
        body: "Includes community-oriented health pathways, with veterinary support considered where applicable.",
      },
    ],
    howTitle: "How it works",
    howSteps: [
      {
        n: "01",
        title: "Set your location",
        body: "GONA understands healthcare-related options around your area.",
      },
      {
        n: "02",
        title: "Choose what you need",
        body: "Explore healthcare pathways inside the GONA experience.",
      },
      {
        n: "03",
        title: "Get connected",
        body: "Access the relevant local healthcare experience through GONA.",
      },
    ],
    partnerId: "healthcare",
    partnerHeading: "Healthcare providers and partners",
    partnerBody:
      "Relevant healthcare providers and businesses can participate in the GONA Healthcare ecosystem.",
    relatedIds: ["grocery", "local", "repair"],
    visual: "healthcare",
    metaDescription:
      "GONA Healthcare — community healthcare support closer to you, connected through one ecosystem.",
  },
  repair: {
    id: "repair",
    eyebrow: "GONA Repair",
    heroPrimary: "When Things Need Fixing.",
    heroAccent: "Find Local Help.",
    intro:
      "GONA Repair helps you discover local technician and repair support through the same GONA ecosystem.",
    aboutTitle: "What GONA Repair is",
    aboutBody:
      "Repair is the local service-and-fix part of GONA — connecting everyday repair needs with technicians and service professionals in your area.",
    capabilitiesTitle: "Core experience",
    capabilities: [
      {
        title: "Technician discovery",
        body: "Find local repair and service support through GONA.",
      },
      {
        title: "Electrical & plumbing needs",
        body: "Explore common home-service categories where supported.",
      },
      {
        title: "Appliance & home support",
        body: "Request help for everyday household service needs.",
      },
      {
        title: "Local service connection",
        body: "Stay inside one GONA account while accessing repair experiences.",
      },
    ],
    howTitle: "How it works",
    howSteps: [
      {
        n: "01",
        title: "Describe what needs fixing",
        body: "Start from your location and the type of help you need.",
      },
      {
        n: "02",
        title: "Explore local support",
        body: "Browse relevant technician and service pathways in GONA.",
      },
      {
        n: "03",
        title: "Get connected",
        body: "Connect with the relevant local repair experience through GONA.",
      },
    ],
    partnerId: "repair",
    partnerHeading: "Are you a technician?",
    partnerBody:
      "Repair technicians and service professionals can participate through GONA Repair.",
    relatedIds: ["vehicle-booking", "local", "grocery"],
    visual: "repair",
    metaDescription:
      "GONA Repair — find local help when things need fixing, connected through one ecosystem.",
  },
  "vehicle-booking": {
    id: "vehicle-booking",
    eyebrow: "Vehicle Booking",
    heroPrimary: "The Right Vehicle.",
    heroAccent: "For Your Journey.",
    intro:
      "Vehicle Booking helps you discover the right vehicle experience for local journeys through GONA.",
    aboutTitle: "What Vehicle Booking is",
    aboutBody:
      "Vehicle Booking is the mobility part of GONA — helping people explore vehicle options for everyday journeys inside one connected local ecosystem.",
    capabilitiesTitle: "Core experience",
    capabilities: [
      {
        title: "Journey discovery",
        body: "Explore vehicle booking as part of your GONA experience.",
      },
      {
        title: "Local mobility",
        body: "Designed around nearby travel needs and local routes.",
      },
      {
        title: "Vehicle options",
        body: "Different journey needs can be supported as the ecosystem expands.",
      },
      {
        title: "Connected booking flow",
        body: "Stay inside one GONA account from discovery to booking.",
      },
    ],
    howTitle: "How it works",
    howSteps: [
      {
        n: "01",
        title: "Set your journey",
        body: "Start with your location and where you need to go.",
      },
      {
        n: "02",
        title: "Explore vehicle options",
        body: "Browse vehicle booking pathways available through GONA.",
      },
      {
        n: "03",
        title: "Book through GONA",
        body: "Complete your journey booking inside the connected app experience.",
      },
    ],
    partnerId: "vehicle",
    partnerHeading: "Drive or list your vehicle with GONA",
    partnerBody:
      "Vehicle partners help power local journeys through the GONA Vehicle Booking experience.",
    relatedIds: ["repair", "local", "farming"],
    visual: "vehicle",
    metaDescription:
      "GONA Vehicle Booking — find the right vehicle for your journey through one local ecosystem.",
  },
  fashion: {
    id: "fashion",
    eyebrow: "Fashion",
    heroPrimary: "Style.",
    heroAccent: "Closer to Home.",
    intro:
      "GONA Fashion brings local style discovery into the same ecosystem as your everyday services.",
    aboutTitle: "What GONA Fashion is",
    aboutBody:
      "Fashion is the style-and-apparel part of GONA — helping people discover clothing, footwear and accessories through a local digital experience.",
    capabilitiesTitle: "Core experience",
    capabilities: [
      {
        title: "Local style discovery",
        body: "Explore fashion closer to your community through GONA.",
      },
      {
        title: "Apparel & footwear",
        body: "Browse everyday style categories in one connected journey.",
      },
      {
        title: "Accessories",
        body: "Discover complementary fashion needs alongside apparel.",
      },
      {
        title: "Connected shopping",
        body: "Shop fashion without leaving the broader GONA ecosystem.",
      },
    ],
    howTitle: "How it works",
    howSteps: [
      {
        n: "01",
        title: "Choose your area",
        body: "GONA understands fashion experiences around your location.",
      },
      {
        n: "02",
        title: "Explore style",
        body: "Browse apparel, footwear and accessories through GONA Fashion.",
      },
      {
        n: "03",
        title: "Shop in one ecosystem",
        body: "Complete your fashion journey with the same GONA account.",
      },
    ],
    partnerId: "fashion",
    partnerHeading: "Fashion shops and sellers",
    partnerBody:
      "Fashion partners can participate in the GONA Fashion ecosystem.",
    relatedIds: ["grocery", "local", "healthcare"],
    visual: "fashion",
    metaDescription:
      "GONA Fashion — style closer to home, connected through one local ecosystem.",
  },
  farming: {
    id: "farming",
    eyebrow: "Farming",
    heroPrimary: "Supporting",
    heroAccent: "Local Agriculture.",
    intro:
      "GONA Farming connects agricultural needs into the same local digital ecosystem as everyday services and community experiences.",
    aboutTitle: "What GONA Farming is",
    aboutBody:
      "Farming is the agriculture part of GONA — supporting local farming needs, products and services through one connected platform.",
    capabilitiesTitle: "Core experience",
    capabilities: [
      {
        title: "Agricultural needs",
        body: "Explore farming-related needs through the GONA ecosystem.",
      },
      {
        title: "Local farming ecosystem",
        body: "Designed around nearby agricultural communities and pathways.",
      },
      {
        title: "Products & services",
        body: "Access farming products and services where supported.",
      },
      {
        title: "Community connection",
        body: "Stay connected to local agricultural experiences inside GONA.",
      },
    ],
    howTitle: "How it works",
    howSteps: [
      {
        n: "01",
        title: "Choose your location",
        body: "GONA understands agricultural options around your area.",
      },
      {
        n: "02",
        title: "Explore farming needs",
        body: "Browse relevant farming pathways inside GONA Farming.",
      },
      {
        n: "03",
        title: "Get connected",
        body: "Access the relevant agricultural experience through GONA.",
      },
    ],
    partnerId: "farming",
    partnerHeading: "Farming partners welcome",
    partnerBody:
      "Agriculture and farming sellers or service providers can become part of GONA Farming.",
    relatedIds: ["grocery", "vehicle-booking", "local"],
    visual: "farming",
    metaDescription:
      "GONA Farming — supporting local agriculture through one connected ecosystem.",
  },
};

export function getServicePage(
  id: Exclude<ServiceId, "local">,
): ServicePageContent {
  return servicePages[id];
}
