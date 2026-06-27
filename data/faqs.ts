export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "About the audio",
    items: [
      {
        question: "What exactly am I buying?",
        answer:
          "Single-frequency audio tracks. Each one is a single clean, steady tone, no beat, no melody, nothing competing for your attention, held even for over eleven hours. They're made as background sound for focus, study, calm, and sleep. You get lossless FLAC plus MP3 versions to keep.",
      },
      {
        question: "How are the tones made?",
        answer:
          "From one equation. Each track is a pure sine wave, the simplest possible sound, rendered at full studio quality and held perfectly steady from the first second to the last. No samples, no loops, no AI guesswork, just clean math turned into sound. You can read the exact equation on our Science page, and press play on any track to hear the same one run live in your browser.",
      },
      {
        question: "Do these have health benefits? Will they help with a condition?",
        answer:
          "We don't make any health or medical claims. People use these as steady background sound for focus, winding down, and sleep, and that's exactly what they're designed for, nothing more is promised. If you're dealing with a health concern, please talk to a doctor.",
      },
      {
        question: "Why is every track 11 hours, 11 minutes, and 11 seconds?",
        answer:
          "Long enough to cover a full work day or a whole night without ever looping or fading, so you can press play once and forget about it. The 11:11:11 length is our signature, the same across every track in the catalogue.",
      },
      {
        question: "What's the difference between the sets?",
        answer:
          "They're grouped by what you're doing and how the tones sound. Night is the deepest, lowest tones, for sleep. Deep Work is warm, even tones for focus. Calm is softer and gentler, for unwinding. Study Hall is clearer and more alert, for reading and revision. Bright is the highest, most present tones, for a more awake background.",
      },
      {
        question: "Can I hear them before I buy?",
        answer:
          "Yes. Every track has a live preview, your browser generates the actual tone in real time, so what you hear is exactly what you're buying.",
      },
    ],
  },
  {
    title: "Files and formats",
    items: [
      {
        question: "What formats do I get?",
        answer:
          "Both lossless FLAC and MP3 for every track, so you're covered whether you want maximum quality or a smaller, universal file.",
      },
      {
        question: "FLAC or MP3, which should I use?",
        answer:
          "FLAC is lossless, the full studio-quality master, best for good speakers, headphones, and keeping long-term. MP3 is smaller and plays on absolutely everything, great for phones and quick listening. Most people keep both.",
      },
      {
        question: "Why are the files so large?",
        answer:
          "Lossless audio held for over eleven hours is simply a big file, usually around half a gigabyte per FLAC track. That size is the quality; nothing has been compressed away. The MP3 versions are smaller if you need them to be.",
      },
      {
        question: "What can play FLAC files?",
        answer:
          "Most modern players handle FLAC, including VLC, Apple Music, and the default players on recent phones and computers. If anything ever won't open a FLAC, the MP3 version will play there.",
      },
    ],
  },
  {
    title: "Buying and downloading",
    items: [
      {
        question: "How do I get my files after I buy?",
        answer:
          "The moment your payment goes through, you'll get an email with a private download link to your files. Open it, download the FLAC and MP3, and they're yours to keep forever.",
      },
      {
        question: "My download email didn't arrive, what now?",
        answer:
          "Check your spam or promotions folder first, since the link often lands there. If it's still missing, just contact us with your order details and we'll resend it straight away.",
      },
      {
        question: "Is payment secure?",
        answer:
          "Yes. Checkout is handled by Stripe, a trusted global payment processor. Your card details go straight to them and are never seen or stored by us.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Because these are digital files delivered instantly, they're non-refundable once the download link is sent. That said, if anything is wrong with your files or you had trouble downloading, message us, we'll always make it right.",
      },
    ],
  },
  {
    title: "Listening",
    items: [
      {
        question: "Headphones or speakers?",
        answer:
          "Either works. Headphones reveal the very low and very high tones more clearly, while speakers are easier for all-day background listening. Use whatever's comfortable.",
      },
      {
        question: "How loud should I play them?",
        answer:
          "Keep the volume low to moderate, especially with the higher Bright tones, which are very present. There's no benefit to playing them loud, and looking after your hearing always comes first.",
      },
      {
        question: "Can I loop them or leave one playing all night?",
        answer:
          "Yes, that's what they're built for. Each track runs over eleven hours unbroken, so a single one covers a full night's sleep or a whole work day with no gaps or restarts.",
      },
    ],
  },
  {
    title: "Using the tracks",
    items: [
      {
        question: "Can I use these in my videos, streams, or business?",
        answer:
          "Your purchase covers personal listening. If you'd like to use the tracks in something public or commercial, a YouTube channel, a podcast, a studio, a shop or waiting space, get in touch and we'll sort out a simple license.",
      },
      {
        question: "Can I share the files with friends?",
        answer:
          "The files are for your own personal use, so please don't redistribute or repost them. If someone you know would enjoy them, point them our way, it genuinely helps a small studio keep going.",
      },
    ],
  },
  {
    title: "Coming soon",
    items: [
      {
        question: "Do you make binaural beats or other kinds of tones?",
        answer:
          "More is on the way, including binaural pairs designed for deep relaxation, sleep, and calm focus. Join the list on our homepage and you'll be the first to know when the next set drops.",
      },
    ],
  },
];
