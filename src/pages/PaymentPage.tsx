import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import {
  findClassById,
  formatKes,
  type ClassCourse,
  type ClassUnit,
} from '../data/classes';
import { siteConfig, whatsappLink } from '../data/siteConfig';

type EnrollState = { classId: string; units: string[] };

function readEnrollState(location: { state: unknown }): EnrollState | null {
  const fromNav = location.state as EnrollState | null;
  if (fromNav?.classId && Array.isArray(fromNav.units) && fromNav.units.length > 0) {
    return fromNav;
  }
  try {
    const raw = sessionStorage.getItem('mtech-enroll');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EnrollState;
    if (parsed?.classId && Array.isArray(parsed.units) && parsed.units.length > 0) {
      return parsed;
    }
  } catch {
    /* ignore corrupt storage */
  }
  return null;
}

function makePayRef(): string {
  const d = new Date();
  const y = String(d.getFullYear()).slice(2);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MT-PAY-${y}${m}${day}-${rand}`;
}

/**
 * Checkout for selected class units — order summary, total, M-Pesa / card
 * instructions and a WhatsApp confirmation with the payment reference.
 */
export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const enroll = useMemo(() => readEnrollState(location), [location]);

  const course: ClassCourse | undefined = enroll ? findClassById(enroll.classId) : undefined;
  const units: ClassUnit[] = useMemo(() => {
    if (!course || !enroll) return [];
    return course.units.filter((u) => enroll.units.includes(u.name));
  }, [course, enroll]);

  const total = units.reduce((sum, u) => sum + u.amount, 0);

  const [payRef] = useState(() => makePayRef());
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [step, setStep] = useState<'form' | 'instructions'>('form');

  // Clear a previous enrollment only when leaving with a completed hand-off.
  useEffect(() => {
    if (!enroll || !course) {
      // Nothing to pay for — nudge back to classes.
    }
  }, [enroll, course]);

  if (!enroll || !course || units.length === 0 || total <= 0) {
    return (
      <div className="bg-ice pt-[72px]">
        <section className="py-20">
          <div className="container-site mx-auto max-w-lg text-center">
            <AlertCircle size={40} className="mx-auto text-amber-dark" aria-hidden />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-navy">
              No units selected
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Choose your units on the classes page first, then come back to pay.
            </p>
            <Link
              to="/classes"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-action px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-action-dark"
            >
              <ArrowLeft size={16} aria-hidden />
              Back to classes
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const { mpesaPaybill, mpesaTill, mpesaAccount, paystackUrl } = siteConfig.payments;
  const hasMpesa = !!(mpesaPaybill || mpesaTill);
  const phoneDigits = phone.replace(/\D/g, '');
  const phoneOk = /^(?:254|0)?7\d{8}$/.test(phoneDigits) || /^(?:254|0)?1\d{8}$/.test(phoneDigits);

  const startMpesa = () => {
    if (!phoneOk) {
      setPhoneError('Enter a valid Safaricom number, e.g. 0712 345 678.');
      return;
    }
    setPhoneError('');
    setStep('instructions');
  };

  const waPaymentMessage = [
    `Hello ${siteConfig.name}, I've initiated payment for enrollment.`,
    '',
    `Reference: ${payRef}`,
    `Class: ${course.title}`,
    'Units:',
    ...units.map((u) => `• ${u.name} — ${u.price} (${u.duration})`),
    `Total: ${formatKes(total)}`,
    phoneDigits ? `M-Pesa number: ${phoneDigits}` : '',
    '',
    'I will send the M-Pesa confirmation SMS / screenshot shortly.',
  ]
    .filter(Boolean)
    .join('\n');

  const Icon = course.icon;

  return (
    <div className="bg-ice pt-[72px]">
      <section className="py-16 sm:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Checkout"
            title="Pay for your class units"
            highlight="class units"
            subtitle="Review your selection, pay with M-Pesa or card, and confirm on WhatsApp."
          />

          <Reveal className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Order summary */}
            <div className="rounded-[24px] border border-navy/10 bg-white p-6 shadow-card sm:p-7">
              <div className="flex items-center gap-3 border-b border-navy/10 pb-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#06152E,#087BFA)]">
                  <Icon size={22} className="text-white" aria-hidden strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    {course.category} · Enrollment
                  </p>
                  <h2 className="font-display text-lg font-extrabold text-navy">
                    {course.title}
                  </h2>
                </div>
              </div>

              <p className="eyebrow mt-5 text-amber-dark">Selected units</p>
              <ul className="mt-3 overflow-hidden rounded-2xl border border-navy/10">
                {units.map((unit, i) => (
                  <li
                    key={unit.name}
                    className={`flex flex-wrap items-baseline justify-between gap-2 px-4 py-3.5 sm:px-5 ${
                      i % 2 ? 'bg-ice/60' : 'bg-white'
                    } ${i ? 'border-t border-navy/10' : ''}`}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">
                        {unit.name}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                        <Clock size={12} aria-hidden />
                        {unit.duration}
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-sm font-bold text-action">
                      {unit.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-navy px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-ice/70">
                  Total due
                </span>
                <span className="font-display text-2xl font-extrabold text-white">
                  {formatKes(total)}
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted">
                Payment reference <strong className="text-navy">{payRef}</strong> — include
                it when you pay so we can match your enrollment.
              </p>
            </div>

            {/* Payment methods */}
            <div className="rounded-[24px] border border-navy/10 bg-white p-6 shadow-card sm:p-7">
              <p className="eyebrow text-amber-dark">Payment method</p>

              {step === 'form' && (
                <div className="mt-4 space-y-5">
                  {/* M-Pesa */}
                  <div className="rounded-2xl border border-navy/10 bg-ice/50 p-4">
                    <p className="flex items-center gap-2 font-display text-sm font-extrabold text-navy">
                      <Smartphone size={16} className="text-action" aria-hidden />
                      M-Pesa
                    </p>
                    {hasMpesa ? (
                      <>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {mpesaPaybill && (
                            <>
                              Paybill <strong className="text-navy">{mpesaPaybill}</strong>
                              <br />
                            </>
                          )}
                          {mpesaTill && (
                            <>
                              Buy Goods Till <strong className="text-navy">{mpesaTill}</strong>
                              <br />
                            </>
                          )}
                          Account:{' '}
                          <strong className="text-navy">
                            {mpesaAccount}-{payRef.slice(-8)}
                          </strong>
                        </p>
                        <label
                          htmlFor="pay-phone"
                          className="mb-1.5 mt-4 block text-sm font-semibold text-navy"
                        >
                          Your M-Pesa number
                        </label>
                        <input
                          id="pay-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="0712 345 678"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (phoneError) setPhoneError('');
                          }}
                          aria-invalid={!!phoneError}
                          className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-electric/40 ${
                            phoneError ? 'border-red-500' : 'border-navy/15 hover:border-navy/30'
                          }`}
                        />
                        {phoneError && (
                          <p className="mt-1.5 text-xs font-medium text-red-700">
                            {phoneError}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={startMpesa}
                          className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
                        >
                          <Wallet size={16} aria-hidden />
                          Get M-Pesa instructions
                        </button>
                      </>
                    ) : (
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        M-Pesa details are not published yet.{' '}
                        {paystackUrl ? 'Use card below' : 'Confirm payment on WhatsApp'} and
                        we’ll share the till / paybill.
                      </p>
                    )}
                  </div>

                  {/* Card / hosted checkout */}
                  {paystackUrl && (
                    <a
                      href={paystackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-action px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-action-dark"
                    >
                      Pay {formatKes(total)} by card
                    </a>
                  )}

                  {/* WhatsApp hand-off */}
                  <a
                    href={whatsappLink(waPaymentMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-5 py-3.5 text-sm font-semibold text-navy transition-all hover:border-electric hover:text-action"
                  >
                    Confirm enrollment on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => navigate('/classes')}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-action"
                  >
                    <ArrowLeft size={15} aria-hidden />
                    Change unit selection
                  </button>
                </div>
              )}

              {step === 'instructions' && (
                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                      <CheckCircle2 size={16} aria-hidden />
                      M-Pesa steps
                    </p>
                    <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed text-emerald-950">
                      <li>
                        Open M-Pesa on{' '}
                        <strong>{phone}</strong>
                      </li>
                      <li>
                        {mpesaPaybill ? (
                          <>
                            Lipa na M-Pesa · Paybill{' '}
                            <strong>{mpesaPaybill}</strong>
                          </>
                        ) : (
                          <>
                            Buy Goods · Till <strong>{mpesaTill}</strong>
                          </>
                        )}
                      </li>
                      <li>
                        Account / reference:{' '}
                        <strong>{mpesaAccount}-{payRef.slice(-8)}</strong>
                      </li>
                      <li>
                        Amount: <strong>{formatKes(total)}</strong>
                      </li>
                      <li>Enter your M-Pesa PIN and confirm</li>
                    </ol>
                  </div>

                  <a
                    href={whatsappLink(waPaymentMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    I’ve paid — send confirmation
                  </a>

                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-action"
                  >
                    <ArrowLeft size={15} aria-hidden />
                    Back
                  </button>

                  <p className="text-xs leading-relaxed text-muted">
                    Enrollment is confirmed after we verify your M-Pesa transaction — you’ll
                    get a message on WhatsApp.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
