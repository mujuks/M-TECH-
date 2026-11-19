import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../data/siteConfig';

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  full?: boolean;
  variant?: 'amber' | 'green';
  className?: string;
};

export function WhatsAppButton({
  message = 'Hello M-TECH, I would like to discuss a project.',
  label = 'Chat on WhatsApp',
  full = false,
  variant = 'amber',
  className = '',
}: WhatsAppButtonProps) {
  const styles =
    variant === 'green'
      ? 'bg-[#25D366] text-white shadow-[0_14px_36px_-14px_rgb(37_211_102_/_0.85)] hover:-translate-y-0.5'
      : 'bg-amber text-navy shadow-[0_14px_36px_-14px_rgb(245_166_35_/_0.85)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgb(245_166_35_/_0.95)]';

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${
        full ? 'w-full' : ''
      } ${styles} ${className}`}
    >
      <MessageCircle size={17} aria-hidden />
      {label}
    </a>
  );
}
