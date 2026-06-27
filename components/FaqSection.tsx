import { FAQ_GROUPS } from "@/data/faqs";

export function FaqSection() {
  return (
    <section className="hairline-t bg-paper" id="faq">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-6 md:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:py-32">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="data-num text-[11px] uppercase tracking-widest text-ink-2">FAQs</div>
          <h2 className="mt-3 font-display text-5xl lowercase leading-none md:text-6xl">quiet answers.</h2>
          <p className="mt-6 max-w-sm leading-7 text-ink-2">
            Everything you need to know about the tones, file formats, listening, downloads, and licensing.
          </p>
          <p className="mt-8 max-w-sm font-mono text-xs leading-6 text-ink-2">
            Have a question that is not here? Reach out any time, we reply fast.
          </p>
        </div>

        <div className="space-y-10">
          {FAQ_GROUPS.map((group) => (
            <div key={group.title}>
              <div className="data-num mb-3 text-[11px] uppercase tracking-widest text-ink-2">{group.title}</div>
              <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-paper-2">
                {group.items.map((item, index) => (
                  <details key={item.question} className="group border-b border-hairline last:border-0" open={index === 0 && group.title === "About the audio"}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 font-display text-xl lowercase leading-tight text-ink transition-colors hover:text-ink-2 sm:px-6 [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <span className="relative h-5 w-5 shrink-0 text-ink-2">
                        <span className="absolute left-0 top-1/2 h-px w-5 bg-current" />
                        <span className="absolute left-1/2 top-0 h-5 w-px bg-current transition-transform group-open:rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-6 sm:px-6">
                      <p className="max-w-3xl text-sm leading-7 text-ink-2 sm:text-base">{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
