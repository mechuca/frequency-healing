"use client";

type HapticStyle = "light" | "medium" | "success";

const patterns: Record<HapticStyle, number | number[]> = {
  light: 8,
  medium: 14,
  success: [8, 24, 8],
};

export function haptic(style: HapticStyle = "light") {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  navigator.vibrate(patterns[style]);
}
