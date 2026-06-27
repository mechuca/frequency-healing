export type Track = {
  name: string;
  freq: number;
  desc?: string;
};

export type CategoryKey = "focus" | "sleep" | "calm" | "study" | "energy" | "all";

export type Product = {
  slug: string;
  title: string;
  kind: "set" | "single" | "library";
  category: CategoryKey;
  priceUsd: number;
  tracks: Track[];
  blurb: string;
  driveLink: string;
  stripePriceId: string;
};

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  focus: "Focus",
  sleep: "Sleep",
  calm: "Calm",
  study: "Study",
  energy: "Energy",
  all: "Library",
};

export const CATEGORY_CLASS: Record<CategoryKey, string> = {
  focus: "category-focus",
  sleep: "category-sleep",
  calm: "category-calm",
  study: "category-study",
  energy: "category-energy",
  all: "category-all",
};

export const PRODUCTS: Product[] = [
  {
    slug: "deep-work",
    title: "Deep Work",
    kind: "set",
    category: "focus",
    priceUsd: 14,
    tracks: [
      { name: "Deep End", freq: 40, desc: "Sub-bass anchor. Felt more than heard, built for the first minutes of a long work block." },
      { name: "Anchor", freq: 432, desc: "Warm, grounded mid. The default desk tone, present without asking for attention." },
      { name: "Stillpoint", freq: 528, desc: "Centered and even. For the part of the day where the work needs a quiet room." },
      { name: "Momentum", freq: 639, desc: "A brighter tone that carries energy through the second half of a session." },
      { name: "Current", freq: 741, desc: "Clear upper-mid. Keeps thought moving when the work turns analytical." },
    ],
    blurb: "Five clean, even tones for long focused work. No beat, no melody, nothing to pull your attention.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "night",
    title: "Night",
    kind: "set",
    category: "sleep",
    priceUsd: 14,
    tracks: [
      { name: "Nightfall", freq: 20, desc: "The lowest tone in the catalogue. A soft floor under the room as the day ends." },
      { name: "Moonlight", freq: 111, desc: "Deep, round low. For the slow hour before bed." },
      { name: "Nocturne", freq: 174, desc: "Warm and grounding. A long tone for low light and quiet rooms." },
      { name: "Dreamland", freq: 285, desc: "Soft mid-low. Designed to sit underneath the room without becoming the room." },
      { name: "Slumber", freq: 396, desc: "The highest tone in the set, still below speech and easy to leave in the background." },
    ],
    blurb: "The deepest, lowest tones in the catalogue, built for unwinding at the end of the day.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "calm",
    title: "Calm",
    kind: "set",
    category: "calm",
    priceUsd: 14,
    tracks: [
      { name: "Drift", freq: 417, desc: "Gentle mid that takes the edge off a busy morning." },
      { name: "Soften", freq: 465, desc: "Round, unhurried tone for reading or slow tea." },
      { name: "Stillpoint", freq: 528, desc: "Centered and even, used here for quiet rest." },
      { name: "Weightless", freq: 852, desc: "Light upper-mid. Opens the room without raising the energy." },
      { name: "Afterglow", freq: 963, desc: "Bright but soft. A held breath at the top of the calm range." },
    ],
    blurb: "Soft, gentle tones for slowing down, reading, or sitting in quiet. Even and unhurried.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "study-hall",
    title: "Study Hall",
    kind: "set",
    category: "study",
    priceUsd: 14,
    tracks: [
      { name: "Clear Light", freq: 660, desc: "Bright, even mid. The default revision tone, alert without becoming loud." },
      { name: "Lucid", freq: 690, desc: "A slight lift above Clear Light. For tighter focus on dense material." },
      { name: "Daylight", freq: 727, desc: "Open and present. Carries long reading sessions without fatigue." },
      { name: "Keen", freq: 787, desc: "Sharper edge for problem sets and detail work." },
      { name: "Clarity", freq: 880, desc: "Top of the study range. Crisp and steady for final passes and review." },
    ],
    blurb: "Clearer, present tones for reading, revision, and long study blocks.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "bright",
    title: "Bright",
    kind: "set",
    category: "energy",
    priceUsd: 14,
    tracks: [
      { name: "First Light", freq: 802, desc: "Upper-mid lift. A warmer start to the bright range." },
      { name: "Rise", freq: 2003, desc: "High and clean. Daylight on the desk." },
      { name: "Lift", freq: 2008, desc: "Sits just beside Rise, a slight shift in air for variation." },
      { name: "Radiance", freq: 5000, desc: "Treble-bright. Open, awake, and direct." },
      { name: "Zenith", freq: 10000, desc: "The highest tone in the catalogue. Pure, sharp, and present." },
    ],
    blurb: "The highest, most present tones in the catalogue, for a more awake kind of background.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "open-air",
    title: "Open Air",
    kind: "single",
    category: "study",
    priceUsd: 4,
    tracks: [{ name: "Open Air", freq: 728, desc: "A single clear, mid-bright tone, held perfectly steady for over eleven hours." }],
    blurb: "A single clear, mid-bright tone, held steady for over eleven hours.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "hush",
    title: "Hush",
    kind: "single",
    category: "calm",
    priceUsd: 4,
    tracks: [{ name: "Hush", freq: 784, desc: "A single soft, warm tone for quiet moments, held even throughout." }],
    blurb: "A single soft, warm tone for quiet moments, held even throughout.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "skyline",
    title: "Skyline",
    kind: "single",
    category: "energy",
    priceUsd: 4,
    tracks: [{ name: "Skyline", freq: 2127, desc: "A single bright, high tone with a clean, present character." }],
    blurb: "A single bright, high tone with a clean, present character.",
    driveLink: "",
    stripePriceId: "",
  },
  {
    slug: "complete-library",
    title: "Complete Library",
    kind: "library",
    category: "all",
    priceUsd: 44,
    tracks: [
      { name: "Nightfall", freq: 20 },
      { name: "Deep End", freq: 40 },
      { name: "Moonlight", freq: 111 },
      { name: "Nocturne", freq: 174 },
      { name: "Dreamland", freq: 285 },
      { name: "Slumber", freq: 396 },
      { name: "Drift", freq: 417 },
      { name: "Anchor", freq: 432 },
      { name: "Soften", freq: 465 },
      { name: "Stillpoint", freq: 528 },
      { name: "Momentum", freq: 639 },
      { name: "Clear Light", freq: 660 },
      { name: "Lucid", freq: 690 },
      { name: "Daylight", freq: 727 },
      { name: "Open Air", freq: 728 },
      { name: "Current", freq: 741 },
      { name: "Hush", freq: 784 },
      { name: "Keen", freq: 787 },
      { name: "First Light", freq: 802 },
      { name: "Weightless", freq: 852 },
      { name: "Clarity", freq: 880 },
      { name: "Afterglow", freq: 963 },
      { name: "Rise", freq: 2003 },
      { name: "Lift", freq: 2008 },
      { name: "Skyline", freq: 2127 },
      { name: "Radiance", freq: 5000 },
      { name: "Zenith", freq: 10000 },
    ],
    blurb: "Every tone in the catalogue: all five families, 27 tracks, each held for over eleven hours in lossless quality.",
    driveLink: "",
    stripePriceId: "",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
