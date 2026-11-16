import { Target, Eye, Sparkles } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/Button';
import { values } from '../data/company';

export function About() {
  return (
    <>
      <Seo
        title="About M-TECH | Our Mission, Vision & Values"
        description="Learn about M-TECH — a creative digital agency combining creativity, technology and innovation to deliver websites, branding and digital solutions."
      />

      <main>
        <PageHero
          eyebrow="About Us"
          title="About M-TECH"
          subtitle="At M-TECH, we believe every great idea deserves an exceptional digital presence. We are passionate about combining creativity, technology, and innovation to deliver digital solutions that help individuals and businesses succeed."
        />

        <section className="bg-white py-20 sm:py-28">
          <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy-soft to-navy p-8 shadow-[0_40px_80px_-40px_rgb(6_21_46_/_0.6)] sm:p-10">
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-electric/40 blur-2xl"
                  />

                  <div className="relative">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-electric text-white shadow-[0_18px_36px_-16px_rgb(8_123_250_/_0.9)]">
                      <Sparkles size={26} aria-hidden />
                    </span>

                    <p className="mt-5 font-display text-lg font-extrabold leading-snug text-white">
                      Build <span className="text-electric-soft">•</span> Design{' '}
                      <span className="text-electric-soft">•</span> Grow
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {[
                        { label: 'Design', accent: true },
                        { label: 'Develop', accent: false },
                        { label: 'Brand', accent: false },
                        { label: 'Grow', accent: true },
                      ].map((chip) => (
                        <div
                          key={chip.label}
                          className={`rounded-2xl border p-5 text-center font-display text-sm font-bold tracking-wide transition-transform duration-300 hover:-translate-y-1 ${
                            chip.accent
                              ? 'border-electric/50 bg-electric/15 text-white'
                              : 'border-white/10 bg-white/5 text-ice/80'
                          }`}
                        >
                          {chip.label}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 mr-32 space-y-3">
                      <div className="h-2 w-3/4 rounded-full bg-white/15" />
                      <div className="h-2 w-1/2 rounded-full bg-electric/60" />
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>

                <span
                  aria-hidden
                  className="absolute -bottom-5 -right-5 hidden h-28 w-28 rounded-3xl border-4 border-white bg-electric/90 shadow-xl sm:block"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                  Creativity powered by technology
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  We partner with founders, small businesses and growing organisations to design
                  digital experiences that look sharp, load fast and convert. Every project starts
                  with listening — then we plan, design, build and refine until it&apos;s right.
                </p>
              </Reveal>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Reveal delay={0.1}>
                  <div className="h-full rounded-3xl border border-navy/8 bg-ice/70 p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-electric shadow-sm">
                      <Target size={20} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-navy">Our Mission</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      To empower businesses and individuals through innovative digital solutions,
                      creative designs, and professional website development.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.18}>
                  <div className="h-full rounded-3xl border border-navy/8 bg-white p-6 shadow-card">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white shadow-sm">
                      <Eye size={20} aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-navy">Our Vision</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      To become a trusted digital technology and creative solutions partner, helping
                      businesses establish and grow their presence in the digital world.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-ice/50 py-20 sm:py-28">
          <div className="container-site">
            <SectionHeading
              eyebrow="Our Values"
              title="What We Stand For"
              subtitle="The principles behind every project we deliver."
            />

            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, i) => (
                <Reveal key={value} delay={(i % 3) * 0.08} className="h-full">
                  <li className="group flex h-full items-center gap-4 rounded-2xl border border-navy/8 bg-white px-6 py-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-card-hover">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric/10 font-display text-sm font-extrabold text-electric transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-base font-bold text-navy">{value}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-14 text-center">
              <ButtonLink to="/contact" variant="primary">
                Work With Us
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
