import { cn } from "@/lib/cn";
import type { ClarityBand } from "@/lib/diagnostic/types";

const BAND_TONE: Record<ClarityBand, string> = {
  fog: "text-warn",
  forming: "text-watch",
  clear: "text-primary-soft",
  sharp: "text-good",
};

export function ScoreRing({
  score,
  band,
  size = 196,
  className,
}: {
  score: number;
  band: ClarityBand;
  size?: number;
  className?: string;
}) {
  const stroke = 10;
  const r = (size - stroke) / 2 - 4;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, score));
  const dash = (clamped / 100) * c;

  return (
    <div
      className={cn(
        "relative inline-flex size-44 items-center justify-center sm:size-[12.25rem]",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-full w-full rotate-[-90deg]"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className="stroke-border"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={cn("transition-[stroke-dashoffset] duration-700", BAND_TONE[band])}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl tabular-nums leading-none tracking-tight text-fg">
          {clamped}
        </span>
        <span className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
          Clarity
        </span>
      </div>
    </div>
  );
}
