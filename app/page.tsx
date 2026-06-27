import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FaqSection } from "@/components/FaqSection";
import { Header } from "@/components/Header";
import { HeroWaveform } from "@/components/HeroWaveform";
import { Oscilloscope } from "@/components/Oscilloscope";
import { Cover } from "@/components/Cover";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ProductCard } from "@/components/ProductCard";
import { ToneSampler } from "@/components/ToneSampler";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  const library = PRODUCTS.find((product) => product.slug === "complete-library");
  const featured = PRODUCTS.filter((product) => product.slug !== "complete-library").slice(0, 6);

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

            <div className="mt-8 max-w-3xl animate-fade-up delay-4">
              <p className="text-base leading-7 text-paper/70 sm:text-lg">
                Single-frequency tones, held perfectly even. No beats, no melodies, no narration. Preview every tone live, then keep the full-length files forever.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/shop" className="pill-solid tap !bg-paper !text-graphite">
                  Browse the catalogue
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/science" className="pill-glass tap">Read the equation</Link>
              </div>
            </div>

            <div className="mt-12 pb-12 animate-fade-up delay-5 lg:mt-14 lg:pb-16">
              <ToneSampler />
            </div>
          </div>
        </div>
      </section>

      <main>
        <NextReleaseBanner />

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 md:px-10 lg:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">The catalogue</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">six starting points.</h2>
            </div>
            <Link href="/shop" className="pill-outline tap w-fit">
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {library ? <LibraryFeature product={library} /> : null}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, index) => <ProductCard key={product.slug} product={product} delay={index * 0.05} compact />)}
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
              <Link href="/science" className="pill-outline tap mt-7">
                Read the equation
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <EquationCard />
          </div>
        </section>
        <NewsletterSignup />
      </main>
      <FaqSection />
      <Footer />
    </div>
  );
}

function LibraryFeature({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <Link href={`/product/${product.slug}`} className="group mt-12 grid overflow-hidden rounded-[2rem] bg-graphite text-paper shadow-[0_30px_90px_-60px_rgba(21,23,21,0.85)] md:grid-cols-[0.72fr_1fr]">
      <div className="aspect-[1.2/1] overflow-hidden md:aspect-auto">
        <Cover product={product} variant="wide" />
      </div>
      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div>
          <div className="data-num text-[11px] uppercase tracking-widest text-paper/45">Best value</div>
          <h3 className="mt-4 font-display text-4xl lowercase leading-none tracking-[-0.045em] md:text-6xl">complete library.</h3>
          <p className="mt-5 max-w-xl leading-7 text-paper/62">All 27 tones, in lossless. Far less than buying the sets separately.</p>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="data-num rounded-full bg-paper px-4 py-3 text-sm text-graphite">$49</span>
          <span className="data-num rounded-full border border-white/10 px-4 py-3 text-sm text-paper/55">$75 value bought as sets</span>
          <span className="pill-glass tap group-hover:translate-y-[-1px]">
            Open library
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function NextReleaseBanner() {
  return (
    <section className="hairline-t bg-paper px-4 pt-8 sm:px-6 sm:pt-10 md:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-graphite text-paper shadow-[0_30px_90px_-60px_rgba(21,23,21,0.75)] sm:rounded-[2rem]">
        <div className="relative grid gap-7 p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(233,234,228,0.16),transparent_22rem),radial-gradient(circle_at_86%_100%,rgba(95,113,89,0.22),transparent_24rem)]" />
          <div className="relative min-w-0 max-w-3xl">
            <div className="data-num inline-flex rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-[11px] uppercase tracking-widest text-paper/55">
              Next release
            </div>
            <h2 className="mt-5 font-display text-[2.55rem] lowercase leading-[0.94] tracking-[-0.045em] sm:text-5xl md:text-6xl">
              binaural beats are coming next.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-paper/62 sm:text-base sm:leading-7">
              A new StillTones series is in progress: clean two-tone pairs, built with the same restrained approach. No narration, no busy layers, no medical claims.
            </p>
          </div>
          <div className="relative flex min-w-0 flex-col gap-3 md:items-end">
            <div className="data-num w-fit rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm text-paper/70">
              Release window · soon
            </div>
            <Link href="/shop" className="pill-glass tap w-fit">
              Explore current tones
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
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
            StillTones is designed to disappear into the background. Minimal controls, clear product families, and previews that behave exactly like the final audio.
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
