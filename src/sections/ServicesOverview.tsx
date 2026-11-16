import { services } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';

export function ServicesOverview() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <span
        aria-hidden
        className="absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-electric/30 to-transparent"
      />

      <div className="container-site">
        <SectionHeading
          eyebrow="What We Do"
          title="Everything Your Business Needs to Establish a Powerful Digital Presence"
          subtitle="From your first website to a complete brand system, M-TECH covers every part of your digital journey."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
