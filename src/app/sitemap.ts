import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site.config";

/** Production crawl map — verified public routes only. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-04T12:00:00.000Z");

  const paths = [
    siteConfig.routes.home,
    siteConfig.routes.services,
    ...siteConfig.services.map((service) => service.href),
    siteConfig.routes.local,
    "/business",
    "/business/cable",
    siteConfig.routes.about,
    siteConfig.routes.partners,
    siteConfig.routes.careers,
    siteConfig.routes.contact,
    siteConfig.routes.faq,
    siteConfig.routes.privacy,
    siteConfig.routes.terms,
    siteConfig.routes.refundPolicy,
    siteConfig.routes.shippingDeliveryPolicy,
    siteConfig.routes.deleteAccount,
  ];

  const unique = [...new Set(paths)];

  return unique.map((path) => ({
    url: path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.7,
  }));
}
