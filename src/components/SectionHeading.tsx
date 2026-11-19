import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  /** Heading text — use `highlight` for the emphasised phrase. */
  title: string;
  /** Phrase inside `title` rendered in the accent colour. */
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
  id?: string;
};

function renderTitle(title: string, highlight: string | undefined, accentClass: string) {
  if (!highlight) return title;
  const index = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <span className={accentClass}>{title.slice(index, index + highlight.length)}</span>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  tone = 'light',
  id,
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const dark = tone === 'dark';
  const accentClass = dark ? 'text-amber' : 'text-action';

  return (
    <Reveal className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow ${dark ? 'text-amber/90' : 'text-amber-dark'}`}>{eyebrow}</p>
      )}
      <h2
        id={id}
        className={`heading-fluid mt-4 text-balance font-display font-extrabold leading-[1.1] tracking-[-0.02em] ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {renderTitle(title, highlight, accentClass)}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? 'text-ice/70' : 'text-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
