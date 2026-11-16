# M-TECH — Digital Agency Website

**Your Vision. Our Creativity. Digital Excellence.** · Build • Design • Grow

A premium, fully responsive marketing site for M-TECH, a creative digital agency offering
website development, graphic design, branding and custom digital solutions.

## Stack

- **React 19 + TypeScript** (Vite)
- **Tailwind CSS v4** design system (`src/index.css`)
- **Framer Motion** — scroll reveals, page transitions, mobile menu
- **Lucide React** — iconography

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build (dist/)
npm run preview  # serve the production build
npm run lint     # ESLint
```

## Pages

| Route        | Content                                                     |
| ------------ | ----------------------------------------------------------- |
| `/`          | Hero, services overview, why choose us, process, CTA         |
| `/about`     | Mission, vision, values                                      |
| `/portfolio` | Filterable gallery (demonstration projects)                  |
| `/contact`   | Contact details, validated enquiry form, WhatsApp hand-off   |
| `*`          | 404                                                          |

## Configuration (`src/lib/site.ts`)

Everything business-specific lives in one place:

- **Phone numbers** — displayed as `011 219 7169` / `079 527 0517`, dialled as
  `+254112197169` / `+254795270517` (Kenya, +254)
- **WhatsApp** — `https://wa.me/254795270517` (mobile number), with pre-filled
  message helpers used by the FAB, contact form and CTA
- **Email / location / social links** — clearly labelled placeholders until the
  official details are supplied

## Adding portfolio projects

Projects live in `src/data/portfolio.ts`. Add an entry with a `title`,
`category`, `description`, `accent` and `layout` — the preview artwork is
generated in `src/components/ProjectThumb.tsx`, so no images are required.
Replace previews with real screenshots when available.

## Notes

- The contact form validates client-side and confirms in the browser; connect a
  form endpoint (Formspree, Netlify Forms, etc.) to deliver submissions.
- Scroll-reveal animations respect `prefers-reduced-motion`.
- SPA fallbacks included for Vercel (`vercel.json`) and Netlify
  (`public/_redirects`).

## Deployment

Build command: `npm run build` · Output directory: `dist` — ready for Vercel or
Netlify as-is.
