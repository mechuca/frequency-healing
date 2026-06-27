"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Square } from "lucide-react";
import { useTonePreview } from "@/lib/audio";
import { haptic } from "@/lib/haptics";
import { useToast } from "@/lib/toast";

const SAMPLE_TONES = [
  { name: "Nightfall", freq: 20, family: "Night" },
  { name: "Moonlight", freq: 111, family: "Night" },
  { name: "Anchor", freq: 432, family: "Deep Work" },
  { name: "Stillpoint", freq: 528, family: "Deep Work" },
  { name: "Drift", freq: 417, family: "Calm" },
  { name: "Weightless", freq: 852, family: "Calm" },
  { name: "Clear Light", freq: 660, family: "Study Hall" },
  { name: "Clarity", freq: 880, family: "Study Hall" },
  { name: "Rise", freq: 2003, family: "Bright" },
  { name: "Zenith", freq: 10000, family: "Bright" },
];

export function ToneSampler() {
  const { play, stop, freq: playingFreq } = useTonePreview();
  const { showToast } = useToast();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);
  const carouselTones = [...SAMPLE_TONES, ...SAMPLE_TONES];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previous = performance.now();

    const render = () => {
      const loopPoint = track.scrollWidth / 2;
      if (loopPoint <= 0) return;
      offsetRef.current = ((offsetRef.current % loopPoint) + loopPoint) % loopPoint;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const delta = now - previous;
      previous = now;

      if (!pausedRef.current && !document.hidden) {
        offsetRef.current += delta * 0.08;
        render();
      }

      frame = window.requestAnimationFrame(tick);
    };

    render();
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const loopPoint = track.scrollWidth / 2;
    if (loopPoint <= 0) return;
    haptic();
    offsetRef.current += direction === "left" ? -260 : 260;
    offsetRef.current = ((offsetRef.current % loopPoint) + loopPoint) % loopPoint;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  };

  return (
    <div className="tone-rail">
      <div className="flex items-center justify-between gap-4">
        <div className="data-num text-[11px] uppercase tracking-widest text-paper/50">Try a tone · 11s preview</div>
        <div className="flex gap-1">
          <button type="button" onClick={() => scroll("left")} className="pill-glass !p-2" aria-label="Scroll tones left">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => scroll("right")} className="pill-glass !p-2" aria-label="Scroll tones right">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div
        onPointerEnter={() => {
          pausedRef.current = true;
        }}
        onPointerLeave={() => {
          pausedRef.current = false;
        }}
        onPointerDownCapture={() => {
          pausedRef.current = true;
        }}
        onPointerUpCapture={() => {
          pausedRef.current = false;
        }}
        onPointerCancel={() => {
          pausedRef.current = false;
        }}
        onFocusCapture={() => {
          pausedRef.current = true;
        }}
        onBlurCapture={(event) => {
          const next = event.relatedTarget;
          if (!(next instanceof Node) || !event.currentTarget.contains(next)) pausedRef.current = false;
        }}
        className="mt-3 overflow-hidden pb-5"
      >
        <div ref={trackRef} className="flex w-max gap-3 will-change-transform">
          {carouselTones.map((tone, index) => {
            const on = playingFreq === tone.freq;
            return (
              <button
                key={`${tone.name}-${tone.freq}-${index}`}
                type="button"
                onClick={async () => {
                  haptic(on ? "light" : "medium");
                  if (on) stop();
                  else {
                    const result = await play(tone.freq, `${tone.name} · ${tone.freq} Hz`);
                    if (result === "unsupported") showToast({ title: "audio preview is not available", description: "This browser does not support Web Audio previews.", kind: "error" });
                    if (result === "blocked") showToast({ title: "tap again to start audio", description: "The browser blocked the first audio request.", kind: "error" });
                  }
                }}
                className={`flex w-[220px] shrink-0 flex-col rounded-3xl p-5 text-left transition duration-300 hover:scale-[1.025] active:scale-[0.98] sm:w-[244px] ${on ? "bg-paper text-graphite" : "bg-white/[0.055] text-paper backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_0_0_1px_rgba(255,255,255,0.08)]"}`}
                aria-pressed={on}
              >
                <span className="flex items-center gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${on ? "bg-graphite text-paper" : "bg-white/10"}`}>
                    {on ? <Square className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
                  </span>
                  <span className="data-num text-[10px] uppercase tracking-widest opacity-60">{tone.family}</span>
                </span>
                <span className="mt-4 font-display text-xl lowercase leading-tight">{tone.name}</span>
                <span className="data-num mt-1 text-sm opacity-60">{tone.freq.toLocaleString()} Hz</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
