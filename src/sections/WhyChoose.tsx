import { features } from '../data/company';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <span
        aria-hidden
        className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-electric/25 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-electric/15 blur-3xl"
      />

      <div className="container-site relative">
        <SectionHeading
          eyebrow="Why Choose M-TECH"
          title="Why Work With Us?"
          subtitle="A digital partner that treats your project with the same care you do."
          tone="dark"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={i * 0.08} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-electric/50 hover:bg-white/10">
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="relative inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-electric/15 text-electric-soft transition-all duration-400 group-hover:bg-electric group-hover:text-white">
                    <Icon size={24} strokeWidth={1.9} aria-hidden />
                  </span>

                  <h3 className="relative mt-5 font-display text-base font-bold uppercase tracking-[0.08em] text-white">
                    {feature.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ice/65">
                    {feature.description}
                  </p>

                  <span
                    aria-hidden
                    className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-electric transition-transform duration-500 group-hover:scale-x-100"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
