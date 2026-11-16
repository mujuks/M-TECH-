import { processSteps } from '../data/company';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

export function Process() {
  return (
    <section className="relative bg-gradient-to-b from-white via-ice/60 to-white py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Our Process"
          title="How We Bring Your Ideas to Life"
          subtitle="A clear, four-step journey from first conversation to final delivery."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-1/2 top-7 hidden h-px w-[calc(100%-14rem)] -translate-x-1/2 bg-gradient-to-r from-electric/10 via-electric/50 to-electric/10 lg:block"
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1} className="relative">
                <li className="group relative flex h-full flex-col items-center text-center lg:items-center">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-electric/25 bg-white font-display text-lg font-extrabold text-electric shadow-[0_16px_36px_-18px_rgb(8_123_250_/_0.7)] transition-all duration-400 group-hover:-translate-y-1 group-hover:bg-electric group-hover:text-white">
                    {i + 1}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-2xl bg-electric/30 opacity-0 transition-opacity duration-500 group-hover:animate-pulse-ring"
                    />
                  </span>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-electric">
                    {step.step}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
