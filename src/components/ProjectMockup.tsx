export type MockVariant =
  | 'browser'
  | 'store'
  | 'poster'
  | 'brand'
  | 'social'
  | 'dashboard';

type ProjectMockupProps = {
  variant: MockVariant;
  className?: string;
};

/**
 * Pure-CSS project previews. The host box is a fixed 16:10 aspect and every
 * dimension uses container-query units (cqw), so the same markup is crisp in
 * the small card and in the lightbox.
 */
export function ProjectMockup({ variant, className = '' }: ProjectMockupProps) {
  return (
    <div
      aria-hidden
      className={`@container relative aspect-[16/10] w-full overflow-hidden ${className}`}
    >
      {variant === 'browser' && <BrowserMock />}
      {variant === 'store' && <StoreMock />}
      {variant === 'poster' && <PosterMock />}
      {variant === 'brand' && <BrandMock />}
      {variant === 'social' && <SocialMock />}
      {variant === 'dashboard' && <DashboardMock />}
    </div>
  );
}

function Chrome({ url }: { url: string }) {
  return (
    <div className="flex h-[7cqw] shrink-0 items-center gap-[1.2cqw] border-b border-navy/10 bg-[#eef3fa] px-[2.4cqw]">
      <span className="h-[1.8cqw] w-[1.8cqw] rounded-full bg-[#ff5f57]" />
      <span className="h-[1.8cqw] w-[1.8cqw] rounded-full bg-[#febc2e]" />
      <span className="h-[1.8cqw] w-[1.8cqw] rounded-full bg-[#28c840]" />
      <span className="ml-[1.4cqw] flex-1 truncate rounded-full bg-white px-[1.8cqw] py-[0.6cqw] text-[2.2cqw] leading-none text-muted">
        {url}
      </span>
    </div>
  );
}

function SiteNav({ brand }: { brand: string }) {
  return (
    <div className="flex shrink-0 items-center gap-[1.8cqw] px-[3cqw] py-[2cqw]">
      <span className="h-[3.2cqw] w-[3.2cqw] shrink-0 rounded-[0.8cqw] bg-[linear-gradient(135deg,#0A6CE0,#087BFA)]" />
      <span className="text-[2.4cqw] font-bold leading-none tracking-tight text-navy">
        {brand}
      </span>
      <span className="ml-auto flex gap-[1.6cqw]">
        <span className="h-[1.4cqw] w-[6cqw] rounded-full bg-navy/15" />
        <span className="h-[1.4cqw] w-[6cqw] rounded-full bg-navy/15" />
        <span className="h-[1.4cqw] w-[6cqw] rounded-full bg-navy/15" />
      </span>
      <span className="rounded-full bg-[#0A6CE0] px-[2.2cqw] py-[1.1cqw] text-[2cqw] font-semibold leading-none text-white">
        Get started
      </span>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="absolute inset-[3cqw] flex flex-col overflow-hidden rounded-[2.2cqw] bg-white shadow-[0_3cqw_8cqw_-3cqw_rgb(6_21_46_/_0.45)]">
      <Chrome url="https://yourbusiness.co.ke" />
      <SiteNav brand="YourBrand" />

      <div className="mx-[3cqw] flex shrink-0 items-center gap-[2.6cqw] rounded-[1.8cqw] bg-[linear-gradient(120deg,#0B2A55_0%,#0A56B5_60%,#087BFA_100%)] px-[3cqw] py-[2.6cqw]">
        <span className="flex min-w-0 flex-1 flex-col gap-[1.3cqw]">
          <span className="h-[2.4cqw] w-[82%] rounded-full bg-white/85" />
          <span className="h-[2.4cqw] w-[58%] rounded-full bg-white/85" />
          <span className="mt-[0.6cqw] h-[1.4cqw] w-[92%] rounded-full bg-white/40" />
          <span className="h-[1.4cqw] w-[70%] rounded-full bg-white/40" />
        </span>
        <span className="h-[13cqw] w-[15cqw] shrink-0 rounded-[1.4cqw] border border-white/30 bg-white/15" />
      </div>

      <div className="mt-[2.4cqw] grid shrink-0 grid-cols-3 gap-[2cqw] px-[3cqw] pb-[3cqw]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="flex flex-col gap-[1.2cqw] rounded-[1.6cqw] border border-navy/10 bg-white p-[2cqw] shadow-[0_1.4cqw_3cqw_-1.6cqw_rgb(6_21_46_/_0.25)]"
          >
            <span className="h-[2.8cqw] w-[2.8cqw] rounded-[0.7cqw] bg-[#0A6CE0]/15" />
            <span className="h-[1.4cqw] w-[75%] rounded-full bg-navy/25" />
            <span className="h-[1.1cqw] w-[95%] rounded-full bg-navy/10" />
            <span className="h-[1.1cqw] w-[60%] rounded-full bg-navy/10" />
          </span>
        ))}
      </div>
    </div>
  );
}

