/**
 * Central site configuration — edit this file to change business details.
 *
 * WhatsApp / phone numbers:
 * The supplied numbers are Kenyan. They are stored:
 *  - `international` without the "+" for wa.me links
 *  - `tel` with the "+" for tap-to-call links
 * ⚠️ OWNER: please confirm the country code (+254) is correct for both numbers.
 */
export const siteConfig = {
  name: 'M-TECH',
  tagline: 'Your Vision. Our Creativity. Digital Excellence.',
  slogan: 'Build • Design • Grow',
  copyright: '© 2026 M-TECH. All Rights Reserved.',
  footerNote: "Let's bring your ideas to life!",

  phones: [
    { display: '0112197169', tel: '+254112197169' },
    { display: '0795270517', tel: '+254795270517' },
  ] as const,

  /** Primary WhatsApp number (international format, no "+"). */
  whatsappPrimary: '254795270517',

  /** OWNER: replace with the real business email. */
  email: '[Email address]',
  /** OWNER: replace with the real business location. */
  location: '[Business location]',

  /**
   * OWNER: automatic quote e-mail delivery.
   *
   * Paste a Formspree endpoint here (free — sign up at formspree.io, create a
   * form, copy the URL that looks like `https://formspree.io/f/xxxxxxxx`) and
   * every generated quote is e-mailed to the customer with no further action.
   *
   * While this is empty the site still delivers the quote by WhatsApp and by
   * opening the customer's mail client — nothing is ever reported as sent
   * when it was not.
   */
  quoteEmailEndpoint: '',

  /**
   * OWNER: class / unit payments.
   *
   * `mpesaPaybill` or `mpesaTill` — leave empty to hide M-Pesa details until
   * ready. `paystackUrl` — optional hosted checkout link for card payments.
   * Until a real gateway is connected the payment page shows instructions and
   * a WhatsApp confirmation with the payment reference (never claims a
   * payment succeeded when it did not).
   */
  payments: {
    mpesaPaybill: '',
    mpesaTill: '',
    /** Account / invoice number prefix used in M-Pesa references. */
    mpesaAccount: 'MTECH',
    paystackUrl: '',
  } as const,

  /**
   * OWNER: add real profile URLs below — entries with an empty `url`
   * are hidden automatically so no dead links ever render.
   */
  socials: [
    { name: 'Facebook', url: '' },
    { name: 'Instagram', url: '' },
    { name: 'X', url: '' },
    { name: 'YouTube', url: '' },
  ] as const,
} as const;

/** Options for the contact form's "Service required" dropdown. */
export const serviceOptions = [
  'Website Development',
  'Graphic Design & Branding',
  'Business & Social Media Designs',
  'Custom Digital Solutions',
  'Responsive & Modern Websites',
  'Coding Classes',
  'Photography Classes',
  'Insurance Classes',
] as const;

/** Primary navigation — each entry maps to a route in `src/App.tsx`. */
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Classes', to: '/classes' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact Us', to: '/contact' },
] as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappPrimary}?text=${encodeURIComponent(message)}`;

/** WhatsApp chat link for any number stored in international format (no "+"). */
export const waChat = (international: string, message?: string) =>
  `https://wa.me/${international}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/** International (wa.me) form of a `tel:` value, e.g. "+254…" → "254…". */
export const toInternational = (tel: string) => tel.replace(/^\+/, '');
