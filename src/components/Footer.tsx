import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { site } from '../lib/site';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
];

const serviceLinks = [
  'Website Development',
  'Graphic Design',
  'Branding',
  'Custom Digital Solutions',
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_0%,rgb(8_123_250_/_0.35),transparent_45%),radial-gradient(circle_at_85%_100%,rgb(8_123_250_/_0.25),transparent_45%)]"
      />

      <div className="container-site relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ice/70">{site.tagline}</p>
            <p className="mt-3 font-display text-sm font-semibold tracking-[0.18em] text-electric-soft">
              {site.slogan}
            </p>

            <a
              href={site.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-electric/60 hover:bg-electric hover:shadow-[0_16px_40px_-18px_rgb(8_123_250_/_0.9)]"
            >
              <MessageCircle size={16} aria-hidden />
              Chat on WhatsApp
            </a>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
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

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              Our Services
            </h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link
                    to="/#services"
                    className="text-sm text-ice/70 transition-colors hover:text-electric-soft"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="flex items-center gap-3 text-ice/70 transition-colors hover:text-electric-soft"
                  >
                    <Phone size={15} className="shrink-0 text-electric" aria-hidden />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 break-all text-ice/70 transition-colors hover:text-electric-soft"
                >
                  <Mail size={15} className="shrink-0 text-electric" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ice/70">
                <MapPin size={15} className="mt-0.5 shrink-0 text-electric" aria-hidden />
                {site.location}
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                Social Media
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {site.social.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      aria-label={s.name}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-xs font-semibold text-ice/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric hover:text-white"
                    >
                      {s.name.slice(0, 2).toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-ice/60">{site.copyright}</p>
          <p className="flex items-center gap-2 font-display text-sm font-semibold text-electric-soft">
            {site.footerSlogan}
            <ArrowUpRight size={15} aria-hidden />
          </p>
        </div>
      </div>
    </footer>
  );
}
