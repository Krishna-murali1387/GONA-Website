import Link from "next/link";

import { GonaLogo } from "@/components/brand/gona-logo";
import { Container } from "@/components/ui/container";
import { legalMeta } from "@/config/legal.content";
import { everydayServices, siteConfig } from "@/config/site.config";

/**
 * Production footer — deep black close to the homepage story.
 * Social icons render only when real URLs exist in site.config.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const socialEntries = (
    Object.entries(siteConfig.social) as [string, string | null][]
  ).filter(([, url]) => Boolean(url));

  return (
    <footer className="mt-auto border-t border-white/5 bg-[#0A0A0A] text-gona-white">
      <Container className="grid gap-12 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr] lg:gap-10">
        <div className="space-y-5">
          <GonaLogo onDark size={40} />
          <p className="max-w-xs text-sm leading-relaxed text-white/55">
            {siteConfig.brand.positioning}
          </p>
          <p className="text-sm font-medium text-gona-yellow/90">
            {siteConfig.brand.tagline}
          </p>
          <p className="max-w-xs text-xs leading-relaxed text-white/45">
            Operated by {legalMeta.enterpriseName}, a{" "}
            {legalMeta.businessStructure} based in {legalMeta.region}.
          </p>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="inline-block text-sm text-white/70 transition hover:text-gona-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
          >
            {siteConfig.supportEmail}
          </a>
          {socialEntries.length > 0 ? (
            <ul className="flex flex-wrap gap-3 pt-1">
              {socialEntries.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm capitalize text-white/55 hover:text-gona-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <FooterColumn title="Services">
          {everydayServices.map((service) => (
            <Link key={service.id} href={service.href}>
              {service.name}
            </Link>
          ))}
          <Link href={siteConfig.routes.local}>LOCAL</Link>
        </FooterColumn>

        <FooterColumn title="Company">
          {siteConfig.nav.footerCompany.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <FooterColumn title="Support">
            {siteConfig.nav.footerSupport.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </FooterColumn>
          <FooterColumn title="Legal">
            {siteConfig.nav.footerLegal.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </FooterColumn>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/8 py-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {legalMeta.enterpriseName}. All rights reserved.
        </p>
        <p className="text-xs tracking-[0.14em] text-white/30 uppercase">
          Seven Services · One GONA
        </p>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-gona-yellow uppercase">
        {title}
      </p>
      <div className="flex flex-col gap-2.5 text-sm text-white/65 [&_a]:transition [&_a:hover]:text-gona-white [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-gona-yellow">
        {children}
      </div>
    </div>
  );
}
