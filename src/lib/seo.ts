import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} · ${siteConfig.brand.name}`,
      description,
      url,
      siteName: siteConfig.brand.name,
      type: "website",
      images: [
        {
          url: siteConfig.assets.logo,
          alt: siteConfig.assets.logoAlt,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} · ${siteConfig.brand.name}`,
      description,
      images: [siteConfig.assets.logo],
    },
  };
}
