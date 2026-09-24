"use client";

import * as React from "react";
import Link from "next/link";
import type { SupabaseClient, User } from "@supabase/supabase-js";

import { cableSite } from "@/config/cable.config";
import { createWebsiteSupabaseClient } from "@/lib/supabase/client";

type Step = 1 | 2 | 3 | 4 | 5;
type AuthMode = "signup" | "signin";
type ApplicantGate = "none" | "pending" | "approved" | "lookup_error";

type AccountForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type NetworkForm = {
  ownerFullName: string;
  mobile: string;
  proposedDisplayName: string;
  legalName: string;
  businessAddress: string;
  city: string;
  state: string;
  postalCode: string;
  casProviderInfo: string;
  approxCustomerCount: string;
  gstin: string;
};

const emptyAccount: AccountForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emptyNetwork: NetworkForm = {
  ownerFullName: "",
  mobile: "",
  proposedDisplayName: "",
  legalName: "",
  businessAddress: "",
  city: "",
  state: "",
  postalCode: "",
  casProviderInfo: "",
  approxCustomerCount: "",
  gstin: "",
};

function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered")) {
    return "This email is already registered. Sign in, verify email if needed, then continue.";
  }
  if (m.includes("password")) return "Password does not meet requirements.";
  if (m.includes("email")) return "Check the email address and try again.";
  return "Unable to create account. Please try again.";
}

function friendlySignInError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("email not confirmed") || m.includes("email_not_confirmed")) {
    return "Verify your email before continuing. Check your inbox for the confirmation link.";
  }
  if (m.includes("invalid login") || m.includes("invalid credentials")) {
    return "Incorrect email or password.";
  }
  return "Unable to sign in. Please try again.";
}

function friendlySubmitError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("email_not_verified")) {
    return "Verify your email before submitting the Cable application.";
  }
  if (m.includes("already_pending")) {
    return "You already have a pending Cable application.";
  }
  if (m.includes("already_approved")) {
    return "This account already has an approved Cable Network.";
  }
  if (m.includes("fields_required") || m.includes("invalid")) {
    return "Please complete all required network fields.";
  }
  return "Unable to submit application. Please try again.";
}

type ResolveResult =
  | { kind: "unauthenticated" }
  | { kind: "unconfirmed"; user: User }
  | { kind: "pending"; user: User; applicationId: string }
  | { kind: "approved"; user: User }
  | { kind: "applicant"; user: User }
  | { kind: "lookup_error" };

/**
 * Shared post-auth routing: confirmed session → Cable applicant state.
 * Client UX only; submit RPC remains the hard backstop.
 */
