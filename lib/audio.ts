"use client";

import { useSyncExternalStore } from "react";

type ToneState = {
  freq: number | null;
  name: string | null;
};

type Listener = () => void;
export type TonePlayResult = "played" | "unsupported" | "blocked";

class TonePreview {
  private ctx: AudioContext | null = null;
  private osc: OscillatorNode | null = null;
  private gain: GainNode | null = null;
  private stopTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners = new Set<Listener>();
  private snap: ToneState = { freq: null, name: null };
  analyser: AnalyserNode | null = null;

  private ensureContext() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioContextCtor = window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return null;
      this.ctx = new AudioContextCtor();
    }
    return this.ctx;
  }

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.snap;

  private emit(state: ToneState) {
    this.snap = state;
    this.listeners.forEach((listener) => listener());
  }

  async play(freq: number, name: string, durationMs = 11000): Promise<TonePlayResult> {
    const ctx = this.ensureContext();
    if (!ctx) return "unsupported";
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        return "blocked";
      }
      if (ctx.state === "suspended") return "blocked";
    }
    this.stopImmediate();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const analyser = ctx.createAnalyser();
    const now = ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.85;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.05);

    osc.connect(gain).connect(analyser).connect(ctx.destination);
    osc.start(now);

    this.osc = osc;
    this.gain = gain;
    this.analyser = analyser;
    this.emit({ freq, name });
    this.stopTimer = setTimeout(() => this.stop(), durationMs);
    return "played";
  }

  stop() {
    const ctx = this.ctx;
    const osc = this.osc;
    const gain = this.gain;
    if (!ctx || !osc || !gain) {
      this.stopImmediate();
      return;
    }

    const now = ctx.currentTime;
    try {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.05);
      osc.stop(now + 0.06);
    } catch {
      this.stopImmediate();
    }

    if (this.stopTimer) clearTimeout(this.stopTimer);
    this.stopTimer = null;
    this.osc = null;
    this.gain = null;
    this.analyser = null;
    this.emit({ freq: null, name: null });
  }

  private stopImmediate() {
    if (this.stopTimer) clearTimeout(this.stopTimer);
    this.stopTimer = null;
    try {
      this.osc?.stop();
      this.osc?.disconnect();
      this.gain?.disconnect();
      this.analyser?.disconnect();
    } catch {
      // Web Audio nodes can already be stopped or disconnected.
    }
    this.osc = null;
    this.gain = null;
    this.analyser = null;
    this.emit({ freq: null, name: null });
  }
}

export const tonePreview = (() => {
  const globalRef = globalThis as typeof globalThis & { __tonePreview?: TonePreview };
  globalRef.__tonePreview ??= new TonePreview();
  return globalRef.__tonePreview;
})();

const serverSnapshot: ToneState = { freq: null, name: null };

export function useTonePreview() {
  const state = useSyncExternalStore(tonePreview.subscribe, tonePreview.getSnapshot, () => serverSnapshot);
  return {
    playing: state.freq !== null,
    freq: state.freq,
    name: state.name,
    play: (freq: number, name: string) => tonePreview.play(freq, name),
    stop: () => tonePreview.stop(),
    isPlaying: (freq: number) => state.freq === freq,
  };
}
