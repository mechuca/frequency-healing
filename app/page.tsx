import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FaqSection } from "@/components/FaqSection";
import { Header } from "@/components/Header";
import { HeroWaveform } from "@/components/HeroWaveform";
import { Oscilloscope } from "@/components/Oscilloscope";
import { ProductCard } from "@/components/ProductCard";
import { ToneSampler } from "@/components/ToneSampler";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  const featured = PRODUCTS.filter((product) => product.kind === "set");

  return (
    <div className="min-h-screen bg-paper">
      <section className="relative overflow-hidden bg-graphite text-paper">
        <div className="hero-grid absolute inset-0" />
        <HeroWaveform />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative z-10">
          <Header variant="dark" />
          <div className="mx-auto max-w-7xl px-5 pt-12 sm:px-6 md:px-10 lg:pt-16">
            <div className="max-w-[78rem]">
              <div className="pill-glass animate-fade-up delay-1">
                <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                Lossless · 11:11:11 · FLAC
              </div>
              <h1 className="mt-8 max-w-[78rem] font-display text-[clamp(3.4rem,9vw,8.5rem)] lowercase leading-[0.86] tracking-[-0.065em]">
                <span className="line-reveal delay-1 xl:whitespace-nowrap">a quiet instrument</span>
                <span className="line-reveal delay-2 xl:whitespace-nowrap">for focused work,</span>
                <span className="line-reveal delay-3 text-paper/55 xl:whitespace-nowrap">calm, and sleep.</span>
              </h1>
            </div>

            <div className="mt-8 grid gap-8 animate-fade-up delay-4 lg:grid-cols-[minmax(0,42rem)_22rem] lg:items-start lg:justify-between">
              <div>
                <p className="text-base leading-7 text-paper/70 sm:text-lg">
                  Single-frequency tones, held perfectly even. No beats, no melodies, no narration. Preview every tone live, then keep the full-length files forever.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/shop" className="pill-solid tap !bg-paper !text-graphite">
                    Browse the catalogue
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link href="/about" className="pill-glass tap">Read the equation</Link>
                </div>
              </div>
              <SignalCard />
            </div>

            <div className="mt-12 pb-12 animate-fade-up delay-5 lg:mt-14 lg:pb-16">
              <ToneSampler />
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:px-10 lg:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">The catalogue</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">five families.</h2>
            </div>
            <Link href="/shop" className="pill-outline tap w-fit">
              See everything
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => <ProductCard key={product.slug} product={product} delay={index * 0.05} />)}
          </div>
        </section>

        <ListeningFlow />

        <section className="hairline-t bg-paper-2">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 md:grid-cols-[0.85fr_1fr] md:px-10 lg:py-32">
            <div>
              <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">The science</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">made from one equation.</h2>
              <p className="mt-6 max-w-md leading-7 text-ink-2">
                Every tone is a pure sine wave, sampled at CD quality with a short fade so it starts and ends without a click. Nothing is layered, nothing is added.
              </p>
              <Link href="/about" className="pill-outline tap mt-7">
                Read the equation
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <EquationCard />
          </div>
        </section>
      </main>
      <FaqSection />
      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-paper">{value}</div>
      <div className="mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function SignalCard() {
  return (
    <aside className="hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 text-paper shadow-[0_40px_100px_-60px_rgba(0,0,0,0.8)] backdrop-blur-md animate-fade-up delay-5 lg:block">
      <div className="flex items-center justify-between gap-4">
        <div className="data-num text-[11px] uppercase tracking-widest text-paper/50">Live signal</div>
        <div className="h-2 w-2 rounded-full bg-paper" />
      </div>
      <div className="mt-7 rounded-2xl bg-paper/5 px-4 py-3 text-paper/80">
        <Oscilloscope active height={52} color="#E9EAE4" />
      </div>
      <div className="data-num mt-7 grid grid-cols-2 gap-x-6 gap-y-5 text-[11px] text-paper/50">
        <Stat label="Tracks" value="27" />
        <Stat label="Per track" value="11:11:11" />
        <Stat label="Sample" value="44.1 kHz" />
        <Stat label="Level" value="-6 dBFS" />
      </div>
      <p className="mt-7 text-sm leading-6 text-paper/55">
        Every preview is generated in-browser from the same sine-wave equation used for the final files.
      </p>
    </aside>
  );
}

function EquationCard() {
  return (
    <div className="soft-card rounded-[2rem] bg-paper p-6 sm:p-8">
      <div className="data-num text-xs text-ink-2">A pure tone is a sine wave</div>
      <div className="mt-4 overflow-x-auto font-mono text-2xl">y(t) = A · sin(2πf · t)</div>
      <div className="hairline-t my-6" />
      <div className="data-num text-xs text-ink-2">Sampled at fs</div>
      <div className="mt-3 overflow-x-auto font-mono text-lg">y[n] = A · sin(2πf · n / fs)</div>
      <div className="hairline-t my-6" />
      <dl className="grid grid-cols-2 gap-y-3 font-mono text-xs">
        <dt className="text-ink-2">A</dt><dd>0.5 · -6 dBFS</dd>
        <dt className="text-ink-2">fs</dt><dd>44,100 Hz</dd>
        <dt className="text-ink-2">duration</dt><dd>11:11:11</dd>
        <dt className="text-ink-2">fade</dt><dd>50 ms in / out</dd>
      </dl>
      <div className="mt-7 rounded-2xl bg-paper-2 p-4 text-ink">
        <Oscilloscope active height={42} />
      </div>
    </div>
  );
}

function ListeningFlow() {
  const steps = [
    ["01", "preview live", "Try any tone instantly. The browser generates the frequency in real time, so the preview stays honest."],
    ["02", "choose a family", "Pick by use case: deep work, night, calm, study, or bright. Every family keeps one clear sonic role."],
    ["03", "press play once", "The final files run for 11:11:11, long enough for a work day or night without loops or restarts."],
  ];

  return (
    <section className="hairline-t bg-graphite text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <div className="data-num text-[11px] uppercase tracking-widest text-paper/45">How it fits</div>
            <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">one tone, no friction.</h2>
          </div>
          <p className="max-w-2xl leading-7 text-paper/62">
            Sustain is designed to disappear into the background. Minimal controls, clear product families, and previews that behave exactly like the final audio.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map(([num, title, copy]) => (
            <div key={title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065]">
              <div className="data-num text-[11px] text-paper/40">{num}</div>
              <h3 className="mt-8 font-display text-3xl lowercase leading-none">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-paper/58">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
