import { Target, HeartHandshake, Timer, BadgePercent } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const mission = {
  title: 'Our Mission',
  text: 'To empower businesses and individuals through innovative digital solutions, creative designs, and professional website development.',
};

export const vision = {
  title: 'Our Vision',
  text: 'To become a trusted digital technology and creative solutions partner, helping businesses establish and grow their presence in the digital world.',
};

export const aboutIntro =
  'At M-TECH, we believe every great idea deserves an exceptional digital presence. We are passionate about combining creativity, technology, and innovation to deliver digital solutions that help individuals and businesses succeed.';

export const values = [
  'Creativity',
  'Innovation',
  'Professionalism',
  'Reliability',
  'Customer Satisfaction',
  'Continuous Improvement',
] as const;

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyFeatures: Feature[] = [
  {
    id: 'affordable-prices',
    title: 'Affordable Prices',
    description:
      'Professional digital solutions designed to offer value for your investment.',
    icon: BadgePercent,
  },
  {
    id: 'reliable-support',
    title: 'Reliable Support',
    description:
      'We prioritise communication, support, and lasting client relationships.',
    icon: HeartHandshake,
  },
  {
    id: 'on-time-delivery',
    title: 'On-Time Delivery',
    description:
      'We value your time and work towards delivering projects within agreed timelines.',
    icon: Timer,
  },
  {
    id: 'client-satisfaction',
    title: 'Client Satisfaction',
    description:
      'Your vision and satisfaction remain central to every project we undertake.',
    icon: Target,
  },
];
