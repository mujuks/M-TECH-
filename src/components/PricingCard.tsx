import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PricingGroup } from '../data/pricing';
import { Reveal } from './Reveal';

type PricingCardProps = {
  group: PricingGroup;
  index: number;
};

export function PricingCard({ group, index }: PricingCardProps) {
  const Icon = group.icon;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="group flex h-full flex-col rounded-[24px] border border-navy/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/40 hover:shadow-card-hover">
        <div className="flex items-center gap-4">
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-ice p-3.5 text-action transition-colors group-hover:bg-electric group-hover:text-white">
            <Icon size={24} aria-hidden />
          </div>
          <h3 className="font-display text-lg font-extrabold tracking-tight text-navy">
            {group.title}
          </h3>
        </div>

        <p className="eyebrow mt-5 text-amber-dark">Starting prices</p>

        <ul className="mt-3 flex-1">
          {group.rows.map((row) => (
            <li
              key={row.item}
              className="flex items-baseline justify-between gap-3 border-b border-dashed border-navy/15 py-3 last:border-b-0"
            >
              <span className="text-sm text-ink/85">{row.item}</span>
              <span className="shrink-0 font-display text-sm font-bold text-action">
                {row.price}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to="/quote"
          className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 self-start text-sm font-semibold text-action transition-colors hover:text-navy"
        >
          Request a quote
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </article>
    </Reveal>
  );
}
