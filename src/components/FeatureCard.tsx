import type { Feature } from '../data/values';
import { Reveal } from './Reveal';

type FeatureCardProps = {
  feature: Feature;
  index: number;
};

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col rounded-[24px] border border-navy/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/40 hover:shadow-card-hover">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ice text-action transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
          <Icon size={26} aria-hidden />
        </div>
        <h3 className="mt-5 font-display text-base font-extrabold uppercase tracking-tight text-navy">
          {feature.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{feature.description}</p>
      </article>
    </Reveal>
  );
}
