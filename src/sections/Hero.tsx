import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Reveal } from '../components/Reveal';

const floatChips = [
  { icon: Zap, label: 'Fast & Responsive', className: 'right-2 top-10 sm:right-6' },
  { icon: ShieldCheck, label: 'Reliable Delivery', className: 'left-0 bottom-24 sm:left-2' },
  { icon: Sparkles, label: 'Modern UI/UX', className: 'right-6 bottom-6 sm:right-10' },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ice via-white to-white pt-28 sm:pt-32">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <span
        aria-hidden
        className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-electric/12 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute -right-24 top-40 h-[380px] w-[380px] rounded-full bg-electric/10 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-navy/5 blur-3xl"
      />

      <div className="container-site relative pb-20 sm:pb-24 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-electric/25 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-electric shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                Build • Design • Grow
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-balance font-display text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-6xl">
                Build Your Digital Future{' '}
                <span className="relative inline-block text-electric">
                  with M-TECH
                  <svg
                    aria-hidden
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-2.5 w-full text-electric/35"
                  >
                    <path
                      d="M3 9C60 3 150 2 297 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
                We transform ideas into powerful digital experiences through innovative website
                development, creative graphic design, and professional branding solutions.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <ButtonLink to="/#services" variant="primary">
                  Explore Our Services
                  <ArrowRight size={16} aria-hidden />
                </ButtonLink>
                <ButtonLink to="/contact" variant="ghost">
                  Start Your Project
                  <Play size={15} aria-hidden />
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-9 flex items-center gap-3 border-t border-navy/8 pt-6">
                <span className="flex -space-x-2" aria-hidden>
                  {['#087BFA', '#06152E', '#3D97FF'].map((color) => (
                    <span
                      key={color}
                      className="h-8 w-8 rounded-full border-2 border-white"
                      style={{ background: color }}
                    />
                  ))}
                </span>
                <p className="text-sm font-medium text-navy/70">
                  Creative Solutions.{' '}
                  <span className="font-semibold text-navy">Professional Results.</span>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute inset-x-8 bottom-4 top-10 rounded-[2.5rem] bg-electric/25 blur-3xl"
              />

              <LaptopMock />

              <motion.div
                className="absolute -bottom-6 right-0 w-[27%] max-w-[150px] sm:-right-4 lg:-right-6"
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PhoneMock />
              </motion.div>

              {floatChips.map(({ icon: Icon, label, className }, i) => (
                <motion.div
                  key={label}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
                  className={`absolute z-10 hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2.5 text-xs font-semibold text-navy shadow-[0_18px_40px_-18px_rgb(6_21_46_/_0.4)] backdrop-blur sm:flex ${className}`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-electric/12 text-electric">
                    <Icon size={14} aria-hidden />
                  </span>
                  {label}
                </motion.div>
              ))}

              <motion.span
                aria-hidden
                className="absolute left-4 top-6 h-3 w-3 rounded-full bg-electric"
                animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />
              <motion.span
                aria-hidden
                className="absolute right-12 top-2 h-2 w-2 rounded-full bg-navy/40"
                animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaptopMock() {
  return (
    <div className="relative z-[1] mx-auto w-[88%] sm:w-[92%]">
      <div className="rounded-t-2xl border-[6px] border-b-0 border-navy bg-navy p-2 shadow-[0_40px_80px_-40px_rgb(6_21_46_/_0.65)]">
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="flex items-center gap-1.5 border-b border-navy/8 bg-slate-50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ml-2 flex h-2.5 flex-1 items-center rounded-full bg-white px-2 text-[6px] font-medium text-muted shadow-sm">
              m-tech.co
            </span>
          </div>

          <div className="bg-white px-4 pb-5 pt-4 sm:px-6 sm:pb-7 sm:pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-navy text-[7px] font-extrabold text-white">
                  M
                </span>
                <span className="font-display text-[9px] font-extrabold text-navy sm:text-[10px]">
                  M-TECH
                </span>
              </div>
              <div className="hidden gap-3 sm:flex" aria-hidden>
                {['Home', 'Services', 'Work', 'Contact'].map((t) => (
                  <span key={t} className="h-1.5 w-8 rounded-full bg-navy/10" />
                ))}
              </div>
              <span className="h-5 w-14 rounded-full bg-electric" />
            </div>

            <div className="mt-5 grid grid-cols-2 items-center gap-4 sm:mt-7 sm:gap-6">
              <div className="space-y-2">
                <span className="block h-2 w-16 rounded-full bg-electric/25" />
                <span className="block h-3.5 w-full rounded bg-navy/85" />
                <span className="block h-3.5 w-4/5 rounded bg-navy/85" />
                <span className="block h-1.5 w-full rounded-full bg-navy/10" />
                <span className="block h-1.5 w-3/4 rounded-full bg-navy/10" />
                <div className="flex gap-2 pt-1.5">
                  <span className="h-5 w-20 rounded-full bg-electric" />
                  <span className="h-5 w-16 rounded-full border border-navy/15" />
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-navy to-navy-soft p-3 shadow-lg">
                <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-electric/50 blur-md" />
                <div className="relative flex h-full flex-col justify-end gap-1.5">
                  <span className="h-1.5 w-8 rounded-full bg-electric" />
                  <span className="h-2.5 w-3/4 rounded bg-white/90" />
                  <span className="h-2.5 w-1/2 rounded bg-white/60" />
                  <div className="mt-1 flex gap-1.5">
                    <span className="h-4 w-4 rounded-md bg-white/25" />
                    <span className="h-4 w-4 rounded-md bg-white/25" />
                    <span className="h-4 w-4 rounded-md bg-electric/80" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:mt-7">
              {['from-electric/12', 'from-navy/8', 'from-electric/10'].map((bg, i) => (
                <div key={i} className={`rounded-lg bg-gradient-to-b ${bg} to-white p-2.5`}>
                  <span className="mb-1.5 block h-4 w-4 rounded-md bg-electric/70" />
                  <span className="mb-1 block h-1.5 w-3/4 rounded-full bg-navy/25" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-navy/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto h-4 w-[112%] -translate-x-[5.3%] rounded-b-xl bg-gradient-to-b from-slate-300 to-slate-400 shadow-[0_18px_36px_-18px_rgb(6_21_46_/_0.5)]">
        <span className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-slate-500/70" />
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border-[5px] border-navy bg-navy shadow-[0_32px_60px_-28px_rgb(6_21_46_/_0.7)]">
      <div className="relative aspect-[9/17] w-full overflow-hidden rounded-[1rem] bg-white">
        <span className="absolute left-1/2 top-1.5 z-10 h-2.5 w-10 -translate-x-1/2 rounded-full bg-navy" />
        <div className="flex h-full flex-col bg-gradient-to-b from-ice to-white pt-6">
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-1">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-navy text-[6px] font-extrabold text-white">
                M
              </span>
              <span className="font-display text-[7px] font-extrabold text-navy">M-TECH</span>
            </div>
            <span className="flex h-3 w-3 flex-col items-center justify-center gap-0.5 rounded bg-navy/85">
              <span className="h-0.5 w-1.5 bg-white" />
              <span className="h-0.5 w-1.5 bg-white" />
            </span>
          </div>

          <div className="mt-3 space-y-1.5 px-3">
            <span className="block h-2 w-12 rounded-full bg-electric/30" />
            <span className="block h-3 w-full rounded bg-navy/85" />
            <span className="block h-3 w-3/4 rounded bg-navy/85" />
            <span className="block h-1.5 w-full rounded-full bg-navy/10" />
            <span className="block h-4 w-20 rounded-full bg-electric" />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1.5 px-3">
            <span className="aspect-square rounded-lg bg-white shadow-sm" />
            <span className="aspect-square rounded-lg bg-gradient-to-br from-navy to-navy-soft shadow-sm" />
          </div>

          <div className="mt-2 space-y-1.5 px-3">
            <span className="block h-2 w-16 rounded-full bg-navy/25" />
            <span className="block h-1.5 w-full rounded-full bg-navy/10" />
            <span className="block h-1.5 w-5/6 rounded-full bg-navy/10" />
          </div>

          <div className="mt-auto border-t border-navy/8 bg-white px-3 py-2">
            <div className="flex justify-between">
              {['M', 'S', 'W', 'C'].map((t) => (
                <span
                  key={t}
                  className="flex h-4 w-4 items-center justify-center rounded-md bg-electric/12 text-[6px] font-bold text-electric"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
