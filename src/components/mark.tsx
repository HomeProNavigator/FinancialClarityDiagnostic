export function ClarityMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect width="32" height="32" rx="7" className="fill-primary" />
      <circle
        cx="16"
        cy="16"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary-fg"
      />
      <circle cx="16" cy="16" r="2" className="fill-primary-fg" />
      <path
        d="M16 16L22 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-primary-fg"
      />
    </svg>
  );
}
