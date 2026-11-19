// Quote-form rules shared by both FormCard instances: the one submit-gate
// validator (built on the pinned src/lib/fields.ts) and post-acceptance
// tracking helpers. DOM-free apart from the window tracking globals.

import { CLEANING_TYPES } from "@/lib/content";
import {
  EMAIL_ERROR,
  PHONE_ERROR,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
  phoneDigits,
} from "@/lib/fields";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (event: string, payload?: Record<string, unknown>) => unknown;
    };
  }
}

export const ZIP_PATTERN = "\\d{5}";
const ZIP_REGEX = new RegExp(`^${ZIP_PATTERN}$`);
const TEXT_MAX_LENGTH = 200;

/** The six required visitor fields, in form order. */
export const INQUIRY_FIELDS = ["first_name", "last_name", "email", "phone", "zip_code", "cleaning_type"] as const;
export type InquiryField = (typeof INQUIRY_FIELDS)[number];
export type Inquiry = Record<InquiryField, string>;
export type FieldErrors = Partial<Record<InquiryField, string>>;

const FIRST_NAME_ERROR = "Enter your first name";
const LAST_NAME_ERROR = "Enter your last name";
const ZIP_ERROR = "Enter a 5-digit ZIP code";
const CLEANING_TYPE_ERROR = "Select a type of cleaning";

function isValidText(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= TEXT_MAX_LENGTH;
}

/** For an untyped programmatic payload (the hook's submit): every declared field must
 *  already be a string. Nothing is coerced, so null, numbers, arrays or objects stay
 *  invalid instead of turning into valid-looking text. */
export function hasInquiryShape(record: Record<string, unknown>): record is Inquiry {
  return INQUIRY_FIELDS.every((k) => typeof record[k] === "string");
}

/** The one validator for every submit path (button, Enter, onSubmit backstop, hook). */
export function validateFields(values: Inquiry): FieldErrors {
  const errors: FieldErrors = {};
  if (!isValidText(values.first_name)) errors.first_name = FIRST_NAME_ERROR;
  if (!isValidText(values.last_name)) errors.last_name = LAST_NAME_ERROR;
  if (!isValidEmail(values.email)) errors.email = EMAIL_ERROR;
  if (!isValidPhone(values.phone)) errors.phone = PHONE_ERROR;
  if (!ZIP_REGEX.test(values.zip_code)) errors.zip_code = ZIP_ERROR;
  if (!CLEANING_TYPES.includes(values.cleaning_type)) errors.cleaning_type = CLEANING_TYPE_ERROR;
  return errors;
}

/** Normalized inquiry values, exactly as the lead request sends them. */
export function toInquiry(values: Inquiry): Inquiry {
  return {
    first_name: values.first_name.trim(),
    last_name: values.last_name.trim(),
    email: normalizeEmail(values.email),
    phone: phoneDigits(values.phone),
    zip_code: values.zip_code.trim(),
    cleaning_type: values.cleaning_type,
  };
}

const PRIVACY_POLICY_URL = "https://book.clearchoicehomecleaningservices.com/privacy-policy";
const TERMS_URL = "https://book.clearchoicehomecleaningservices.com/terms-and-conditions";

const SMS_CONSENT_TEXT =
  "By checking this box, you agree to receive SMS customer-care messages from Clear Choice Home Cleaning Services, including quote follow-ups, appointment confirmations, scheduling reminders, and service updates. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Your mobile information will not be sold or shared with third parties for promotional or marketing purposes.";

/** The lead request body: six normalized inquiry fields, then the unchanged consent/route metadata. */
export function buildLead(
  inquiry: Inquiry,
  smsConsent: boolean,
  qualified: boolean,
  route: string,
): Record<string, unknown> {
  return {
    ...inquiry,
    smsConsent,
    smsConsentText: smsConsent
      ? `${SMS_CONSENT_TEXT} Privacy Policy: ${PRIVACY_POLICY_URL} | Terms & Conditions: ${TERMS_URL}`
      : "Not provided",
    qualified,
    route_slug: route,
  };
}

/** The lead is already saved: a tag that throws or rejects must never read as a
 *  failed submit, nor stop the next ordered call. */
export function attempt(fire: () => unknown): void {
  try {
    Promise.resolve(fire()).catch(() => undefined);
  } catch {
    // Swallowed on purpose; see above.
  }
}

/** Returns push()'s result: GTM replaces push, so attempt() must see any rejection. */
export function pushDataLayer(entry: Record<string, unknown>): unknown {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer.push(entry);
}
