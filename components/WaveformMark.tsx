export function WaveformMark({ className = "h-4 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 24" className={className} aria-hidden="true">
      <path
        d="M2 12 C 8 2, 14 2, 20 12 S 32 22, 38 12 S 50 2, 56 12 S 68 22, 74 12 S 86 2, 94 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
