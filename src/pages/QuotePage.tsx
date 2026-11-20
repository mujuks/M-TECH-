import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Mail,
  MessageCircle,
  RefreshCw,
  Share2,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { QuoteDocument } from '../components/QuoteDocument';
import { Reveal } from '../components/Reveal';
import { serviceOptions } from '../data/siteConfig';
import {
  buildQuote,
  deliverQuotePdf,
  downloadQuotePdf,
  getQuoteHeading,
  getQuoteLines,
  type DeliveryResult,
  type Quote,
} from '../lib/quote';

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

function validate(state: FormState, selected: string[]): FormErrors {
  const errors: FormErrors = {};
  if (!state.name.trim()) errors.name = 'Please enter your full name.';
  if (!state.email.trim()) errors.email = 'Please enter your email address.';
  else if (!emailRe.test(state.email.trim()))
    errors.email = 'Please enter a valid email address (e.g. name@example.com).';
  if (!state.phone.trim()) errors.phone = 'Please enter your WhatsApp number.';
  else if (!phoneRe.test(state.phone.trim()))
    errors.phone = 'Please enter a valid phone number (digits only, 7–15 characters).';
  if (!state.service) errors.service = 'Please select the service you need.';
  else if (selected.length === 0)
    errors.service = 'Please tick at least one item for your quote.';
  return errors;
}

type DeliveryState = 'idle' | 'delivering' | DeliveryResult;

