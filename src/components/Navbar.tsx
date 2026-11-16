import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { navLinks } from '../lib/site';

const DARK_HERO_ROUTES = ['/about', '/portfolio', '/contact'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const darkHero = DARK_HERO_ROUTES.includes(pathname);
  const solid = scrolled || open;
  const overDark = !solid && darkHero;

  const idleLink = overDark
    ? 'text-white/85 hover:text-electric-soft'
    : 'text-navy/75 hover:text-electric';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open
          ? 'border-b border-navy/10 bg-white shadow-[0_10px_40px_-24px_rgb(6_21_46_/_0.35)]'
          : scrolled
            ? 'glass border-b border-navy/10 shadow-[0_10px_40px_-24px_rgb(6_21_46_/_0.35)]'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Logo tone={overDark ? 'light' : 'dark'} onClick={() => setOpen(false)} />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isHash = link.to.includes('#');
            const classes = 'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200';

            if (isHash) {
              return (
                <a key={link.label} href={link.to} className={`${classes} ${idleLink}`}>
                  {link.label}
                </a>
              );
            }

            return (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `${classes} ${
                    isActive
                      ? overDark
                        ? 'bg-white/15 text-white'
                        : 'bg-electric/10 text-electric'
                      : idleLink
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-electric px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_-16px_rgb(8_123_250_/_0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-dark"
          >
            Get a Quote
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 lg:hidden ${
            solid
              ? 'border-navy/10 bg-white text-navy'
              : overDark
                ? 'border-white/25 bg-white/10 text-white backdrop-blur'
                : 'border-navy/10 bg-white/70 text-navy backdrop-blur'
          }`}
        >
          <span className="relative block h-5 w-5">
            <motion.span
              className="absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current"
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute left-0 top-3 block h-0.5 w-5 rounded-full bg-current"
              animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-5 block h-0.5 w-5 rounded-full bg-current"
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-navy/10 bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site flex flex-col gap-1 py-5">
              {navLinks.map((link, i) => {
                const isHash = link.to.includes('#');
                const cls =
                  'flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-navy transition-colors hover:bg-electric/8 hover:text-electric';

                const inner = (
                  <>
                    <motion.span
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    >
                      {link.label}
                    </motion.span>
                    <ArrowRight size={16} className="text-electric" aria-hidden />
                  </>
                );

                return isHash ? (
                  <a key={link.label} href={link.to} className={cls} onClick={() => setOpen(false)}>
                    {inner}
                  </a>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `${cls} ${isActive ? 'bg-electric/10 text-electric' : ''}`
                    }
                  >
                    {inner}
                  </NavLink>
                );
              })}

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-16px_rgb(8_123_250_/_0.9)]"
              >
                Get a Quote
                <ArrowRight size={16} aria-hidden />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
