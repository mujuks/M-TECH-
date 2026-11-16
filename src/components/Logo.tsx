import { Link } from 'react-router-dom';

type LogoProps = {
  tone?: 'dark' | 'light';
  onClick?: () => void;
};

export function Logo({ tone = 'dark', onClick }: LogoProps) {
  const dark = tone === 'dark';

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="M-TECH home"
      className="group flex items-center gap-2.5"
    >
      <span
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-extrabold tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5 ${
          dark ? 'bg-navy text-white' : 'bg-white text-navy'
        } shadow-[0_10px_26px_-12px_rgb(8_123_250_/_0.8)]`}
      >
        M
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-electric" />
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
