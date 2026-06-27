import Link from "next/link";
import { WaveformMark } from "./WaveformMark";

export function Footer() {
  return (
    <footer className="hairline-t bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:px-10">
        <div>
          <div className="flex items-center gap-2 text-ink">
            <WaveformMark />
            <span className="font-display text-2xl lowercase">sustain</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-2">
            Single-frequency tones generated from one equation. Built for quiet work, study, calm, and long rooms.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
          <FooterGroup title="Store" links={[['Shop', '/shop'], ['Cart', '/cart'], ['Library', '/product/complete-library']]} />
          <FooterGroup title="Learn" links={[['The Science', '/about'], ['Home', '/']]} />
          <div>
            <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">Specs</div>
            <p className="mt-3 max-w-[12rem] text-ink-2">FLAC. 44.1 kHz. 11:11:11 per track. -6 dBFS.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">{title}</div>
      <div className="mt-3 flex flex-col gap-2">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="text-ink-2 transition-colors hover:text-ink">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
