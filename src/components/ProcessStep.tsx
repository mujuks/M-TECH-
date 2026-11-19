import type { ProcessStepData } from '../data/process';
import { Reveal } from './Reveal';

type ProcessStepProps = {
  step: ProcessStepData;
  index: number;
  isLast?: boolean;
};

export function ProcessStep({ step, index, isLast = false }: ProcessStepProps) {
  return (
    <Reveal delay={index * 0.1} className="relative flex-1">
      {/* Desktop: dashed connector reaching the next step */}
      {!isLast && (
        <div
          aria-hidden
          className="absolute left-1/2 top-7 hidden w-full border-t-2 border-dashed border-electric/40 md:block"
        />
      )}

      <div className="relative flex items-start gap-5 md:flex-col md:items-center md:text-center">
        <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-extrabold text-white ring-4 ring-electric/25 shadow-[0_0_24px_4px_rgb(8_123_250_/_0.35)]">
          {step.step}
        </div>

        {/* Mobile: vertical dashed connector down to the next step */}
        {!isLast && (
          <div
            aria-hidden
            className="absolute left-7 top-14 h-[calc(100%+2.5rem)] border-l-2 border-dashed border-electric/40 md:hidden"
          />
        )}

        <div className="md:mt-4">
          <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-navy">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-muted md:mx-auto">
            {step.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