export function QuotePage() {
  const [values, setValues] = useState<FormState>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [delivery, setDelivery] = useState<DeliveryState>('idle');
  const summaryRef = useRef<HTMLDivElement>(null);

  // Warm the PDF library so the share sheet opens within the user gesture.
  useEffect(() => {
    void import('jspdf');
  }, []);

  const lines = values.service ? getQuoteLines(values.service) : [];

  const setField = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const chooseService = (service: string) => {
    setValues((v) => ({ ...v, service }));
    const next = getQuoteLines(service);
    // A single-option service (a class fee) is pre-ticked; anything else is the
    // customer's choice.
    setSelected(next.length === 1 ? next.map((line) => line.item) : []);
    setErrors((e) => ({ ...e, service: undefined }));
  };

  const toggleItem = (item: string) => {
    setSelected((current) =>
      current.includes(item) ? current.filter((i) => i !== item) : [...current, item],
    );
    setErrors((e) => ({ ...e, service: undefined }));
  };

  /** Hands the PDF file to the share sheet (WhatsApp, e-mail, Drive, …). */
  const deliver = (target: Quote) => {
    setDelivery('delivering');
    deliverQuotePdf(target)
      .then((result) => setDelivery(result))
      .catch(() => setDelivery('downloaded'));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, selected);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const generated = buildQuote(values, selected);
    setQuote(generated);
    // Deliver the PDF file straight to the share sheet.
    deliver(generated);
  };

  const reset = () => {
    setQuote(null);
    setValues(initialValues);
    setSelected([]);
    setErrors({});
    setDelivery('idle');
  };

  const errorList = (Object.keys(errors) as FieldName[]).filter((k) => errors[k]);

  const fieldClass = (name: FieldName) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-electric/40 min-h-[48px] ${
      errors[name] ? 'border-red-500' : 'border-navy/15 hover:border-navy/30'
    }`;

  return (
    <div className="bg-ice pt-[72px]">
      <section className="py-16 sm:py-20 print:hidden">
        <div className="container-site">
          <SectionHeading
            eyebrow="Get a quote"
            title="Build your quote, we send the PDF"
            highlight="we send the PDF"
            subtitle="Pick your service, tick exactly what you need, and we generate a PDF quote and send it straight to you."
          />

          {!quote && (
            <Reveal className="mx-auto mt-10 max-w-3xl">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-[24px] border border-navy/10 bg-white p-6 shadow-card sm:p-8"
              >
                {errorList.length > 0 && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
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
                    <label htmlFor="q-name" className="mb-1.5 block text-sm font-semibold text-navy">
                      Full Name <span aria-hidden className="text-red-500">*</span>
                    </label>
                    <input
                      id="q-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-invalid={!!errors.name}
                      placeholder="Your full name"
                      value={values.name}
                      onChange={(e) => setField('name', e.target.value)}
                      className={fieldClass('name')}
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle size={13} aria-hidden />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="q-email" className="mb-1.5 block text-sm font-semibold text-navy">
                      Email Address <span aria-hidden className="text-red-500">*</span>
                    </label>
                    <input
                      id="q-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={!!errors.email}
                      placeholder="name@example.com"
                      value={values.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className={fieldClass('email')}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle size={13} aria-hidden />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="q-phone" className="mb-1.5 block text-sm font-semibold text-navy">
                      WhatsApp Number <span aria-hidden className="text-red-500">*</span>
                    </label>
                    <input
                      id="q-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      aria-invalid={!!errors.phone}
                      placeholder="07XX XXX XXX"
                      value={values.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className={fieldClass('phone')}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle size={13} aria-hidden />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="q-service" className="mb-1.5 block text-sm font-semibold text-navy">
                      Service Required <span aria-hidden className="text-red-500">*</span>
                    </label>
                    <select
                      id="q-service"
                      name="service"
                      required
                      aria-invalid={!!errors.service}
                      value={values.service}
                      onChange={(e) => chooseService(e.target.value)}
                      className={`${fieldClass('service')} ${
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
                    {errors.service && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle size={13} aria-hidden />
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                {/* Item picker — only the ticked items reach the quote */}
                {values.service && lines.length > 0 && (
                  <fieldset className="mt-6 rounded-2xl border border-navy/10 bg-ice/60 p-4 sm:p-5">
                    <legend className="px-1 text-sm font-semibold text-navy">
                      What do you need?{' '}
                      <span className="font-normal text-muted">
                        (tick all that apply — these go on your quote)
                      </span>
                    </legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {lines.map((line) => {
                        const on = selected.includes(line.item);
                        return (
                          <label
                            key={line.item}
                            className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors ${
                              on
                                ? 'border-electric bg-white shadow-[0_0_0_1px_rgb(8_123_250_/_0.35)]'
                                : 'border-navy/15 bg-white hover:border-navy/30'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => toggleItem(line.item)}
                              className="h-4.5 w-4.5 shrink-0 accent-[#087bfa]"
                            />
                            <span className="flex-1 text-ink/90">{line.item}</span>
                            <span className="shrink-0 font-display text-xs font-bold text-action">
                              {line.price}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-muted">
                      {selected.length} of {lines.length} selected for{' '}
                      {getQuoteHeading(values.service)}.
                    </p>
                  </fieldset>
                )}

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="q-budget" className="mb-1.5 block text-sm font-semibold text-navy">
                      Project Budget <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input
                      id="q-budget"
                      name="budget"
                      type="text"
                      placeholder="e.g. KES 50,000 – 100,000"
                      value={values.budget}
                      onChange={(e) => setField('budget', e.target.value)}
                      className={fieldClass('budget')}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="q-description" className="mb-1.5 block text-sm font-semibold text-navy">
                      Project Brief <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <textarea
                      id="q-description"
                      name="description"
                      rows={4}
                      placeholder="What are you looking to build or design?"
                      value={values.description}
                      onChange={(e) => setField('description', e.target.value)}
                      className={`${fieldClass('description')} resize-y`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-action px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-14px_rgb(10_108_224_/_0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-action-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
                >
                  <Sparkles size={17} aria-hidden />
                  Generate &amp; send my PDF quote
                  <ArrowRight size={16} aria-hidden />
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-muted">
                  Your selections are turned into a PDF and handed to your device — share it
                  straight to WhatsApp or e-mail, or save it.
                </p>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      {quote && (
        <section className="pb-16 sm:pb-20">
          <div className="container-site">
            {/* Delivery status */}
            <div className="mb-6 rounded-2xl border border-emerald-300 bg-white p-5 shadow-card print:hidden">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  {delivery === 'delivering' ? (
                    <Loader2 size={17} className="animate-spin" aria-hidden />
                  ) : (
                    <CheckCircle2 size={17} aria-hidden />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-extrabold text-navy">
                    Quote {quote.ref} — {quote.lines.length} item
                    {quote.lines.length === 1 ? '' : 's'} selected · PDF ready
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {delivery === 'delivering' && 'Preparing your PDF…'}
                    {delivery === 'shared' &&
                      'Your PDF was handed to the share sheet — pick WhatsApp (your number) or e-mail (your address) to send the file.'}
                    {delivery === 'downloaded' &&
                      `Saved as M-TECH-Quote-${quote.ref}.pdf — attach this file in WhatsApp or e-mail to your contacts.`}
                    {delivery === 'dismissed' &&
                      'Sharing was cancelled. Your PDF is still ready below — use “Send PDF” to try again.'}
                    {delivery === 'idle' && 'Your PDF quote is ready to send.'}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ice px-3 py-1 font-semibold text-navy">
                      <MessageCircle size={13} aria-hidden />
                      WhatsApp · {quote.client.phone}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ice px-3 py-1 font-semibold text-navy">
                      <Mail size={13} aria-hidden />
                      {quote.client.email}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    The share sheet opens with the <strong>PDF attached</strong> — choose
                    WhatsApp or e-mail and send it to yourself. No text-only message is used.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mb-6 flex flex-wrap gap-3 print:hidden">
              <button
                type="button"
                onClick={() => deliver(quote)}
                disabled={delivery === 'delivering'}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60"
              >
                <Share2 size={16} aria-hidden />
                Send PDF to my WhatsApp / e-mail
              </button>
              <button
                type="button"
                onClick={() => void downloadQuotePdf(quote)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-mid"
              >
                <Download size={16} aria-hidden />
                Download PDF
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/20 bg-white px-5 py-3 text-sm font-semibold text-navy transition-all hover:border-electric hover:text-action"
              >
                <RefreshCw size={16} aria-hidden />
                New quote
              </button>
            </div>

            <QuoteDocument quote={quote} />

            <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted print:hidden">
              <FileText size={13} aria-hidden />
              The PDF sent to you contains only the items you selected.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
