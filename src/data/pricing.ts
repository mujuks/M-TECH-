import {
  Code2,
  Palette,
  Megaphone,
  Boxes,
  type LucideIcon,
} from 'lucide-react';

export type PriceRow = { item: string; price: string };

export type PricingGroup = {
  id: string;
  title: string;
  icon: LucideIcon;
  rows: PriceRow[];
};

/**
 * OWNER: every price below is a placeholder — replace "[KES 00,000]"
 * with real starting rates. Never publish invented prices.
 */
export const pricingGroups: PricingGroup[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    icon: Code2,
    rows: [
      { item: 'Landing Page', price: '[KES 00,000]' },
      { item: 'Business Website', price: '[KES 00,000]' },
      { item: 'Portfolio Website', price: '[KES 00,000]' },
      { item: 'E-commerce Website', price: '[KES 00,000]' },
      { item: 'Website Redesign', price: '[KES 00,000]' },
      { item: 'Website Maintenance', price: '[KES 00,000]' },
    ],
  },
  {
    id: 'graphic-design-branding',
    title: 'Graphic Design & Branding',
    icon: Palette,
    rows: [
      { item: 'Logo Design', price: '[KES 00,000]' },
      { item: 'Brand Identity Design', price: '[KES 00,000]' },
      { item: 'Business Cards', price: '[KES 00,000]' },
      { item: 'Flyers and Posters', price: '[KES 00,000]' },
      { item: 'Brochures', price: '[KES 00,000]' },
    ],
  },
  {
    id: 'business-social-media',
    title: 'Business & Social Media Designs',
    icon: Megaphone,
    rows: [
      { item: 'Social Media Posts', price: '[KES 00,000]' },
      { item: 'Promotional Posters', price: '[KES 00,000]' },
      { item: 'Digital Advertisements', price: '[KES 00,000]' },
      { item: 'Marketing Campaign Designs', price: '[KES 00,000]' },
    ],
  },
  {
    id: 'custom-digital-solutions',
    title: 'Custom Digital Solutions',
    icon: Boxes,
    rows: [
      { item: 'Custom Web Application', price: '[KES 00,000]' },
      { item: 'Business Management System', price: '[KES 00,000]' },
      { item: 'API Integration', price: '[KES 00,000]' },
      { item: 'Custom Digital Tool', price: '[KES 00,000]' },
    ],
  },
];
