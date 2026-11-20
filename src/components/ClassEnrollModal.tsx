import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatKes, type ClassCourse, type ClassUnit } from '../data/classes';
import { Button } from './Button';

type ClassEnrollModalProps = {
  course: ClassCourse | null;
  onClose: () => void;
};

/**
 * Opens when the customer presses “Enroll now”. They tick the units they
 * want, see the running total, then continue to the payment page.
 */
export function ClassEnrollModal({ course, onClose }: ClassEnrollModalProps) {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);

  // Reset ticks whenever a different class opens.
  useEffect(() => {
    setSelected([]);
  }, [course]);

  useEffect(() => {
    if (!course) return;

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
  }, [course, onClose]);

  if (!course) return null;

  const Icon = course.icon;

  const toggle = (name: string) => {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((n) => n !== name)
        : [...current, name],
    );
  };

  const pickedUnits: ClassUnit[] = course.units.filter((u) =>
    selected.includes(u.name),
  );
  const total = pickedUnits.reduce((sum, u) => sum + u.amount, 0);
  const canPay = pickedUnits.length > 0 && total > 0;

  const goToPayment = () => {
    if (!canPay) return;
    const payload = { classId: course.id, units: selected };
    // Keep a copy so a refresh on /payment still works.
    sessionStorage.setItem('mtech-enroll', JSON.stringify(payload));
    onClose();
    navigate('/payment', { state: payload });
  };

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          key="enroll-modal"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          <button
            type="button"
            aria-label="Close enroll dialog"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-navy/75 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enroll-modal-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[24px] border border-navy/10 bg-white shadow-card-hover"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 bg-[linear-gradient(120deg,#06152E_0%,#0B2A55_55%,#0A6CE0_120%)] p-6 print:hidden">
              <div className="flex items-start gap-3">
                {Icon && (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon size={22} className="text-white" aria-hidden strokeWidth={1.75} />
                  </span>
                )}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ice/70">
                    Enroll · {course.category}
                  </p>
                  <h2
                    id="enroll-modal-title"
                    className="mt-1 font-display text-xl font-extrabold text-white"
                  >
                    {course.title}
                  </h2>
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X size={17} aria-hidden />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm leading-relaxed text-muted">
                Tick the units you want to study — your total updates as you select —
                then continue to payment.
              </p>

              {/* Unit picker */}
              <fieldset className="mt-5">
                <legend className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-dark">
                  Select units
                </legend>
                <ul className="space-y-3">
                  {course.units.map((unit) => {
                    const on = selected.includes(unit.name);
                    return (
                      <li key={unit.name}>
                        <label
                          className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                            on
                              ? 'border-electric bg-white shadow-[0_0_0_1px_rgb(8_123_250_/_0.35)]'
                              : 'border-navy/10 bg-ice/50 hover:border-navy/30'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggle(unit.name)}
                            className="mt-1 h-4.5 w-4.5 shrink-0 accent-[#087bfa]"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-start justify-between gap-2">
                              <span className="font-display text-base font-extrabold text-navy">
                                {unit.name}
                              </span>
                              <span className="shrink-0 rounded-full bg-action px-3 py-1 font-display text-sm font-bold text-white">
                                {unit.price}
                              </span>
                            </span>
                            {unit.note && (
                              <span className="mt-1 block text-sm leading-relaxed text-muted">
                                {unit.note}
                              </span>
                            )}
                            <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-dark">
                              <Clock size={13} aria-hidden />
                              {unit.duration}
                            </span>
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>

              {/* Running total */}
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-navy/10 bg-navy px-4 py-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-ice/70">
                  {pickedUnits.length} unit{pickedUnits.length === 1 ? '' : 's'} selected
                </span>
                <span className="font-display text-lg font-extrabold text-white">
                  {formatKes(total)}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={goToPayment}
                  disabled={!canPay}
                  variant="blue"
                  className="flex-1 justify-center"
                >
                  <ShoppingCart size={16} aria-hidden />
                  Proceed to payment
                  <ArrowRight size={16} aria-hidden />
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-5 py-3 text-sm font-semibold text-navy transition-all hover:border-electric hover:text-action"
                >
                  Back to classes
                </button>
              </div>

              {!canPay && (
                <p className="mt-3 text-center text-xs text-muted">
                  Select at least one unit with a price to continue.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
