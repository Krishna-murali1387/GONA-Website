import { createWebsiteSupabaseServerClient } from "@/lib/supabase/server";
import { getWebsiteSupabaseEnv } from "@/lib/supabase/env";

export const TOURNAMENT_BANNERS_BUCKET = "tournament-banners";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Whitelist shape returned by public.fetch_public_tournament. */
export type PublicTournament = {
  id: string;
  title: string;
  tournament_type: string;
  category: string;
  short_description: string | null;
  banner_path: string | null;
  tournament_date: string;
  end_date: string | null;
  start_time: string | null;
  venue_name: string | null;
  village: string | null;
  is_online: boolean;
  participation_type: string | null;
  team_size: number | null;
  is_free: boolean;
  entry_fee: number;
  registration_deadline: string | null;
  registration_status: string;
  completion_status: string;
  prize_details: string | null;
  esports_format: string | null;
  mandal_name: string;
};

export type PublicTournamentFetchResult =
  | { status: "ok"; tournament: PublicTournament }
  | { status: "unavailable" }
  | { status: "error"; message: string };

export function isValidTournamentUuid(value: string): boolean {
  return UUID_RE.test(value.trim());
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}

function parsePublicTournament(data: unknown): PublicTournament | null {
  if (!isRecord(data)) return null;
  const id = asString(data.id);
  const title = asString(data.title);
  const tournamentType = asString(data.tournament_type);
  const category = asString(data.category);
  const tournamentDate = asString(data.tournament_date);
  const registrationStatus = asString(data.registration_status);
  const completionStatus = asString(data.completion_status);
  const mandalName = asString(data.mandal_name);
  if (
    !id ||
    !title ||
    !tournamentType ||
    !category ||
    !tournamentDate ||
    !registrationStatus ||
    !completionStatus ||
    !mandalName
  ) {
    return null;
  }

  return {
    id,
    title,
    tournament_type: tournamentType,
    category,
    short_description: asString(data.short_description),
    banner_path: asString(data.banner_path),
    tournament_date: tournamentDate,
    end_date: asString(data.end_date),
    start_time: asString(data.start_time),
    venue_name: asString(data.venue_name),
    village: asString(data.village),
    is_online: asBoolean(data.is_online),
    participation_type: asString(data.participation_type),
    team_size: (() => {
      if (data.team_size === null || data.team_size === undefined) return null;
      const n = asNumber(data.team_size, Number.NaN);
      return Number.isFinite(n) && n > 0 ? n : null;
    })(),
    is_free: asBoolean(data.is_free),
    entry_fee: asNumber(data.entry_fee, 0),
    registration_deadline: asString(data.registration_deadline),
    registration_status: registrationStatus,
    completion_status: completionStatus,
    prize_details: asString(data.prize_details),
    esports_format: asString(data.esports_format),
    mandal_name: mandalName,
  };
}

