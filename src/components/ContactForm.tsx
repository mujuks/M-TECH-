import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Send,
  ChevronDown,
} from 'lucide-react';
import { siteConfig, whatsappLink, serviceOptions } from '../data/siteConfig';

type FieldName = 'name' | 'email' | 'phone' | 'service' | 'budget' | 'description';

type FormState = Record<FieldName, string>;

type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  description: '',
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[\d\s()-]{7,20}$/;

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.name.trim()) errors.name = 'Please enter your full name.';
  if (!state.email.trim()) errors.email = 'Please enter your email address.';
  else if (!emailRe.test(state.email.trim()))
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  if (!state.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!phoneRe.test(state.phone.trim()))
    errors.phone = 'Please enter a valid phone number (digits only, 7–15 characters).';
  if (!state.service) errors.service = 'Please select the service you need.';
  if (!state.description.trim())
    errors.description = 'Please describe your project.';
  else if (state.description.trim().length < 10)
    errors.description = 'Please add a little more detail (at least 10 characters).';
  return errors;
}

/**
 * Single integration point for form delivery.
 * Swap the WhatsApp hand-off below for Formspree / EmailJS / a backend
 * without touching any of the UI code.
 */
async function submitInquiry(state: FormState): Promise<void> {
  const message = [
    'New project inquiry — M-TECH website',
    '',
    `Name: ${state.name}`,
    `Email: ${state.email}`,
    `Phone: ${state.phone}`,
    `Service: ${state.service}`,
    `Budget: ${state.budget || 'Not specified'}`,
    '',
    'Project description:',
    state.description,
  ].join('\n');

  // Opens WhatsApp pre-filled with every field.
  const opened = window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
  if (!opened) {
    throw new Error('Popup blocked');
  }
}

type ContactFormProps = {
  /** Pre-selected service (e.g. after clicking "Enroll now" on a class). */
  presetService?: string;
  /** Bumped on every enroll click so re-selecting the same class re-runs the effect. */
  presetNonce?: number;
};

export function ContactForm({ presetService = '', presetNonce = 0 }: ContactFormProps) {
  const [values, setValues] = useState<FormState>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const serviceRef = useRef<HTMLSelectElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (presetNonce === 0) return;
    if (presetService) {
      setValues((v) => ({ ...v, service: presetService }));
      setErrors((e) => ({ ...e, service: undefined }));
      // Focus the pre-selected field without fighting the section scroll.
      const t = window.setTimeout(() => {
        serviceRef.current?.focus({ preventScroll: true });
      }, 500);
      return () => window.clearTimeout(t);
    }
  }, [presetService, presetNonce]);

  const setField = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onBlur = (name: FieldName) => {
    const next = validate(values);
    setErrors((e) => ({ ...e, [name]: next[name] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) return; // basic spam trap — silently drop

    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('idle');
      // Move focus to the summary so screen-reader users hear the problem.
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus('loading');
    try {
      await submitInquiry(values);
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  const errorList = (Object.keys(errors) as FieldName[]).filter((k) => errors[k]);

  const fieldClass = (name: FieldName) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-electric/40 min-h-[48px] ${
      errors[name] ? 'border-red-500' : 'border-navy/15 hover:border-navy/30'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      {/* Honeypot — hidden from real users */}
      <div aria-hidden className="sr-only">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'success' && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900"
        >
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden />
          <span>
            Thank you — your message is ready. WhatsApp should open in a new tab with
            your details filled in; press send there and we&apos;ll get back to you.
          </span>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          <span>
            Something went wrong while opening WhatsApp. Please try again, or call us
            directly on {siteConfig.phones[1].display}.
          </span>
        </div>
      )}

      {errorList.length > 0 && status === 'idle' && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          <p className="font-semibold">Please fix the following:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {errorList.map((key) => (
              <li key={key}>{errors[key]}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cf-name"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            Full Name <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => onBlur('name')}
            className={fieldClass('name')}
          />
          {errors.name && (
            <p id="cf-name-error" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
              <AlertCircle size={13} aria-hidden />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cf-email"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            Email Address <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            placeholder="name@example.com"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => onBlur('email')}
            className={fieldClass('email')}
          />
          {errors.email && (
            <p id="cf-email-error" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
              <AlertCircle size={13} aria-hidden />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cf-phone"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            Phone Number <span aria-hidden className="text-red-500">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
            placeholder="07XX XXX XXX"
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            onBlur={() => onBlur('phone')}
            className={fieldClass('phone')}
          />
          {errors.phone && (
            <p id="cf-phone-error" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
              <AlertCircle size={13} aria-hidden />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cf-service"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            Service Required <span aria-hidden className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="cf-service"
              name="service"
              ref={serviceRef}
              required
              aria-required="true"
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? 'cf-service-error' : undefined}
              value={values.service}
              onChange={(e) => setField('service', e.target.value)}
              onBlur={() => onBlur('service')}
              className={`${fieldClass('service')} appearance-none pr-10 ${
                values.service ? '' : 'text-muted/70'
              }`}
            >
              <option value="">Select a service…</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </div>
          {errors.service && (
            <p id="cf-service-error" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
              <AlertCircle size={13} aria-hidden />
              {errors.service}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="cf-budget"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            Project Budget{' '}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="cf-budget"
            name="budget"
            type="text"
            aria-invalid={false}
            placeholder="e.g. KES 50,000 – 100,000"
            value={values.budget}
            onChange={(e) => setField('budget', e.target.value)}
            className={fieldClass('budget')}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="cf-description"
            className="mb-1.5 block text-sm font-semibold text-navy"
          >
            Project Description <span aria-hidden className="text-red-500">*</span>
          </label>
          <textarea
            id="cf-description"
            name="description"
            rows={5}
            required
            aria-required="true"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'cf-description-error' : undefined}
            placeholder="Tell us about your project, goals and timeline…"
            value={values.description}
            onChange={(e) => setField('description', e.target.value)}
            onBlur={() => onBlur('description')}
            className={`${fieldClass('description')} resize-y`}
          />
          <div className="mt-1.5 flex items-start justify-between gap-3">
            {errors.description ? (
              <p id="cf-description-error" className="flex items-center gap-1.5 text-xs font-medium text-red-700">
                <AlertCircle size={13} aria-hidden />
                {errors.description}
              </p>
            ) : (
              <span id="cf-description-hint" className="text-xs text-muted">
                Minimum 10 characters.
              </span>
            )}
            <span className="text-xs text-muted" aria-hidden>
              {values.description.length}/10+
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-action px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-14px_rgb(10_108_224_/_0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-action-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={17} className="animate-spin" aria-hidden />
            Preparing your message…
          </>
        ) : (
          <>
            <Send size={17} aria-hidden />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-xs leading-relaxed text-muted">
        Required fields are marked *. Your message opens in WhatsApp so you can send
        it directly to M-TECH.
      </p>
    </form>
  );
}
