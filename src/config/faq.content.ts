export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    id: "about",
    title: "About GONA",
    items: [
      {
        question: "What is GONA?",
        answer:
          "GONA is a local super-app ecosystem that brings everyday services and community experiences together through one connected platform — Seven Services. One GONA.",
      },
      {
        question: "What does “Seven Services · One GONA” mean?",
        answer:
          "GONA includes seven official customer services: Grocery, Healthcare, GONA Repair, Vehicle Booking, Fashion, Farming, and LOCAL — all connected through one account and one ecosystem.",
      },
      {
        question: "Is GONA built for local India?",
        answer:
          "Yes. GONA is designed around nearby communities — connecting everyday commerce, services and local community experiences in one digital ecosystem.",
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    items: [
      {
        question: "Which services does GONA include?",
        answer:
          "Grocery, Healthcare, GONA Repair, Vehicle Booking, Fashion, Farming, and LOCAL.",
      },
      {
        question: "Are all services available everywhere?",
        answer:
          "Availability may vary as GONA expands. The app is designed to understand what is available around your area.",
      },
      {
        question: "Do I need separate apps for each service?",
        answer:
          "No. GONA is built so you can move between connected services through one ecosystem instead of juggling multiple platforms.",
      },
    ],
  },
  {
    id: "local",
    title: "LOCAL",
    items: [
      {
        question: "What is LOCAL?",
        answer:
          "LOCAL is GONA’s seventh official service. It brings community information, activities and nearby opportunities into one connected space — Your Mandal. Now Digital.",
      },
      {
        question: "What can LOCAL include?",
        answer:
          "LOCAL is designed around community capabilities such as Tournaments, Events, Local Alerts, Emergency Contacts, Local Offers, and Featured Businesses.",
      },
      {
        question: "Is LOCAL a separate product from GONA?",
        answer:
          "No. LOCAL is part of the official seven-service GONA ecosystem, with a community-focused purpose.",
      },
    ],
  },
  {
    id: "partners",
    title: "Partners",
    items: [
      {
        question: "Who can partner with GONA?",
        answer:
          "Delivery partners, fashion partners, healthcare partners, repair technicians, vehicle partners, farming partners, and local business / community partners.",
      },
      {
        question: "Are partner types the same as GONA customer services?",
        answer:
          "No. Customer services are the seven official GONA experiences. Partner types describe how businesses and people participate in those experiences.",
      },
      {
        question: "How do I apply to become a partner?",
        answer:
          "Visit the Partners page to choose a partner type. Online partner registration is not live yet — you can contact GONA about partnering, and we will share next steps as onboarding opens.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    items: [
      {
        question: "How do I get help?",
        answer:
          "Use the Help & Feedback page to choose a reason — customer support, partner support, report a problem, suggest an improvement, and more — or email wearegonasuperapp@gmail.com.",
      },
      {
        question: "Can I suggest improvements?",
        answer:
          "Yes. Choose “Suggest an Improvement” on the Help & Feedback page. We welcome ideas about features, local needs and missing categories. We cannot promise every suggestion will be implemented.",
      },
      {
        question: "Where can I find account deletion information?",
        answer:
          "Account deletion guidance is linked from the site footer and Support section. Full policy details will continue to be refined as GONA’s legal pages are finalized.",
      },
    ],
  },
  {
    id: "account-app",
    title: "Account / App",
    items: [
      {
        question: "Is the GONA app available on Google Play?",
        answer:
          "The Android release is coming soon. The website does not publish a fake Play Store link before the app is live.",
      },
      {
        question: "Will there be an App Store version?",
        answer:
          "More information will be shared when this availability becomes real. We do not claim App Store availability before it exists.",
      },
      {
        question: "Do I need one account for every service?",
        answer:
          "GONA is designed around one trusted account across the connected local ecosystem.",
      },
    ],
  },
];
