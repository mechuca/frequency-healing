import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Oscilloscope } from "@/components/Oscilloscope";

export const metadata: Metadata = {
  title: "About",
  description: "Sound, held steady.",
};

const familyCards = [
  ["Night", "The deepest, lowest tones, for sleep."],
  ["Deep Work", "Warm and even tones for long focus."],
  ["Calm", "Softer, gentler tones for slowing down."],
  ["Study Hall", "Clearer, more alert tones for reading and revision."],
  ["Bright", "The highest and most present tones, for a more awake background."],
] as const;

const useCards = [
  ["work", "One tone on low through a long stretch of focused work, so the room has a steady floor of sound."],
  ["night", "A Night track left playing across the night, without gaps, loops, or restarts."],
  ["evening", "Something from Calm when the day has been loud and you want the room to settle."],
  ["study", "A Study Hall tone for reading, revision, or slow detail work."],
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="relative overflow-hidden bg-graphite text-paper">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="relative z-10">
          <Header variant="dark" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:px-10 lg:grid-cols-[1fr_24rem] lg:items-end lg:py-28">
            <div>
              <div className="pill-glass animate-fade-up delay-1">About Sustain</div>
              <h1 className="mt-8 max-w-4xl font-display text-[clamp(4rem,10vw,9rem)] lowercase leading-[0.86] tracking-[-0.065em] animate-fade-up delay-2">
                sound, held steady.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/68 animate-fade-up delay-3">
                Sustain is a small studio making single-frequency audio for people who want sound, not stimulation. Every track is one clean tone, held even for over eleven hours, with no beat, no melody, and nothing competing for your attention. You press play, and the room goes quiet.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md animate-fade-up delay-4">
              <div className="data-num text-[11px] uppercase tracking-widest text-paper/45">One equation</div>
              <div className="mt-5 rounded-2xl bg-paper/5 p-4 text-paper/80">
                <Oscilloscope active height={64} color="#E9EAE4" />
              </div>
              <dl className="data-num mt-6 grid grid-cols-2 gap-y-4 text-[11px] text-paper/45">
                <Spec label="Format" value="FLAC + MP3" />
                <Spec label="Length" value="11:11:11" />
                <Spec label="Sample" value="44.1 kHz" />
                <Spec label="Level" value="-6 dBFS" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      <main>
        <EditorialSection label="What we make" title="sound, not stimulation.">
          <p>
            Most background audio is busy. It builds, it swells, it pulls you back out of whatever you were doing. We went the other way. A Sustain track is a single steady tone that fills a space and then disappears, the kind of sound you stop noticing in the best way.
          </p>
          <p>
            There are tones for focus, for study, for winding down, and for sleep, grouped by what you are doing and how each one feels. Pick the one that sits right, and stay in it for as long as you need.
          </p>
        </EditorialSection>

        <section className="hairline-t bg-paper-2">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
            <div>
              <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">A note from the studio</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">made by hand, one frequency at a time.</h2>
            </div>
            <div className="soft-card rounded-[2rem] p-6 sm:p-8">
              <p className="text-xl leading-9 text-ink md:text-2xl">
                Sustain started from a simple frustration: most focus and sleep audio is doing too much. Layers, swells, a melody that loops just often enough to notice. I wanted the opposite, a single steady tone, made properly, that I could leave running through a whole day of work or a full night of sleep and simply forget about.
              </p>
              <p className="mt-6 leading-7 text-ink-2">
                So I built it, one frequency at a time, each to a standard I would want for myself. Everything here is made by one person who cares about both sound and design. If a thing could be cleaner, calmer, or more honest, that is the version we ship.
              </p>
            </div>
          </div>
        </section>

        <section className="hairline-t bg-paper">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:py-28">
            <div>
              <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">How they are made</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">from one equation.</h2>
              <div className="mt-8 space-y-5 leading-7 text-ink-2">
                <p>
                  Each tone is a pure sine wave, the simplest sound there is, rendered at full studio quality and held perfectly steady from the first second to the last. Nothing is sampled, looped, or guessed at.
                </p>
                <p>
                  We deliver every track in lossless FLAC alongside MP3, so what you hear is exactly what was made, with nothing compressed away. You can press play on any tone to hear your own browser run it live.
                </p>
              </div>
            </div>
            <EquationCard />
          </div>
        </section>

        <section className="hairline-t bg-graphite text-paper">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-6 md:grid-cols-2 md:px-10 lg:py-28">
            <DarkCard label="Why eleven hours" title="long enough to forget it.">
              Every track runs for exactly eleven hours, eleven minutes, and eleven seconds. The length is practical first: it covers a full working day or a whole night without ever looping back on itself or fading out, so you are never pulled out by a restart. The exact 11:11:11 is our signature, the same across the entire catalogue.
            </DarkCard>
            <DarkCard label="On quality" title="simple sound needs clean files.">
              We master and deliver everything in lossless FLAC, with an MP3 version alongside. For a sound this simple and this long, quality matters more, not less. Lossless keeps the tone clean from the first second to the last. MP3 is there for convenience, for phones and quick listening, when you want a smaller file.
            </DarkCard>
          </div>
        </section>

        <section className="hairline-t section-surface">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 lg:py-28">
            <div className="max-w-3xl">
              <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">The five families</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">choose the room you want.</h2>
              <p className="mt-6 leading-7 text-ink-2">
                The catalogue is grouped by what you are doing and how each tone feels. Within each one, every tone has its own name and character, so you can find the exact one that sits right for you.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {familyCards.map(([title, copy], index) => (
                <div key={title} className="rounded-[1.75rem] border border-hairline bg-paper/70 p-5 shadow-[0_20px_60px_-50px_rgba(25,27,25,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-paper">
                  <div className="data-num text-[11px] text-ink-2">0{index + 1}</div>
                  <h3 className="mt-8 font-display text-3xl lowercase leading-none">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hairline-t bg-paper">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:py-28">
            <div>
              <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">How people use them</div>
              <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">low volume, long horizon.</h2>
              <p className="mt-6 max-w-md leading-7 text-ink-2">
                There is no single right way. Start at a low, comfortable volume, settle in, and let the tone hold the space.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {useCards.map(([title, copy]) => (
                <div key={title} className="rounded-[1.75rem] bg-paper-2 p-6 transition duration-300 hover:-translate-y-1 hover:bg-paper-3">
                  <h3 className="font-display text-3xl lowercase leading-none">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hairline-t bg-paper-2">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-6 md:grid-cols-2 md:px-10 lg:py-28">
            <LightCard label="What we do not do" title="no mysticism, no medical claims.">
              We do not trade in mysticism, and we make no claims about what these tones do to your body. They are background sound, designed and built with care, for focus, calm, and sleep. That is the whole promise, and we think it is enough. If you have a health concern, please talk to a doctor.
            </LightCard>
            <LightCard label="What you get" title="files you keep.">
              Every purchase is yours to keep. After you buy, you get a private link to download your files in both formats, and they stay yours, with no subscription and no expiry. If you ever have trouble with a download, we will sort it out quickly. We are small, and we answer.
            </LightCard>
          </div>
        </section>

        <section className="bg-graphite px-5 py-20 text-paper sm:px-6 md:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-white/10 bg-white/[0.045] p-8 text-center backdrop-blur-md sm:p-12">
            <div className="data-num text-[11px] uppercase tracking-widest text-paper/45">Sustain</div>
            <p className="mx-auto mt-5 max-w-4xl font-display text-5xl lowercase leading-none tracking-[-0.045em] md:text-7xl">
              made quietly, for quiet.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EditorialSection({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="hairline-t bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">{label}</div>
          <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">{title}</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-ink-2">{children}</div>
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
        <Spec label="A" value="0.5, -6 dBFS" />
        <Spec label="fs" value="44,100 Hz" />
        <Spec label="duration" value="11:11:11" />
        <Spec label="fade" value="50 ms in and out" />
      </dl>
      <div className="mt-7 rounded-2xl bg-paper-2 p-4 text-ink">
        <Oscilloscope active height={42} />
      </div>
    </div>
  );
}

function DarkCard({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065] sm:p-8">
      <div className="data-num text-[11px] uppercase tracking-widest text-paper/45">{label}</div>
      <h2 className="mt-5 font-display text-4xl lowercase leading-none md:text-5xl">{title}</h2>
      <p className="mt-6 leading-7 text-paper/62">{children}</p>
    </article>
  );
}

function LightCard({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-[2rem] bg-paper p-6 shadow-[0_24px_80px_-60px_rgba(25,27,25,0.5)] transition duration-300 hover:-translate-y-1 sm:p-8">
      <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">{label}</div>
      <h2 className="mt-5 font-display text-4xl lowercase leading-none md:text-5xl">{title}</h2>
      <p className="mt-6 leading-7 text-ink-2">{children}</p>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-current opacity-60">{label}</dt>
      <dd className="text-current">{value}</dd>
    </>
  );
}
