import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/config/site.config";

import "./globals.css";

const gonaSans = Manrope({
  variable: "--font-gona-sans",
  subsets: ["latin"],
  display: "swap",
});

const gonaDisplay = Outfit({
  variable: "--font-gona-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description:
    "GONA is a local super-app for India — grocery, healthcare, repair, vehicle booking, fashion, farming, and LOCAL community, in one app.",
  applicationName: siteConfig.brand.name,
  authors: [{ name: siteConfig.brand.legalName }],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — ${siteConfig.brand.positioning}`,
    description:
      "Everyday services and local community connected through one GONA app.",
    locale: "en_IN",
    images: [
      {
        url: siteConfig.assets.logo,
        alt: siteConfig.assets.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description:
      "Everyday services and local community connected through one GONA app.",
    images: [siteConfig.assets.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gonaSans.variable} ${gonaDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
