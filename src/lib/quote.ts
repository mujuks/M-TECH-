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

/** Normalises a phone number to international digits for wa.me (no "+"). */
export function normalizeWaPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('254')) return digits;
  if (digits.startsWith('0')) return `254${digits.slice(1)}`;
  if (digits.length === 9) return `254${digits}`;
  return digits;
}

/**
 * Opens the system share sheet with the quote **PDF attached** so the customer
 * can send the file to their own WhatsApp number or e-mail address.
 * Falls back to a download when the browser cannot share files.
 */
export async function shareQuotePdfToCustomer(quote: Quote): Promise<DeliveryResult> {
  return deliverQuotePdf(quote);
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
    doc.rect(0, 0, W, first ? 104 : 52, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    if (first) {
      doc.setFontSize(22);
      doc.text('M-TECH', M, 48);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(pdfSafe(siteConfig.slogan.toUpperCase()), M, 66);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('QUOTATION', W - M, 44, { align: 'right' });
      doc.setFontSize(13);
      doc.text(quote.ref, W - M, 64, { align: 'right' });
      y = 136;
    } else {
      doc.setFontSize(12);
      doc.text('M-TECH', M, 32);
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

  // Meta strip
  const metaH = 40;
  doc.setFillColor(240, 246, 255);
  doc.rect(M, y, W - M * 2, metaH, 'F');
  const metaCols: [string, string][] = [
    ['QUOTE NO.', quote.ref],
    ['ISSUED', quote.issued],
    ['VALID UNTIL', quote.validUntil],
    ['ITEMS', String(quote.lines.length)],
  ];
  const colW = (W - M * 2) / metaCols.length;
  metaCols.forEach(([lab, val], i) => {
    const cx = M + colW * i + 12;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(lab, cx, y + 15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    if (i === 0) doc.setTextColor(...ACTION);
    else doc.setTextColor(...INK);
    doc.text(pdfSafe(val), cx, y + 30);
    if (i > 0) {
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.6);
      doc.line(M + colW * i, y + 8, M + colW * i, y + metaH - 8);
    }
  });
  y += metaH + 28;

  // Parties side by side
  const colMid = M + (W - M * 2) / 2;
  const partyTop = y;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...AMBER);
  doc.text('PREPARED FOR', M, partyTop);
  doc.text('SERVICE', colMid + 8, partyTop);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...NAVY);
  doc.text(pdfSafe(quote.client.name), M, partyTop + 18);
  doc.text(pdfSafe(quote.heading), colMid + 8, partyTop + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(pdfSafe(quote.client.email), M, partyTop + 34);
  doc.text(pdfSafe(quote.client.phone), M, partyTop + 48);
  const serviceLines = doc.splitTextToSize(pdfSafe(quote.service), (W - M * 2) / 2 - 8) as string[];
  let sy = partyTop + 34;
  for (const line of serviceLines) {
    doc.text(line, colMid + 8, sy);
    sy += 14;
  }

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.6);
  doc.line(colMid, partyTop - 6, colMid, partyTop + 56);
  y = partyTop + 78;

  // Selected items table
  label(`Selected items (${quote.lines.length})`);
  const tableW = W - M * 2;
  const numW = 32;
  const priceW = 110;
  doc.setFillColor(...NAVY);
  doc.rect(M, y - 12, tableW, 22, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('#', M + 10, y + 2);
  doc.text('DESCRIPTION', M + numW + 4, y + 2);
  doc.text('PRICE', W - M - 10, y + 2, { align: 'right' });
  y += 22;

  quote.lines.forEach((line, i) => {
    const itemLines = doc.splitTextToSize(pdfSafe(line.item), tableW - numW - priceW - 20) as string[];
    const rowH = Math.max(24, itemLines.length * 13 + 12);
    ensure(rowH + 4);
    if (i % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(M, y - 12, tableW, rowH, 'F');
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(String(i + 1).padStart(2, '0'), M + 10, y + 4);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    let iy = y + 4;
    for (const l of itemLines) {
      doc.text(l, M + numW + 4, iy);
      iy += 13;
    }
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...ACTION);
    doc.text(pdfSafe(line.price), W - M - 10, y + 4, { align: 'right' });
    y += rowH;
  });

  doc.setDrawColor(...LINE);
  doc.setLineWidth(1);
  doc.line(M, y - 8, W - M, y - 8);
  y += 14;

  // Budget + brief boxes
  if (quote.budget) {
    label('Budget');
    para(quote.budget, 11);
    y += 6;
  }
  if (quote.brief) {
    label('Project brief');
    para(quote.brief, 10, MUTED);
    y += 6;
  }

  // Note box
  y += 4;
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
  y += boxH + 30;

  // Terms + stamp / signature
  const STAMP_R = 54;
  ensure(STAMP_R * 2 + 70);
  const blockTop = y;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...AMBER);
  doc.text('TERMS', M, blockTop);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  const terms = [
    `This quotation is valid until ${quote.validUntil}.`,
    'Scope changes may affect the final pricing.',
    'Work begins after written confirmation and deposit.',
  ];
  let ty = blockTop + 16;
  for (const t of terms) {
    const tl = doc.splitTextToSize(`- ${pdfSafe(t)}`, (W - M * 2) * 0.5) as string[];
    for (const line of tl) {
      doc.text(line, M, ty);
      ty += 12;
    }
  }

  const stampCx = W - M - STAMP_R - 4;
  const stampCy = blockTop + STAMP_R + 4;
  drawStamp(doc, stampCx, stampCy, STAMP_R, quote);

  doc.setDrawColor(150, 160, 175);
  doc.setLineWidth(0.8);
  const signY = stampCy + STAMP_R + 16;
  doc.line(stampCx - 70, signY, stampCx + 70, signY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('AUTHORISED SIGNATORY', stampCx, signY + 12, { align: 'center' });

  y = Math.max(ty, signY + 28) + 16;

  // Footer
  ensure(36);
  doc.setDrawColor(...LINE);
  doc.setLineWidth(1);
  doc.line(M, y, W - M, y);
  y += 16;
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

/** Places text along a circular arc (used by the official stamp). */
function arcText(
  doc: import('jspdf').jsPDF,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number,
) {
  const chars = [...text];
  if (chars.length === 0) return;
  const step =
    chars.length === 1 ? 0 : (endAngleDeg - startAngleDeg) / (chars.length - 1);
  for (let i = 0; i < chars.length; i++) {
    const deg = startAngleDeg + step * i;
    const rad = (deg * Math.PI) / 180;
    const x = cx + radius * Math.sin(rad);
    const y = cy - radius * Math.cos(rad);
    doc.text(chars[i], x, y, { align: 'center', angle: deg });
  }
}

/**
 * Circular ink stamp drawn straight onto the PDF — double ring, arched
 * company name, “OFFICIAL QUOTE”, quote reference and date. Matches the
 * SVG stamp shown in the on-screen preview.
 */
function drawStamp(
  doc: import('jspdf').jsPDF,
  cx: number,
  cy: number,
  r: number,
  quote: Quote,
) {
  const ink: [number, number, number] = [49, 46, 129]; // indigo-800
  doc.setDrawColor(...ink);
  doc.setTextColor(...ink);

  doc.setLineWidth(3.2);
  doc.circle(cx, cy, r, 'S');
  doc.setLineWidth(1);
  doc.circle(cx, cy, r - 9, 'S');

  const arcTop = r - 18;
  const arcBot = r - 24;

  doc.setFont('times', 'bold');
  doc.setFontSize(Math.max(9, r * 0.18));
  arcText(doc, siteConfig.name, cx, cy, arcTop, -55, 55);

  doc.setFont('times', 'bold');
  doc.setFontSize(Math.max(7, r * 0.12));
  arcText(doc, quote.ref, cx, cy, arcBot, 130, 230);

  // Side stars
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(Math.max(7, r * 0.13));
  doc.text('*', cx - r + 7, cy + 3, { align: 'center' });
  doc.text('*', cx + r - 7, cy + 3, { align: 'center' });

  // Centre rules
  doc.setLineWidth(1);
  doc.line(cx - r * 0.52, cy - r * 0.28, cx + r * 0.52, cy - r * 0.28);
  doc.line(cx - r * 0.52, cy + r * 0.4, cx + r * 0.52, cy + r * 0.4);

  doc.setFont('times', 'bold');
  doc.setFontSize(Math.max(11, r * 0.24));
  doc.text('OFFICIAL', cx, cy - 2, { align: 'center' });
  doc.setFontSize(Math.max(10, r * 0.2));
  doc.text('QUOTE', cx, cy + r * 0.3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(Math.max(6, r * 0.11));
  doc.text(pdfSafe(quote.issued.toUpperCase()), cx, cy + r * 0.54, { align: 'center' });
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
