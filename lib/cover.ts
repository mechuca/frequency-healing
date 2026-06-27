import { CATEGORY_LABEL, type Product } from "@/data/products";

export const COVER_COLORS = {
  paper: "#E9EAE4",
  paper2: "#E6E7E2",
  ink: "#1C1E1B",
  ink2: "#6B6E66",
  graphite: "#191B19",
  eucalyptus: "#C7CFC9",
  focus: "#44637A",
  sleep: "#2F3A5C",
  calm: "#5F7159",
  study: "#9A6E48",
  energy: "#A8583F",
  all: "#191B19",
} as const;

export function waveformPath(
  W: number,
  H: number,
  opts?: { cycles?: number; amp?: number; decayStart?: number; decayEnd?: number; points?: number },
) {
  const { cycles = 3, amp = H * 0.26, decayStart = 0.42, decayEnd = 0.82, points = 240 } = opts ?? {};
  const mid = H / 2;
  let d = "";
  for (let i = 0; i <= points; i += 1) {
    const t = i / points;
    const x = W * t;
    const env = t <= decayStart ? 1 : t >= decayEnd ? 0 : 0.5 * (1 + Math.cos(Math.PI * ((t - decayStart) / (decayEnd - decayStart))));
    const y = mid + amp * env * Math.sin(2 * Math.PI * cycles * t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}

export function coverTheme(product: Product) {
  const dark = product.kind === "library";
  const accent = product.category === "all" ? COVER_COLORS.eucalyptus : COVER_COLORS[product.category];
  return {
    accent,
    background: dark ? COVER_COLORS.graphite : COVER_COLORS.paper,
    foreground: dark ? COVER_COLORS.paper : COVER_COLORS.ink,
    muted: dark ? "rgba(233,234,228,0.58)" : COVER_COLORS.ink2,
    tick: dark ? "rgba(233,234,228,0.18)" : "rgba(28,30,27,0.16)",
    surface: dark ? "rgba(233,234,228,0.07)" : COVER_COLORS.paper2,
  };
}

export function productKicker(product: Product) {
  const family = CATEGORY_LABEL[product.category].toUpperCase();
  const kind = product.kind === "library" ? "COMPLETE LIBRARY" : product.kind === "single" ? "SINGLE TONE" : `${family} SET`;
  return `${family} · ${kind}`;
}

export function productFrequency(product: Product) {
  if (product.kind !== "single") return null;
  return `${product.tracks[0]?.freq.toLocaleString() ?? ""} Hz`;
}
