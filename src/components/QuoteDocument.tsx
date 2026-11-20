import { FileText } from 'lucide-react';
import type { Quote } from '../lib/quote';
import { siteConfig } from '../data/siteConfig';

type QuoteDocumentProps = {
  quote: Quote;
};

/**
 * Circular ink stamp — double ring, arched company name, centred
 * “OFFICIAL QUOTE”, quote reference and date. Mirrored in the PDF.
 */
function Stamp({ quote }: { quote: Quote }) {
  const ink = '#312E81';

  return (
    <svg
      viewBox="0 0 220 220"
      role="img"
      aria-label={`Official M-TECH stamp for quote ${quote.ref}`}
      className="h-36 w-36 -rotate-6 sm:h-40 sm:w-40 print:h-36 print:w-36"
    >
      <defs>
        <path id="stamp-arc-top" d="M 30,110 A 80,80 0 0 1 190,110" fill="none" />
        <path id="stamp-arc-bottom" d="M 40,110 A 70,70 0 0 0 180,110" fill="none" />
        <filter id="stamp-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter="url(#stamp-ink)" opacity="0.88">
        {/* Rings */}
        <circle cx="110" cy="110" r="102" fill="none" stroke={ink} strokeWidth="5" />
        <circle cx="110" cy="110" r="90" fill="none" stroke={ink} strokeWidth="1.5" />

        {/* Arched text */}
        <text
          fill={ink}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="5"
        >
          <textPath href="#stamp-arc-top" startOffset="50%" textAnchor="middle">
            {siteConfig.name}
          </textPath>
        </text>
        <text
          fill={ink}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="13"
          fontWeight="700"
          letterSpacing="2.5"
        >
          <textPath href="#stamp-arc-bottom" startOffset="50%" textAnchor="middle">
            {quote.ref}
          </textPath>
        </text>

        {/* Side stars */}
        <text x="24" y="116" textAnchor="middle" fill={ink} fontSize="14" fontFamily="serif">
          ★
        </text>
        <text x="196" y="116" textAnchor="middle" fill={ink} fontSize="14" fontFamily="serif">
          ★
        </text>

        {/* Centre block */}
        <line x1="52" y1="86" x2="168" y2="86" stroke={ink} strokeWidth="1.5" />
        <text
          x="110"
          y="112"
          textAnchor="middle"
          fill={ink}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="26"
          fontWeight="700"
          letterSpacing="3"
        >
          OFFICIAL
        </text>
        <text
          x="110"
          y="138"
          textAnchor="middle"
          fill={ink}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="22"
          fontWeight="700"
          letterSpacing="6"
        >
          QUOTE
        </text>
        <line x1="52" y1="152" x2="168" y2="152" stroke={ink} strokeWidth="1.5" />
        <text
          x="110"
          y="168"
          textAnchor="middle"
          fill={ink}
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1.5"
        >
          {quote.issued.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

/**
 * The generated quote. Print-ready — page chrome is hidden with `print:hidden`
 * so the browser's "Save as PDF" produces a clean document.
 */
export function QuoteDocument({ quote }: QuoteDocumentProps) {
  const meta = [
    { label: 'Quote no.', value: quote.ref, strong: true },
    { label: 'Issued', value: quote.issued },
    { label: 'Valid until', value: quote.validUntil },
    { label: 'Items', value: String(quote.lines.length) },
  ];

  return (
    <article
      aria-label={`Quote ${quote.ref}`}
      className="overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-card print:rounded-none print:border-0 print:shadow-none"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 bg-[linear-gradient(120deg,#06152E_0%,#0B2A55_55%,#0A6CE0_120%)] px-6 py-6 sm:px-8 sm:py-7 print:bg-navy">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-[0.2em] text-white">
            {siteConfig.name}
          </p>
          <p className="mt-1.5 text-[11px] font-medium tracking-[0.22em] text-ice/70 uppercase">
            {siteConfig.slogan}
          </p>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-2 text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
            <FileText size={14} aria-hidden />
            Quotation
          </p>
          <p className="mt-1 font-display text-base font-extrabold tracking-wider text-white">
            {quote.ref}
          </p>
        </div>
      </div>

      {/* Meta strip */}
      <dl className="grid grid-cols-2 border-b border-navy/10 bg-ice/70 sm:grid-cols-4 print:bg-ice/50">
        {meta.map((m, i) => (
          <div
            key={m.label}
            className={`px-5 py-3.5 sm:px-6 ${i ? 'border-l border-navy/10' : ''} ${
              i === 2 ? 'border-t border-navy/10 sm:border-t-0' : ''
            } ${i === 3 ? 'border-t border-navy/10 sm:border-t-0' : ''} ${
              i === 2 ? 'sm:border-l' : ''
            }`}
          >
            <dt className="eyebrow text-muted">{m.label}</dt>
            <dd
              className={`mt-1 text-sm ${m.strong ? 'font-display font-extrabold text-action' : 'font-semibold text-ink'}`}
            >
              {m.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="p-6 sm:p-8 print:p-6">
        {/* Parties */}
        <div className="grid gap-6 border-b border-navy/10 pb-6 sm:grid-cols-2">
          <div>
            <p className="eyebrow text-amber-dark">Prepared for</p>
            <p className="mt-2 font-display text-lg font-extrabold text-navy">
              {quote.client.name}
            </p>
            <p className="mt-1 break-words text-sm text-muted">{quote.client.email}</p>
            <p className="text-sm text-muted">{quote.client.phone}</p>
          </div>
          <div className="sm:border-l sm:border-navy/10 sm:pl-6">
            <p className="eyebrow text-amber-dark">Service</p>
            <p className="mt-2 font-display text-lg font-extrabold text-navy">
              {quote.heading}
            </p>
            <p className="mt-1 text-sm text-muted">{quote.service}</p>
          </div>
        </div>

        {/* Line items */}
        <div className="mt-6">
          <p className="eyebrow text-amber-dark">Selected items</p>
          <div className="mt-3 overflow-hidden rounded-2xl border border-navy/10">
            <div className="grid grid-cols-[2.5rem_1fr_auto] gap-3 border-b border-navy/10 bg-navy px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] text-white uppercase sm:px-5">
              <span>#</span>
              <span>Description</span>
              <span className="text-right">Price</span>
            </div>
            <ul>
              {quote.lines.map((line, i) => (
                <li
                  key={line.item}
                  className={`grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 px-4 py-3.5 sm:px-5 ${
                    i % 2 ? 'bg-ice/60' : 'bg-white'
                  } ${i ? 'border-t border-navy/10' : ''}`}
                >
                  <span className="font-display text-xs font-bold text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-snug text-ink/90">{line.item}</span>
                  <span className="shrink-0 text-right font-display text-sm font-bold text-action">
                    {line.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Budget + brief */}
        {(quote.brief || quote.budget) && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {quote.budget && (
              <div className="rounded-2xl border border-navy/10 bg-ice/50 p-4">
                <p className="eyebrow text-muted">Budget</p>
                <p className="mt-1.5 text-sm font-semibold text-ink">{quote.budget}</p>
              </div>
            )}
            {quote.brief && (
              <div
                className={`rounded-2xl border border-navy/10 bg-ice/50 p-4 ${
                  quote.budget ? '' : 'sm:col-span-2'
                }`}
              >
                <p className="eyebrow text-muted">Project brief</p>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-ink/85">
                  {quote.brief}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Note */}
        <p className="mt-6 rounded-xl border border-electric/25 bg-ice px-4 py-3.5 text-xs leading-relaxed text-navy/80 print:border-navy/20 print:bg-ice/60">
          {quote.note}
        </p>

        {/* Signature + stamp */}
        <div className="mt-8 grid gap-8 border-t border-navy/10 pt-7 sm:grid-cols-2 sm:items-end">
          <div>
            <p className="eyebrow text-muted">Terms</p>
            <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted">
              <li>· This quotation is valid until {quote.validUntil}.</li>
              <li>· Scope changes may affect the final pricing.</li>
              <li>· Work begins after written confirmation and deposit.</li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <Stamp quote={quote} />
            <div className="w-44 border-t border-navy/30 pt-1.5 text-center sm:w-48">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                Authorised signatory
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-navy/10 pt-5 text-xs text-muted">
          <span>{siteConfig.tagline}</span>
          <span>{siteConfig.phones.map((p) => p.display).join(' · ')}</span>
        </div>
      </div>
    </article>
  );
}
