"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Square } from "lucide-react";
import { useTonePreview } from "@/lib/audio";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const carouselTones = [...SAMPLE_TONES, ...SAMPLE_TONES];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth + 2;
      setCanLeft(hasOverflow);
      setCanRight(hasOverflow);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const delta = now - previous;
      previous = now;

      if (!pausedRef.current && !document.hidden) {
        const loopPoint = el.scrollWidth / 2;
        el.scrollLeft += delta * 0.035;
        if (el.scrollLeft >= loopPoint) el.scrollLeft -= loopPoint;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    const loopPoint = el.scrollWidth / 2;
    if (direction === "left" && el.scrollLeft < amount) el.scrollLeft += loopPoint;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="tone-rail">
      <div className="flex items-center justify-between gap-4">
        <div className="data-num text-[11px] uppercase tracking-widest text-paper/50">Try a tone · 11s preview</div>
        <div className="flex gap-1">
          <button type="button" onClick={() => scroll("left")} disabled={!canLeft} className="pill-glass !p-2 disabled:pointer-events-none disabled:opacity-0" aria-label="Scroll tones left">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => scroll("right")} disabled={!canRight} className="pill-glass !p-2 disabled:pointer-events-none disabled:opacity-0" aria-label="Scroll tones right">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onPointerEnter={() => {
          pausedRef.current = true;
        }}
        onPointerLeave={() => {
          pausedRef.current = false;
        }}
        onFocusCapture={() => {
          pausedRef.current = true;
        }}
        onBlurCapture={(event) => {
          const next = event.relatedTarget;
          if (!(next instanceof Node) || !event.currentTarget.contains(next)) pausedRef.current = false;
        }}
        className="mt-3 flex gap-3 overflow-x-auto scroll-smooth pb-5 pr-5 md:pr-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {carouselTones.map((tone, index) => {
          const on = playingFreq === tone.freq;
          return (
            <button
              key={`${tone.name}-${tone.freq}-${index}`}
              type="button"
              onClick={() => (on ? stop() : play(tone.freq, `${tone.name} · ${tone.freq} Hz`))}
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
  );
}
