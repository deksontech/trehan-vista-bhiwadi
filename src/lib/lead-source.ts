export function collectLeadSource() {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);

  return {
    pageUrl: window.location.href,
    referrer: document.referrer,
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
  };
}
