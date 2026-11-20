import { Clock, CalendarDays, Monitor, Tag } from 'lucide-react';
import type { ClassCourse } from '../data/classes';
import { Button } from './Button';
import { Reveal } from './Reveal';

type ClassCardProps = {
  course: ClassCourse;
  index: number;
  /** Opens the units + prices dialog instead of navigating away. */
  onEnroll: (course: ClassCourse) => void;
};

export function ClassCard({ course, index, onEnroll }: ClassCardProps) {
  const Icon = course.icon;

  const details = [
    { icon: Clock, label: 'Duration', value: course.duration },
    { icon: CalendarDays, label: 'Schedule', value: course.schedule },
    { icon: Monitor, label: 'Class format', value: course.format },
  ];

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-navy/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
        {/* Gradient image area */}
        <div className="relative h-40 overflow-hidden bg-[linear-gradient(135deg,#06152E_0%,#0A56B5_55%,#087BFA_100%)]">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_18%_0%,rgb(255_255_255_/_0.22),transparent_62%)]"
          />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10"
          />
          <div
            aria-hidden
            className="absolute -bottom-14 -left-8 h-32 w-32 rounded-full border border-white/20"
          />
          <div className="relative flex h-full items-center justify-center">
            <Icon size={56} className="text-white/90" aria-hidden strokeWidth={1.5} />
          </div>
          <div className="absolute left-4 right-4 top-4 flex flex-wrap items-start gap-2">
            <span className="whitespace-nowrap rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
              {course.category}
            </span>
            <span className="ml-auto whitespace-nowrap rounded-full bg-amber px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy">
              Class
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-extrabold tracking-tight text-navy">
            {course.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{course.description}</p>

          <dl className="mt-4 space-y-2 rounded-2xl border border-navy/10 bg-ice p-4">
            {details.map(({ icon: DetailIcon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm">
                <DetailIcon size={14} className="shrink-0 text-action" aria-hidden />
                <dt className="font-medium text-muted">{label}</dt>
                <dd className="ml-auto font-semibold text-navy">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between border-t border-dashed border-navy/15 pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Class fee
              </span>
              <span className="inline-flex items-center gap-1.5 font-display text-lg font-extrabold text-action">
                <Tag size={15} aria-hidden />
                {course.price}
              </span>
            </div>

            <Button
              type="button"
              onClick={() => onEnroll(course)}
              variant="blue"
              className="mt-4 w-full justify-center"
            >
              Enroll now
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
