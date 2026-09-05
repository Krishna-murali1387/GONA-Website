import { LocalChapterEnter } from "@/components/local/local-chapter-enter";
import { LocalChapterReturn } from "@/components/local/local-chapter-return";
import { LocalChapterStream } from "@/components/local/local-chapter-stream";
import { LocalChapterTournament } from "@/components/local/local-chapter-tournament";
import { PartnerConnection } from "@/components/services/partner-connection";
import { RelatedServices } from "@/components/services/related-services";

/**
 * LOCAL Living Mandal — four cinematic scroll chapters.
 * Locked service pages (Grocery → Farming) keep their own layouts.
 */
export function LocalPage() {
  return (
    <article>
      <LocalChapterEnter />
      <LocalChapterStream />
      <LocalChapterTournament />
      <LocalChapterReturn />
      <PartnerConnection
        partnerId="local-community"
        heading="Local businesses and community partners"
        body="LOCAL welcomes local businesses, organizers and community partners who want to participate in supported community experiences."
      />
      <RelatedServices
        ids={["grocery", "healthcare", "repair"]}
        currentId="local"
      />
    </article>
  );
}