function StoreMock() {
  return (
    <div className="absolute inset-[3cqw] flex flex-col overflow-hidden rounded-[2.2cqw] bg-white shadow-[0_3cqw_8cqw_-3cqw_rgb(6_21_46_/_0.45)]">
      <Chrome url="https://yourstore.co.ke/shop" />
      <SiteNav brand="Shop" />

      <div className="grid shrink-0 grid-cols-3 gap-[1.8cqw] px-[3cqw] pb-[3cqw]">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="flex flex-col overflow-hidden rounded-[1.4cqw] border border-navy/10 bg-white"
          >
            <span
              className={`h-[11cqw] w-full ${
                i % 3 === 0
                  ? 'bg-[linear-gradient(135deg,#0A6CE0,#087BFA)]'
                  : i % 3 === 1
                    ? 'bg-[linear-gradient(135deg,#0B2A55,#0A56B5)]'
                    : 'bg-[linear-gradient(135deg,#EAF4FF,#BFDDFF)]'
              }`}
            />
            <span className="flex flex-col gap-[1cqw] p-[1.6cqw]">
              <span className="h-[1.3cqw] w-[85%] rounded-full bg-navy/25" />
              <span className="h-[1.1cqw] w-[45%] rounded-full bg-[#0A6CE0]/70" />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PosterMock() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#06152E_0%,#0A56B5_55%,#087BFA_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_30%_5%,rgb(255_255_255_/_0.2),transparent_62%)]" />

      {/* Back sheet */}
      <div className="absolute left-[15%] top-[7%] flex h-[86%] w-[27%] -rotate-6 flex-col overflow-hidden rounded-[1.4cqw] bg-white/95 p-[2.6cqw] shadow-[0_3cqw_7cqw_-2cqw_rgb(6_21_46_/_0.6)]">
        <span className="block h-[20cqw] w-full shrink-0 rounded-[1.2cqw] bg-[linear-gradient(135deg,#0B2A55,#087BFA)]" />
        <span className="mt-[2.4cqw] block h-[2.6cqw] w-[85%] rounded-full bg-navy/80" />
        <span className="mt-[1.6cqw] block h-[1.8cqw] w-[65%] rounded-full bg-navy/30" />
        <span className="mt-[1.2cqw] block h-[1.8cqw] w-[75%] rounded-full bg-navy/30" />
        <span className="mt-auto block h-[4.5cqw] w-[58%] rounded-full bg-[#F5A623]" />
      </div>

      {/* Front sheet */}
      <div className="absolute right-[15%] top-[10%] flex h-[86%] w-[27%] rotate-[5deg] flex-col overflow-hidden rounded-[1.4cqw] bg-white p-[2.6cqw] shadow-[0_4cqw_9cqw_-2cqw_rgb(6_21_46_/_0.65)]">
        <span className="flex shrink-0 items-center gap-[1.8cqw]">
          <span className="h-[4.6cqw] w-[4.6cqw] shrink-0 rounded-full bg-[#0A6CE0]" />
          <span className="h-[2.2cqw] flex-1 rounded-full bg-navy/70" />
        </span>
        <span className="mt-[2.6cqw] block h-[20cqw] w-full shrink-0 rounded-[1.2cqw] bg-[linear-gradient(135deg,#EAF4FF,#9CC8FF)]" />
        <span className="mt-[2.4cqw] block h-[2.4cqw] w-[80%] rounded-full bg-navy/80" />
        <span className="mt-[1.6cqw] block h-[1.8cqw] w-[60%] rounded-full bg-navy/30" />
        <span className="mt-auto flex shrink-0 gap-[1.4cqw]">
          <span className="h-[4.5cqw] w-[14cqw] rounded-full bg-[#0A6CE0]" />
          <span className="h-[4.5cqw] w-[14cqw] rounded-full border-[0.4cqw] border-navy/25" />
        </span>
      </div>
    </div>
  );
}

function BrandMock() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] bg-[linear-gradient(150deg,#EAF4FF_0%,#FFFFFF_55%,#D3E0F2_100%)]">
      <span className="flex h-[30cqw] w-[30cqw] shrink-0 items-center justify-center rounded-[7cqw] bg-[linear-gradient(135deg,#06152E_0%,#0A56B5_60%,#087BFA_100%)] font-display text-[14cqw] font-extrabold leading-none tracking-tight text-white shadow-[0_4cqw_9cqw_-3cqw_rgb(6_21_46_/_0.55)]">
        M
      </span>

      <span className="flex shrink-0 gap-[2cqw]">
        {['#06152E', '#0A6CE0', '#087BFA', '#EAF4FF', '#F5A623'].map((hex) => (
          <span
            key={hex}
            className="h-[6cqw] w-[6cqw] rounded-full border-[0.4cqw] border-white shadow-[0_1.4cqw_3cqw_-1.4cqw_rgb(6_21_46_/_0.4)]"
            style={{ background: hex }}
          />
        ))}
      </span>

      <span className="flex shrink-0 flex-col items-center gap-[1.6cqw]">
        <span className="h-[2.4cqw] w-[30cqw] rounded-full bg-navy/70" />
        <span className="h-[1.6cqw] w-[20cqw] rounded-full bg-navy/30" />
      </span>
    </div>
  );
}

