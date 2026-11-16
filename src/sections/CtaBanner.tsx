import { ArrowRight, MessageCircle } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { site } from '../lib/site';

export function CtaBanner() {
  return (
    <section className="bg-white pb-20 pt-4 sm:pb-28">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-8 py-14 text-center sm:px-14 sm:py-16">
            <span
              aria-hidden
              className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-electric/35 blur-3xl"
            />
            <span
              aria-hidden
              className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-electric/25 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_50%_0%,rgb(8_123_250_/_0.4),transparent_60%)]"
            />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-electric-soft">
                {site.slogan}
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to Start Your Project?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ice/70">
                Tell us what you&apos;re building. We&apos;ll help you plan it, design it and ship
                it — on time and on brand.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3.5">
                <ButtonLink to="/contact" variant="primary">
                  Get a Quote
                  <ArrowRight size={16} aria-hidden />
                </ButtonLink>
                <ButtonLink
                  to={site.whatsapp.message('Hi M-TECH! I would like to start a project.')}
                  variant="light"
                >
                  <MessageCircle size={16} aria-hidden />
                  WhatsApp Us
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
