"use client";

import { useEffect, useCallback, useRef } from "react";
import { FORM } from "@/lib/content";
import { INQUIRY_FIELDS, hasInquiryShape, toInquiry, validateFields } from "@/lib/quoteForm";

const CONFIG = {
  CUSTOMER_ID: FORM.customerId,
  SITE_ID: FORM.siteId,
  SOURCE_PROVIDER: FORM.sourceProvider,
  ENDPOINT: "https://analytics.gomega.ai/submission/submit",
};

const STORAGE_KEYS = {
  VISITOR_ID: "_mega_vid",
  SESSION_ID: "_mega_sid",
  ATTRIBUTION: "_mega_attr",
};

interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
}

interface SubmissionResponse {
  ok: boolean;
  id?: string;
}

const generateId = (prefix: string): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  )}`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const getVisitorId = (): string => {
  if (typeof localStorage === "undefined") return generateId("vis");
  let visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);
  if (!visitorId) {
    visitorId = generateId("vis");
    localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
  }
  return visitorId;
};

const getSessionId = (): string => {
  if (typeof sessionStorage === "undefined") return generateId("sess");
  let sessionId = sessionStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sessionId) {
    sessionId = generateId("sess");
    sessionStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }
  return sessionId;
};

const captureAttribution = (): Attribution => {
  if (typeof window === "undefined") {
    return {
      utm_source: null, utm_medium: null, utm_campaign: null,
      utm_term: null, utm_content: null, gclid: null,
      gbraid: null, wbraid: null, fbclid: null, fbp: null, fbc: null,
    };
  }
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const attribution: Attribution = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    gclid: params.get("gclid"),
    gbraid: params.get("gbraid"),
    wbraid: params.get("wbraid"),
    fbclid: params.get("fbclid"),
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
  if (attribution.fbclid && !attribution.fbc) {
    attribution.fbc = `fb.1.${Date.now()}.${attribution.fbclid}`;
  }
  return attribution;
};

const initAttribution = (): Attribution => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return captureAttribution();
  }
  const trackingParams = ["utm_source", "gclid", "fbclid", "gbraid", "wbraid"];
  const url = new URL(window.location.href);
  const hasTrackingParams = trackingParams.some((p) => url.searchParams.has(p));
  if (hasTrackingParams) {
    const attr = captureAttribution();
    localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(attr));
    return attr;
  }
  const stored = localStorage.getItem(STORAGE_KEYS.ATTRIBUTION);
  if (stored) {
    try { return JSON.parse(stored) as Attribution; } catch { /* noop */ }
  }
  const attr = captureAttribution();
  localStorage.setItem(STORAGE_KEYS.ATTRIBUTION, JSON.stringify(attr));
  return attr;
};

/** Defense in depth: the form's own six-field validator decides before anything is
 *  sent. Returns the lead's form_data: the payload with the six fields normalized
 *  exactly as the form does. The caller's object is never modified. */
const validateLeadFields = (formData: Record<string, unknown>): Record<string, unknown> => {
  // One read per field: what was judged is exactly what gets sent.
  const fields: Record<string, unknown> = Object.fromEntries(INQUIRY_FIELDS.map((k) => [k, formData[k]]));
  if (!hasInquiryShape(fields)) {
    const nonText = INQUIRY_FIELDS.filter((k) => typeof fields[k] !== "string");
    throw new Error(`Lead fields must be text: ${nonText.join(", ")}`);
  }
  const messages = Object.values(validateFields(fields));
  if (messages.length > 0) {
    throw new Error(messages.join("; "));
  }
  return { ...formData, ...toInquiry(fields) };
};

interface UseMegaLeadFormReturn {
  submit: (formData: Record<string, unknown>) => Promise<SubmissionResponse>;
  isReady: boolean;
}

export const useMegaLeadForm = (): UseMegaLeadFormReturn => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      initAttribution();
      isInitialized.current = true;
    }
  }, []);

  const submit = useCallback(
    async (formData: Record<string, unknown>): Promise<SubmissionResponse> => {
      const leadData = validateLeadFields(formData);
      const attribution = initAttribution();

      const payload = {
        customer_id: CONFIG.CUSTOMER_ID,
        site_id: CONFIG.SITE_ID,
        source_provider: CONFIG.SOURCE_PROVIDER,
        form_data: leadData,
        url: window.location.href,
        referrer_url: document.referrer || null,
        session_id: getSessionId(),
        visitor_id: getVisitorId(),
        ...attribution,
      };

      const response = await fetch(CONFIG.ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (!json || json.ok !== true) {
        throw new Error(`Submission rejected: ${JSON.stringify(json)?.slice(0, 200)}`);
      }
      return json;
    },
    []
  );

  return { submit, isReady: typeof window !== "undefined" };
};

export default useMegaLeadForm;
