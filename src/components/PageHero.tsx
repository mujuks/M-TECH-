import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div
        aria-hidden
        className="grid-bg absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(8,123,250,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,123,250,0.14) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 75% 80% at 50% 0%, black 35%, transparent 100%)',
        }}
      />
      <span
        aria-hidden
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-electric/25 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-electric/15 blur-3xl"
      />

      <div className="container-site relative">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-electric-soft">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ice/70 sm:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
