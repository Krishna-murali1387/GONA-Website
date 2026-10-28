"use client";

import { TournamentLoadError } from "@/components/tournaments/tournament-load-error";

export default function TournamentRouteError() {
  return (
    <TournamentLoadError message="Unable to load tournament right now." />
  );
}
