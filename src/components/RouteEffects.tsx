import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES: Record<string, string> = {
  '/': 'M-TECH | Build • Design • Grow — Websites, Branding & Digital Solutions',
  '/about': 'About Us | M-TECH',
  '/services': 'Services | M-TECH',
  '/classes': 'Classes & Training | M-TECH',
  '/portfolio': 'Portfolio | M-TECH',
  '/pricing': 'Pricing | M-TECH',
  '/contact': 'Contact Us | M-TECH',
  '/quote': 'Get a Quote | M-TECH',
  '/payment': 'Payment | M-TECH',
};

/**
 * Runs on every route change: keeps `document.title` in sync and resets
 * scroll (or honours an in-page hash target such as the skip link's `#main`).
 */
export function RouteEffects() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    document.title = PAGE_TITLES[pathname] ?? 'Page Not Found | M-TECH';

    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
