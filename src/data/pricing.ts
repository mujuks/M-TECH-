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
 * Starting prices, benchmarked against published Kenyan market rates
 * (2025–26). Sources and observed ranges:
 *  Websites: landing pages KES 15,000–45,000; business sites
 *  KES 40,000–120,000; e-commerce KES 65,000–400,000; maintenance
 *  KES 2,500–30,000/month (Nordlyte, Underscore, WPfoss, Mocky,
 *  getprojects, Timothy Mwangi, Quest).
 *  Branding: logo design KES 2,500–25,000 (Mocky, Quest, Yudigify);
 *  starter brand identity packages KES 15,000–40,000 (Mocky,
 *  Brandmonarch); business cards KES 1,000–8,000; flyers/posters
 *  KES 1,500–8,000 (Yudigify, Mocky).
 *  Social/design: per-post creatives KES 500–2,500, 10-creative packs
 *  ~KES 12,000, monthly creative partners KES 25,000 (Bravura,
 *  Yudigify, Ranking Kenya).
 *  Software: MVP/custom tools from KES 65,000 (Beatsy); focused web
 *  apps from KES 150,000 (Threal, Statum, Quest); multi-module business
 *  systems from KES 400,000; M-Pesa/API integrations KES 20,000–50,000
 *  (Mocky, Kissor).
 * OWNER: adjust any figure to your own rates before publishing.
 */
export const pricingGroups: PricingGroup[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    icon: Code2,
    rows: [
      { item: 'Landing Page', price: 'KES 20,000' },
      { item: 'Business Website', price: 'KES 40,000' },
      { item: 'Portfolio Website', price: 'KES 30,000' },
      { item: 'E-commerce Website', price: 'KES 80,000' },
      { item: 'Website Redesign', price: 'KES 30,000' },
      { item: 'Website Maintenance', price: 'KES 5,000 / month' },
    ],
  },
  {
    id: 'graphic-design-branding',
    title: 'Graphic Design & Branding',
    icon: Palette,
    rows: [
      { item: 'Logo Design', price: 'KES 5,000' },
      { item: 'Brand Identity Design', price: 'KES 15,000' },
      { item: 'Business Cards', price: 'KES 2,500' },
      { item: 'Flyers and Posters', price: 'KES 2,000' },
      { item: 'Brochures', price: 'KES 5,000' },
    ],
  },
  {
    id: 'business-social-media',
    title: 'Business & Social Media Designs',
    icon: Megaphone,
    rows: [
      { item: 'Social Media Posts', price: 'KES 1,500' },
      { item: 'Promotional Posters', price: 'KES 2,000' },
      { item: 'Digital Advertisements', price: 'KES 2,500' },
      { item: 'Marketing Campaign Designs', price: 'KES 12,000' },
    ],
  },
  {
    id: 'custom-digital-solutions',
    title: 'Custom Digital Solutions',
    icon: Boxes,
    rows: [
      { item: 'Custom Web Application', price: 'KES 150,000' },
      { item: 'Business Management System', price: 'KES 400,000' },
      { item: 'API Integration', price: 'KES 30,000' },
      { item: 'Custom Digital Tool', price: 'KES 65,000' },
    ],
  },
];
