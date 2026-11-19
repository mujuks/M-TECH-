import { Link } from 'react-router-dom';

type LogoProps = {
  tone?: 'dark' | 'light';
  className?: string;
};

export function Logo({ tone = 'dark', className = '' }: LogoProps) {
  const dark = tone === 'dark';

  return (
    <Link
      to="/"
      aria-label="M-TECH — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        aria-hidden
        className="relative flex h-9 w-9 items-center justify-center"
      >
        <span
          className={`h-5 w-5 rotate-45 rounded-[5px] ${
            dark ? 'bg-electric' : 'bg-electric'
          } shadow-[0_0_16px_4px_rgb(8_123_250_/_0.55)] transition-transform duration-300 group-hover:rotate-[60deg]`}
        />
      </span>
      <span
        className={`font-display text-xl font-extrabold tracking-tight ${
          dark ? 'text-navy' : 'text-white'
        }`}
      >
        M<span className="text-electric">-</span>TECH
      </span>
    </Link>
  );
}
