import { FileText } from 'lucide-react';
import type { Quote } from '../lib/quote';
import { siteConfig } from '../data/siteConfig';

type QuoteDocumentProps = {
  quote: Quote;
};

/**
 * The generated quote. Print-ready — page chrome is hidden with `print:hidden`
 * so the browser's "Save as PDF" produces a clean document.
 */
export function QuoteDocument({ quote }: QuoteDocumentProps) {
  return (
    <article
      aria-label={`Quote ${quote.ref}`}
      className="overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-card print:rounded-none print:border-0 print:shadow-none"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 bg-[linear-gradient(120deg,#06152E_0%,#0B2A55_55%,#0A6CE0_120%)] p-6 sm:p-7 print:bg-navy print:p-6">
        <div>
          <p className="font-display text-xl font-extrabold tracking-[0.18em] text-white">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-xs font-medium tracking-[0.2em] text-ice/70 uppercase">
            {siteConfig.slogan}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur">
          <FileText size={15} aria-hidden />
          <span className="text-xs font-bold tracking-[0.16em] uppercase">Quote</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 print:p-6">
        {/* Meta row */}
        <dl className="grid grid-cols-2 gap-4 border-b border-navy/10 pb-5 sm:grid-cols-3">
          <div>
            <dt className="eyebrow text-amber-dark">Quote no.</dt>
            <dd className="mt-1.5 font-display text-sm font-bold text-navy">{quote.ref}</dd>
          </div>
          <div>
            <dt className="eyebrow text-amber-dark">Issued</dt>
            <dd className="mt-1.5 text-sm font-semibold text-ink">{quote.issued}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="eyebrow text-amber-dark">Valid until</dt>
            <dd className="mt-1.5 text-sm font-semibold text-ink">{quote.validUntil}</dd>
          </div>
        </dl>

        {/* Client */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="eyebrow text-muted">Prepared for</p>
            <p className="mt-2 font-display text-base font-extrabold text-navy">
              {quote.client.name}
            </p>
            <p className="mt-1 break-words text-sm text-muted">{quote.client.email}</p>
            <p className="text-sm text-muted">{quote.client.phone}</p>
          </div>
          <div className="sm:text-right">
            <p className="eyebrow text-muted">Service</p>
            <p className="mt-2 font-display text-base font-extrabold text-navy">
              {quote.heading}
            </p>
            <p className="mt-1 text-sm text-muted">{quote.service}</p>
          </div>
        </div>

        {/* Line items */}
        <div className="mt-7">
          <p className="eyebrow text-amber-dark">Indicative pricing</p>
          <ul className="mt-3 overflow-hidden rounded-2xl border border-navy/10">
            {quote.lines.map((line, i) => (
              <li
                key={line.item}
                className={`flex items-baseline justify-between gap-4 px-4 py-3.5 sm:px-5 ${
                  i % 2 ? 'bg-ice/60' : 'bg-white'
                } ${i ? 'border-t border-navy/10' : ''}`}
              >
                <span className="text-sm text-ink/90">{line.item}</span>
                <span className="shrink-0 font-display text-sm font-bold text-action">
                  {line.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Brief + budget */}
        {(quote.brief || quote.budget) && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {quote.budget && (
              <div>
                <p className="eyebrow text-muted">Budget</p>
                <p className="mt-2 text-sm font-semibold text-ink">{quote.budget}</p>
              </div>
            )}
            {quote.brief && (
              <div className={quote.budget ? 'sm:col-span-2' : 'sm:col-span-2'}>
                <p className="eyebrow text-muted">Project brief</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/85">
                  {quote.brief}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Note */}
        <p className="mt-7 rounded-xl border border-electric/25 bg-ice px-4 py-3.5 text-xs leading-relaxed text-navy/80 print:border-navy/20 print:bg-ice/60">
          {quote.note}
        </p>

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-5 text-xs text-muted">
          <span>{siteConfig.tagline}</span>
          <span>{siteConfig.phones.map((p) => p.display).join(' · ')}</span>
        </div>
      </div>
    </article>
  );
}
