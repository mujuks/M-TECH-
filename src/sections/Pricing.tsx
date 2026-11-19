import { ArrowRight } from 'lucide-react';
import { pricingGroups } from '../data/pricing';
import { SectionHeading } from '../components/SectionHeading';
import { PricingCard } from '../components/PricingCard';
import { ButtonLink } from '../components/Button';

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_80%_0%,rgb(8_123_250_/_0.3),transparent_45%),radial-gradient(circle_at_10%_100%,rgb(10_86_181_/_0.4),transparent_45%)]"
      />

      <div className="container-site relative">
        <SectionHeading
          eyebrow="Pricing"
          title="Our pricing catalogue"
          highlight="pricing"
          subtitle="Clear starting prices for every service. Your final quote depends on the size and scope of your project."
          tone="dark"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pricingGroups.map((group, i) => (
            <PricingCard key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* Custom quote banner */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] bg-[linear-gradient(120deg,#0B2A55_0%,#0A56B5_60%,#087BFA_120%)] p-7 sm:flex-row sm:p-9">
          <p className="max-w-xl text-center font-display text-lg font-extrabold leading-snug text-white sm:text-left">
            Need something different? Tell us about your project and we will prepare a
            custom quote.
          </p>
          <ButtonLink href="/contact" variant="amber" className="shrink-0">
            Get a Quote
            <ArrowRight size={16} aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
