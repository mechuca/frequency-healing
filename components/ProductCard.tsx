"use client";

import Link from "next/link";
import { Play, Square } from "lucide-react";
import { CATEGORY_CLASS, CATEGORY_LABEL, type Product } from "@/data/products";
import { useTonePreview } from "@/lib/audio";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const { play, stop, isPlaying } = useTonePreview();
  const firstTrack = product.tracks[0];
  const playing = isPlaying(firstTrack.freq);

  return (
    <article className={`${CATEGORY_CLASS[product.category]} animate-fade-up group`} style={{ animationDelay: `${delay}s` }}>
      <div className="tone-cover relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_80px_-45px_rgba(25,27,25,0.65)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-paper sm:p-6">
          <div className="data-num text-[11px] uppercase tracking-widest opacity-80">{CATEGORY_LABEL[product.category]}</div>
          <div>
            <CoverWave />
            <h3 className="mt-4 font-display text-3xl lowercase leading-none sm:text-4xl">{product.title}</h3>
            <div className="data-num mt-2 text-[11px] opacity-80">{product.tracks.length} {product.tracks.length === 1 ? "track" : "tracks"} · 11:11:11</div>
          </div>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            if (playing) {
              stop();
            } else {
              play(firstTrack.freq, `${product.title} · ${firstTrack.name}`);
            }
          }}
          className="tap absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper/15 text-paper backdrop-blur-md hover:bg-paper/25"
          aria-label={playing ? `Stop ${product.title} preview` : `Preview ${product.title}`}
        >
          {playing ? <Square className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
        </button>
      </div>
      <Link href={`/product/${product.slug}`} className="mt-4 flex items-start justify-between gap-4 rounded-2xl">
        <div>
          <h3 className="font-display text-xl lowercase leading-tight">{product.title}</h3>
          <div className="data-num mt-1 text-[11px] uppercase tracking-widest text-ink-2">{product.kind}</div>
        </div>
        <div className="data-num text-sm text-ink">${product.priceUsd}</div>
      </Link>
    </article>
  );
}

function CoverWave() {
  return (
    <svg viewBox="0 0 220 40" className="w-full opacity-90" aria-hidden="true">
      <path d="M0 20 C 11 4, 22 4, 33 20 S 55 36, 66 20 S 88 4, 99 20 S 121 36, 132 20 S 154 4, 165 20 L 220 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
