"use client";

import * as React from "react";
import Link from "next/link";

import { cableSite } from "@/config/cable.config";
import { createWebsiteSupabaseClient } from "@/lib/supabase/client";

type Step = 1 | 2 | 3 | 4 | 5;

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

export function CableRegisterWizard() {
  const [step, setStep] = React.useState<Step>(1);
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
      if (user?.email_confirmed_at) {
        setStep(3);
        setNetwork((n) => ({
          ...n,
          ownerFullName: n.ownerFullName || (user.user_metadata?.name as string) || "",
        }));
      } else if (user) {
        setStep(2);
      }
    })();
  }, [supabase]);

  async function createAccount(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
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
      if (data.user && !data.user.email_confirmed_at && !data.session) {
        setInfo("Check your inbox and verify your email, then continue.");
        setStep(2);
      } else if (data.session) {
        setStep(3);
      } else {
        setStep(2);
      }
    } catch {
      setError("Unable to create account.");
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

      if (user?.email_confirmed_at) {
        setStep(3);
        setInfo(null);
        setNetwork((n) => ({
          ...n,
          ownerFullName: n.ownerFullName || (user.user_metadata?.name as string) || "",
        }));
        return;
      }

      if (!user) {
        setError(
          "No signed-in session yet. Open the Confirm Email link from your inbox in this browser — it will bring you back here after verification.",
        );
        return;
      }

      setError(
        "Email is not verified yet. Open the newest Confirm Email link from your inbox in this browser, then click continue.",
      );
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

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-bold tracking-[0.3em] text-[#111111]/55 uppercase">
        GONA Cable · Step {step} of 5 · {stepLabel}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-gona-display)] text-3xl font-extrabold text-[#111111]">
        Register Your Cable Network
      </h1>
      <p className="mt-2 text-sm text-[#111111]/65">
        Create a GONA account, verify email, submit network details. GONA Super Admin reviews before
        your owner workspace opens.
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

      {step === 1 ? (
        <form className="mt-8 space-y-4" onSubmit={(e) => void createAccount(e)}>
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
        </form>
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
