import {
  Globe,
  ShoppingBag,
  FileText,
  Sparkles,
  Megaphone,
  Boxes,
  type LucideIcon,
} from 'lucide-react';
import type { MockVariant } from '../components/ProjectMockup';

export const portfolioCategories = [
  'All',
  'Website Development',
  'Graphic Design',
  'Branding',
  'Business Promotions',
  'Custom Digital Solutions',
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  description: string;
  icon: LucideIcon;
  /** CSS mockup used as the project preview (see ProjectMockup). */
  mock: MockVariant;
  /** OWNER: drop in a real screenshot path (e.g. "/projects/my-site.png"). */
  image?: string;
  /** OWNER: add a live URL once the project is public. */
  link?: string;
};

/**
 * DEMONSTRATION projects only — clearly labelled as demos.
 * Replace with real work through this file (title, category, description, image, link).
 * Note shown on the site: "Demonstration project. Real portfolio work will replace this."
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'business-website-concept',
    title: 'Business website concept',
    category: 'Website Development',
    description:
      'A clean, conversion-focused business website concept with clear service sections and calls to action.',
    icon: Globe,
    mock: 'browser',
  },
  {
    id: 'online-store-concept',
    title: 'Online store concept',
    category: 'Website Development',
    description:
      'An e-commerce concept covering product catalogue, cart and streamlined checkout flow.',
    icon: ShoppingBag,
    mock: 'store',
  },
  {
    id: 'poster-flyer-set',
    title: 'Poster and flyer set',
    category: 'Graphic Design',
    description:
      'A coordinated poster and flyer concept set built for print and digital promotion.',
    icon: FileText,
    mock: 'poster',
  },
  {
    id: 'brand-identity-concept',
    title: 'Brand identity concept',
    category: 'Branding',
    description:
      'A full brand identity concept — logo, colour direction and core brand elements.',
    icon: Sparkles,
    mock: 'brand',
  },
  {
    id: 'social-campaign-concept',
    title: 'Social media campaign concept',
    category: 'Business Promotions',
    description:
      'A social media campaign concept with a consistent visual system across post formats.',
    icon: Megaphone,
    mock: 'social',
  },
  {
    id: 'management-system-concept',
    title: 'Business management system concept',
    category: 'Custom Digital Solutions',
    description:
      'A custom business management system concept for streamlining day-to-day operations.',
    icon: Boxes,
    mock: 'dashboard',
  },
];

export const portfolioDemoNote =
  'Demonstration project. Real portfolio work will replace this.';
