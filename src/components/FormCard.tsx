"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  CTA,
  PHONE,
  CLEANING_TYPES,
  RATE_QUESTION_LABEL,
  RATE_OPTIONS,
} from "@/lib/content";
import { Icon } from "@/components/icons";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

// Submit-level failure copy. Retryable, and points to email as the fallback.
const SUBMIT_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again, or email us at michael@clearchoicehomecleaningservices.com.";

// Email pattern also lives on the <input> so native validation enforces it.
const EMAIL_PATTERN = "[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}";
const PHONE_PATTERN = "\\(\\d{3}\\) \\d{3}-\\d{4}";
const ZIP_PATTERN = "\\d{5}";

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  zip_code: string;
  cleaning_type: string;
  rate_alignment: string;
  smsConsent: boolean;
}

const INITIAL: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  zip_code: "",
  cleaning_type: "",
  rate_alignment: "",
  smsConsent: false,
};

const PRIVACY_POLICY_URL = "https://book.clearchoicehomecleaningservices.com/privacy-policy";
const TERMS_URL = "https://book.clearchoicehomecleaningservices.com/terms-and-conditions";

const SMS_CONSENT_TEXT =
  "By checking this box, you agree to receive SMS customer-care messages from Clear Choice Home Cleaning Services, including quote follow-ups, appointment confirmations, scheduling reminders, and service updates. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Your mobile information will not be sold or shared with third parties for promotional or marketing purposes.";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

interface FormCardProps {
  idPrefix?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  routeSlug?: string;
  thankYouBody?: string;
}

