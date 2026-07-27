import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "ag-cookie-consent";

type Choice = "accepted" | "rejected";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (choice: Choice) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, timestamp: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("ag:cookie-consent", { detail: { choice } }),
    );
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6 animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-background/80 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3 sm:flex-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-brand">
              <Cookie className="h-5 w-5" />
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">We value your privacy</p>
              <p className="mt-1 leading-relaxed">
                We use cookies to improve your experience, analyze traffic, and personalize content.
                See our{" "}
                <Link to="/privacy" className="font-medium text-primary underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              onClick={() => save("rejected")}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Reject optional
            </button>
            <button
              onClick={() => save("accepted")}
              className="inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-white shadow-brand transition-transform hover:scale-[1.02]"
            >
              Accept all
            </button>
            <button
              onClick={() => save("rejected")}
              aria-label="Dismiss"
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
