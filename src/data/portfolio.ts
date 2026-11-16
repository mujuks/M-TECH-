export type PortfolioCategory =
  | 'Website Development'
  | 'Graphic Design'
  | 'Branding'
  | 'Business Promotions'
  | 'Custom Digital Solutions';

export type Project = {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  /** Visual accent used by the generated preview artwork. */
  accent: 'blue' | 'navy' | 'cyan' | 'indigo' | 'sky';
  /** Layout variant for the generated preview artwork. */
  layout: 'browser' | 'app' | 'poster' | 'brand' | 'social';
};

export const portfolioCategories: PortfolioCategory[] = [
  'Website Development',
  'Graphic Design',
  'Branding',
  'Business Promotions',
  'Custom Digital Solutions',
];

export const projects: Project[] = [
  {
    id: 'nova-retail',
    title: 'Nova Retail Store',
    category: 'Website Development',
    description:
      'A clean, conversion-focused online store concept with product collections, search and a streamlined checkout flow.',
    accent: 'blue',
    layout: 'browser',
  },
  {
    id: 'lumen-coffee',
    title: 'Lumen Coffee Co.',
    category: 'Website Development',
    description:
      'A warm, modern business website concept for a specialty coffee brand, built mobile-first with fast load times.',
    accent: 'navy',
    layout: 'browser',
  },
  {
    id: 'horizon-properties',
    title: 'Horizon Properties',
    category: 'Website Development',
    description:
      'A high-impact landing page concept designed to capture enquiries for a growing property business.',
    accent: 'sky',
    layout: 'browser',
  },
  {
    id: 'vertex-identity',
    title: 'Vertex Studio Identity',
    category: 'Branding',
    description:
      'A complete brand identity concept covering logo exploration, colour palette, typography and usage guidelines.',
    accent: 'indigo',
    layout: 'brand',
  },
  {
    id: 'bloom-toolkit',
    title: 'Bloom Cosmetics Toolkit',
    category: 'Branding',
    description:
      'A cohesive branding toolkit concept spanning packaging labels, stationery and digital brand assets.',
    accent: 'blue',
    layout: 'brand',
  },
  {
    id: 'orbit-posters',
    title: 'Orbit Logistics Posters',
    category: 'Graphic Design',
    description:
      'A series of bold promotional poster layouts concept designed for print and digital campaigns.',
    accent: 'navy',
    layout: 'poster',
  },
  {
    id: 'pulse-campaign',
    title: 'Pulse Fitness Campaign',
    category: 'Business Promotions',
    description:
      'A social media campaign concept with a consistent visual system for posts, stories and paid advertisements.',
    accent: 'cyan',
    layout: 'social',
  },
  {
    id: 'atlas-dashboard',
    title: 'Atlas Operations Dashboard',
    category: 'Custom Digital Solutions',
    description:
      'A custom web application concept that centralises reporting, task tracking and team workflows.',
    accent: 'indigo',
    layout: 'app',
  },
];
