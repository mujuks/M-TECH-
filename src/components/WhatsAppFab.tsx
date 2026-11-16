import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { site } from '../lib/site';

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${
        hidden ? 'pointer-events-none translate-y-6 opacity-0' : 'opacity-100'
      }`}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="wa-card"
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-72 rounded-2xl border border-navy/10 bg-white p-5 shadow-[0_24px_60px_-24px_rgb(6_21_46_/_0.45)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-sm font-bold text-navy">Chat with M-TECH</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Tell us about your project and we&apos;ll get back to you.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close WhatsApp panel"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-ice hover:text-navy"
              >
                <X size={14} aria-hidden />
              </button>
            </div>

            <a
              href={site.whatsapp.message(
                'Hi M-TECH! I would like to discuss a project. Could you share more information?',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle size={16} aria-hidden />
              Start Conversation
            </a>

            <a
              href={`tel:${site.phones[1].tel}`}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-navy/12 px-4 py-3 text-sm font-semibold text-navy transition-colors hover:border-electric hover:text-electric"
            >
              {site.phones[1].display}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close contact options' : 'Open WhatsApp contact'}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_44px_-16px_rgb(37_211_102_/_0.9)] transition-transform duration-300 hover:scale-105"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/40"
        />
        {open ? <X size={24} aria-hidden /> : <MessageCircle size={24} aria-hidden />}
      </button>
    </div>
  );
}
