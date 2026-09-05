"use client";

import { cloneElement, useMemo, useState, type ReactElement } from "react";

import { Container } from "@/components/ui/container";
import {
  contactReasons,
  getContactReason,
  isValidContactReason,
  type ContactReasonId,
} from "@/config/contact.content";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

type Props = {
  initialReason?: string | null;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  reason: ContactReasonId;
  message: string;
};

export function ContactExperience({ initialReason }: Props) {
  const defaultReason: ContactReasonId = isValidContactReason(initialReason)
    ? initialReason
    : "customer-support";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    reason: defaultReason,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  const selected = getContactReason(form.reason);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `[GONA Website] ${selected?.label ?? "Help"} — ${form.name || "Inquiry"}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "(not provided)"}`,
        `Reason: ${selected?.label ?? form.reason}`,
        "",
        form.message,
      ].join("\n"),
    );
    return `mailto:${siteConfig.supportEmail}?subject=${subject}&body=${body}`;
  }, [form, selected]);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      next.message = "Please share a short message (at least 10 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // Honest fallback — no fake success backend.
    window.location.href = mailtoHref;
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div>
        <h2 className="font-display text-2xl text-gona-black md:text-3xl">
          Choose a reason
        </h2>
        <ul className="mt-5 space-y-2" role="listbox" aria-label="Help reasons">
          {contactReasons.map((reason) => {
            const selectedReason = form.reason === reason.id;
            return (
              <li key={reason.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedReason}
                  onClick={() =>
                    setForm((prev) => ({ ...prev, reason: reason.id }))
                  }
                  className={cn(
                    "w-full rounded-2xl border px-4 py-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow",
                    selectedReason
                      ? "border-gona-black bg-gona-black text-gona-white"
                      : "border-black/10 bg-gona-white text-gona-black hover:border-gona-black/25",
                  )}
                >
                  <span className="block text-sm font-semibold">
                    {reason.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-xs leading-snug",
                      selectedReason ? "text-white/60" : "text-gona-gray",
                    )}
                  >
                    {reason.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <Container className="!px-0">
          <div className="rounded-[1.5rem] border border-black/8 bg-gona-white p-6 md:p-8">
            <h2 className="font-display text-2xl text-gona-black">
              Send a message
            </h2>
            <p className="mt-2 text-sm text-gona-gray">
              Online form delivery is not connected yet. Submitting opens your
              email app with a prefilled message to{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-medium text-gona-black underline-offset-2 hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
              .
            </p>
            {selected?.helper ? (
              <p className="mt-3 rounded-xl bg-[#F3F0E8] px-4 py-3 text-sm text-gona-black/80">
                {selected.helper}
              </p>
            ) : null}

            <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
              <Field
                label="Name"
                id="contact-name"
                error={errors.name}
                required
              >
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={inputClass(errors.name)}
                />
              </Field>

              <Field
                label="Email"
                id="contact-email"
                error={errors.email}
                required
              >
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className={inputClass(errors.email)}
                />
              </Field>

              <Field label="Phone (optional)" id="contact-phone">
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className={inputClass()}
                />
              </Field>

              <Field label="Reason" id="contact-reason" required>
                <select
                  id="contact-reason"
                  name="reason"
                  value={form.reason}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      reason: e.target.value as ContactReasonId,
                    }))
                  }
                  className={inputClass()}
                >
                  {contactReasons.map((reason) => (
                    <option key={reason.id} value={reason.id}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Message"
                id="contact-message"
                error={errors.message}
                required
              >
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className={inputClass(errors.message)}
                />
              </Field>

              <button
                type="submit"
                className="gona-btn gona-btn-primary w-full sm:w-auto"
              >
                Continue via Email →
              </button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  children,
  error,
  required,
}: {
  label: string;
  id: string;
  children: ReactElement<{
    id?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
  error?: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gona-black">
        {label}
        {required ? <span className="text-gona-gray"> *</span> : null}
      </label>
      {cloneElement(children, {
        id,
        "aria-invalid": Boolean(error) || undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-xl border bg-gona-white px-4 py-3 text-sm text-gona-black outline-none transition focus:border-gona-yellow focus:ring-2 focus:ring-gona-yellow/30",
    error ? "border-red-400" : "border-black/15",
  );
}
