import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// GA4 measurement ID — replace with actual ID when going live
const GA_ID = "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (window.gtag) {
    window.gtag(...args);
  }
}

export function initAnalytics() {
  if (typeof window === "undefined" || GA_ID === "G-XXXXXXXXXX") return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });
}

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
) {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
