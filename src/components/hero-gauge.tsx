export function HeroGauge() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
        <rect width="320" height="320" rx="36" className="fill-surface" />
        <g fill="none" stroke="currentColor" className="text-border">
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="28"
              x2="292"
              y1={70 + i * 28}
              y2={70 + i * 28}
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`v-${i}`}
              y1="56"
              y2="264"
              x1={56 + i * 52}
              x2={56 + i * 52}
              strokeWidth="1"
            />
          ))}
        </g>
        <circle
          cx="160"
          cy="160"
          r="92"
          fill="none"
          className="stroke-primary/15"
          strokeWidth="10"
        />
        <circle
          cx="160"
          cy="160"
          r="92"
          fill="none"
          className="stroke-primary"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="390 578"
          transform="rotate(-90 160 160)"
        />
        <circle cx="160" cy="160" r="6" className="fill-primary" />
        <line
          x1="160"
          y1="160"
          x2="214"
          y2="108"
          className="stroke-primary"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl tracking-tight text-fg">72</span>
        <span className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          Sample score
        </span>
      </div>
    </div>
  );
}
