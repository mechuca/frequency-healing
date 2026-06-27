"use client";

import Link from "next/link";
import { Play, Square } from "lucide-react";
import { CATEGORY_CLASS, CATEGORY_LABEL, type Product } from "@/data/products";
import { useTonePreview } from "@/lib/audio";
import { haptic } from "@/lib/haptics";
import { useToast } from "@/lib/toast";

export function ProductCard({ product, delay = 0, compact = false }: { product: Product; delay?: number; compact?: boolean }) {
  const { play, stop, isPlaying } = useTonePreview();
  const { showToast } = useToast();
  const firstTrack = product.tracks[0];
  const playing = isPlaying(firstTrack.freq);

  return (
    <article className={`${CATEGORY_CLASS[product.category]} animate-fade-up`} style={{ animationDelay: `${delay}s` }}>
      <div className="group relative">
        <Link href={`/product/${product.slug}`} onClick={() => haptic()} className="block rounded-3xl">
          <div className={`tone-cover card-lift relative overflow-hidden rounded-3xl shadow-[0_30px_80px_-45px_rgba(25,27,25,0.65)] transition duration-300 group-hover:-translate-y-1 ${compact ? "aspect-[6/5]" : "aspect-[4/5]"}`}>
            <div className={`absolute inset-0 flex flex-col justify-between text-paper ${compact ? "p-5" : "p-5 sm:p-6"}`}>
              <div className="data-num text-[11px] uppercase tracking-widest opacity-80">{CATEGORY_LABEL[product.category]}</div>
              <div>
                <CoverWave />
                <h3 className={`mt-4 font-display lowercase leading-none ${compact ? "text-3xl" : "text-3xl sm:text-4xl"}`}>{product.title}</h3>
                <div className="data-num mt-2 text-[11px] opacity-80">{product.tracks.length} {product.tracks.length === 1 ? "track" : "tracks"} · 11:11:11</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start justify-between gap-4 rounded-2xl transition-transform duration-200 group-hover:translate-x-1">
            <div>
              <h3 className="font-display text-xl lowercase leading-tight">{product.title}</h3>
              <div className="data-num mt-1 text-[11px] uppercase tracking-widest text-ink-2">{product.kind}</div>
            </div>
            <div className="data-num text-sm text-ink">${product.priceUsd}</div>
          </div>
        </Link>
        <button
          type="button"
          onClick={async (event) => {
            event.preventDefault();
            event.stopPropagation();
            haptic(playing ? "light" : "medium");
            if (playing) {
              stop();
            } else {
              const result = await play(firstTrack.freq, `${product.title} · ${firstTrack.name}`);
              if (result === "unsupported") showToast({ title: "audio preview is not available", description: "This browser does not support Web Audio previews.", kind: "error" });
              if (result === "blocked") showToast({ title: "tap again to start audio", description: "The browser blocked the first audio request.", kind: "error" });
            }
          }}
          className="tap absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper/15 text-paper backdrop-blur-md transition-colors hover:bg-paper/25"
          aria-label={playing ? `Stop ${product.title} preview` : `Preview ${product.title}`}
        >
          {playing ? <Square className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
        </button>
      </div>
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
