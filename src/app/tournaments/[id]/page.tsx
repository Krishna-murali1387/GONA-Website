import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TournamentLanding } from "@/components/tournaments/tournament-landing";
import { TournamentLoadError } from "@/components/tournaments/tournament-load-error";
import { siteConfig } from "@/config/site.config";
import {
  buildTournamentBannerPublicUrl,
  buildTournamentMetaDescription,
  fetchPublicTournament,
  isValidTournamentUuid,
} from "@/lib/tournaments/public-tournament";

/** Always serve current public tournament fields (registration status, etc.). */
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const path = `/tournaments/${id}`;
  const canonical = `${siteConfig.url}${path}`;

  if (!isValidTournamentUuid(id)) {
    return {
      title: { absolute: "Tournament unavailable · GONA ARENA" },
      description: "This tournament is not available.",
      robots: { index: false, follow: false },
      alternates: { canonical },
    };
  }

  const result = await fetchPublicTournament(id);

  if (result.status !== "ok") {
    return {
      title: { absolute: "Tournament unavailable · GONA ARENA" },
      description: "This tournament is not available.",
      robots: { index: false, follow: false },
      alternates: { canonical },
    };
  }

  const { tournament } = result;
  const title = `${tournament.title} · GONA ARENA`;
  const description = buildTournamentMetaDescription(tournament);
  const bannerUrl = buildTournamentBannerPublicUrl(tournament.banner_path);
  const ogImage = bannerUrl
    ? { url: bannerUrl, alt: tournament.title }
    : { url: siteConfig.assets.logo, alt: siteConfig.assets.logoAlt };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.brand.name,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: bannerUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function TournamentPublicPage({ params }: PageProps) {
  const { id } = await params;

  if (!isValidTournamentUuid(id)) {
    notFound();
  }

  const result = await fetchPublicTournament(id);

  if (result.status === "error") {
    return <TournamentLoadError message={result.message} />;
  }

  if (result.status === "unavailable") {
    notFound();
  }

  return <TournamentLanding tournament={result.tournament} />;
}
