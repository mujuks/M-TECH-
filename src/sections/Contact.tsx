import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { siteConfig, toInternational, waChat } from '../data/siteConfig';
import { SectionHeading } from '../components/SectionHeading';
import { ContactForm } from '../components/ContactForm';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Reveal } from '../components/Reveal';

type ContactPreset = {
  presetService?: string;
  presetNonce?: number;
};

const isPlaceholder = (value: string) => value.startsWith('[');

export function Contact() {
  const { state } = useLocation();
  const { presetService = '', presetNonce = 0 } = (state ?? {}) as ContactPreset;

  const socialIcons: Record<string, typeof Facebook> = {
    Facebook,
    Instagram,
    X: Send,
    YouTube: Youtube,
  };

  return (
    <section id="contact" className="bg-ice py-20 sm:py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Contact us"
          title="Let's build something amazing together"
          highlight="amazing"
          subtitle="Have an idea, a business, or a project in mind? Let's discuss how M-TECH can help bring it to life."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Navy info card */}
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-navy p-7 text-white sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_15%_0%,rgb(8_123_250_/_0.35),transparent_50%),radial-gradient(circle_at_90%_100%,rgb(10_86_181_/_0.45),transparent_50%)]"
              />

              <div className="relative">
                <p className="eyebrow text-amber">Get in touch</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white">
                  Talk to M-TECH
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ice/70">
                  Call or WhatsApp us — we usually reply quickly during business hours.
                </p>

                <ul className="mt-7 space-y-4">
                  <li>
                    <p className="eyebrow text-electric-soft">Phone / WhatsApp</p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {siteConfig.phones.map((phone) => (
                        <span
                          key={phone.tel}
                          className="inline-flex items-center overflow-hidden rounded-full border border-white/15 bg-white/5"
                        >
                          <a
                            href={`tel:${phone.tel}`}
                            className="inline-flex min-h-[44px] items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-electric"
                          >
                            <Phone size={15} aria-hidden />
                            {phone.display}
                          </a>
                          <a
                            href={waChat(toInternational(phone.tel))}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`WhatsApp M-TECH on ${phone.display}`}
                            className="inline-flex h-11 w-11 items-center justify-center border-l border-white/15 text-ice/80 transition-colors duration-300 hover:bg-electric hover:text-white"
                          >
                            <MessageCircle size={16} aria-hidden />
                          </a>
                        </span>
                      ))}
                    </div>
                  </li>

                  <li>
                    <p className="eyebrow text-electric-soft">Email</p>
                    {isPlaceholder(siteConfig.email) ? (
                      <p className="mt-2 flex items-center gap-2.5 text-sm text-ice/70">
                        <Mail size={16} className="shrink-0 text-electric" aria-hidden />
                        <span className="rounded border border-dashed border-white/25 px-2 py-1 text-ice/60">
                          {siteConfig.email}
                        </span>
                      </p>
                    ) : (
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="mt-2 flex min-h-[32px] items-center gap-2.5 text-sm text-ice/70 transition-colors hover:text-electric-soft"
                      >
                        <Mail size={16} className="shrink-0 text-electric" aria-hidden />
                        {siteConfig.email}
                      </a>
                    )}
                  </li>

                  <li>
                    <p className="eyebrow text-electric-soft">Location</p>
                    {isPlaceholder(siteConfig.location) ? (
                      <p className="mt-2 flex items-center gap-2.5 text-sm text-ice/70">
                        <MapPin size={16} className="shrink-0 text-electric" aria-hidden />
                        <span className="rounded border border-dashed border-white/25 px-2 py-1 text-ice/60">
                          {siteConfig.location}
                        </span>
                      </p>
                    ) : (
                      <p className="mt-2 flex items-center gap-2.5 text-sm text-ice/70">
                        <MapPin size={16} className="shrink-0 text-electric" aria-hidden />
                        {siteConfig.location}
                      </p>
                    )}
                  </li>
                </ul>

                <div className="mt-7">
                  <p className="eyebrow text-electric-soft">Follow us</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {siteConfig.socials.map((s) => {
                      const SocialIcon = socialIcons[s.name] ?? Send;
                      const pending = s.url.length === 0;
                      const className =
                        'flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-ice/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:bg-electric hover:text-white';

                      return pending ? (
                        <span
                          key={s.name}
                          className={`${className} cursor-default opacity-55`}
                          title={`${s.name} link coming soon`}
                          aria-label={`${s.name} — link coming soon`}
                        >
                          <SocialIcon size={17} aria-hidden />
                        </span>
                      ) : (
                        <a
                          key={s.name}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          className={className}
                        >
                          <SocialIcon size={17} aria-hidden />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <WhatsAppButton full label="Chat on WhatsApp" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* White form card */}
          <Reveal delay={0.1} className="h-full">
            <div className="h-full rounded-[28px] border border-navy/10 bg-white p-7 shadow-card sm:p-9">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-navy">
                Send us a message
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Fill in the form and we&apos;ll continue the conversation on WhatsApp.
              </p>
              <div className="mt-6">
                <ContactForm presetService={presetService} presetNonce={presetNonce} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
