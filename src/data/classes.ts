import { Code2, Camera, ShieldCheck, type LucideIcon } from 'lucide-react';

export type ClassCourse = {
  id: string;
  /** Value used in the contact form's "Service required" dropdown. */
  serviceValue: string;
  category: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** OWNER: replace the bracketed placeholders with real details. */
  duration: string;
  schedule: string;
  format: string;
  price: string;
};

export const classes: ClassCourse[] = [
  {
    id: 'coding-classes',
    serviceValue: 'Coding Classes',
    category: 'Technology',
    title: 'Coding Classes',
    description: 'Learn how to write code and build real digital projects.',
    icon: Code2,
    duration: '[Duration]',
    schedule: '[Schedule]',
    format: '[Class format]',
    price: '[KES 00,000]',
  },
  {
    id: 'photography-classes',
    serviceValue: 'Photography Classes',
    category: 'Creative',
    title: 'Photography Classes',
    description: 'Learn to capture, compose and edit professional photos.',
    icon: Camera,
    duration: '[Duration]',
    schedule: '[Schedule]',
    format: '[Class format]',
    price: '[KES 00,000]',
  },
  {
    id: 'insurance-classes',
    serviceValue: 'Insurance Classes',
    category: 'Finance',
    title: 'Insurance Classes',
    description: 'Learn the essentials of insurance and how the industry works.',
    icon: ShieldCheck,
    duration: '[Duration]',
    schedule: '[Schedule]',
    format: '[Class format]',
    price: '[KES 00,000]',
  },
];

export const classBannerMessage = "Hello M-TECH, I'd like to join a class.";