/** Storage object path → public URL. Rejects unsafe paths. */
export function buildTournamentBannerPublicUrl(
  bannerPath: string | null | undefined,
): string | null {
  if (!bannerPath) return null;
  const trimmed = bannerPath.trim();
  if (!trimmed || trimmed.length > 500) return null;

  if (/^https:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      if (!url.pathname.includes(`/${TOURNAMENT_BANNERS_BUCKET}/`)) {
        return null;
      }
      return url.toString();
    } catch {
      return null;
    }
  }

  if (
    trimmed.includes("..") ||
    trimmed.includes("\\") ||
    trimmed.startsWith("/") ||
    /^(https?:|data:|blob:)/i.test(trimmed)
  ) {
    return null;
  }

  const { url: supabaseUrl } = getWebsiteSupabaseEnv();
  const encoded = trimmed
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  if (!encoded) return null;

  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${TOURNAMENT_BANNERS_BUCKET}/${encoded}`;
}

export async function fetchPublicTournament(
  tournamentId: string,
): Promise<PublicTournamentFetchResult> {
  const id = tournamentId.trim();
  if (!isValidTournamentUuid(id)) {
    return { status: "unavailable" };
  }

  try {
    const supabase = createWebsiteSupabaseServerClient();
    const { data, error } = await supabase.rpc("fetch_public_tournament", {
      p_tournament_id: id,
    });

    if (error) {
      return { status: "error", message: "Unable to load tournament right now." };
    }

    if (data == null) {
      return { status: "unavailable" };
    }

    const tournament = parsePublicTournament(data);
    if (!tournament) {
      return { status: "unavailable" };
    }

    return { status: "ok", tournament };
  } catch {
    return { status: "error", message: "Unable to load tournament right now." };
  }
}

export function formatTournamentDate(dateOnly: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOnly.trim());
  if (!match) return dateOnly;
  const date = new Date(`${match[1]}-${match[2]}-${match[3]}T12:00:00+05:30`);
  if (Number.isNaN(date.getTime())) return dateOnly;
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function formatStartTime(time: string | null): string | null {
  if (!time) return null;
  const raw = time.trim();
  const match = /^(\d{2}):(\d{2})(?::\d{2})?$/.exec(raw);
  if (!match) return raw;
  const hours = Number(match[1]);
  const minutes = match[2];
  if (!Number.isFinite(hours) || hours < 0 || hours > 23) return raw;
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutes} ${suffix}`;
}

export function formatEntryFee(tournament: PublicTournament): string {
  if (tournament.is_free || tournament.entry_fee === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(tournament.entry_fee);
}

export function formatParticipation(tournament: PublicTournament): string | null {
  if (tournament.participation_type === "solo") return "Solo";
  if (tournament.participation_type === "team") {
    if (tournament.team_size && tournament.team_size > 0) {
      return `Team · ${tournament.team_size} players`;
    }
    return "Team";
  }
  return null;
}

export function formatRegistrationDeadline(
  deadline: string | null,
): string | null {
  if (!deadline) return null;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function formatVenue(tournament: PublicTournament): string {
  if (tournament.is_online) return "Online";
  if (tournament.venue_name && tournament.village) {
    return `${tournament.venue_name}, ${tournament.village}`;
  }
  return tournament.venue_name || tournament.village || "Venue TBA";
}

export function getPublicStatusLabel(tournament: PublicTournament): string {
  if (tournament.completion_status === "completed") return "Completed";
  if (tournament.registration_status === "open") return "Registration open";
  if (tournament.registration_status === "closed") return "Registration closed";
  return "Registration not open";
}

export type RegistrationCta = {
  heading: string;
  support: string;
  primaryLabel: string;
  tone: "compete" | "info" | "completed";
};

export function getRegistrationCta(tournament: PublicTournament): RegistrationCta {
  if (tournament.completion_status === "completed") {
    return {
      heading: "Tournament completed",
      support: "Open GONA to view tournament details and results.",
      primaryLabel: "Open in GONA →",
      tone: "completed",
    };
  }
  if (tournament.registration_status === "closed") {
    return {
      heading: "Registration closed",
      support: "Open GONA to view tournament details.",
      primaryLabel: "Open in GONA →",
      tone: "info",
    };
  }
  if (tournament.registration_status === "not_open") {
    return {
      heading: "Registration not open yet",
      support: "Open GONA to view tournament details and register when available.",
      primaryLabel: "Open in GONA →",
      tone: "info",
    };
  }
  return {
    heading: "Ready to compete?",
    support: "Open GONA to view tournament details and register.",
    primaryLabel: "Open in GONA →",
    tone: "compete",
  };
}

export function buildOpenInGonaHref(tournamentId: string): string {
  return `gonasuperapp://tournaments/${tournamentId}`;
}

export function buildTournamentMetaDescription(
  tournament: PublicTournament,
): string {
  const parts = [
    tournament.category,
    formatTournamentDate(tournament.tournament_date),
    tournament.mandal_name,
  ].filter(Boolean);
  const base = parts.join(" · ");
  if (tournament.short_description?.trim()) {
    const blurb = tournament.short_description.trim().slice(0, 120);
    return `${base}. ${blurb}`;
  }
  return `${base}. Open in GONA ARENA to compete.`;
}
