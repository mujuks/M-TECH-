import { Target, Eye } from 'lucide-react';
import { mission, vision, values, aboutIntro } from '../data/values';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

export function About() {
  return (
    <section id="about" className="bg-ice py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="About us"
          title="About M-TECH"
          highlight="M-TECH"
          subtitle={aboutIntro}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Mission & Vision cards */}
          <div className="space-y-6">
            {[
              { ...mission, icon: Target },
              { ...vision, icon: Eye },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1}>
                <article className="group rounded-[24px] border border-navy/10 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-card-hover">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-ice p-3.5 text-action transition-colors group-hover:bg-electric group-hover:text-white">
                    <card.icon size={24} aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-navy">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{card.text}</p>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="rounded-[24px] border border-navy/10 bg-white p-7 shadow-card">
                <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-navy">
                  Our Values
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {values.map((value) => (
                    <li
                      key={value}
                      className="rounded-full border border-navy/10 bg-ice px-4 py-2 text-xs font-semibold text-navy/85"
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Navy visual panel — pure CSS/SVG */}
          <Reveal delay={0.15} className="h-full">
            <div className="relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#06152E_0%,#0B2A55_45%,#0A56B5_100%)] p-8">
              {/* Glowing blue radial lighting */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_45%,rgb(8_123_250_/_0.42),transparent_62%),radial-gradient(circle_at_85%_90%,rgb(10_108_224_/_0.35),transparent_55%)]"
              />
              {/* Two circular decorative outlines */}
              <div
                aria-hidden
                className="absolute h-80 w-80 rounded-full border border-electric/35"
              />
              <div
                aria-hidden
                className="absolute h-56 w-56 rounded-full border border-white/20"
              />
              <div
                aria-hidden
                className="absolute h-24 w-24 rounded-full bg-electric/30 blur-2xl"
              />

              <div className="relative text-center">
                <p className="eyebrow text-electric-soft">M-TECH</p>
                <p className="mt-4 font-display text-3xl font-extrabold tracking-[0.15em] text-white sm:text-4xl">
                  BUILD <span className="text-amber">•</span> DESIGN{' '}
                  <span className="text-amber">•</span> GROW
                </p>
                <div
                  aria-hidden
                  className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-electric to-amber"
                />
                <p className="mt-4 font-body text-sm font-medium tracking-[0.3em] text-ice/75 uppercase">
                  Digital excellence
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
