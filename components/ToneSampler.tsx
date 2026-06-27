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
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 2);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
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

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -el.clientWidth * 0.75 : el.clientWidth * 0.75, behavior: "smooth" });
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
      <div ref={scrollRef} className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-5 pr-5 md:pr-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SAMPLE_TONES.map((tone) => {
          const on = playingFreq === tone.freq;
          return (
            <button
              key={`${tone.name}-${tone.freq}`}
              type="button"
              onClick={() => (on ? stop() : play(tone.freq, `${tone.name} · ${tone.freq} Hz`))}
              className={`snap-start flex w-[220px] shrink-0 flex-col rounded-3xl p-5 text-left transition duration-300 hover:scale-[1.025] active:scale-[0.98] sm:w-[244px] ${on ? "bg-paper text-graphite" : "bg-white/[0.055] text-paper backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_0_0_1px_rgba(255,255,255,0.08)]"}`}
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
