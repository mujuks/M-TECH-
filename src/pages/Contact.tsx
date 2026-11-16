import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  Loader2,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { Seo } from '../components/Seo';
import { Button } from '../components/Button';
import { services } from '../data/services';
import { site } from '../lib/site';

type Fields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const budgets = [
  'Not sure yet',
  'Under 50,000',
  '50,000 – 150,000',
  '150,000 – 400,000',
  '400,000+',
];

const initialValues: Fields = {
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  message: '',
};

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  else if (values.name.trim().length < 2) errors.name = 'Name looks too short.';

  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!/^[+\d][\d\s()-]{6,20}$/.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number.';

  if (!values.service) errors.service = 'Please choose a service.';

  if (!values.message.trim()) errors.message = 'Please tell us about your project.';
  else if (values.message.trim().length < 20)
    errors.message = 'A little more detail helps — at least 20 characters.';

  return errors;
}

export function Contact() {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState<Fields>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const preselected = searchParams.get('service');

  useEffect(() => {
    if (preselected && services.some((s) => s.id === preselected)) {
      setValues((v) => ({ ...v, service: preselected }));
    }
  }, [preselected]);

  const whatsappLink = useMemo(() => {
    const lines = [
      'Hi M-TECH! I would like to start a project.',
      `Name: ${values.name || '—'}`,
      `Phone: ${values.phone || '—'}`,
      `Service: ${values.service ? services.find((s) => s.id === values.service)?.title ?? values.service : '—'}`,
      `Budget: ${values.budget || 'Not specified'}`,
      '',
      values.message || '',
    ];
    return site.whatsapp.message(lines.join('\n'));
  }, [values]);

  const setField = (key: keyof Fields, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key]) {
      const next = validate({ ...values, [key]: value });
      setErrors((e) => ({ ...e, [key]: next[key] }));
    }
  };

  const onBlur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const next = validate(values);
    setErrors((e) => ({ ...e, [key]: next[key] }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
      budget: true,
    });

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus('sending');
    window.setTimeout(() => setStatus('success'), 900);
  };

  const fieldClass = (key: keyof Fields) =>
    `w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric/30 ${
      errors[key] && touched[key] ? 'border-red-400' : 'border-navy/12 hover:border-electric/40'
    }`;

  return (
    <>
      <Seo
        title="Contact M-TECH | Let's Build Something Amazing Together"
        description="Have an idea, a business, or a project in mind? Contact M-TECH to discuss website development, graphic design, branding and digital solutions."
      />

      <main>
        <PageHero
          eyebrow="Contact Us"
          title="Let's Build Something Amazing Together"
          subtitle="Have an idea, a business, or a project in mind? Let's discuss how M-TECH can help bring it to life."
        />

        <section className="bg-white py-16 sm:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  Reach out directly
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  Prefer to talk? Call us or start a WhatsApp chat — we usually reply during
                  business hours.
                </p>
              </Reveal>

              <div className="mt-8 space-y-4">
                <Reveal delay={0.06}>
                  <div className="rounded-2xl border border-navy/8 bg-ice/60 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric text-white">
                        <Phone size={18} aria-hidden />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                          Phone / WhatsApp
                        </p>
                        <div className="mt-1 flex flex-col gap-0.5">
                          {site.phones.map((phone) => (
                            <a
                              key={phone.tel}
                              href={`tel:${phone.tel}`}
                              className="font-display text-sm font-bold text-navy transition-colors hover:text-electric sm:text-base"
                            >
                              {phone.display}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <MessageCircle size={16} aria-hidden />
                      Chat on WhatsApp
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="rounded-2xl border border-navy/8 bg-white p-5 shadow-card">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                        <Mail size={18} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                          Email
                        </p>
                        <a
                          href={`mailto:${site.email}`}
                          className="block break-all font-display text-sm font-bold text-navy transition-colors hover:text-electric sm:text-base"
                        >
                          {site.email}
                        </a>
                        <p className="mt-1 text-[11px] text-muted">Placeholder — official email pending</p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-start gap-3 border-t border-navy/8 pt-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                        <MapPin size={18} aria-hidden />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                          Location
                        </p>
                        <p className="font-display text-sm font-bold text-navy sm:text-base">
                          {site.location}
                        </p>
                        <p className="mt-1 text-[11px] text-muted">Placeholder — address pending</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="rounded-2xl border border-navy/8 bg-white p-5 shadow-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      Follow M-TECH
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2.5">
                      {site.social.map((s) => (
                        <li key={s.name}>
                          <a
                            href={s.url}
                            aria-label={s.name}
                            className="inline-flex h-11 items-center rounded-xl border border-navy/10 px-4 text-xs font-semibold text-navy/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric hover:text-electric"
                          >
                            {s.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-muted">
                      Links are configurable placeholders until profiles are supplied.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-[1.75rem] border border-navy/8 bg-white p-6 shadow-[0_30px_70px_-40px_rgb(6_21_46_/_0.45)] sm:p-9">
                  {status === 'success' ? (
                    <div className="flex flex-col items-center py-10 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <CheckCircle2 size={32} aria-hidden />
                      </span>
                      <h3 className="mt-5 font-display text-2xl font-extrabold text-navy">
                        Message received!
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                        Thanks for reaching out, {values.name.split(' ')[0] || 'friend'}. A member
                        of the M-TECH team will get back to you shortly.
                      </p>

                      <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <MessageCircle size={16} aria-hidden />
                          Continue on WhatsApp
                        </a>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setValues(initialValues);
                            setErrors({});
                            setTouched({});
                            setStatus('idle');
                          }}
                        >
                          Send Another Message
                        </Button>
                      </div>

                      <p className="mt-5 max-w-md text-[11px] leading-relaxed text-muted/80">
                        Note: this form currently confirms in the browser. Connect a form endpoint
                        (e.g. Formspree, Netlify Forms) to deliver submissions by email.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} noValidate>
                      <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy">
                        Tell us about your project
                      </h2>
                      <p className="mt-2 text-sm text-muted">
                        Fill in the details below and we&apos;ll prepare your enquiry.
                      </p>

                      <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Full Name"
                          name="name"
                          value={values.name}
                          error={errors.name}
                          touched={touched.name}
                          placeholder="Jane Doe"
                          onChange={(v) => setField('name', v)}
                          onBlur={() => onBlur('name')}
                          autoComplete="name"
                        />
                        <Field
                          label="Email Address"
                          name="email"
                          type="email"
                          value={values.email}
                          error={errors.email}
                          touched={touched.email}
                          placeholder="jane@example.com"
                          onChange={(v) => setField('email', v)}
                          onBlur={() => onBlur('email')}
                          autoComplete="email"
                        />
                        <Field
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          value={values.phone}
                          error={errors.phone}
                          touched={touched.phone}
                          placeholder="07XX XXX XXX"
                          onChange={(v) => setField('phone', v)}
                          onBlur={() => onBlur('phone')}
                          autoComplete="tel"
                        />

                        <div>
                          <label
                            htmlFor="service"
                            className="mb-1.5 block text-sm font-semibold text-navy"
                          >
                            Service Required <span className="text-electric">*</span>
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={values.service}
                            onChange={(e) => setField('service', e.target.value)}
                            onBlur={() => onBlur('service')}
                            aria-invalid={Boolean(errors.service && touched.service)}
                            className={fieldClass('service')}
                          >
                            <option value="">Select a service…</option>
                            {services.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                          <FieldError message={touched.service ? errors.service : undefined} />
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="budget"
                            className="mb-1.5 block text-sm font-semibold text-navy"
                          >
                            Project Budget{' '}
                            <span className="font-normal text-muted">(optional)</span>
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={values.budget}
                            onChange={(e) => setField('budget', e.target.value)}
                            className={fieldClass('budget')}
                          >
                            <option value="">Select a range…</option>
                            {budgets.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="message"
                            className="mb-1.5 block text-sm font-semibold text-navy"
                          >
                            Project Description <span className="text-electric">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={values.message}
                            onChange={(e) => setField('message', e.target.value)}
                            onBlur={() => onBlur('message')}
                            aria-invalid={Boolean(errors.message && touched.message)}
                            placeholder="Tell us about your business, goals, timeline and anything else we should know…"
                            className={`${fieldClass('message')} resize-y`}
                          />
                          <FieldError message={touched.message ? errors.message : undefined} />
                        </div>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-4">
                        <Button type="submit" disabled={status === 'sending'}>
                          {status === 'sending' ? (
                            <>
                              <Loader2 size={16} className="animate-spin" aria-hidden />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send size={16} aria-hidden />
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-muted">
                          Fields marked <span className="text-electric">*</span> are required.
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function Field({
  label,
  name,
  value,
  error,
  touched,
  placeholder,
  type = 'text',
  autoComplete,
  onChange,
  onBlur,
}: FieldProps) {
  const invalid = Boolean(error && touched);

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy">
        {label} <span className="text-electric">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric/30 ${
          invalid ? 'border-red-400' : 'border-navy/12 hover:border-electric/40'
        }`}
      />
      <FieldError message={touched ? error : undefined} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
      <AlertCircle size={13} aria-hidden />
      {message}
    </p>
  );
}
