import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <Reveal className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${
            tone === 'light' ? 'text-electric' : 'text-electric-soft'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-balance font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === 'light' ? 'text-navy' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            tone === 'light' ? 'text-muted' : 'text-ice/70'
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
