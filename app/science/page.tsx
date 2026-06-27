import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Oscilloscope } from "@/components/Oscilloscope";
import { ToneSampler } from "@/components/ToneSampler";

export const metadata: Metadata = {
  title: "The Science",
  description: "How StillTones pure frequency audio is generated, mastered, and delivered.",
};

const specs = [
  ["Waveform", "Pure sine"],
  ["Sample rate", "44.1 kHz"],
  ["Level", "-6 dBFS"],
  ["Fade", "50 ms in / out"],
  ["Length", "11:11:11"],
  ["Formats", "FLAC + MP3"],
] as const;

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="relative overflow-hidden bg-graphite text-paper">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative z-10">
          <Header variant="dark" />
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
            <div className="max-w-4xl">
              <div className="pill-glass animate-fade-up delay-1">The Science</div>
              <h1 className="mt-8 font-display text-[clamp(4rem,10vw,9rem)] lowercase leading-[0.86] tracking-[-0.065em] animate-fade-up delay-2">
                one equation, held steady.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/68 animate-fade-up delay-3">
                StillTones tracks are pure sine waves, rendered as long-form audio files. No beats, no melodies, no loops, no samples, and no medical claims.
              </p>
            </div>

            <div className="mt-12 animate-fade-up delay-4">
              <ToneSampler />
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 md:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:py-32">
          <div>
            <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">The equation</div>
            <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">simple by design.</h2>
            <p className="mt-6 max-w-md leading-7 text-ink-2">
              A single frequency becomes sound by moving air in a smooth repeating curve. The product is intentionally minimal, so the tone can sit behind work, reading, rest, or sleep without musical movement.
            </p>
          </div>
          <EquationCard />
        </section>

        <section className="hairline-t bg-paper-2">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-6 md:grid-cols-3 md:px-10 lg:py-28">
            <ScienceCard label="01" title="generated">
              Each track starts as a mathematical sine wave at a fixed frequency. The live previews use the browser audio engine so you can hear the same frequency before buying.
            </ScienceCard>
            <ScienceCard label="02" title="rendered long">
              The final files are rendered for 11 hours, 11 minutes, and 11 seconds, so a session can run without loop points, gaps, or restarts.
            </ScienceCard>
            <ScienceCard label="03" title="delivered clean">
              FLAC keeps the full lossless master. MP3 is included for phones, older players, and smaller storage. You keep both files after purchase.
            </ScienceCard>
          </div>
        </section>

        <section className="hairline-t bg-graphite text-paper">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:py-28">
            <div>
              <div className="data-num text-[11px] uppercase tracking-widest text-paper/45">Exact specs</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">what is in the file.</h2>
              <p className="mt-6 max-w-md leading-7 text-paper/62">
                The specification is intentionally plain. The tone is not tuned to a hidden promise. It is background audio, made consistently and delivered as files you control.
              </p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              {specs.map(([label, value]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
                  <dt className="data-num text-[11px] uppercase tracking-widest text-paper/40">{label}</dt>
                  <dd className="mt-3 font-display text-3xl lowercase leading-none">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="hairline-t bg-paper">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
            <div className="rounded-[2.25rem] bg-paper-2 p-8 sm:p-10 md:flex md:items-end md:justify-between md:gap-10">
              <div>
                <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Compliant by design</div>
                <h2 className="mt-3 max-w-3xl font-display text-5xl lowercase leading-none md:text-6xl">sound, not treatment.</h2>
                <p className="mt-6 max-w-2xl leading-7 text-ink-2">
                  StillTones does not promise health benefits, diagnose conditions, or claim that a frequency changes your body. These are steady audio files for people who prefer a quiet, simple background.
                </p>
              </div>
              <Link href="/shop" className="pill-solid tap mt-8 shrink-0 md:mt-0">
                Browse tones
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EquationCard() {
  return (
    <div className="soft-card rounded-[2rem] bg-paper p-6 sm:p-8">
      <div className="data-num text-xs text-ink-2">Continuous tone</div>
      <div className="mt-4 overflow-x-auto font-mono text-2xl">y(t) = A · sin(2πf · t)</div>
      <div className="hairline-t my-6" />
      <div className="data-num text-xs text-ink-2">Digital audio sample</div>
      <div className="mt-3 overflow-x-auto font-mono text-lg">y[n] = A · sin(2πf · n / fs)</div>
      <div className="hairline-t my-6" />
      <dl className="grid grid-cols-2 gap-y-3 font-mono text-xs">
        <Spec label="A" value="0.5 · -6 dBFS" />
        <Spec label="f" value="chosen frequency" />
        <Spec label="fs" value="44,100 Hz" />
        <Spec label="n" value="sample index" />
      </dl>
      <div className="mt-7 rounded-2xl bg-paper-2 p-4 text-ink">
        <Oscilloscope active height={42} />
      </div>
    </div>
  );
}

function ScienceCard({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <article className="rounded-[2rem] bg-paper p-6 shadow-[0_24px_80px_-60px_rgba(25,27,25,0.45)] transition duration-300 hover:-translate-y-1 sm:p-8">
      <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">{label}</div>
      <h3 className="mt-8 font-display text-4xl lowercase leading-none">{title}</h3>
      <p className="mt-5 text-sm leading-6 text-ink-2">{children}</p>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-ink-2">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </>
  );
}