function SocialMock() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[6cqw] bg-[linear-gradient(135deg,#06152E_0%,#0B2A55_45%,#0A56B5_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgb(255_255_255_/_0.18),transparent_65%)]" />

      {/* Phone frame */}
      <div className="relative flex h-[94%] w-[26cqw] shrink-0 flex-col overflow-hidden rounded-[3.4cqw] border-[1.2cqw] border-navy bg-white shadow-[0_5cqw_12cqw_-4cqw_rgb(6_21_46_/_0.7)]">
        <div className="flex shrink-0 items-center gap-[1.6cqw] border-b border-navy/10 px-[2.2cqw] py-[2cqw]">
          <span className="h-[4.4cqw] w-[4.4cqw] shrink-0 rounded-full bg-[linear-gradient(135deg,#0A6CE0,#087BFA)]" />
          <span className="h-[1.6cqw] w-[10cqw] rounded-full bg-navy/30" />
          <span className="ml-auto h-[1.6cqw] w-[3cqw] rounded-full bg-navy/20" />
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-[1.6cqw] p-[2.2cqw]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="flex flex-col overflow-hidden rounded-[1.6cqw] border border-navy/10"
            >
              <span
                className={`h-[12cqw] w-full ${
                  i % 2 === 0
                    ? 'bg-[linear-gradient(135deg,#0A6CE0,#087BFA)]'
                    : 'bg-[linear-gradient(135deg,#0B2A55,#4F93F7)]'
                }`}
              />
              <span className="h-[1.4cqw] w-[70%] shrink-0 rounded-full bg-navy/25" />
            </span>
          ))}
        </div>
      </div>

      {/* Floating engagement chips */}
      <div className="relative flex w-[24cqw] shrink-0 flex-col gap-[2.4cqw]">
        {[
          { w: '24cqw', c: '#F5A623' },
          { w: '19cqw', c: '#087BFA' },
          { w: '22cqw', c: '#FFFFFF' },
        ].map((chip, i) => (
          <span
            key={i}
            className="flex items-center gap-[1.6cqw] rounded-full bg-white/10 px-[2.4cqw] py-[2.2cqw] backdrop-blur"
            style={{ width: chip.w }}
          >
            <span
              className="h-[3.6cqw] w-[3.6cqw] shrink-0 rounded-full"
              style={{ background: chip.c }}
            />
            <span className="h-[1.6cqw] flex-1 rounded-full bg-white/55" />
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="absolute inset-[3cqw] flex overflow-hidden rounded-[2.2cqw] bg-white shadow-[0_3cqw_8cqw_-3cqw_rgb(6_21_46_/_0.45)]">
      {/* Sidebar */}
      <div className="flex w-[15cqw] shrink-0 flex-col gap-[2.4cqw] bg-[#06152E] p-[2.6cqw]">
        <span className="h-[3cqw] w-[3cqw] rounded-[0.8cqw] bg-[linear-gradient(135deg,#0A6CE0,#087BFA)]" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-[1.6cqw] rounded-full ${i === 0 ? 'w-[90%] bg-electric' : 'w-[70%] bg-white/25'}`}
          />
        ))}
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center gap-[1.8cqw] border-b border-navy/10 px-[3cqw] py-[2.4cqw]">
          <span className="h-[2.2cqw] w-[22cqw] rounded-full bg-navy/15" />
          <span className="ml-auto h-[4.6cqw] w-[4.6cqw] rounded-full bg-[#0A6CE0]/20" />
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-[2cqw] px-[3cqw] pt-[2.6cqw]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="flex flex-col gap-[1.2cqw] rounded-[1.6cqw] border border-navy/10 p-[2.2cqw]"
            >
              <span className="h-[1.3cqw] w-[60%] rounded-full bg-navy/20" />
              <span
                className={`h-[3cqw] w-[45%] rounded-full ${i === 1 ? 'bg-[#F5A623]' : 'bg-[#0A6CE0]'}`}
              />
            </span>
          ))}
        </div>

        {/* Chart */}
        <div className="mx-[3cqw] mt-[2.6cqw] flex flex-1 items-end gap-[2cqw] overflow-hidden rounded-[1.6cqw] border border-navy/10 bg-[#F7FAFF] px-[3cqw] pb-[2.4cqw] pt-[2.4cqw]">
          {[45, 72, 58, 90, 66, 80, 52].map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-[0.8cqw] ${i % 3 === 2 ? 'bg-[#F5A623]' : 'bg-[linear-gradient(180deg,#087BFA,#0A6CE0)]'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="h-[3cqw] shrink-0" />
      </div>
    </div>
  );
}
