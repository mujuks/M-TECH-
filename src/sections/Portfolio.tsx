import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from '../data/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { PortfolioCard } from '../components/PortfolioCard';
import { ProjectModal } from '../components/ProjectModal';
import { Reveal } from '../components/Reveal';

export function Portfolio() {
  const [active, setActive] = useState<PortfolioCategory>('All');
  const [openItem, setOpenItem] = useState<PortfolioItem | null>(null);
  const reduce = useReducedMotion();

  const filtered =
    active === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === active);

  return (
    <section id="portfolio" className="bg-white py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Portfolio"
          title="Our creative work"
          highlight="creative work"
          subtitle="Explore some of the digital experiences and creative solutions we bring to life."
        />

        {/* Category tabs */}
        <Reveal>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-1.5 rounded-full border border-navy/10 bg-ice p-1.5 sm:gap-2"
          >
            {portfolioCategories.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(category)}
                  className={`min-h-[40px] rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    isActive
                      ? 'bg-action text-white shadow-[0_10px_24px_-12px_rgb(10_108_224_/_0.9)]'
                      : 'text-navy/70 hover:bg-white hover:text-navy'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Animated grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <PortfolioCard
                  item={item}
                  index={i}
                  onView={setOpenItem}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted">
            No projects in this category yet — check back soon.
          </p>
        )}
      </div>

      <ProjectModal item={openItem} onClose={() => setOpenItem(null)} />
    </section>
  );
}
