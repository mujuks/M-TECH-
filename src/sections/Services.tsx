import { services } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';

export function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Services"
          title="What we do"
          highlight="we do"
          subtitle="Everything your business needs to establish a powerful digital presence."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
