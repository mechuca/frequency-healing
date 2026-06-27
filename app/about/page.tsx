import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Oscilloscope } from "@/components/Oscilloscope";

export const metadata: Metadata = {
  title: "The Science",
  description: "Made from one equation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-6 md:px-10">
        <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">About · The science</div>
        <h1 className="mt-3 font-display text-5xl lowercase leading-none md:text-7xl">made from one equation.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-2">
          Sustain makes one thing: clean, single-frequency tones, held perfectly even for long stretches of time. The audio quality and the design do the work.
        </p>

        <section className="mt-16">
          <h2 className="font-display text-4xl lowercase leading-none">a pure tone is a sine wave.</h2>
          <Equation>y(t) = A · sin(2πf · t)</Equation>
          <p className="mt-8 leading-7 text-ink-2">Rendered digitally at sample rate fs, it is sampled point by point:</p>
          <Equation>y[n] = A · sin(2πf · n / fs)</Equation>
          <p className="mt-8 leading-7 text-ink-2">With a short fade so the tone starts and ends without a click:</p>
          <Equation>y[n] = A · g[n] · sin(2πf · n / fs)</Equation>
          <p className="mt-4 text-sm leading-6 text-ink-2">g[n] is a gain envelope that ramps from 0 to 1 over the first 50 ms, holds, then ramps down over the final 50 ms.</p>
        </section>

        <section className="hairline-t mt-16 pt-10">
          <h2 className="font-display text-4xl lowercase leading-none">the exact values.</h2>
          <dl className="mt-7 grid grid-cols-1 gap-y-4 font-mono text-sm md:grid-cols-[140px_1fr]">
            <Row label="A" value="0.5, or -6 dBFS headroom" />
            <Row label="f" value="track Hz, for example 528 for Stillpoint" />
            <Row label="fs" value="44,100 Hz sample rate" />
            <Row label="duration" value="40,271 seconds, exactly 11:11:11" />
            <Row label="fade" value="50 ms in and 50 ms out" />
          </dl>
        </section>

        <section className="hairline-t mt-16 pt-10">
          <h2 className="font-display text-4xl lowercase leading-none">in your browser, right now.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-ink-2">
            Press play on any preview and your browser runs the same equation in real time. No preview audio files are streamed.
          </p>
          <div className="mt-7 rounded-[2rem] bg-paper-2 p-6 text-ink">
            <Oscilloscope active height={70} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 overflow-x-auto rounded-3xl bg-paper-2 p-6 font-mono text-lg md:text-2xl">{children}</div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-ink-2">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </>
  );
}
