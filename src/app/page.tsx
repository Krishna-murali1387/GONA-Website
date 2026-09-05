import { AboutPreview } from "@/components/home/about-preview";
import { WhyGona } from "@/components/home/benefits";
import { CareersPreview } from "@/components/home/careers-preview";
import { DownloadCta } from "@/components/home/download-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { LocalExperience } from "@/components/home/local-experience";
import { OneAppManyNeeds } from "@/components/home/one-app-many-needs";
import { PartnerSection } from "@/components/home/partner-section";
import { ServiceCarousel } from "@/components/home/service-carousel";

/**
 * Homepage story:
 * W2 Hero (locked) → W3 Seven Services (locked) → W4 storytelling.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCarousel />
      <OneAppManyNeeds />
      <HowItWorks />
      <LocalExperience />
      <WhyGona />
      <PartnerSection />
      <AboutPreview />
      <CareersPreview />
      <DownloadCta />
    </>
  );
}
