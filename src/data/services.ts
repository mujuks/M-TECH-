import {
  Code2,
  Palette,
  Megaphone,
  Boxes,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    description:
      'We design and develop modern, responsive, and high-performance websites that help businesses grow online.',
    items: [
      'Business Websites',
      'E-commerce Websites',
      'Portfolio Websites',
      'Landing Pages',
      'Custom Development',
      'Website Redesign',
      'Website Maintenance',
    ],
    icon: Code2,
  },
  {
    id: 'graphic-design-branding',
    title: 'Graphic Design & Branding',
    description:
      'We create visually compelling designs that communicate your brand identity and make your business stand out.',
    items: [
      'Logo Design',
      'Brand Identity',
      'Business Cards',
      'Flyers and Posters',
      'Brochures',
      'Social Media Graphics',
      'Marketing Materials',
    ],
    icon: Palette,
  },
  {
    id: 'business-social-media',
    title: 'Business & Social Media Designs',
    description:
      'Professional digital designs that help businesses communicate effectively and attract customers.',
    items: [
      'Social Media Posts',
      'Promotional Posters',
      'Digital Advertisements',
      'Business Promotions',
      'Campaign Designs',
      'Social Media Branding',
    ],
    icon: Megaphone,
  },
  {
    id: 'custom-digital-solutions',
    title: 'Custom Digital Solutions',
    description:
      'We develop tailored digital solutions that simplify business processes and improve productivity.',
    items: [
      'Custom Web Apps',
      'Business Management Systems',
      'Web-Based Platforms',
      'Database-Driven Apps',
      'API Integrations',
      'Custom Digital Tools',
    ],
    icon: Boxes,
  },
  {
    id: 'responsive-modern-websites',
    title: 'Responsive & Modern Websites',
    description:
      'Create seamless experiences across smartphones, tablets, laptops, and desktop computers.',
    items: [
      'Mobile-First Development',
      'Responsive Layouts',
      'Modern UI/UX',
      'Performance Optimization',
      'Cross-Browser Compatibility',
    ],
    icon: Smartphone,
  },
];

/** Slow scrolling "what we deliver" tags. */
export const deliverTags = [
  'Website Development',
  'Graphic Design',
  'Branding',
  'Digital Solutions',
  'Business Websites',
  'E-commerce',
  'Social Media Designs',
  'Posters & Flyers',
] as const;
