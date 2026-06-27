"use client";

import { Play, Square } from "lucide-react";
import type { Track } from "@/data/products";
import { useTonePreview } from "@/lib/audio";
import { Oscilloscope } from "./Oscilloscope";

export function TrackRow({ track, index }: { track: Track; index: number }) {
  const { play, stop, isPlaying } = useTonePreview();
  const playing = isPlaying(track.freq);

  return (
    <div className="hairline-b grid gap-4 py-5 sm:grid-cols-[40px_1fr_96px_110px_44px] sm:items-start">
      <div className="data-num text-[11px] text-ink-2 sm:pt-1">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <div className="font-display text-xl lowercase leading-tight">{track.name}</div>
        {track.desc ? <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-2">{track.desc}</p> : null}
      </div>
      <div className="data-num text-sm text-[color:var(--accent-hue)] sm:pt-1">{track.freq.toLocaleString()} Hz</div>
      <div className="hidden pt-1 text-[color:var(--accent-hue)] sm:block">
        <Oscilloscope active={playing} height={32} color="currentColor" />
      </div>
      <button
        onClick={() => (playing ? stop() : play(track.freq, track.name))}
        className="tap flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper data-[playing=true]:bg-[color:var(--accent-hue)]"
        data-playing={playing}
        aria-label={playing ? `Stop ${track.name}` : `Preview ${track.name}`}
      >
        {playing ? <Square className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
      </button>
    </div>
  );
}
