"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";
import { tonePreview } from "@/lib/audio";
import { haptic } from "@/lib/haptics";

type Waveform = OscillatorType;

const waveforms: Waveform[] = ["sine", "triangle", "square", "sawtooth"];

export function ToneGenerator() {
  const [frequency, setFrequency] = useState(432);
  const [volume, setVolume] = useState(0.28);
  const [waveform, setWaveform] = useState<Waveform>("sine");
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const osc = oscRef.current;
    const ctx = ctxRef.current;
    if (!osc || !ctx) return;
    osc.frequency.setTargetAtTime(frequency, ctx.currentTime, 0.02);
    osc.type = waveform;
  }, [frequency, waveform]);

  useEffect(() => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!gain || !ctx) return;
    gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.02);
  }, [volume]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const data = new Uint8Array(1024);
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "#1C1E1B";
      context.lineWidth = 1.6;
      context.beginPath();
      const analyser = analyserRef.current;
      if (analyser) {
        analyser.getByteTimeDomainData(data);
        for (let i = 0; i < data.length; i += 1) {
          const x = (i / (data.length - 1)) * width;
          const y = (data[i] / 255) * height;
          if (i === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
      } else {
        frame += 0.02;
        for (let x = 0; x <= width; x += 4) {
          const y = height / 2 + Math.sin(x * 0.05 + frame) * 5;
          if (x === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
      }
      context.stroke();
      raf = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    draw();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const stop = () => {
    const ctx = ctxRef.current;
    const osc = oscRef.current;
    const gain = gainRef.current;
    if (!ctx || !osc || !gain) return;
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.05);
    osc.stop(now + 0.06);
    oscRef.current = null;
    gainRef.current = null;
    analyserRef.current = null;
    setPlaying(false);
  };

  const play = async () => {
    haptic("medium");
    if (playing) {
      stop();
      return;
    }
    tonePreview.stop();
    const AudioContextCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    const ctx = ctxRef.current ?? new AudioContextCtor();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const analyser = ctx.createAnalyser();
    const now = ctx.currentTime;
    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, now);
    analyser.fftSize = 2048;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.05);
    osc.connect(gain).connect(analyser).connect(ctx.destination);
    osc.start(now);
    oscRef.current = osc;
    gainRef.current = gain;
    analyserRef.current = analyser;
    setPlaying(true);
  };

  return (
    <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[2rem] bg-paper-2 p-6 sm:p-8">
        <div className="grid gap-6">
          <Control label="Frequency" value={`${frequency.toLocaleString()} Hz`}>
            <input type="range" min="20" max="12000" value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} className="w-full accent-ink" />
            <input type="number" min="20" max="12000" value={frequency} onChange={(event) => setFrequency(Math.min(12000, Math.max(20, Number(event.target.value))))} className="mt-3 w-full rounded-full border border-hairline bg-paper px-4 py-3 font-mono text-sm" />
          </Control>
          <Control label="Waveform" value={waveform}>
            <div className="grid grid-cols-2 gap-2">
              {waveforms.map((item) => (
                <button key={item} type="button" onClick={() => setWaveform(item)} className={`tap rounded-full px-4 py-3 font-mono text-xs ${waveform === item ? "bg-ink text-paper" : "bg-paper text-ink-2"}`}>
                  {item}
                </button>
              ))}
            </div>
          </Control>
          <Control label="Volume" value={`${Math.round(volume * 100)}%`}>
            <input type="range" min="0" max="0.6" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="w-full accent-ink" />
          </Control>
          <button type="button" onClick={play} className="pill-solid tap w-fit">
            {playing ? <><Square className="h-3.5 w-3.5" fill="currentColor" /> Stop</> : <><Play className="h-3.5 w-3.5" fill="currentColor" /> Play tone</>}
          </button>
        </div>
      </div>
      <div className="rounded-[2rem] bg-paper-2 p-6 sm:p-8">
        <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Oscilloscope</div>
        <canvas ref={canvasRef} className="mt-6 block h-64 w-full rounded-[1.5rem] bg-paper" aria-hidden="true" />
      </div>
    </section>
  );
}

function Control({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-4">
        <span className="data-num text-[11px] uppercase tracking-widest text-ink-2">{label}</span>
        <span className="data-num text-sm text-ink">{value}</span>
      </span>
      <span className="mt-3 block">{children}</span>
    </label>
  );
}
