import Link from "next/link";

import { siteConfig } from "@/config/site.config";
import {
  buildOpenInGonaHref,
  buildTournamentBannerPublicUrl,
  formatEntryFee,
  formatParticipation,
  formatRegistrationDeadline,
  formatStartTime,
  formatTournamentDate,
  formatVenue,
  getPublicStatusLabel,
  getRegistrationCta,
  type PublicTournament,
} from "@/lib/tournaments/public-tournament";

import styles from "./tournament-landing.module.css";

type InfoItem = {
  label: string;
  value: string;
};

function buildInfoItems(tournament: PublicTournament): InfoItem[] {
  const items: InfoItem[] = [
    { label: "Date", value: formatTournamentDate(tournament.tournament_date) },
  ];

  if (tournament.end_date && tournament.end_date !== tournament.tournament_date) {
    items.push({
      label: "Ends",
      value: formatTournamentDate(tournament.end_date),
    });
  }

  const start = formatStartTime(tournament.start_time);
  if (start) items.push({ label: "Start time", value: start });

  items.push({ label: "Venue", value: formatVenue(tournament) });
  items.push({ label: "Mandal", value: tournament.mandal_name });
  items.push({ label: "Entry fee", value: formatEntryFee(tournament) });

  const format = formatParticipation(tournament);
  if (format) items.push({ label: "Format", value: format });

  if (
    tournament.participation_type === "team" &&
    tournament.team_size &&
    tournament.team_size > 0
  ) {
    items.push({ label: "Team size", value: String(tournament.team_size) });
  }

  const deadline = formatRegistrationDeadline(tournament.registration_deadline);
  if (deadline) items.push({ label: "Registration deadline", value: deadline });

  items.push({
    label: "Registration",
    value: getPublicStatusLabel(tournament),
  });

  if (tournament.prize_details?.trim()) {
    items.push({ label: "Prize", value: tournament.prize_details.trim() });
  }

  if (tournament.esports_format?.trim()) {
    items.push({
      label: "Esports format",
      value: tournament.esports_format.replaceAll("_", " "),
    });
  }

  return items;
}

type TournamentLandingProps = {
  tournament: PublicTournament;
};

export function TournamentLanding({ tournament }: TournamentLandingProps) {
  const bannerUrl = buildTournamentBannerPublicUrl(tournament.banner_path);
  const status = getPublicStatusLabel(tournament);
  const cta = getRegistrationCta(tournament);
  const openHref = buildOpenInGonaHref(tournament.id);
  const infoItems = buildInfoItems(tournament);
  const sportLabel =
    tournament.tournament_type === "esports"
      ? `${tournament.category} · Esports`
      : tournament.category;

  return (
    <div className={styles.page}>
      <header className={styles.arenaHeader}>
        <div className={styles.arenaHeaderInner}>
          <p className={styles.arenaBrand}>GONA ARENA</p>
          <p className={styles.arenaTagline}>Play. Compete. Represent.</p>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="tournament-title">
        <div className={styles.bannerFrame}>
          {bannerUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote storage URL; no next.config image remotePatterns required
            <img
              src={bannerUrl}
              alt=""
              className={styles.bannerImage}
            />
          ) : (
            <div className={styles.bannerFallback} aria-hidden="true">
              <span className={styles.bannerFallbackMark}>GONA ARENA</span>
            </div>
          )}
          <div className={styles.bannerScrim} />
        </div>

        <div className={styles.heroCopy}>
          <div className={styles.badgeRow}>
            <span className={styles.sportBadge}>{sportLabel}</span>
            <span
              className={
                tournament.completion_status === "completed"
                  ? styles.statusBadgeMuted
                  : tournament.registration_status === "open"
                    ? styles.statusBadgeOpen
                    : styles.statusBadgeMuted
              }
            >
              {status}
            </span>
          </div>
          <h1 id="tournament-title" className={styles.title}>
            {tournament.title}
          </h1>
        </div>
      </section>

      <section className={styles.section} aria-label="Tournament information">
        <div className={styles.infoGrid}>
          {infoItems.map((item) => (
            <article key={item.label} className={styles.infoCard}>
              <p className={styles.infoLabel}>{item.label}</p>
              <p className={styles.infoValue}>{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      {tournament.short_description?.trim() ? (
        <section className={styles.section} aria-labelledby="about-heading">
          <h2 id="about-heading" className={styles.sectionHeading}>
            About
          </h2>
          <p className={styles.aboutText}>
            {tournament.short_description.trim()}
          </p>
        </section>
      ) : null}

      <section
        className={
          cta.tone === "compete" ? styles.ctaPanel : styles.ctaPanelMuted
        }
        aria-labelledby="cta-heading"
      >
        <h2 id="cta-heading" className={styles.ctaHeading}>
          {cta.heading}
        </h2>
        <p className={styles.ctaSupport}>{cta.support}</p>
        <a href={openHref} className={styles.primaryCta}>
          {cta.primaryLabel}
        </a>
        <p className={styles.ctaNote}>
          Opens the GONA app when installed. Registration eligibility is checked
          inside the app.
        </p>
        <Link href={siteConfig.routes.local} className={styles.secondaryLink}>
          Explore GONA LOCAL
        </Link>
      </section>
    </div>
  );
}
