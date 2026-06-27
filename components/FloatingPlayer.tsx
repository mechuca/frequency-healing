"use client";

import { Square } from "lucide-react";
import { useTonePreview } from "@/lib/audio";
import { Oscilloscope } from "./Oscilloscope";

export function FloatingPlayer() {
  const { playing, freq, name, stop } = useTonePreview();
  if (!playing) return null;

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-50 rounded-3xl bg-graphite p-3 text-paper shadow-[0_30px_90px_-35px_rgba(0,0,0,0.8)] sm:left-auto sm:w-[320px] animate-fade-up">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate font-display text-base lowercase">{name}</div>
          <div className="data-num text-[11px] text-paper/60">{freq?.toFixed(0)} Hz · 11s preview</div>
        </div>
        <button onClick={stop} className="tap flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper/10 hover:bg-paper/15" aria-label="Stop preview">
          <Square className="h-3.5 w-3.5" fill="currentColor" />
        </button>
      </div>
      <div className="mt-3 rounded-2xl bg-paper/5 px-3 py-2">
        <Oscilloscope active height={30} color="#ffffff" />
      </div>
    </aside>
  );
}
