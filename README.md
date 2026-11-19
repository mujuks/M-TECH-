# M-TECH — Digital Agency Website

**Your Vision. Our Creativity. Digital Excellence.** · **Build • Design • Grow**

A premium, fully responsive multi-page website for **M-TECH**, a Kenyan digital
agency offering website development, graphic design & branding, business and
social media designs, custom digital solutions, and training classes in coding,
photography and insurance.

## Stack

- **React 19 + TypeScript** (Vite, strict mode)
- **Tailwind CSS v4** design system (`src/index.css`)
- **Framer Motion** — scroll reveals, hero cascade, portfolio filtering, mobile menu
- **Lucide React** — iconography
- **React Router** (`react-router-dom`) — client-side routing, no UI kits

## Routes

| Path | Page | Navbar active item |
| --- | --- | --- |
| `/` | Home — hero, deliver strip, why us, process | Home |
| `/about` | About — mission, vision, values | About Us |
| `/services` | Services — the five offerings | Services |
| `/classes` | Classes & training — three classes | Classes |
| `/portfolio` | Portfolio — filterable project grid | Portfolio |
| `/pricing` | Pricing catalogue | Pricing |
| `/contact` | Contact — info card + WhatsApp form | Contact Us |
| `/quote` | Instant quote generator | — |
| `*` | 404 — "This page took a wrong turn" | — |

Each route sets its own `document.title` and resets scroll position on
navigation (`src/components/RouteEffects.tsx`). Navigation uses clean paths
only (`/about`, `/services`, …) — there are no `#section` links anywhere
except the skip-to-content link (`#main`).

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build (dist/)
npm run preview  # serve the production build
npm run lint     # ESLint
```

## Deploying

Build command: `npm run build` · Output directory: `dist`

- **Vercel** — import the repo; `vercel.json` already contains the SPA rewrite.
- **Netlify** — build command `npm run build`, publish directory `dist`;
  `public/_redirects` provides the SPA fallback.

## Editing content

All business content lives in typed data files under `src/data/` — you never
need to touch components.

| File | What it controls |
| --- | --- |
| `src/data/siteConfig.ts` | Brand lines, phone numbers, WhatsApp numbers, email, location, social links, nav labels |
| `src/data/services.ts` | The five service cards + the “What we deliver” marquee tags |
| `src/data/classes.ts` | The three classes (title, description, duration/schedule/format, price, WhatsApp banner text) |
| `src/data/pricing.ts` | Every price row in the pricing catalogue |
| `src/data/portfolio.ts` | Portfolio categories and projects (title, category, description, image, link) |
| `src/data/process.ts` | The four process steps |
| `src/data/values.ts` | Mission, vision, values pills, “Why work with us” cards |

### Phone & WhatsApp numbers

Stored in `src/data/siteConfig.ts`:

- `phones[].tel` — used for `tel:` links, stored **with** `+` (`+254112197169`)
- `whatsappPrimary` / `whatsappSecondary` — used for `wa.me` links, stored
  **without** `+` (`254795270517`). `254795270517` is the primary.
- ⚠️ **Confirm the +254 country code** is correct for both numbers.

### Prices

Every price in `src/data/pricing.ts` and the class fees in
`src/data/classes.ts` are placeholders written as `[KES 00,000]`. Replace them
with real rates — **never publish invented prices**.

### Social links

In `siteConfig.ts`, each social entry has a `url`. All four icons always render
(they are required by the layout), but an entry with an empty string renders as
a disabled placeholder — so no dead links ever appear. Add the real URL to make
it a live link.

### Portfolio

`src/data/portfolio.ts` ships clearly labelled **demonstration** projects only
(no invented clients). Each entry supports:

```ts
{
  id, title, category, description,
  icon,      // lucide icon used in the gradient tile
  mock,      // CSS mockup variant: browser | store | poster | brand | social | dashboard
  image?,    // optional screenshot path, e.g. "/projects/site.png"
  link?,     // optional live URL — shown as "View live project" inside the lightbox
}
```

Every card's **View Project** button opens a lightbox with a larger preview of
the mockup. Until a real `link` is supplied the lightbox only offers Close, so
no dead external links are ever rendered.

The screenshots in `public/projects/` are optional assets ready to be wired in
via the `image` field (they are GitHub social-preview cards, not site
screenshots — replace them with real project captures before wiring).

### Contact form

Validation is plain TypeScript in `src/components/ContactForm.tsx`. On valid
submit it composes **one** WhatsApp message containing every field and opens
`wa.me/254795270517?text=…`. The delivery logic is isolated in the
`submitInquiry()` function — swap it for Formspree, EmailJS, or your own
endpoint without changing any UI code. A honeypot field provides basic spam
protection.

“Enroll now” on a class card **navigates to `/contact`** and pre-selects that
class in the **Service required** dropdown. The preset travels as router state
(`{ presetService, presetNonce }`); `Contact.tsx` reads it from
`useLocation().state` and passes it to `ContactForm`, which applies the value
once the nonce changes — so a normal visit to `/contact` never applies a stale
preset.

### Automatic quotes (`/quote`)

Every **Get a Quote** / **Request a quote** button points at `/quote`. The form
asks for the customer's name, e-mail, WhatsApp number and service, then:

1. **Item picker.** Choosing a service reveals its price lines from
   `src/data/pricing.ts` (or the class fee from `src/data/classes.ts`) as
   checkboxes. The customer ticks exactly what they want — a quote with no
   items ticked cannot be submitted. Nothing is hard-coded in the component.
2. **Generates a PDF quote** containing only the ticked items, plus the
   reference `MT-YYMMDD-XXXX`, the 14-day validity window, budget and brief.
   jsPDF is imported lazily, so it ships in its own chunk and never blocks the
   first paint.
3. **Delivers the PDF.** On submit the file is handed to the operating system's
   share sheet (`navigator.share` with the PDF attached), where the customer
   picks WhatsApp, e-mail, Drive, etc. Browsers without file sharing fall back
   to an automatic download of `M-TECH-Quote-<ref>.pdf`.
4. **E-mails a copy** with the PDF attached when `siteConfig.quoteEmailEndpoint`
   is set. While it is empty the page says so honestly and never claims a
   message was sent.
5. **Send PDF / Download PDF / New quote** buttons repeat either action; the
   on-screen preview (`QuoteDocument`) mirrors the same selection.

**To switch on true automatic e-mail** (no clicks required): sign up at
[formspree.io](https://formspree.io), create a form, and paste the
`https://formspree.io/f/xxxxxxxx` URL into `quoteEmailEndpoint` in
`src/data/siteConfig.ts`. The PDF is then POSTed as a multipart attachment
automatically on submit.

