import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ToneGenerator } from "./ToneGenerator";

export const metadata: Metadata = {
  title: "Tone Generator",
  description: "A free live tone generator for exploring simple waveforms and frequencies.",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-6 md:px-10">
        <div className="max-w-3xl">
          <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Free tool</div>
          <h1 className="mt-3 font-display text-5xl lowercase leading-none md:text-7xl">live tone generator.</h1>
          <p className="mt-6 max-w-xl leading-7 text-ink-2">
            Explore simple frequencies directly in your browser. Keep the volume low, protect your hearing, and treat this as a sound tool, not a treatment.
          </p>
        </div>
        <ToneGenerator />
      </main>
      <Footer />
    </div>
  );
}
