import { processSteps } from '../data/process';
import { SectionHeading } from '../components/SectionHeading';
import { ProcessStep } from '../components/ProcessStep';

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="bg-white py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading
          id="process-heading"
          eyebrow="Our process"
          title="How we bring your ideas to life"
          highlight="your ideas"
        />

        <div className="mt-14 flex flex-col gap-10 md:flex-row md:gap-6">
          {processSteps.map((step, i) => (
            <ProcessStep
              key={step.step}
              step={step}
              index={i}
              isLast={i === processSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
