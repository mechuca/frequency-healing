import { ImageResponse } from "next/og";

export const alt = "StillTones pure frequency audio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#151715",
          color: "#E9EAE4",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
          <div
            style={{
              alignItems: "center",
              border: "1px solid rgba(233,234,228,0.24)",
              borderRadius: 999,
              display: "flex",
              height: 70,
              justifyContent: "center",
              width: 70,
            }}
          >
            <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
              <path d="M6 32c4.4-11 8.8-11 13.2 0s8.8 11 13.2 0 8.8-11 13.2 0 8.8 11 13.2 0" stroke="#E9EAE4" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1.6 }}>StillTones</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ color: "rgba(233,234,228,0.48)", fontSize: 22, letterSpacing: 5, textTransform: "uppercase" }}>
            Lossless · 11:11:11 · FLAC + MP3
          </div>
          <div style={{ fontSize: 88, fontWeight: 760, letterSpacing: -6, lineHeight: 0.92, maxWidth: 900 }}>
            pure frequency audio for quiet focus.
          </div>
          <div style={{ color: "rgba(233,234,228,0.66)", fontSize: 30, lineHeight: 1.35, maxWidth: 820 }}>
            Single-frequency tones for focus, calm, study, and sleep. No beats, no melodies, no narration.
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {['Focus', 'Calm', 'Study', 'Sleep'].map((item) => (
            <div key={item} style={{ border: "1px solid rgba(233,234,228,0.18)", borderRadius: 999, color: "rgba(233,234,228,0.72)", fontSize: 22, padding: "14px 22px" }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
