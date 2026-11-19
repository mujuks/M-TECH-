import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';

export function NotFoundPage() {
  return (
    <div className="bg-navy pt-[72px]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#06152E_0%,#0B2A55_55%,#0A56B5_120%)] py-24 sm:py-32">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_-10%,rgb(255_255_255_/_0.18),transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute -right-24 top-1/4 h-96 w-96 rounded-full border border-white/10"
        />
        <div
          aria-hidden
          className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-electric/25 blur-[100px]"
        />

        <div className="container-site relative text-center">
          <Reveal>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/25 bg-white/10 backdrop-blur-md">
              <Compass size={34} className="text-white" aria-hidden />
            </div>

            <p className="eyebrow mt-8 text-amber">Error 404</p>

            <h1 className="heading-fluid mt-4 font-display font-extrabold tracking-[-0.02em] text-white">
              This page took a <span className="text-amber">wrong turn</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ice/75 sm:text-lg">
              The page you are looking for doesn&apos;t exist or may have been moved.
              Let&apos;s get you back on track.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-semibold tracking-wide text-navy shadow-[0_14px_36px_-14px_rgb(245_166_35_/_0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgb(245_166_35_/_0.95)]"
              >
                Back to home
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
