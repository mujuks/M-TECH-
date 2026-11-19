import { whyFeatures } from '../data/values';
import { SectionHeading } from '../components/SectionHeading';
import { FeatureCard } from '../components/FeatureCard';

export function Why() {
  return (
    <section aria-labelledby="why-heading" className="bg-ice py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading
          id="why-heading"
          eyebrow="Why choose M-TECH"
          title="Why work with us?"
          highlight="Why"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyFeatures.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
