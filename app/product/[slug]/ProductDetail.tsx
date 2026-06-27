"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { CATEGORY_CLASS, CATEGORY_LABEL, type Product } from "@/data/products";
import { TrackRow } from "@/components/TrackRow";
import { useCart } from "@/lib/cart";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <main className={`${CATEGORY_CLASS[product.category]} mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-6 md:px-10`}>
      <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-[color:var(--accent-hue)]">{CATEGORY_LABEL[product.category]}</span>
      </div>

      <div className="mt-8 grid gap-12 md:grid-cols-[1.08fr_1fr] md:items-start">
        <section className="tone-cover relative aspect-[4/5] overflow-hidden rounded-[2rem] animate-fade-up">
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
          <p className="mt-6 max-w-md leading-7 text-ink-2">{product.blurb}</p>

          <div className="mt-9 flex items-baseline gap-4">
            <div className="data-num text-4xl text-ink">${product.priceUsd}</div>
            <div className="data-num text-xs uppercase tracking-widest text-ink-2">one-time · lifetime download</div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                add(product.slug);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1600);
              }}
              className="pill-solid tap bg-[color:var(--accent-hue)]"
            >
              {added ? <><Check className="h-3.5 w-3.5" /> Added</> : <>Add to cart <ArrowRight className="h-3.5 w-3.5" /></>}
            </button>
            <Link href="/cart" className="pill-outline tap">View cart</Link>
          </div>

          <dl className="hairline-t mt-10 grid grid-cols-2 gap-y-3 pt-7 font-mono text-xs text-ink-2">
            <dt>Format</dt><dd className="text-ink">FLAC lossless</dd>
            <dt>Sample rate</dt><dd className="text-ink">44.1 kHz</dd>
            <dt>Duration</dt><dd className="text-ink">11:11:11 per track</dd>
            <dt>Amplitude</dt><dd className="text-ink">-6 dBFS</dd>
            <dt>Fade</dt><dd className="text-ink">50 ms in / out</dd>
          </dl>
        </section>
      </div>

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
