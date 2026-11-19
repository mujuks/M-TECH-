import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service } from '../data/services';
import { Reveal } from './Reveal';

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Reveal delay={Math.min(index * 0.07, 0.3)} className="h-full">
      <article className="group flex h-full flex-col rounded-[24px] border border-navy/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/40 hover:shadow-card-hover">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ice text-action transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
          <Icon size={26} aria-hidden />
        </div>

        <h3 className="mt-5 font-display text-lg font-extrabold uppercase tracking-tight text-navy">
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>

        <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
              <Check
                size={15}
                className="mt-0.5 shrink-0 text-electric"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/pricing"
          className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 self-start text-sm font-semibold text-action transition-colors hover:text-navy"
        >
          Learn more
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
