import { Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { siteConfig, navLinks } from '../data/siteConfig';

const serviceLinks = [
  { label: 'Website Development', to: '/services' },
  { label: 'Graphic Design', to: '/services' },
  { label: 'Branding', to: '/services' },
  { label: 'Custom Digital Solutions', to: '/services' },
];

const socialGlyphs: Record<string, string> = {
  Facebook: 'f',
  Instagram: 'ig',
  X: 'X',
  YouTube: 'yt',
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white print:hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_0%,rgb(8_123_250_/_0.35),transparent_45%),radial-gradient(circle_at_85%_100%,rgb(8_123_250_/_0.25),transparent_45%)]"
      />

      <div className="container-site relative py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 pb-12 sm:gap-x-8 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-3">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ice/65">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 eyebrow text-electric-soft">{siteConfig.slogan}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-electric/60 hover:bg-electric"
                >
                  <Phone size={15} aria-hidden />
                  {phone.display}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className="eyebrow text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ice/70 transition-colors hover:text-electric-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Our services" className="lg:col-span-2">
            <h3 className="eyebrow text-white">Our Services</h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ice/70 transition-colors hover:text-electric-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-2">
            <h3 className="eyebrow text-white">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {siteConfig.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="flex min-h-[32px] items-center gap-3 text-ice/70 transition-colors hover:text-electric-soft"
                  >
                    <Phone size={15} className="shrink-0 text-electric" aria-hidden />
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
              <h3 className="eyebrow text-white">Social Media</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {siteConfig.socials.map((s) => {
                  const glyph = socialGlyphs[s.name] ?? s.name.slice(0, 2);
                  const pending = s.url.length === 0;
                  const className =
                    'flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-xs font-bold uppercase text-ice/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric hover:text-white';

                  return pending ? (
                    <span
                      key={s.name}
                      className={`${className} cursor-default opacity-55`}
                      title={`${s.name} link coming soon`}
                      aria-label={`${s.name} — link coming soon`}
                    >
                      {glyph}
                    </span>
                  ) : (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className={className}
                    >
                      {glyph}
                    </a>
                  );
                })}
              </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-ice/60">{siteConfig.copyright}</p>
          <p className="eyebrow flex items-center gap-2 text-electric-soft">
            {siteConfig.footerNote}
            <ArrowUpRight size={14} aria-hidden />
          </p>
        </div>
      </div>
    </footer>
  );
}
