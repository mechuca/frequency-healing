import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/data/products";
import { coverTheme, productFrequency, productKicker, waveformPath } from "@/lib/cover";

export const alt = "StillTones product cover";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const theme = coverTheme(product);
  const wave = waveformPath(840, 150, { cycles: product.kind === "library" ? 4 : 3 });
  const frequency = productFrequency(product);

  return new ImageResponse(
    (
      <div style={{ background: theme.background, color: theme.foreground, display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", padding: 72, width: "100%" }}>
        <div style={{ color: theme.muted, display: "flex", fontFamily: "monospace", fontSize: 26, letterSpacing: 6, textTransform: "uppercase" }}>{productKicker(product)}</div>
        <svg width="840" height="150" viewBox="0 0 840 150">
          <path d={wave} fill="none" stroke={theme.accent} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 96, fontWeight: 700, letterSpacing: -5, lineHeight: 0.92 }}>{product.title.toLowerCase()}</div>
          <div style={{ color: theme.muted, display: "flex", fontFamily: "monospace", fontSize: 26, letterSpacing: 2 }}>{frequency ?? `${product.tracks.length} tones · 11:11:11 · FLAC + MP3`}</div>
        </div>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: theme.muted, display: "flex", fontFamily: "Arial, sans-serif", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>stilltones</div>
          <div style={{ border: `1px solid ${theme.tick}`, borderRadius: 999, color: theme.muted, display: "flex", fontFamily: "monospace", fontSize: 22, padding: "14px 22px" }}>${product.priceUsd}</div>
        </div>
      </div>
    ),
    size,
  );
}
