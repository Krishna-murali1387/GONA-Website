import Link from "next/link";

import { Container } from "@/components/ui/container";
import {
  formatLegalDate,
  legalMeta,
  type LegalDocument,
} from "@/config/legal.content";
import { siteConfig } from "@/config/site.config";
import { buttonClass, chipClass } from "@/lib/ui";

type Props = {
  document: LegalDocument;
  /** Extra action block under intro (e.g. delete-account mailto) */
  action?: React.ReactNode;
};

/**
 * Shared production legal/trust layout — readable, not cinematic.
 */
export function LegalPageLayout({ document, action }: Props) {
  const updated = formatLegalDate();

  return (
    <article className="bg-gona-white">
      <header className="border-b border-black/5 bg-[#F3F0E8] pt-28 pb-12 md:pt-32 md:pb-14">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gona-gray uppercase">
            Legal · Trust
          </p>
          <h1 className="mt-3 font-display text-4xl text-gona-black md:text-5xl">
            {document.title}
          </h1>
          <p className="mt-4 text-sm text-gona-gray md:text-base">
            Last updated:{" "}
            <time dateTime={legalMeta.lastUpdatedISO}>{updated}</time>
          </p>
          <div className="mt-6 space-y-3 text-base leading-relaxed text-gona-gray md:text-lg">
            {document.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          {action ? <div className="mt-8">{action}</div> : null}
        </Container>
      </header>

      <Container className="grid gap-10 py-12 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-12 md:py-16 lg:grid-cols-[16rem_minmax(0,42rem)]">
        <nav
          aria-label="On this page"
          className="md:sticky md:top-28 md:self-start"
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-gona-gray uppercase">
            On this page
          </p>
          <ol className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-2 md:overflow-visible md:border-l md:border-black/10 md:pb-0 md:pl-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {document.sections.map((section) => (
              <li key={section.id} className="shrink-0 md:shrink">
                <a
                  href={`#${section.id}`}
                  className="block rounded-full border border-black/10 bg-gona-white px-3 py-1.5 text-sm text-gona-gray transition hover:border-gona-black/30 hover:text-gona-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-0.5"
                >
                  {section.title.replace(/^\d+\.\s*/, "")}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-10">
          {document.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28"
            >
              <h2 className="font-display text-2xl text-gona-black md:text-[1.75rem]">
                {section.title}
              </h2>
              <div className="mt-4 max-w-prose space-y-3 text-[15px] leading-relaxed text-gona-gray md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 64)}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-gona-gray md:text-base">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 64)}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.note ? (
                <p className="mt-4 max-w-prose rounded-xl border border-gona-yellow/40 bg-[#FFF9E6] px-4 py-3 text-sm text-gona-black/80">
                  {section.note}
                </p>
              ) : null}
            </section>
          ))}

          <LegalSupportBand />
          <LegalCrossLinks currentPath={document.path} />
        </div>
      </Container>
    </article>
  );
}

function LegalSupportBand() {
  return (
    <div className="rounded-2xl border border-black/8 bg-gona-light/80 p-5 md:p-6">
      <p className="text-xs font-semibold tracking-[0.16em] text-gona-gray uppercase">
        Support
      </p>
      <p className="mt-2 font-display text-xl text-gona-black">
        Need help with a policy question?
      </p>
      <p className="mt-2 text-sm text-gona-gray">
        Email{" "}
        <a
          href={`mailto:${legalMeta.supportEmail}`}
          className="font-medium text-gona-black underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
        >
          {legalMeta.supportEmail}
        </a>
        {" · "}
        <Link
          href={siteConfig.routes.contact}
          className="font-medium text-gona-black underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
        >
          Help & Feedback
        </Link>
        {" · "}
        <Link
          href={siteConfig.routes.faq}
          className="font-medium text-gona-black underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
        >
          FAQ
        </Link>
      </p>
    </div>
  );
}

function LegalCrossLinks({ currentPath }: { currentPath: string }) {
  const links = [
    { href: siteConfig.routes.privacy, label: "Privacy Policy" },
    { href: siteConfig.routes.terms, label: "Terms & Conditions" },
    { href: siteConfig.routes.refundPolicy, label: "Cancellation & Refund" },
    {
      href: siteConfig.routes.shippingDeliveryPolicy,
      label: "Shipping / Delivery",
    },
    { href: siteConfig.routes.deleteAccount, label: "Account Deletion" },
  ];

  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-gona-gray uppercase">
        Related policies
      </p>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={chipClass(link.href === currentPath)}
              aria-current={link.href === currentPath ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DeleteAccountAction() {
  const subject = encodeURIComponent("GONA Account Deletion Request");
  const body = encodeURIComponent(
    [
      "Hello GONA Support,",
      "",
      "I would like to request deletion of my GONA account.",
      "",
      "Registered email:",
      "Full name (as on account):",
      "",
      "Please confirm the next steps.",
      "",
      "Thank you.",
    ].join("\n"),
  );
  const href = `mailto:${legalMeta.supportEmail}?subject=${subject}&body=${body}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <a href={href} className={buttonClass("primary")}>
        Email Deletion Request →
      </a>
      <p className="max-w-md text-sm text-gona-gray">
        Opens your email app with a prefilled request to {legalMeta.supportEmail}.
        Target processing: within {legalMeta.accountDeletionTargetDays} days after
        a valid verified request. Do not send passwords, OTPs, or payment
        credentials.
      </p>
    </div>
  );
}
