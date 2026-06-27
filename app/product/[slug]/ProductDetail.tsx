"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { CATEGORY_CLASS, CATEGORY_LABEL, type Product } from "@/data/products";
import { TrackRow } from "@/components/TrackRow";
import { useCart } from "@/lib/cart";
import { haptic } from "@/lib/haptics";
import { useToast } from "@/lib/toast";

const PRODUCT_DETAIL_COPY: Record<string, { headline: string; use: string; character: string }> = {
  "deep-work": {
    headline: "Five clean, warm tones for long, uninterrupted work, coding, writing, study, and design.",
    use: "Use this when you want a steady floor of sound behind a full work session, with no beat or melody pulling you back out of the task.",
    character: "Warm, even, grounded, and present without being busy.",
  },
  night: {
    headline: "Five low, grounding tones for the end of the day and the long quiet of night.",
    use: "Use this when you want the lowest part of the catalogue, played softly in the background for winding down or sleeping.",
    character: "Deep, warm, slow, and steady rather than bright.",
  },
  calm: {
    headline: "A softer set for slowing down, reading, breathing, and quiet evenings.",
    use: "Use this when the room needs less edge and more space, without adding rhythm, melody, or movement.",
    character: "Gentle, warm, clear, and easy to leave in the background.",
  },
  "study-hall": {
    headline: "Five clearer tones for reading, revision, problem sets, and alert background listening.",
    use: "Use this when you want something brighter than Deep Work, but still simple enough to stay behind the page.",
    character: "Clear, present, steady, and lightly bright.",
  },
  bright: {
    headline: "The highest, most present tones in the catalogue for a more awake background.",
    use: "Use this when you want the room to feel sharper and more open, especially during short focused sessions or daylight work.",
    character: "High, clean, direct, and intentionally present.",
  },
  "complete-library": {
    headline: "Every tone StillTones makes, across focus, sleep, calm, study, and bright.",
    use: "Use this when you want the full instrument, with a tone for every part of the day and every kind of quiet.",
    character: "The deep low end, the warm mids, the clear study range, and the bright top end in one library.",
  },
  "open-air": {
    headline: "A single clear, mid-bright tone held steady for over eleven hours.",
    use: "Use this when you want one simple study tone without buying a full set.",
    character: "Open, clear, light, and steady.",
  },
  hush: {
    headline: "A single soft, warm tone for quiet moments and low-volume background listening.",
    use: "Use this when you want one gentle tone that can sit behind reading, rest, or the space between things.",
    character: "Soft, warm, rounded, and calm.",
  },
  skyline: {
    headline: "A single bright, high tone with a clean and present character.",
    use: "Use this when you want one more awake background tone without the full Bright set.",
    character: "Bright, clean, high, and direct.",
  },
};

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);
  const detail = PRODUCT_DETAIL_COPY[product.slug];
  const frequencies = product.tracks.map((track) => track.freq.toLocaleString()).join(", ");

  return (
    <main className={`${CATEGORY_CLASS[product.category]} mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-6 md:px-10`}>
      <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-[color:var(--accent-hue)]">{CATEGORY_LABEL[product.category]}</span>
      </div>

      <div className="mt-8 grid gap-12 md:grid-cols-[1.08fr_1fr] md:items-start">
        <section className="tone-cover card-lift relative aspect-[4/5] overflow-hidden rounded-[2rem] animate-fade-up">
          <div className="absolute inset-0 flex flex-col justify-between p-7 text-paper sm:p-9">
            <div className="data-num text-xs uppercase tracking-widest opacity-80">{CATEGORY_LABEL[product.category]} · {product.kind}</div>
            <div>
              <svg viewBox="0 0 260 48" className="w-full opacity-90" aria-hidden="true">
                <path d="M0 24 C 13 5, 26 5, 39 24 S 65 43, 78 24 S 104 5, 117 24 S 143 43, 156 24 S 182 5, 195 24 L 260 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <h1 className="mt-5 font-display text-[clamp(3.4rem,8vw,6.5rem)] lowercase leading-[0.86] tracking-[-0.06em]">{product.title}</h1>
              <div className="data-num mt-4 text-xs opacity-80">{product.tracks.length} {product.tracks.length === 1 ? "track" : "tracks"} · 11:11:11 · FLAC</div>
            </div>
          </div>
        </section>

        <section className="animate-fade-up delay-1">
          <h2 className="font-display text-5xl lowercase leading-none md:text-7xl">{product.title}.</h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink">{detail.headline}</p>
          <p className="mt-4 max-w-md leading-7 text-ink-2">{product.blurb}</p>

          <div className="mt-9 flex items-baseline gap-4">
            <div className="data-num text-4xl text-ink">${product.priceUsd}</div>
            <div className="data-num text-xs uppercase tracking-widest text-ink-2">one-time · lifetime download</div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                haptic("success");
                add(product.slug);
                showToast({ title: `added ${product.title.toLowerCase()} to cart`, kind: "success", action: { label: "View cart", href: "/cart" } });
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1600);
              }}
              className="pill-solid tap bg-[color:var(--accent-hue)] shadow-[0_18px_40px_-24px_var(--accent-hue)]"
            >
              {added ? <><Check className="h-3.5 w-3.5" /> Added</> : <>Add to cart <ArrowRight className="h-3.5 w-3.5" /></>}
            </button>
            <Link href="/cart" className="pill-outline tap">View cart</Link>
          </div>

          <dl className="hairline-t mt-10 grid grid-cols-2 gap-y-3 pt-7 font-mono text-xs text-ink-2">
            <dt>Format</dt><dd className="text-ink">FLAC lossless</dd>
            <dt>Also included</dt><dd className="text-ink">MP3</dd>
            <dt>Sample rate</dt><dd className="text-ink">44.1 kHz</dd>
            <dt>Duration</dt><dd className="text-ink">11:11:11 per track</dd>
            <dt>Amplitude</dt><dd className="text-ink">-6 dBFS</dd>
            <dt>Fade</dt><dd className="text-ink">50 ms in / out</dd>
          </dl>
        </section>
      </div>

      <section className="mt-20 grid gap-5 md:grid-cols-3">
        <InfoCard label="Best for" title="where it sits">
          {detail.use}
        </InfoCard>
        <InfoCard label="Tone character" title="how it feels">
          {detail.character}
        </InfoCard>
        <InfoCard label="Delivery" title="files you keep">
          After purchase, you receive a private download link. Download the FLAC and MP3 files, then keep them forever with no subscription and no expiry.
        </InfoCard>
      </section>

      <section className="mt-5 rounded-[2rem] bg-paper-2 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">What is included</div>
            <h2 className="mt-3 font-display text-4xl lowercase leading-none md:text-5xl">
              {product.kind === "library" ? "the full instrument." : product.kind === "single" ? "one long tone." : "five long tones."}
            </h2>
          </div>
          <dl className="grid gap-4 font-mono text-sm text-ink-2 sm:grid-cols-2">
            <SpecItem label="Tracks" value={`${product.tracks.length} ${product.tracks.length === 1 ? "track" : "tracks"}`} />
            <SpecItem label="Length" value="11 hours 11 minutes each" />
            <SpecItem label="Formats" value="Lossless FLAC + MP3" />
            <SpecItem label="Frequencies" value={`${frequencies} Hz`} />
          </dl>
        </div>
      </section>

      <section className="mt-20">
        <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Tracks · live preview</div>
        <h2 className="mt-3 font-display text-4xl lowercase leading-none md:text-5xl">press play on any tone.</h2>
        <div className="mt-7">
          {product.tracks.map((track, index) => <TrackRow key={`${track.name}-${track.freq}`} track={track} index={index} />)}
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-[1.75rem] bg-paper-2 p-6 transition duration-300 hover:-translate-y-1 hover:bg-paper-3">
      <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">{label}</div>
      <h3 className="mt-5 font-display text-3xl lowercase leading-none">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-ink-2">{children}</p>
    </article>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <dt className="data-num text-[11px] uppercase tracking-widest text-ink-2">{label}</dt>
      <dd className="mt-2 text-ink">{value}</dd>
    </div>
  );
}
