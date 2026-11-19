import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ArrowUpRight, ImageOff } from 'lucide-react';
import type { PortfolioItem } from '../data/portfolio';
import { portfolioDemoNote } from '../data/portfolio';
import { ProjectMockup } from './ProjectMockup';

type ProjectModalProps = {
  item: PortfolioItem | null;
  onClose: () => void;
};

export function ProjectModal({ item, onClose }: ProjectModalProps) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previous?.focus?.();
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          <button
            type="button"
            aria-label="Close project preview"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-navy/75 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-navy/10 bg-white shadow-[0_40px_100px_-40px_rgb(6_21_46_/_0.7)]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-navy/70 text-white backdrop-blur transition-colors hover:bg-navy"
            >
              <X size={18} aria-hidden />
            </button>

            <div className="overflow-hidden rounded-t-[28px] bg-[linear-gradient(135deg,#0B2A55_0%,#0A56B5_55%,#087BFA_100%)]">
              <ProjectMockup variant={item.mock} />
            </div>

            <div className="p-7 sm:p-9">
              <span className="inline-flex rounded-full bg-ice px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-action">
                {item.category}
              </span>
              <h3
                id="project-modal-title"
                className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy"
              >
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {item.description}
              </p>

              <p className="mt-4 flex items-start gap-1.5 text-xs font-medium text-amber-dark">
                <ImageOff size={13} className="mt-0.5 shrink-0" aria-hidden />
                {portfolioDemoNote}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-action px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-action-dark"
                  >
                    View live project
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/35 hover:bg-ice"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
