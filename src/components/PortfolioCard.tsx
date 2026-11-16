import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/portfolio';
import { Reveal } from './Reveal';
import { ProjectThumb } from './ProjectThumb';

type PortfolioCardProps = {
  project: Project;
  index?: number;
};

export function PortfolioCard({ project, index = 0 }: PortfolioCardProps) {
  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-card transition-all duration-400 hover:-translate-y-1.5 hover:border-electric/35 hover:shadow-card-hover">
        <div className="overflow-hidden">
          <ProjectThumb project={project} />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-ice px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-electric">
              {project.category}
            </span>
          </div>

          <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-navy">
            {project.title}
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

          <Link
            to="/contact"
            className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-electric transition-colors hover:text-electric-dark"
          >
            View Project
            <ArrowUpRight
              size={15}
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
