import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';

type ButtonLinkProps = {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric';

const variants: Record<Variant, string> = {
  primary:
    'bg-electric text-white shadow-[0_14px_36px_-14px_rgb(8_123_250_/_0.85)] hover:bg-electric-dark hover:shadow-[0_18px_44px_-14px_rgb(8_123_250_/_0.95)] hover:-translate-y-0.5',
  secondary:
    'bg-navy text-white hover:bg-navy-soft hover:-translate-y-0.5 shadow-[0_14px_36px_-16px_rgb(6_21_46_/_0.7)]',
  ghost:
    'border border-navy/15 bg-white/70 text-navy backdrop-blur-sm hover:border-electric/50 hover:text-electric hover:-translate-y-0.5',
  light:
    'bg-white text-navy hover:bg-ice hover:-translate-y-0.5 shadow-[0_14px_36px_-16px_rgb(0_0_0_/_0.4)]',
};

export function ButtonLink({ to, children, variant = 'primary', className = '', onClick }: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const external = to.startsWith('http') || to.startsWith('tel:') || to.startsWith('mailto:');

  if (external) {
    return (
      <a
        href={to}
        className={classes}
        onClick={onClick}
        target={to.startsWith('http') ? '_blank' : undefined}
        rel={to.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit';
  variant?: Variant;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className} disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0`}
    >
      {children}
    </button>
  );
}
