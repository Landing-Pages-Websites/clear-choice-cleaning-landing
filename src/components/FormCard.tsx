"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  CTA,
  PHONE,
  CLEANING_TYPES,
} from "@/lib/content";
import { Icon } from "@/components/icons";
import { isZipInServiceArea, SERVICE_AREA_MESSAGE } from "@/lib/serviceArea";
import { EMAIL_ERROR, EMAIL_MAX_LENGTH, EMAIL_PATTERN, PHONE_ERROR, PHONE_PATTERN, formatPhone } from "@/lib/fields";
import {
  INQUIRY_FIELDS,
  ZIP_PATTERN,
  attempt,
  buildLead,
  pushDataLayer,
  toInquiry,
  validateFields,
  type FieldErrors,
  type Inquiry,
  type InquiryField,
} from "@/lib/quoteForm";

// Submit-level failure copy. Retryable; the phone renders between the two parts
// so it can't wrap, and email stays the written fallback.
const SUBMIT_ERROR_LEAD = "Something went wrong sending your request. Please try again, call";
const SUBMIT_ERROR_TAIL = ", or email us at michael@clearchoicehomecleaningservices.com.";

// Safari reports an IME-confirming Enter as keyCode 229 with isComposing false.
const IME_PROCESS_KEY_CODE = 229;
// Enter keeps its native meaning on these (newline, picker, activation).
const NATIVE_ENTER_TAGS = new Set(["TEXTAREA", "SELECT", "BUTTON", "A"]);

type FormState = Inquiry & { smsConsent: boolean };