export function FormCard({
  idPrefix = "hero",
  heading = "Get your free cleaning quote",
  subheading = "Tell us the space and your date — we'll send a clear, no-obligation quote.",
  submitLabel = CTA.primary,
  routeSlug,
  thankYouBody = "Thanks — your quote request is in. Michael or the Clear Choice team will reach out to confirm the details and get you scheduled.",
}: FormCardProps) {
  const { submit } = useMegaLeadForm();
  const [data, setData] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  // Synchronous re-entrancy latch — a rapid click burst yields exactly ONE fire.
  const inFlightRef = useRef(false);

  const update = (k: keyof FormState, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  const fireTracking = (qualified: boolean) => {
    if (typeof window === "undefined") return;
    const route = routeSlug || window.location.pathname;
    const payload = { form_route: route, qualified };
    // Mega optimizer event FIRST, then the GTM dataLayer signal — for ALL submits.
    window.MegaTag?.trackEvent?.("form_submit", payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submit", ...payload });
    // Conversion signal only fires for qualified leads.
    if (qualified) {
      window.MegaTag?.trackEvent?.("qualified_lead", payload);
      window.dataLayer.push({ event: "qualified_lead", ...payload });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlightRef.current || submitted) return;
    inFlightRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    const qualified = data.rate_alignment !== "No";
    try {
      const res = await submit({
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
        zip_code: data.zip_code.trim(),
        cleaning_type: data.cleaning_type,
        rate_alignment: data.rate_alignment,
        smsConsent: data.smsConsent,
        smsConsentText: data.smsConsent
          ? `${SMS_CONSENT_TEXT} Privacy Policy: ${PRIVACY_POLICY_URL} | Terms & Conditions: ${TERMS_URL}`
          : "Not provided",
        qualified,
        route_slug: routeSlug || (typeof window !== "undefined" ? window.location.pathname : "/"),
      });
      // A 2xx with a body that isn't {ok:true} is still a dropped lead. Only
      // confirmed success fires conversions and shows the thank-you card.
      if (res?.ok !== true) {
        throw new Error("Submission not confirmed by server.");
      }
      fireTracking(qualified);
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      // The visitor is fine, but the LEAD would be dropped: surface a retryable
      // error and fire NO tracking so we never bill a phantom conversion.
      setSubmitError(SUBMIT_ERROR_MESSAGE);
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  // Validate FIRST (native), then submit. Button is type="button" so the
  // optimizer's capture-phase listener never fires on an empty/invalid click.
  const handleValidateAndSubmit = () => {
    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.requestSubmit();
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white border border-[var(--color-border)] shadow-card-lg p-8 md:p-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
            <Icon name="check" className="h-7 w-7 text-[var(--color-primary)]" strokeWidth={2.4} />
          </div>
          <h3 className="t-h3 text-[var(--color-ink)]">Quote request received.</h3>
          <p className="text-[var(--color-muted)] leading-relaxed">{thankYouBody}</p>
          <p className="text-[var(--color-muted)]">
            Prefer to talk now? Call{" "}
            <span className="font-semibold text-[var(--color-ink)] whitespace-nowrap">{PHONE}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      aria-label="Request a free cleaning quote"
      className="rounded-2xl bg-white border border-[var(--color-border)] shadow-card-lg p-6 md:p-7 space-y-3.5"
    >
      <div className="space-y-1.5">
        <h3 className="t-h3 text-[var(--color-ink)] leading-tight">{heading}</h3>
        <p className="text-[15px] text-[var(--color-muted)] leading-snug">{subheading}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field
          id={`${idPrefix}-first_name`}
          name="first_name"
          label="First Name"
          autoComplete="given-name"
          value={data.first_name}
          onChange={(v) => update("first_name", v)}
          disabled={submitting}
        />
        <Field
          id={`${idPrefix}-last_name`}
          name="last_name"
          label="Last Name"
          autoComplete="family-name"
          value={data.last_name}
          onChange={(v) => update("last_name", v)}
          disabled={submitting}
        />
      </div>

      <Field
        id={`${idPrefix}-email`}
        name="email"
        label="Email Address"
        type="email"
        pattern={EMAIL_PATTERN}
        autoComplete="email"
        value={data.email}
        onChange={(v) => update("email", v)}
        disabled={submitting}
      />

      <Field
        id={`${idPrefix}-phone`}
        name="phone"
        label="Phone Number"
        type="tel"
        inputMode="numeric"
        pattern={PHONE_PATTERN}
        autoComplete="tel"
        placeholder="(555) 555-5555"
        value={data.phone}
        onChange={(v) => update("phone", formatPhone(v))}
        disabled={submitting}
      />

      <Field
        id={`${idPrefix}-zip_code`}
        name="zip_code"
        label="ZIP Code"
        inputMode="numeric"
        pattern={ZIP_PATTERN}
        maxLength={5}
        autoComplete="postal-code"
        placeholder="30004"
        value={data.zip_code}
        onChange={(v) => update("zip_code", v.replace(/\D/g, "").slice(0, 5))}
        disabled={submitting}
      />

      <SelectField
        id={`${idPrefix}-cleaning_type`}
        name="cleaning_type"
        label="What type of cleaning are you looking for?"
        placeholder="Select a service"
        options={CLEANING_TYPES}
        value={data.cleaning_type}
        onChange={(v) => update("cleaning_type", v)}
        disabled={submitting}
      />

      <SelectField
        id={`${idPrefix}-rate_alignment`}
        name="rate_alignment"
        label={RATE_QUESTION_LABEL}
        placeholder="Select one"
        options={RATE_OPTIONS}
        value={data.rate_alignment}
        onChange={(v) => update("rate_alignment", v)}
        disabled={submitting}
      />

      {/* SMS opt-in (optional — never required, never blocks submit) */}
      <div>
        <label
          htmlFor={`${idPrefix}-smsConsent`}
          className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed text-[var(--color-muted)]"
        >
          <input
            id={`${idPrefix}-smsConsent`}
            name="smsConsent"
            type="checkbox"
            checked={data.smsConsent}
            onChange={(e) => setData((d) => ({ ...d, smsConsent: e.target.checked }))}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--color-border)] accent-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/40"
            disabled={submitting}
          />
          <span>
            {SMS_CONSENT_TEXT}{" "}
            <a
              href="/privacy-policy"
              className="font-semibold text-[var(--color-primary)] underline"
            >
              Privacy Policy
            </a>
            {" | "}
            <a
              href="/terms-and-conditions"
              className="font-semibold text-[var(--color-primary)] underline"
            >
              Terms &amp; Conditions
            </a>
          </span>
        </label>
        <p className="mt-1.5 pl-[1.625rem] text-[12px] leading-relaxed text-[var(--color-muted)]">
          Optional. You can submit this form without opting in to text messages.
        </p>
      </div>

      {submitError && (
        <p
          role="alert"
          aria-live="polite"
          className="lp-field-error !mt-0 rounded-lg border border-[var(--color-error)]/35 bg-[#fef3f2] px-3.5 py-2.5"
        >
          {submitError}
        </p>
      )}

      <button
        type="button"
        onClick={handleValidateAndSubmit}
        disabled={submitting || submitted}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-base font-bold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] active:translate-y-0 active:bg-[var(--color-accent-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:translate-y-0"
      >
        {submitting ? "Sending…" : submitLabel}
        {!submitting && <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />}
      </button>

      <p className="text-center text-[13px] leading-relaxed text-[var(--color-muted)]">
        No spam — we only use your details to prepare your quote.
      </p>
    </form>
  );
}

// ─── Field primitives ───

const FIELD_CLS =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-muted)] transition-colors focus:border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/40";

interface FieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  type?: string;
  inputMode?: "numeric" | "text";
  pattern?: string;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  disabled,
  type = "text",
  inputMode,
  pattern,
  maxLength,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-[var(--color-ink)]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD_CLS}
        disabled={disabled}
      />
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}

function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-[var(--color-ink)]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${FIELD_CLS} appearance-none pr-9 ${value ? "" : "text-[var(--color-muted)]"}`}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-[var(--color-ink)]">
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
