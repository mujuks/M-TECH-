import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service } from '../data/services';
import { Reveal } from './Reveal';

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Reveal delay={index * 0.07} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white p-7 shadow-card transition-all duration-400 hover:-translate-y-1.5 hover:border-electric/35 hover:shadow-card-hover">
        <span
          aria-hidden
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ice text-electric transition-all duration-400 group-hover:bg-electric group-hover:text-white group-hover:shadow-[0_14px_30px_-14px_rgb(8_123_250_/_0.9)]">
          <Icon size={26} strokeWidth={1.9} aria-hidden />
        </span>

        <h3 className="relative mt-5 font-display text-lg font-bold tracking-tight text-navy">
          {service.title}
        </h3>

        <p className="relative mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {service.items.map((item) => (
            <li
              key={item}
              className="rounded-full bg-ice px-3 py-1.5 text-[11px] font-medium text-navy/75 transition-colors duration-300 group-hover:bg-electric/10 group-hover:text-navy"
            >
              {item}
            </li>
          ))}
        </ul>

        <Link
          to={`/contact?service=${service.id}`}
          className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-electric"
        >
          Learn More
          <ArrowRight
            size={15}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </article>
    </Reveal>
  );
}
