import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Palette, Boxes, Star, Check, ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';

type HeroCard = {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Code2;
  /** Base tilt in degrees. */
  rotate: number;
  /** Base offset from the stack origin. */
  x: number;
  y: number;
  z: number;
};

const heroCards: HeroCard[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    subtitle: 'Modern, responsive and professional websites.',
    icon: Code2,
    rotate: -8,
    x: 0,
    y: 320,
    z: 1,
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    subtitle: 'Creative designs that make your brand stand out.',
    icon: Palette,
    rotate: 5,
    x: 100,
    y: 160,
    z: 2,
  },
  {
    id: 'digital-solutions',
    title: 'Digital Solutions',
    subtitle: 'Innovative technology for business growth.',
    icon: Boxes,
    rotate: -3,
    x: 200,
    y: 0,
    z: 3,
  },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#0B2A55_0%,#0A56B5_55%,#087BFA_120%)] pt-28 pb-20 sm:pt-32 lg:pb-28"
    >
      {/* Soft top light + depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-15%,rgb(255_255_255_/_0.24),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgb(6_21_46_/_0.35),transparent)]"
      />

      {/* Soft radial glows */}
      <div
        aria-hidden
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-electric/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-hero/50 blur-[100px]"
      />

      {/* Decorative circles */}
      <div
        aria-hidden
        className="absolute -right-40 top-1/4 h-96 w-96 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute -right-20 top-1/3 h-64 w-64 rounded-full border border-white/10"
      />
      <div
        aria-hidden
        className="absolute left-1/4 -top-24 h-56 w-56 rounded-full border border-white/10"
      />

      <div className="container-site relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
          {/* Left column */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
                <Star size={14} className="fill-amber text-amber" aria-hidden />
                M-TECH <span aria-hidden className="text-white/50">|</span> Your Digital
                Solutions Partner
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="hero-fluid mt-6 font-display font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-white">
                Build. Design. <span className="text-amber">Grow.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ice/80 sm:text-lg">
                We help businesses and individuals establish a powerful digital presence
                through creative designs, professional websites and innovative digital
                solutions.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" variant="amber" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight size={16} aria-hidden />
                </ButtonLink>
                <ButtonLink href="/services" variant="glass" className="w-full sm:w-auto">
                  Explore Our Services
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Right column — overlapping tilted card cascade */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative h-[400px] sm:h-[540px] lg:h-[640px]">
              <div className="absolute inset-0 origin-top-left scale-[0.58] sm:scale-80 lg:scale-100">
              {heroCards.map((card, i) => {
                const Icon = card.icon;
                const isActive = activeCard === card.id;
                return (
                  <motion.div
                    key={card.id}
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: reduce ? 0 : 0.35 + card.z * 0.12,
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: 'min(100%, 340px)',
                      zIndex: isActive ? 30 : card.z,
                    }}
                  >
                    {/* Floating animation wrapper */}
                    <motion.div
                      animate={reduce || isActive ? { y: 0 } : { y: [0, -10, 0] }}
                      transition={
                        reduce || isActive
                          ? { duration: 0.2 }
                          : { duration: 5 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }
                      }
                    >
                    <div
                      role="group"
                      aria-label={card.title}
                      tabIndex={0}
                      onMouseEnter={() => setActiveCard(card.id)}
                      onMouseLeave={() => setActiveCard(null)}
                      onFocus={() => setActiveCard(card.id)}
                      onBlur={() => setActiveCard(null)}
                      onClick={() =>
                        setActiveCard((current) =>
                          current === card.id ? null : card.id,
                        )
                      }
                      style={{
                        transform: `translate(${card.x}px, ${card.y}px) rotate(${
                          isActive ? 0 : card.rotate
                        }deg) scale(${isActive ? 1.05 : 1})`,
                        transformOrigin: 'center',
                      }}
                      className={`cursor-pointer rounded-[24px] border bg-[linear-gradient(145deg,#0A56B5_0%,#087BFA_120%)] p-6 text-white shadow-float backdrop-blur transition-[transform,box-shadow,border-color] duration-[350ms] ease-out ${
                        isActive
                          ? 'border-white/70 shadow-[0_0_0_1px_rgb(255_255_255_/_0.5),0_28px_60px_-20px_rgb(8_123_250_/_0.75)]'
                          : 'border-white/25'
                      }`}
                    >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                        <Icon size={24} aria-hidden />
                      </div>
                      <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                        Service
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-lg font-extrabold tracking-tight text-white">
                      {card.title}
                    </h2>
                    <p className="mt-1.5 text-sm text-ice/85">{card.subtitle}</p>
                    <Link
                      to="/services"
                      className="mt-4 inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-white hover:bg-white/15"
                    >
                      Learn more
                      <ArrowRight size={13} aria-hidden />
                    </Link>
                    </div>
                    </motion.div>
                  </motion.div>
                );
              })}
              </div>
            </div>

            {/* Floating notification card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.9, duration: 0.5 }}
              className={`absolute -bottom-2 left-0 z-40 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-3 text-xs font-semibold text-navy shadow-float sm:text-sm ${
                reduce ? '' : 'animate-float'
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric text-white">
                <Check size={13} aria-hidden strokeWidth={3} />
              </span>
              Creative Solutions. Professional Results.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