Quote reference numbers are generated as `MT-YYMMDD-XXXX` and quotes are valid
for 14 days.

## Accessibility & motion

- Skip-to-content link, semantic landmarks, visible focus states
- Keyboard-accessible menu (focus trap, Escape to close), tabs, and form
- Inline, screen-reader-readable form errors (`aria-invalid`, `aria-describedby`)
- All animation respects `prefers-reduced-motion`
- Touch targets ≥ 44px; contrast passes WCAG AA

## Structure

```
src/
  components/   Navbar, Footer, Button, SectionHeading, Reveal, cards,
                ContactForm, WhatsAppButton, BackToTop, Logo, RouteEffects
  data/         All editable content (typed)
  sections/     Hero, DeliverStrip, Services, Classes, About, Portfolio,
                Pricing, Why, Process, Contact (composition blocks, reused
                by pages)
  pages/        HomePage, AboutPage, ServicesPage, ClassesPage,
                PortfolioPage, PricingPage, ContactPage, QuotePage,
                NotFoundPage
  lib/          quote.ts — quote generation, PDF rendering, share/download
                and e-mail delivery
  App.tsx       BrowserRouter, route table, shared layout
```

---

## Still needed: real content checklist

1. **Prices** — all `[KES 00,000]` placeholders in `pricing.ts` and `classes.ts`
2. **Class details** — `[Duration]`, `[Schedule]`, `[Class format]` in `classes.ts`
3. **Email address** — `[Email address]` in `siteConfig.ts`
4. **Business location** — `[Business location]` in `siteConfig.ts`
5. **Social media URLs** — Facebook, Instagram, X, YouTube in `siteConfig.ts`
6. **Quote e-mail endpoint** — `quoteEmailEndpoint` in `siteConfig.ts` to enable
   hands-off e-mail delivery (optional; share sheet + PDF download work without
   it)
7. **Real portfolio work** — replace the six demo entries in `portfolio.ts`
   (screenshots can go in `public/projects/`)
8. **Logo / poster asset** — the site uses a generated diamond wordmark and the
   favicon in `public/favicon.svg`; drop in the official logo when available
9. **Phone country code** — confirm `+254` is correct for both numbers
