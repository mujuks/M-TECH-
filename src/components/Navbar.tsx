import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { navLinks } from '../data/siteConfig';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close menu on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Focus trap while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>('a, button');
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const handleLinkClick = () => {
    close();
    toggleRef.current?.focus({ preventScroll: true });
  };

  const linkClass = (isActive: boolean) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-white/10 text-white' : 'text-ice/80 hover:text-white'
    }`;

  const mobileLinkClass = (isActive: boolean) =>
    `relative flex min-h-[48px] items-center justify-between gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-white/10 text-white before:absolute before:left-0 before:top-1/2 before:h-6 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-amber'
        : 'text-ice/75 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-navy transition-all duration-300 print:hidden ${
        open
          ? 'border-white/10'
          : scrolled
            ? 'border-white/10 shadow-[0_10px_40px_-24px_rgb(0_0_0_/_0.6)]'
            : 'border-white/10'
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <Logo tone="light" />

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={handleLinkClick}
              className={({ isActive }) => linkClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link
            to="/quote"
            onClick={handleLinkClick}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-action px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-action-dark hover:shadow-[0_18px_44px_-14px_rgb(10_108_224_/_0.9)]"
          >
            Get a Quote
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:border-white/50 hover:bg-white/15 active:scale-95 xl:hidden"
        >
          <span className="relative block h-5 w-5">
            <motion.span
              className="absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current"
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute left-0 top-[9px] block h-0.5 w-5 rounded-full bg-current"
              animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 top-[17px] block h-0.5 w-5 rounded-full bg-current"
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-navy/95 backdrop-blur-xl xl:hidden"
          >
            <nav aria-label="Mobile" className="container-site flex flex-col gap-1 py-5">
              <p className="eyebrow px-4 pb-2 text-electric-soft">Menu</p>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={handleLinkClick}
                    className={({ isActive }) => mobileLinkClass(isActive)}
                  >
                    {link.label}
                    <ArrowRight size={16} className="text-electric-soft" aria-hidden />
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.04, duration: 0.3 }}
                className="mt-4 border-t border-white/10 pt-4"
              >
                <Link
                  to="/quote"
                  onClick={handleLinkClick}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-action px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-action-dark active:scale-[0.98]"
                >
                  Get a Quote
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
