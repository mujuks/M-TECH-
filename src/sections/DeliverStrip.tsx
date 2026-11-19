import { deliverTags } from '../data/services';

export function DeliverStrip() {
  return (
    <section aria-label="What we deliver" className="bg-ice py-10">
      <div className="container-site">
        <p className="eyebrow text-amber-dark">What we deliver</p>
      </div>

      <div className="marquee-mask group mt-5 overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <div className="flex gap-3 pr-3">
            {deliverTags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy/85 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3 pr-3" aria-hidden>
            {deliverTags.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy/85 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
