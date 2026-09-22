"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cableSite } from "@/config/cable.config";
import { safeAuthNextPath } from "@/lib/auth/safe-next";
import { createWebsiteSupabaseClient } from "@/lib/supabase/client";

/**
 * Consumes Supabase Auth email-confirmation redirects for GONA Website.
 * Supports PKCE `?code=` and legacy hash tokens.
 * Never logs tokens. Never uses service_role.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = React.useState("Confirming your email…");
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    void (async () => {
      const fail = (userMessage: string) => {
        if (cancelled) return;
        setFailed(true);
        setMessage(userMessage);
      };

      try {
        const supabase = createWebsiteSupabaseClient();
        const url = new URL(window.location.href);
        const search = url.searchParams;
        const next = safeAuthNextPath(search.get("next"), cableSite.registerPath);

        const oauthError =
          search.get("error_description") ||
          search.get("error") ||
          search.get("error_code");
        if (oauthError) {
          fail("This confirmation link is invalid or has expired. Request a new verification email from the registration page.");
          return;
        }

        const code = search.get("code");
        let exchangeFailed = false;
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            // Code may already be consumed (already confirmed). Fall through to session check.
            exchangeFailed = true;
          }
        } else {
          const hash = window.location.hash.startsWith("#")
            ? window.location.hash.slice(1)
            : window.location.hash;
          if (hash) {
            const hashParams = new URLSearchParams(hash);
            const accessToken = hashParams.get("access_token");
            const refreshToken = hashParams.get("refresh_token");
            if (accessToken && refreshToken) {
              const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });
              if (error) {
                exchangeFailed = true;
              }
            }
          }
        }

        // Strip code/tokens from the address bar before navigating onward.
        window.history.replaceState(null, "", "/auth/callback");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        // Already-confirmed returning user with an existing session.
        if (user?.email_confirmed_at) {
          if (cancelled) return;
          setMessage("Email already confirmed. Continuing registration…");
          router.replace(next);
          return;
        }

        if (userError || !user) {
          fail(
            exchangeFailed
              ? "This confirmation link is invalid or has expired. Open registration and try again."
              : "We could not confirm your session. Open the registration page and try again.",
          );
          return;
        }

        // Session may exist before confirm finishes in some edge cases.
        const { data: refreshed } = await supabase.auth.refreshSession();
        if (!refreshed.user?.email_confirmed_at) {
          fail(
            exchangeFailed
              ? "This confirmation link is invalid or has expired. Request a new verification email from registration."
              : "Email is still not verified. Use the newest link from your inbox.",
          );
          return;
        }

        if (cancelled) return;
        setMessage("Email confirmed. Continuing registration…");
        router.replace(next);
      } catch {
        fail("Confirmation failed. Please return to registration and try again.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#F4F5F7] px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#111111]/10 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-bold tracking-[0.25em] text-[#111111]/50 uppercase">
          GONA
        </p>
        <h1 className="mt-3 text-xl font-extrabold text-[#111111]">
          {failed ? "Email confirmation" : "Confirming email"}
        </h1>
        <p className="mt-3 text-sm font-semibold text-[#111111]/70">{message}</p>
        {failed ? (
          <Link
            href={cableSite.registerPath}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#FFD400] px-5 text-sm font-extrabold text-[#111111]"
          >
            Back to Cable registration
          </Link>
        ) : null}
      </div>
    </div>
  );
}
