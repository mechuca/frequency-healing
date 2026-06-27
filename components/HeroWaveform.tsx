export function HeroWaveform() {
  const paths = [
    "M0 145 C 120 5, 240 5, 360 145 S 600 285, 720 145 S 960 5, 1080 145 S 1320 285, 1440 145 S 1680 5, 1800 145 S 2040 285, 2160 145 S 2400 5, 2520 145 S 2760 285, 2880 145",
    "M0 265 C 150 150, 270 150, 420 265 S 690 380, 840 265 S 1110 150, 1260 265 S 1530 380, 1680 265 S 1950 150, 2100 265 S 2370 380, 2520 265 S 2760 180, 2880 245",
    "M0 430 C 180 360, 300 360, 480 430 S 780 500, 960 430 S 1260 360, 1440 430 S 1740 500, 1920 430 S 2220 360, 2400 430 S 2700 500, 2880 430",
  ];

  return (
    <div className="hero-wave absolute inset-y-[-12%] left-[-35%] w-[170%] opacity-75">
      <svg viewBox="0 0 2880 650" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="heroWave" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#44637A" stopOpacity="0" />
            <stop offset="24%" stopColor="#E9EAE4" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#5F7159" stopOpacity="0.18" />
            <stop offset="76%" stopColor="#E9EAE4" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#A8583F" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, index) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="url(#heroWave)"
            strokeWidth={index === 0 ? 1.2 : 0.8}
            style={{ animationDelay: `${index * 0.28}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
