import { ArrowUpRight, ImageOff } from 'lucide-react';
import type { PortfolioItem } from '../data/portfolio';
import { portfolioDemoNote } from '../data/portfolio';
import { ProjectMockup } from './ProjectMockup';
import { Reveal } from './Reveal';

type PortfolioCardProps = {
  item: PortfolioItem;
  index: number;
  onView: (item: PortfolioItem) => void;
};

export function PortfolioCard({ item, index, onView }: PortfolioCardProps) {
  return (
    <Reveal delay={Math.min(index * 0.07, 0.3)} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-electric/40 hover:shadow-card-hover">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0B2A55_0%,#0A56B5_55%,#087BFA_100%)]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
          ) : (
            <ProjectMockup variant={item.mock} />
          )}
          <div className="absolute left-4 right-4 top-4 flex flex-wrap items-start gap-2">
            <span className="whitespace-nowrap rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              {item.category}
            </span>
            <span className="ml-auto whitespace-nowrap rounded-full bg-amber px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
              Demo
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-extrabold tracking-tight text-navy">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-amber-dark">
            <ImageOff size={13} className="mt-0.5 shrink-0" aria-hidden />
            {portfolioDemoNote}
          </p>

          <div className="mt-auto pt-5">
            <button
              type="button"
              onClick={() => onView(item)}
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-action transition-colors hover:text-navy"
            >
              View Project
              <ArrowUpRight size={15} aria-hidden />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
