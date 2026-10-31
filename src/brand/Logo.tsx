/**
 * Personal mark: a lightbulb whose filament is the letter "A" — ideas made clear.
 * Violet tile (the cover & talks palette), white bulb (clarity), amber spark (the moment it clicks).
 */
export function LogoMark({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-tile" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#logo-tile)" />
      <g stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.2 31c-3-2.1-4.9-5.5-4.9-9.4C14.3 16.3 18.6 12 24 12s9.7 4.3 9.7 9.6c0 3.9-1.9 7.3-4.9 9.4" />
        <path d="M19.8 35h8.4" />
        <path d="M21.6 39h4.8" />
        <path d="M20.3 28.2L24 19.6l3.7 8.6" />
        <path d="M21.7 25.1h4.6" />
      </g>
      <circle cx="36.2" cy="11.8" r="2.7" fill="#FFC21A" />
    </svg>
  );
}

export function Logo({ name, tagline = 'Learn · Build · Clarify' }: { name: string; tagline?: string }) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark size={38} />
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-lg font-semibold text-ink">{name}</span>
        <span className="mt-1 block text-xs font-medium text-muted">{tagline}</span>
      </span>
    </span>
  );
}
