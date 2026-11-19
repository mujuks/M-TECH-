import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'amber' | 'blue' | 'glass' | 'light';

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  full?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 min-h-[44px]';

const variants: Record<ButtonVariant, string> = {
  amber:
    'bg-amber text-navy shadow-[0_14px_36px_-14px_rgb(245_166_35_/_0.85)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgb(245_166_35_/_0.95)]',
  blue: 'bg-action text-white shadow-[0_14px_36px_-14px_rgb(10_108_224_/_0.85)] hover:-translate-y-0.5 hover:bg-action-dark',
  glass:
    'border border-white/35 bg-white/10 text-white backdrop-blur-md hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20',
  light:
    'bg-white text-navy shadow-[0_14px_36px_-16px_rgb(0_0_0_/_0.4)] hover:-translate-y-0.5 hover:bg-ice',
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { href?: undefined };

type LinkProps = CommonProps & {
  /** Internal route (`/contact`) or external URL (`https://…`). */
  href: string;
  /** Router state passed through to internal links (e.g. enroll preset). */
  state?: unknown;
  target?: string;
  rel?: string;
  onClick?: () => void;
  'aria-label'?: string;
};

export function Button({
  children,
  variant = 'blue',
  className = '',
  full = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={`${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = 'blue',
  className = '',
  full = false,
  href,
  state,
  target,
  rel,
  ...rest
}: LinkProps) {
  const external = href.startsWith('http');
  const classes = `${base} ${variants[variant]} ${full ? 'w-full' : ''} ${className}`;

  if (!external) {
    return (
      <Link to={href} state={state} {...rest} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={target ?? '_blank'}
      rel={rel ?? 'noopener noreferrer'}
      {...rest}
      className={classes}
    >
      {children}
    </a>
  );
}