async function resolveConfirmedApplicant(
  supabase: SupabaseClient,
  knownUser?: User | null,
): Promise<ResolveResult> {
  let user = knownUser ?? null;
  if (!user) {
    const {
      data: { user: fetched },
      error,
    } = await supabase.auth.getUser();
    if (error || !fetched) return { kind: "unauthenticated" };
    user = fetched;
  }

  if (!user.email_confirmed_at) {
    return { kind: "unconfirmed", user };
  }

  const { data: apps, error: appsError } = await supabase
    .from("cable_network_applications")
    .select("id, status, submitted_at")
    .eq("applicant_user_id", user.id)
    .order("submitted_at", { ascending: false })
    .limit(5);

  if (appsError) {
    return { kind: "lookup_error" };
  }

  const { data: members, error: membersError } = await supabase
    .from("cable_network_members")
    .select("id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .limit(1);

  if (membersError) {
    return { kind: "lookup_error" };
  }

  const hasMembership = (members ?? []).length > 0;
  const latest = (apps ?? [])[0] as { id: string; status: string } | undefined;

  if (hasMembership || latest?.status === "approved") {
    return { kind: "approved", user };
  }

  if (latest?.status === "pending") {
    return { kind: "pending", user, applicationId: String(latest.id) };
  }

  // No app, rejected latest, or empty — valid new / re-applicant.
  return { kind: "applicant", user };
}

export function CableRegisterWizard() {
  const [step, setStep] = React.useState<Step>(1);
  const [authMode, setAuthMode] = React.useState<AuthMode>("signup");
  const [applicantGate, setApplicantGate] = React.useState<ApplicantGate>("none");
  const [account, setAccount] = React.useState(emptyAccount);
  const [network, setNetwork] = React.useState(emptyNetwork);
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [applicationId, setApplicationId] = React.useState<string | null>(null);

  const supabase = React.useMemo(() => {
    try {
      return createWebsiteSupabaseClient();
    } catch {
      return null;
    }
  }, []);

  const applyResolveResult = React.useCallback((result: ResolveResult): boolean => {
    switch (result.kind) {
      case "unauthenticated":
        return false;
      case "unconfirmed":
        setApplicantGate("none");
        setStep(2);
        setInfo("Check your inbox and verify your email, then continue.");
        return true;
      case "pending":
        setApplicationId(result.applicationId);
        setApplicantGate("pending");
        setStep(1);
        setInfo(null);
        setError(null);
        return true;
      case "approved":
        setApplicantGate("approved");
        setStep(1);
        setInfo(null);
        setError(null);
        return true;
      case "lookup_error":
        setApplicantGate("lookup_error");
        setStep(1);
        setError(
          "We could not verify your Cable application status. Please try again in a moment.",
        );
        return true;
      case "applicant": {
        const name = (result.user.user_metadata?.name as string) || "";
        setApplicantGate("none");
        setStep(3);
        setInfo(null);
        setError(null);
        setNetwork((n) => ({
          ...n,
          ownerFullName: n.ownerFullName || name || "",
        }));
        return true;
      }
      default:
        return false;
    }
  }, []);

  const resolveAndRoute = React.useCallback(
    async (knownUser?: User | null) => {
      if (!supabase) return false;
      const result = await resolveConfirmedApplicant(supabase, knownUser);
      return applyResolveResult(result);
    },
    [supabase, applyResolveResult],
  );

  React.useEffect(() => {
    if (!supabase) return;
    void (async () => {
      // Safety net: if confirm email landed on this page with ?code= (old links)
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (!exchangeError) {
            window.history.replaceState(null, "", cableSite.registerPath);
          }
        }
      } catch {
        // continue with normal session check
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        await supabase.auth.refreshSession();
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      await resolveAndRoute(user);
    })();
  }, [supabase, resolveAndRoute]);

  function switchAuthMode(mode: AuthMode) {
    setAuthMode(mode);
    setError(null);
    setInfo(null);
    setApplicantGate("none");
  }

  async function createAccount(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setApplicantGate("none");
    if (!supabase) {
      setError("Registration is temporarily unavailable. Missing Supabase configuration.");
      return;
    }
    if (account.password !== account.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (account.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const email = account.email.trim().toLowerCase();
      const emailRedirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(cableSite.registerPath)}`
          : undefined;
      const { data, error: signError } = await supabase.auth.signUp({
        email,
        password: account.password,
        options: {
          data: { name: account.name.trim() },
          emailRedirectTo,
        },
      });
      if (signError) {
        setError(friendlyAuthError(signError.message));
        return;
      }
      setNetwork((n) => ({ ...n, ownerFullName: account.name.trim() || n.ownerFullName }));
      if (data.session && data.user) {
        await resolveAndRoute(data.user);
        return;
      }
      if (data.user && !data.user.email_confirmed_at) {
        setInfo("Check your inbox and verify your email, then continue.");
        setStep(2);
        return;
      }
      setStep(2);
    } catch {
      setError("Unable to create account.");
    } finally {
      setBusy(false);
    }
  }

  async function signInAccount(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setApplicantGate("none");
    if (!supabase) {
      setError("Registration is temporarily unavailable. Missing Supabase configuration.");
      return;
    }
    const email = account.email.trim().toLowerCase();
    const password = account.password;
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setBusy(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError || !data.user) {
        setError(friendlySignInError(signInError?.message ?? ""));
        return;
      }
      if (!data.user.email_confirmed_at) {
        setStep(2);
        setInfo("Verify your email before continuing. Check your inbox for the confirmation link.");
        return;
      }
      await resolveAndRoute(data.user);
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function refreshVerification() {
    if (!supabase) return;
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      // Prefer a fresh authoritative user — do not reuse pre-verify snapshot.
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        await supabase.auth.refreshSession();
      }
      let {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      // Email may already be confirmed server-side while this browser has no
      // PKCE session (e.g. confirm opened in another cookie jar). Recover with
      // the credentials still held in this wizard's React state only.
      if (userError || !user) {
        const email = account.email.trim().toLowerCase();
        const password = account.password;
        if (email && password) {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            const m = signInError.message.toLowerCase();
            if (m.includes("email not confirmed") || m.includes("email_not_confirmed")) {
              setError(
                "Email is not verified yet. Open the newest Confirm Email link from your inbox in this browser, then click continue.",
              );
              return;
            }
            if (m.includes("invalid login") || m.includes("invalid credentials")) {
              setError("Incorrect email or password. Use the same password you registered with, then try again.");
              return;
            }
            setError(
              "Could not restore your session after verification. Open the confirmation link from your inbox in this browser, then try again.",
            );
            return;
          }

          user = signInData.user;
          userError = null;
        } else if (userError) {
          setError(
            "Could not refresh your session. Open the confirmation link from your inbox in this browser, then try again.",
          );
          return;
        }
      }

      if (userError) {
        setError(
          "Could not refresh your session. Open the confirmation link from your inbox in this browser, then try again.",
        );
        return;
      }

      if (!user) {
        setError(
          "No signed-in session yet. Open the Confirm Email link from your inbox in this browser — it will bring you back here after verification.",
        );
        return;
      }

      if (!user.email_confirmed_at) {
        setError(
          "Email is not verified yet. Open the newest Confirm Email link from your inbox in this browser, then click continue.",
        );
        return;
      }

      await resolveAndRoute(user);
    } finally {
      setBusy(false);
    }
  }

  function continueToReview(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const required = [
      network.ownerFullName,
      network.mobile,
      network.proposedDisplayName,
      network.businessAddress,
      network.city,
      network.state,
      network.postalCode,
    ];
    if (required.some((v) => !v.trim())) {
      setError("Fill all required network fields.");
      return;
    }
    setStep(4);
  }

  async function submitApplication() {
    if (!supabase) {
      setError("Registration is temporarily unavailable.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const approx = network.approxCustomerCount.trim()
        ? Number(network.approxCustomerCount)
        : null;
      if (approx != null && (!Number.isFinite(approx) || approx < 0)) {
        setError("Approximate customer count must be a non-negative number.");
        return;
      }

      const { data, error: rpcError } = await supabase.rpc(
        "submit_cable_network_application",
        {
          p_owner_full_name: network.ownerFullName.trim(),
          p_mobile: network.mobile.trim(),
          p_proposed_display_name: network.proposedDisplayName.trim(),
          p_business_address: network.businessAddress.trim(),
          p_city: network.city.trim(),
          p_state: network.state.trim(),
          p_postal_code: network.postalCode.trim(),
          p_legal_name: network.legalName.trim() || null,
          p_cas_provider_info: network.casProviderInfo.trim() || null,
          p_approx_customer_count: approx,
          p_gstin: network.gstin.trim() || null,
        },
      );

      if (rpcError) {
        setError(friendlySubmitError(rpcError.message));
        return;
      }

      const row = data as { ok?: boolean; application_id?: string } | null;
      if (!row?.ok || !row.application_id) {
        setError("Submission did not complete.");
        return;
      }
      setApplicationId(row.application_id);
      setStep(5);
    } catch {
      setError("Unable to submit application.");
    } finally {
      setBusy(false);
    }
  }

  const stepLabel = ["Account", "Verify email", "Network details", "Review", "Submitted"][
    step - 1
  ];

  const showAccountEntry = step === 1 && applicantGate === "none";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-bold tracking-[0.3em] text-[#111111]/55 uppercase">
        GONA Cable · Step {step} of 5 · {stepLabel}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold text-[#111111]">
        Register Your Cable Network
      </h1>
      <p className="mt-2 text-sm text-[#111111]/65">
        Create a GONA account or sign in, verify email, submit network details. GONA Super Admin
        reviews before your owner workspace opens.
      </p>

      {!supabase ? (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
          Supabase environment variables are not configured on this site build. Set
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
          {error}
        </p>
      ) : null}
      {info ? (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
          {info}
        </p>
      ) : null}

      {applicantGate === "pending" ? (
        <div className="mt-8 space-y-4 rounded-2xl border border-[#111111]/10 bg-white p-6">
          <p className="text-xs font-bold tracking-[0.25em] text-[#111111]/45 uppercase">
            Application status
          </p>
          <h2 className="text-xl font-extrabold text-[#111111]">Application under review</h2>
          <p className="text-sm text-[#111111]/70">
            Your Cable Network application has already been submitted and is awaiting GONA Super
            Admin review. You cannot submit another application while this one is pending.
          </p>
          {applicationId ? (
            <p className="font-mono text-xs text-[#111111]/50">Ref: {applicationId}</p>
          ) : null}
          <Link
            href={cableSite.productPath}
            className="inline-flex h-11 items-center rounded-full border border-[#111111]/20 bg-white px-6 text-sm font-bold text-[#111111]"
          >
            Back to Cable product
          </Link>
        </div>
      ) : null}

      {applicantGate === "approved" ? (
        <div className="mt-8 space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-extrabold text-emerald-950">
            Your Cable Network is already approved
          </h2>
          <p className="text-sm text-emerald-900">
            This GONA account is linked to an approved Cable Network. Sign in to the Cable Owner
            portal to manage your workspace — do not submit another application here.
          </p>
          <a
            href={cableSite.portalUrl}
            className="inline-flex h-11 items-center rounded-full bg-[#111111] px-6 text-sm font-bold text-[#FFD400]"
          >
            Open Cable Owner Portal
          </a>
        </div>
      ) : null}

      {applicantGate === "lookup_error" ? (
        <div className="mt-8 space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-extrabold text-amber-950">Unable to load application status</h2>
          <p className="text-sm text-amber-950/80">
            We could not verify whether you already have a Cable application. Submission is paused
            until status can be confirmed.
          </p>
          <button
            type="button"
            disabled={busy || !supabase}
            onClick={() => {
              setBusy(true);
              setError(null);
              void (async () => {
                try {
                  await resolveAndRoute();
                } finally {
                  setBusy(false);
                }
              })();
            }}
            className="h-11 rounded-full bg-[#FFD400] px-6 text-sm font-extrabold text-[#111111] disabled:opacity-60"
          >
            {busy ? "Retrying…" : "Try again"}
          </button>
        </div>
      ) : null}

      {showAccountEntry ? (
        <div className="mt-8 space-y-6">
          <div
            className="flex rounded-full border border-[#111111]/12 bg-[#F4F5F7] p-1"
            role="tablist"
            aria-label="Account entry"
          >
            <button
              type="button"
              role="tab"
              aria-selected={authMode === "signup"}
              onClick={() => switchAuthMode("signup")}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                authMode === "signup"
                  ? "bg-[#FFD400] text-[#111111] shadow-sm"
                  : "text-[#111111]/55 hover:text-[#111111]"
              }`}
            >
              Create account
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={authMode === "signin"}
              onClick={() => switchAuthMode("signin")}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                authMode === "signin"
                  ? "bg-[#FFD400] text-[#111111] shadow-sm"
                  : "text-[#111111]/55 hover:text-[#111111]"
              }`}
            >
              Sign in
            </button>
          </div>

          {authMode === "signup" ? (
            <form className="space-y-4" onSubmit={(e) => void createAccount(e)}>
              {(
                [
                  ["name", "Full name", "text"],
                  ["email", "Email", "email"],
                  ["password", "Password", "password"],
                  ["confirmPassword", "Confirm password", "password"],
                ] as const
              ).map(([key, label, type]) => (
                <label key={key} className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#111111]/55">
                    {label}
                  </span>
                  <input
                    required
                    type={type}
                    className="h-11 w-full rounded-xl border border-[#111111]/15 bg-white px-3 text-sm"
                    value={account[key]}
                    onChange={(e) => setAccount((a) => ({ ...a, [key]: e.target.value }))}
                  />
                </label>
              ))}
              <button
                type="submit"
                disabled={busy || !supabase}
                className="h-11 w-full rounded-full bg-[#FFD400] text-sm font-extrabold text-[#111111] disabled:opacity-60"
              >
                {busy ? "Creating…" : "Create GONA account"}
              </button>
              <p className="text-center text-sm text-[#111111]/55">
                Already have a GONA account?{" "}
                <button
                  type="button"
                  onClick={() => switchAuthMode("signin")}
                  className="font-semibold text-[#111111] underline"
                >
                  Sign in
                </button>
              </p>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={(e) => void signInAccount(e)}>
              {(
                [
                  ["email", "Email", "email"],
                  ["password", "Password", "password"],
                ] as const
              ).map(([key, label, type]) => (
                <label key={key} className="block space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wide text-[#111111]/55">
                    {label}
                  </span>
                  <input
                    required
                    type={type}
                    autoComplete={key === "email" ? "email" : "current-password"}
                    className="h-11 w-full rounded-xl border border-[#111111]/15 bg-white px-3 text-sm"
                    value={account[key]}
                    onChange={(e) => setAccount((a) => ({ ...a, [key]: e.target.value }))}
                  />
                </label>
              ))}
              <button
                type="submit"
                disabled={busy || !supabase}
                className="h-11 w-full rounded-full bg-[#FFD400] text-sm font-extrabold text-[#111111] disabled:opacity-60"
              >
                {busy ? "Signing in…" : "Sign in & continue"}
              </button>
              <p className="text-center text-sm text-[#111111]/55">
                New to GONA?{" "}
                <button
                  type="button"
                  onClick={() => switchAuthMode("signup")}
                  className="font-semibold text-[#111111] underline"
                >
                  Create account
                </button>
              </p>
            </form>
          )}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-[#111111]/70">
            We sent a verification link to your email. After verifying, click continue.
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void refreshVerification()}
            className="h-11 w-full rounded-full bg-[#FFD400] text-sm font-extrabold text-[#111111]"
          >
            {busy ? "Checking…" : "I've verified — continue"}
          </button>
        </div>
      ) : null}

      {step === 3 ? (
        <form className="mt-8 space-y-4" onSubmit={continueToReview}>
          {(
            [
              ["ownerFullName", "Owner full name", true],
              ["mobile", "Mobile", true],
              ["proposedDisplayName", "Network display name", true],
              ["legalName", "Legal / business name", false],
              ["businessAddress", "Business address", true],
              ["city", "City", true],
              ["state", "State", true],
              ["postalCode", "PIN / postal code", true],
              ["casProviderInfo", "CAS / provider info", false],
              ["approxCustomerCount", "Approx. customer count", false],
              ["gstin", "GSTIN", false],
            ] as const
          ).map(([key, label, required]) => (
            <label key={key} className="block space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-[#111111]/55">
                {label}
                {required ? "" : " (optional)"}
              </span>
              <input
                required={required}
                className="h-11 w-full rounded-xl border border-[#111111]/15 bg-white px-3 text-sm"
                value={network[key]}
                onChange={(e) => setNetwork((n) => ({ ...n, [key]: e.target.value }))}
              />
            </label>
          ))}
          <button
            type="submit"
            className="h-11 w-full rounded-full bg-[#FFD400] text-sm font-extrabold text-[#111111]"
          >
            Review application
          </button>
        </form>
      ) : null}

      {step === 4 ? (
        <div className="mt-8 space-y-4">
          <dl className="space-y-2 rounded-2xl border border-[#111111]/10 bg-white p-5 text-sm">
            {[
              ["Owner", network.ownerFullName],
              ["Mobile", network.mobile],
              ["Network", network.proposedDisplayName],
              ["Legal name", network.legalName || "—"],
              ["Address", network.businessAddress],
              ["City / State / PIN", `${network.city}, ${network.state} ${network.postalCode}`],
              ["CAS", network.casProviderInfo || "—"],
              ["Customers", network.approxCustomerCount || "—"],
              ["GSTIN", network.gstin || "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-[#111111]/5 py-2 last:border-0">
                <dt className="text-[#111111]/55">{k}</dt>
                <dd className="text-right font-semibold text-[#111111]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="h-11 flex-1 rounded-full border border-[#111111]/20 text-sm font-bold"
            >
              Edit
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void submitApplication()}
              className="h-11 flex-1 rounded-full bg-[#FFD400] text-sm font-extrabold text-[#111111]"
            >
              {busy ? "Submitting…" : "Submit application"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 5 ? (
        <div className="mt-8 space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-lg font-extrabold text-emerald-950">Application submitted</h2>
          <p className="text-sm text-emerald-900">
            GONA Super Admin will review your Cable Network. After approval, sign in at the Cable
            Owner portal with the same email and password.
          </p>
          {applicationId ? (
            <p className="font-mono text-xs text-emerald-900/70">Ref: {applicationId}</p>
          ) : null}
          <a
            href={cableSite.portalUrl}
            className="inline-flex h-11 items-center rounded-full bg-[#111111] px-6 text-sm font-bold text-[#FFD400]"
          >
            Go to Cable Owner sign in
          </a>
        </div>
      ) : null}

      <p className="mt-10 text-center text-sm text-[#111111]/55">
        <Link href={cableSite.productPath} className="font-semibold underline">
          Back to Cable product
        </Link>
      </p>
    </div>
  );
}
