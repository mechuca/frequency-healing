import { type Product } from "@/data/products";
import { coverTheme, productFrequency, productKicker, waveformPath } from "@/lib/cover";

type CoverProps = {
  product: Product;
  variant?: "square" | "wide";
  className?: string;
};

export function Cover({ product, variant = "square", className = "" }: CoverProps) {
  const wide = variant === "wide";
  const width = wide ? 1200 : 900;
  const height = wide ? 630 : 900;
  const theme = coverTheme(product);
  const wave = waveformPath(width * 0.72, height * 0.24, { cycles: product.kind === "library" ? 4 : 3 });
  const frequency = productFrequency(product);
  const ticks = Array.from({ length: wide ? 32 : 24 }, (_, index) => index);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${product.title} cover`} className={`block h-full w-full ${className}`}>
      <rect width={width} height={height} fill={theme.background} />
      <circle cx={width * 0.08} cy={height * 0.04} r={height * 0.22} fill={theme.accent} opacity={product.kind === "library" ? 0.2 : 0.1} />
      <circle cx={width * 0.92} cy={height * 0.92} r={height * 0.28} fill={theme.accent} opacity={product.kind === "library" ? 0.18 : 0.08} />

      <g transform={`translate(${width * 0.09} ${height * 0.2})`}>
        <path d={wave} fill="none" stroke={theme.accent} strokeWidth={wide ? 10 : 8} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g transform={`translate(${width * 0.09} ${height * 0.09})`}>
        <text fill={theme.muted} fontFamily="var(--font-plex-mono), monospace" fontSize={wide ? 26 : 21} letterSpacing={wide ? 6 : 4}>
          {productKicker(product)}
        </text>
      </g>

      <g transform={`translate(${width * 0.09} ${height * (wide ? 0.56 : 0.6)})`}>
        <text fill={theme.foreground} fontFamily="var(--font-hanken), sans-serif" fontWeight="700" fontSize={wide ? 92 : 76} letterSpacing={wide ? -5 : -4}>
          {product.title.toLowerCase()}
        </text>
        <text y={wide ? 58 : 56} fill={theme.muted} fontFamily="var(--font-plex-mono), monospace" fontSize={wide ? 24 : 20} letterSpacing={2}>
          {frequency ?? `${product.tracks.length} tones · 11:11:11`}
        </text>
      </g>

      <g transform={`translate(${width * 0.09} ${height * 0.86})`}>
        {ticks.map((tick) => (
          <rect key={tick} x={tick * (wide ? 25 : 22)} y={tick % 4 === 0 ? 0 : 10} width="2" height={tick % 4 === 0 ? 30 : 16} fill={theme.tick} />
        ))}
      </g>

      <text x={width * 0.91} y={height * 0.91} textAnchor="end" fill={theme.muted} fontFamily="var(--font-hanken), sans-serif" fontWeight="700" fontSize={wide ? 32 : 26} letterSpacing={-1}>
        stilltones
      </text>
    </svg>
  );
}