const INITIAL: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  zip_code: "",
  cleaning_type: "",
  smsConsent: false,
};

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
  const [submitFailed, setSubmitFailed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  // Out-of-area ZIP block. Independent of submitFailed so both can be shown/
  // cleared on their own. Cleared the moment the ZIP is edited.
  const [serviceAreaBlocked, setServiceAreaBlocked] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  // Synchronous re-entrancy latch — a rapid click burst yields exactly ONE fire.
  // Stays set after a confirmed lead; only a failure releases it for a retry.
  const inFlightRef = useRef(false);
  const formId = `${idPrefix}-quote-form`;

  const update = (k: InquiryField, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setFieldErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const fireTracking = (route: string, qualified: boolean, inquiry: Inquiry) => {
    const payload = { form_route: route, qualified };
    // Mega optimizer event FIRST, then the GTM dataLayer signal. Only the MegaTag
    // form_submit carries the form identity and the six inquiry fields.
    attempt(() => window.MegaTag?.trackEvent?.("form_submit", { ...payload, elementId: formId, formData: inquiry }));
    attempt(() => pushDataLayer({ event: "form_submit", ...payload }));
    // Conversion signal only fires for qualified leads.
    if (!qualified) return;
    attempt(() => window.MegaTag?.trackEvent?.("qualified_lead", payload));
    attempt(() => pushDataLayer({ event: "qualified_lead", ...payload }));
  };

  const performSubmit = async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setSubmitting(true);
    setSubmitFailed(false);
    // Every confirmed lead qualifies — the rate screening question was removed.
    const qualified = true;
    const route = routeSlug || window.location.pathname;
    const inquiry = toInquiry(data);
    const lead = buildLead(inquiry, data.smsConsent, qualified, route);
    try {
      // A 2xx with a body that isn't {ok:true} is still a dropped lead.
      const res = await submit(lead);
      if (res?.ok !== true) throw new Error("Submission not confirmed by server.");
    } catch (err) {
      console.error("Form submission error:", err);
      // The LEAD would be dropped: keep the form and values, surface a retryable
      // error and fire NO tracking so we never bill a phantom conversion.
      inFlightRef.current = false;
      setSubmitFailed(true);
      setSubmitting(false);
      return;
    }
    // Confirmed: thank-you first, then tracking that can no longer undo it.
    setSubmitting(false);
    setSubmitted(true);
    fireTracking(route, qualified, inquiry);
  };

  // Validate FIRST, then the ZIP guard, then send directly. The page never
  // raises a native submit, so the optimizer's capture listener never fires a
  // form_submit of its own; the only one is fireTracking's, after acceptance.
  const handleValidateAndSubmit = () => {
    const errors = validateFields(data);
    // Commit aria-invalid/aria-describedby before focus so the error is announced.
    flushSync(() => setFieldErrors(errors));
    const firstInvalid = INQUIRY_FIELDS.find((k) => errors[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // A rapid click burst just re-sets the same flag and returns each time.
    if (!isZipInServiceArea(data.zip_code)) {
      setServiceAreaBlocked(true);
      return;
    }
    void performSubmit();
  };

  // Enter is stopped on keydown, before the browser dispatches implicit submission.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing || e.keyCode === IME_PROCESS_KEY_CODE) return;
    if (NATIVE_ENTER_TAGS.has((e.target as HTMLElement).tagName)) return;
    e.preventDefault();
    handleValidateAndSubmit();
  };

  // Backstop for a native submit raised outside the page's own paths: same gate.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidateAndSubmit();
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
      id={formId}
      noValidate
      onSubmit={onSubmit}
      onKeyDown={handleKeyDown}
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
          error={fieldErrors.first_name}
        />
        <Field
          id={`${idPrefix}-last_name`}
          name="last_name"
          label="Last Name"
          autoComplete="family-name"
          value={data.last_name}
          onChange={(v) => update("last_name", v)}
          disabled={submitting}
          error={fieldErrors.last_name}
        />
      </div>

      <Field
        id={`${idPrefix}-email`}
        name="email"
        label="Email Address"
        type="email"
        inputMode="email"
        pattern={EMAIL_PATTERN}
        maxLength={EMAIL_MAX_LENGTH}
        autoComplete="email"
        value={data.email}
        onChange={(v) => update("email", v)}
        disabled={submitting}
        error={fieldErrors.email}
        title={EMAIL_ERROR}
        spellCheck={false}
        autoCapitalize="none"
      />

      <Field
        id={`${idPrefix}-phone`}
        name="phone"
        label="Phone Number"
        type="tel"
        inputMode="numeric"
        pattern={PHONE_PATTERN}
        autoComplete="tel-national"
        placeholder="(555) 555-5555"
        value={data.phone}
        onChange={(v) => update("phone", formatPhone(v))}
        disabled={submitting}
        error={fieldErrors.phone}
        title={PHONE_ERROR}
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
        onChange={(v) => {
          // Editing the ZIP clears the block so the visitor can correct it.
          if (serviceAreaBlocked) setServiceAreaBlocked(false);
          update("zip_code", v.replace(/\D/g, "").slice(0, 5));
        }}
        disabled={submitting}
        error={fieldErrors.zip_code}
        ariaInvalid={serviceAreaBlocked}
        ariaDescribedBy={serviceAreaBlocked ? `${idPrefix}-zip_code-service-area-error` : undefined}
      />
      {serviceAreaBlocked && (
        <p
          id={`${idPrefix}-zip_code-service-area-error`}
          role="alert"
          aria-live="polite"
          className="lp-field-error !mt-0 rounded-lg border border-[var(--color-error)]/35 bg-[#fef3f2] px-3.5 py-2.5"
        >
          {SERVICE_AREA_MESSAGE}
        </p>
      )}

      <SelectField
        id={`${idPrefix}-cleaning_type`}
        name="cleaning_type"
        label="What type of cleaning are you looking for?"
        placeholder="Select a service"
        options={CLEANING_TYPES}
        value={data.cleaning_type}
        onChange={(v) => update("cleaning_type", v)}
        disabled={submitting}
        error={fieldErrors.cleaning_type}
      />

      {submitFailed && (
        <p
          role="alert"
          aria-live="polite"
          className="lp-field-error !mt-0 rounded-lg border border-[var(--color-error)]/35 bg-[#fef3f2] px-3.5 py-2.5"
        >
          {SUBMIT_ERROR_LEAD} <span className="whitespace-nowrap">{PHONE}</span>
          {SUBMIT_ERROR_TAIL}
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
  inputMode?: "numeric" | "text" | "email";
  pattern?: string;
  maxLength?: number;
  placeholder?: string;
  autoComplete?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
  error?: string;
  title?: string;
  spellCheck?: boolean;
  autoCapitalize?: string;
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
  ariaInvalid,
  ariaDescribedBy,
  error,
  title,
  spellCheck,
  autoCapitalize,
}: FieldProps) {
  const errorId = `${id}-error`;
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
        className={error ? `${FIELD_CLS} lp-input-error` : FIELD_CLS}
        disabled={disabled}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={error ? errorId : ariaDescribedBy}
        title={title}
        spellCheck={spellCheck}
        autoCapitalize={autoCapitalize}
      />
      {error && (
        <p id={errorId} className="lp-field-error">
          {error}
        </p>
      )}
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
  error?: string;
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
  error,
}: SelectFieldProps) {
  const errorId = `${id}-error`;
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
          className={`${FIELD_CLS} appearance-none pr-9 ${value ? "" : "text-[var(--color-muted)]"}${error ? " lp-input-error" : ""}`}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
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
      {error && (
        <p id={errorId} className="lp-field-error">
          {error}
        </p>
      )}
    </div>
  );
}
