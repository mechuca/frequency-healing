"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  return (
    <section className="hairline-t bg-paper px-5 py-20 sm:px-6 md:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-paper-2 p-6 sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:items-end lg:p-10">
        <div>
          <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Free tool</div>
          <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">new sets, now and then. no noise.</h2>
          <p className="mt-6 max-w-xl leading-7 text-ink-2">Use the free tone generator, then join the quiet list for new sets and release notes.</p>
          <Link href="/tools" className="pill-outline tap mt-7 w-fit">
            Open tone generator
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <form
          className="rounded-[1.75rem] bg-paper p-4 shadow-[0_24px_80px_-60px_rgba(25,27,25,0.5)] sm:p-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setStatus("loading");
            setMessage("");
            const response = await fetch("/api/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            if (response.ok) {
              setStatus("success");
              setMessage("You are on the list.");
              setEmail("");
              return;
            }
            const body = (await response.json().catch(() => null)) as { error?: string } | null;
            setStatus("error");
            setMessage(body?.error ?? "Subscription is not configured yet.");
          }}
        >
          <label htmlFor="newsletter-email" className="data-num text-[11px] uppercase tracking-widest text-ink-2">Email</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="min-h-12 flex-1 rounded-full border border-hairline bg-paper-2 px-4 font-mono text-sm text-ink outline-none transition focus:border-ink"
            />
            <button type="submit" disabled={status === "loading"} className="pill-solid tap disabled:pointer-events-none disabled:opacity-60">
              {status === "loading" ? "Subscribing" : "Subscribe"}
            </button>
          </div>
          {message ? <p className={`mt-4 text-sm ${status === "success" ? "text-ink" : "text-cat-energy"}`}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
