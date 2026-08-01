declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires the Google Ads lead-form conversion event. Safe no-op if gtag isn't loaded. */
export function trackLeadFormSubmit(params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "manual_event_SUBMIT_LEAD_FORM", params);
}

export {};
