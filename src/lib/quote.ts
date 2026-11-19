import { pricingGroups } from '../data/pricing';
import { classes } from '../data/classes';
import { siteConfig } from '../data/siteConfig';

export type QuoteLine = { item: string; price: string };

export type Quote = {
  ref: string;
  issued: string;
  validUntil: string;
  client: { name: string; email: string; phone: string };
  service: string;
  heading: string;
  lines: QuoteLine[];
  brief: string;
  budget: string;
  note: string;
};

export type QuoteInput = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  description?: string;
};

/** Maps the enquiry dropdown onto a group in `src/data/pricing.ts`. */
const serviceToGroup: Record<string, string> = {
  'Website Development': 'website-development',
  'Responsive & Modern Websites': 'website-development',
  'Graphic Design & Branding': 'graphic-design-branding',
  'Business & Social Media Designs': 'business-social-media',
  'Custom Digital Solutions': 'custom-digital-solutions',
};

const DATE_FMT = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function makeRef(date: Date): string {
  const y = String(date.getFullYear()).slice(2);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MT-${y}${m}${d}-${rand}`;
}

function findCourse(service: string) {
  return classes.find((c) => c.serviceValue === service);
}

function findGroup(service: string) {
  return pricingGroups.find((g) => g.id === serviceToGroup[service]) ?? pricingGroups[0];
}

/** Heading shown on the quote for a given service. */
export function getQuoteHeading(service: string): string {
  const course = findCourse(service);
  return course ? course.title : findGroup(service).title;
}

/** Every price line available for a service — the customer ticks what they want. */
export function getQuoteLines(service: string): QuoteLine[] {
  const course = findCourse(service);
  if (course) return [{ item: `${course.title} — course fee`, price: course.price }];
  return findGroup(service).rows.map((row) => ({ item: row.item, price: row.price }));
}

/**
 * Builds a quote containing only the items the customer selected.
 * `selected` holds the exact `item` strings ticked in the picker.
 */
export function buildQuote(input: QuoteInput, selected: string[]): Quote {
  const issued = new Date();
  const validUntil = new Date(issued.getTime() + 14 * 24 * 60 * 60 * 1000);
  const course = findCourse(input.service);

  const picked = new Set(selected);
  const lines = getQuoteLines(input.service).filter((line) => picked.has(line.item));

  return {
    ref: makeRef(issued),
    issued: DATE_FMT.format(issued),
    validUntil: DATE_FMT.format(validUntil),
    client: {
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
    },
    service: input.service,
    heading: getQuoteHeading(input.service),
    lines,
    brief: (input.description ?? '').trim(),
    budget: (input.budget ?? '').trim(),
    note: course
      ? 'Class fees are subject to the published schedule. Confirm your slot to lock in this price.'
      : 'Prices shown are starting rates. Your final quote is confirmed once we review the scope of your project.',
  };
}

/** Plain text used as the e-mail body alongside the PDF attachment. */
export function quoteToText(quote: Quote): string {
  const parts: string[] = [
    `M-TECH — QUOTE ${quote.ref}`,
    `Issued ${quote.issued} · Valid until ${quote.validUntil}`,
    '',
    `Prepared for: ${quote.client.name}`,
    `Service: ${quote.service}`,
    '',
    'Selected items:',
    ...quote.lines.map((line) => `• ${line.item}: ${line.price}`),
  ];

  if (quote.budget) parts.push('', `Budget discussed: ${quote.budget}`);
  if (quote.brief) parts.push('', 'Project brief:', quote.brief);

  parts.push(
    '',
    quote.note,
    '',
    'Your PDF quote is attached.',
    `— ${siteConfig.name} · ${siteConfig.tagline}`,
  );

  return parts.join('\n');
}

/** Strips anything the PDF base fonts cannot encode. */
function pdfSafe(value: string): string {
  return value
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2022/g, '-')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\u0020-\u007E\u00A0-\u00FF]/g, '');
}

/**
 * Renders the quote as a real PDF file. jsPDF is imported lazily so it never
 * weighs down the initial page load.
 */
export async function quoteToPdf(quote: Quote): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const W = 595.28;
  const H = 841.89;
  const M = 48;
  const BOTTOM = H - 56;
  const NAVY = [6, 21, 46] as const;
  const ACTION = [10, 108, 224] as const;
  const AMBER = [163, 95, 0] as const;
  const INK = [16, 24, 40] as const;
  const MUTED = [100, 116, 139] as const;
  const LINE = [211, 224, 242] as const;

  let y = 0;

  const header = (first: boolean) => {
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, W, first ? 96 : 52, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(first ? 20 : 12);
    doc.text('M-TECH', M, first ? 46 : 32);
    if (first) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('BUILD | DESIGN | GROW', M, 64);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('QUOTE', W - M, 46, { align: 'right' });
      y = 132;
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`Quote ${quote.ref}`, W - M, 32, { align: 'right' });
      y = 84;
    }
  };

  const ensure = (needed: number) => {
    if (y + needed > BOTTOM) {
      doc.addPage();
      header(false);
    }
  };

  const label = (text: string) => {
    ensure(34);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...AMBER);
    doc.text(pdfSafe(text.toUpperCase()), M, y);
    y += 14;
  };

  const row = (left: string, right: string, boldRight = false) => {
    ensure(20);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text(pdfSafe(left), M, y);
    doc.setFont('helvetica', boldRight ? 'bold' : 'normal');
    doc.setTextColor(...ACTION);
    doc.text(pdfSafe(right), W - M, y, { align: 'right' });
    y += 16;
  };

  const para = (text: string, size = 10, color: readonly [number, number, number] = INK) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(pdfSafe(text), W - M * 2) as string[];
    for (const line of lines) {
      ensure(16);
      doc.text(line, M, y);
      y += 14;
    }
  };

  header(true);

  // Meta
  label('Quote details');
  row('Quote no.', quote.ref, true);
  row('Issued', quote.issued);
  row('Valid until', quote.validUntil);
  y += 10;

  // Client + service
  label('Prepared for');
  para(quote.client.name, 12);
  para(`${quote.client.email}  ·  ${quote.client.phone}`, 10, MUTED);
  y += 6;
  label('Service');
  para(quote.heading, 12);
  para(quote.service, 10, MUTED);
  y += 14;

  // Selected items
  label(`Selected items (${quote.lines.length})`);
  doc.setFillColor(240, 246, 255);
  doc.rect(M, y - 12, W - M * 2, 22, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text('ITEM', M + 10, y + 2);
  doc.text('PRICE', W - M - 10, y + 2, { align: 'right' });
  y += 22;

  quote.lines.forEach((line, i) => {
    ensure(26);
    if (i % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(M, y - 12, W - M * 2, 24, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text(pdfSafe(line.item), M + 10, y + 4);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ACTION);
    doc.text(pdfSafe(line.price), W - M - 10, y + 4, { align: 'right' });
    y += 24;
  });

  doc.setDrawColor(...LINE);
  doc.setLineWidth(1);
  doc.line(M, y - 8, W - M, y - 8);
  y += 8;

  if (quote.budget) {
    y += 8;
    label('Budget');
    para(quote.budget, 11);
  }

  if (quote.brief) {
    y += 8;
    label('Project brief');
    para(quote.brief, 10, MUTED);
  }

  // Note box
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...INK);
  const noteLines = doc.splitTextToSize(pdfSafe(quote.note), W - M * 2 - 24) as string[];
  const boxH = noteLines.length * 12 + 20;
  ensure(boxH + 10);
  doc.setFillColor(234, 244, 255);
  doc.rect(M, y, W - M * 2, boxH, 'F');
  let ny = y + 18;
  for (const line of noteLines) {
    doc.text(line, M + 12, ny);
    ny += 12;
  }
  y += boxH + 26;

  // Footer
  ensure(40);
  doc.setDrawColor(...LINE);
  doc.line(M, y, W - M, y);
  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(pdfSafe(siteConfig.tagline), M, y);
  doc.text(
    pdfSafe(siteConfig.phones.map((p) => p.display).join('  ·  ')),
    W - M,
    y,
    { align: 'right' },
  );

  return doc.output('blob');
}

function fileNameFor(quote: Quote): string {
  return `M-TECH-Quote-${quote.ref}.pdf`;
}

/** Saves the PDF to the user's device. */
export async function downloadQuotePdf(quote: Quote): Promise<void> {
  const blob = await quoteToPdf(quote);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileNameFor(quote);
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export type DeliveryResult = 'shared' | 'downloaded' | 'dismissed';

/**
 * Hands the PDF to the operating system's share sheet (WhatsApp, e-mail, …)
 * when the browser supports sharing files, otherwise downloads it.
 */
export async function deliverQuotePdf(quote: Quote): Promise<DeliveryResult> {
  const blob = await quoteToPdf(quote);
  const file = new File([blob], fileNameFor(quote), { type: 'application/pdf' });
  const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };

  if (typeof nav.share === 'function' && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: `M-TECH quote ${quote.ref}` });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'dismissed';
      // Anything else falls through to a download.
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileNameFor(quote);
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
  return 'downloaded';
}

export type EmailResult = 'sent' | 'failed' | 'unconfigured';

/**
 * E-mails the quote with the PDF attached. Requires
 * `siteConfig.quoteEmailEndpoint`; while it is empty the flow reports
 * `unconfigured` and never claims a message was sent.
 */
export async function sendQuoteEmail(quote: Quote): Promise<EmailResult> {
  const endpoint = siteConfig.quoteEmailEndpoint;
  if (!endpoint) return 'unconfigured';

  try {
    const blob = await quoteToPdf(quote);
    const file = new File([blob], fileNameFor(quote), { type: 'application/pdf' });

    const body = new FormData();
    body.append('name', quote.client.name);
    body.append('email', quote.client.email);
    body.append('phone', quote.client.phone);
    body.append('service', quote.service);
    body.append('quote_ref', quote.ref);
    body.append('subject', `Quote ${quote.ref} for ${quote.client.name}`);
    body.append('message', quoteToText(quote));
    body.append('file', file, fileNameFor(quote));

    const res = await fetch(endpoint, { method: 'POST', body });
    return res.ok ? 'sent' : 'failed';
  } catch {
    return 'failed';
  }
}
