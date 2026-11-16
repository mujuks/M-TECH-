import { BadgeCheck, HeartHandshake, Clock3, Smile, type LucideIcon } from 'lucide-react';

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    title: 'Affordable Prices',
    description:
      'Professional digital solutions designed to offer value for your investment.',
    icon: BadgeCheck,
  },
  {
    title: 'Reliable Support',
    description: 'We prioritise communication, support, and lasting client relationships.',
    icon: HeartHandshake,
  },
  {
    title: 'On-Time Delivery',
    description:
      'We value your time and work towards delivering projects within agreed timelines.',
    icon: Clock3,
  },
  {
    title: 'Client Satisfaction',
    description:
      'Your vision and satisfaction remain central to every project we undertake.',
    icon: Smile,
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 'Step 1',
    title: 'Discovery',
    description:
      'We listen to your ideas, understand your business, and identify your requirements.',
  },
  {
    step: 'Step 2',
    title: 'Planning & Design',
    description:
      'We develop a creative strategy and design a solution that matches your vision.',
  },
  {
    step: 'Step 3',
    title: 'Development',
    description:
      'We transform the approved design into a functional, responsive digital experience.',
  },
  {
    step: 'Step 4',
    title: 'Delivery',
    description:
      'We test, refine, and deliver your project, ensuring everything works as expected.',
  },
];

export const values = [
  'Creativity',
  'Innovation',
  'Professionalism',
  'Reliability',
  'Customer Satisfaction',
  'Continuous Improvement',
] as const;
