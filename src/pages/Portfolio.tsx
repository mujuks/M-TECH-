import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { PortfolioCard } from '../components/PortfolioCard';
import { Reveal } from '../components/Reveal';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/Button';
import { portfolioCategories, projects, type PortfolioCategory } from '../data/portfolio';

type Filter = PortfolioCategory | 'All';

const filters: Filter[] = ['All', ...portfolioCategories];

export function Portfolio() {
  const [active, setActive] = useState<Filter>('All');
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <>
      <Seo
        title="Our Portfolio | M-TECH Creative Work"
        description="Explore demonstration projects from M-TECH across website development, graphic design, branding, business promotions and custom digital solutions."
      />

      <main>
        <PageHero
          eyebrow="Portfolio"
          title="Our Creative Work"
          subtitle="Explore some of the digital experiences and creative solutions we bring to life."
        />

        <section className="bg-white py-16 sm:py-24">
          <div className="container-site">
            <Reveal>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <span className="mr-1 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted sm:inline-flex">
                  <LayoutGrid size={14} aria-hidden />
                  Filter
                </span>
                {filters.map((filter) => {
                  const isActive = active === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActive(filter)}
                      aria-pressed={isActive}
                      className={`rounded-full px-4.5 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                        isActive
                          ? 'bg-electric text-white shadow-[0_14px_30px_-14px_rgb(8_123_250_/_0.9)]'
                          : 'border border-navy/10 bg-white text-navy/70 hover:border-electric/40 hover:text-electric'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <p className="mt-6 text-center text-xs font-medium uppercase tracking-[0.14em] text-muted/80">
              Demonstration projects — real client work will be published here as it ships
            </p>

            <motion.div
              layout={!reduce}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="h-full"
                  >
                    <PortfolioCard project={project} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {visible.length === 0 && (
              <p className="mt-16 text-center text-muted">
                No projects in this category yet — check back soon.
              </p>
            )}

            <Reveal className="mt-16 rounded-3xl border border-electric/20 bg-ice/70 px-8 py-12 text-center">
              <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                Want your project featured here?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                We&apos;re always building something new. Tell us about your idea and let&apos;s
                create the next case study together.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3.5">
                <ButtonLink to="/contact" variant="primary">
                  Start Your Project
                </ButtonLink>
                <ButtonLink to="/#services" variant="ghost">
                  Explore Services
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
