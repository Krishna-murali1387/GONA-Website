import Link from "next/link";

import { siteConfig } from "@/config/site.config";

import styles from "./tournament-landing.module.css";

type TournamentLoadErrorProps = {
  message?: string;
};

export function TournamentLoadError({
  message = "Unable to load tournament right now.",
}: TournamentLoadErrorProps) {
  return (
    <div className={styles.page}>
      <header className={styles.arenaHeader}>
        <div className={styles.arenaHeaderInner}>
          <p className={styles.arenaBrand}>GONA ARENA</p>
          <p className={styles.arenaTagline}>Play. Compete. Represent.</p>
        </div>
      </header>
      <section className={styles.section} style={{ paddingTop: "3rem" }}>
        <h1 className={styles.title} style={{ fontSize: "2rem" }}>
          Temporarily unavailable
        </h1>
        <p className={styles.aboutText} style={{ marginTop: "1rem" }}>
          {message} Please try again in a moment.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href={siteConfig.routes.local} className={styles.secondaryLink}>
            Explore GONA LOCAL
          </Link>
          <Link href={siteConfig.routes.home} className={styles.secondaryLink}>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
