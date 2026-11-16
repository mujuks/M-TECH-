import type { Project } from '../data/portfolio';

const accents: Record<Project['accent'], { solid: string; soft: string; line: string }> = {
  blue: { solid: '#087BFA', soft: '#EAF4FF', line: '#B9D9FF' },
  navy: { solid: '#06152E', soft: '#0B2144', line: '#1E3A63' },
  cyan: { solid: '#06B6D4', soft: '#ECFEFF', line: '#A5F3FC' },
  indigo: { solid: '#4F46E5', soft: '#EEF2FF', line: '#C7D2FE' },
  sky: { solid: '#0EA5E9', soft: '#F0F9FF', line: '#BAE6FD' },
};

/**
 * Generates a stylised abstract preview for a project card so the gallery
 * never relies on stock photography. Replace with real screenshots later.
 */
export function ProjectThumb({ project }: { project: Project }) {
  const c = accents[project.accent];

  return (
    <div
      aria-hidden
      className="relative aspect-[4/3] w-full overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${c.soft} 0%, #ffffff 60%, ${c.soft} 100%)` }}
    >
      <span
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-2xl"
        style={{ background: c.solid }}
      />
      <span
        className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full opacity-15 blur-2xl"
        style={{ background: c.solid }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        {project.layout === 'browser' && <BrowserMock c={c} />}
        {project.layout === 'app' && <AppMock c={c} />}
        {project.layout === 'poster' && <PosterMock c={c} />}
        {project.layout === 'brand' && <BrandMock c={c} />}
        {project.layout === 'social' && <SocialMock c={c} />}
      </div>

      <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy/70 backdrop-blur">
        Demonstration
      </span>
    </div>
  );
}

type Palette = { solid: string; soft: string; line: string };

function BrowserMock({ c }: { c: Palette }) {
  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-xl border border-navy/10 bg-white shadow-[0_24px_50px_-24px_rgb(6_21_46_/_0.45)] transition-transform duration-500 group-hover:scale-[1.03]">
      <div className="flex items-center gap-1.5 border-b border-navy/8 bg-slate-50 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-2 h-2.5 flex-1 rounded-full bg-navy/8" />
      </div>
      <div className="space-y-2.5 p-4" style={{ background: c.soft }}>
        <div className="h-3 w-2/3 rounded-full" style={{ background: c.solid }} />
        <div className="h-2 w-full rounded-full bg-navy/12" />
        <div className="h-2 w-5/6 rounded-full bg-navy/12" />
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="h-10 rounded-lg bg-white shadow-sm" />
          <div className="h-10 rounded-lg bg-white shadow-sm" />
          <div className="h-10 rounded-lg bg-white shadow-sm" />
        </div>
        <div className="h-6 w-24 rounded-full" style={{ background: c.solid }} />
      </div>
    </div>
  );
}

function AppMock({ c }: { c: Palette }) {
  return (
    <div className="flex w-full max-w-[300px] gap-2 overflow-hidden rounded-xl border border-navy/10 bg-white shadow-[0_24px_50px_-24px_rgb(6_21_46_/_0.45)] transition-transform duration-500 group-hover:scale-[1.03]">
      <div className="w-12 space-y-2 p-3" style={{ background: c.solid }}>
        <span className="block h-3 w-3 rounded-md bg-white/90" />
        <span className="block h-3 w-3 rounded-md bg-white/40" />
        <span className="block h-3 w-3 rounded-md bg-white/40" />
        <span className="block h-3 w-3 rounded-md bg-white/40" />
      </div>
      <div className="flex-1 space-y-2.5 p-4">
        <div className="h-2.5 w-1/2 rounded-full bg-navy/15" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-9 rounded-lg" style={{ background: c.soft }} />
          <div className="h-9 rounded-lg" style={{ background: c.soft }} />
        </div>
        <div className="flex h-16 items-end gap-1.5 rounded-lg bg-slate-50 p-2">
          {[38, 62, 48, 80, 55, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: c.solid, opacity: 0.35 + i * 0.1 }}
            />
          ))}
        </div>
        <div className="h-2 w-3/4 rounded-full bg-navy/10" />
      </div>
    </div>
  );
}

function PosterMock({ c }: { c: Palette }) {
  return (
    <div
      className="relative h-full max-h-[220px] w-[160px] overflow-hidden rounded-lg shadow-[0_24px_50px_-20px_rgb(6_21_46_/_0.55)] transition-transform duration-500 group-hover:scale-[1.04] group-hover:-rotate-1"
      style={{ background: c.solid }}
    >
      <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full border-[10px] border-white/20" />
      <span className="absolute -bottom-8 -left-6 h-28 w-28 rotate-12 rounded-2xl bg-white/10" />
      <div className="relative flex h-full flex-col justify-end gap-1.5 p-4">
        <span className="block h-1.5 w-10 rounded-full bg-white/70" />
        <span className="block h-4 w-4/5 rounded bg-white" />
        <span className="block h-4 w-3/5 rounded bg-white/85" />
        <span className="mt-2 block h-2 w-2/3 rounded-full bg-white/50" />
      </div>
    </div>
  );
}

function BrandMock({ c }: { c: Palette }) {
  return (
    <div className="flex w-full max-w-[300px] flex-col items-center gap-3 rounded-xl border border-navy/10 bg-white p-5 shadow-[0_24px_50px_-24px_rgb(6_21_46_/_0.45)] transition-transform duration-500 group-hover:scale-[1.03]">
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-extrabold text-white"
        style={{ background: c.solid }}
      >
        M
      </span>
      <div className="flex gap-1.5">
        {[c.solid, c.line, c.soft, '#06152E', '#64748B'].map((color) => (
          <span key={color} className="h-5 w-5 rounded-full border border-navy/10" style={{ background: color }} />
        ))}
      </div>
      <div className="space-y-1.5 text-center">
        <span className="block h-2 w-28 rounded-full bg-navy/15" />
        <span className="block h-2 w-20 rounded-full bg-navy/8" />
      </div>
    </div>
  );
}

function SocialMock({ c }: { c: Palette }) {
  return (
    <div className="grid w-full max-w-[300px] grid-cols-2 gap-3 transition-transform duration-500 group-hover:scale-[1.03]">
      <div
        className="aspect-square rounded-xl p-3 shadow-[0_18px_40px_-22px_rgb(6_21_46_/_0.5)]"
        style={{ background: c.solid }}
      >
        <span className="block h-2 w-8 rounded-full bg-white/60" />
        <span className="mt-auto block h-3 w-12 rounded bg-white/90" />
        <div className="mt-4 h-8 w-8 rounded-full border-2 border-white/50" />
      </div>
      <div className="flex aspect-square flex-col gap-2 rounded-xl border border-navy/10 bg-white p-3 shadow-sm">
        <span className="block h-2 w-10 rounded-full" style={{ background: c.solid }} />
        <span className="block h-2 w-full rounded-full bg-navy/10" />
        <span className="block h-2 w-3/4 rounded-full bg-navy/10" />
        <div className="mt-auto grid grid-cols-3 gap-1">
          <span className="aspect-square rounded-md" style={{ background: c.soft }} />
          <span className="aspect-square rounded-md" style={{ background: c.soft }} />
          <span className="aspect-square rounded-md" style={{ background: c.soft }} />
        </div>
      </div>
    </div>
  );
}
