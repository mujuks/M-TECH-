import { Code2, Camera, ShieldCheck, type LucideIcon } from 'lucide-react';

/**
 * One teachable unit inside a class — name, fee, length and numeric amount.
 *
 * Unit prices below are benchmarked against Kenyan short-course market
 * rates (2025–26), e.g. local providers charge roughly:
 *  Coding: eMobilis in-person courses KES 14,000 – 69,500; Finstock
 *  Python 1 month = 15,000; OUK web dev short course = 5,000; budget
 *  online full-stack certs ~15,600/12 weeks; bootcamps 50,000 – 150,000
 *  (not offered here) — so M-TECH units sit mid-market at 5,000 – 35,000.
 *  Photography: certificate cohorts run KES 12,000 – 17,000/month
 *  (Visualdo 12k, Music & Film Academy 13k, Sensei 15k), photo editing
 *  1 month = 25,000, boutique 5-day class = 9,000 — so units land at
 *  roughly KES 3,500 – 5,000 per week.
 *  Insurance: Finstock Evarsity runs 31 short courses all at KES 15,000
 *  for 1 month (underwriting, medical, sales, etc.), reinsurance 17,000
 *  — so 1-month units = 15,000 and shorter units are pro-rated.
 * OWNER: adjust any figure to your own rates before publishing.
 */
export type ClassUnit = {
  name: string;
  /** Display price, e.g. "KES 5,000". */
  price: string;
  /** Numeric amount in KES — used for payment totals. */
  amount: number;
  duration: string;
  note?: string;
};

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
  /** Units/modules shown when the customer presses “Enroll now”. */
  units: ClassUnit[];
};

export const classes: ClassCourse[] = [
  {
    id: 'coding-classes',
    serviceValue: 'Coding Classes',
    category: 'Technology',
    title: 'Coding Classes',
    description: 'Learn how to write code and build real digital projects.',
    icon: Code2,
    duration: '2 – 8 weeks per unit',
    schedule: 'Weekday & weekend slots',
    format: 'In-person · Online',
    price: 'From KES 5,000',
    units: [
      // —— Foundations ——
      {
        name: 'C++ Programming',
        price: 'KES 5,000',
        amount: 5000,
        duration: '2 weeks',
        note: 'Syntax, control flow, functions and basic data structures — a solid first language.',
      },
      {
        name: 'HTML & CSS',
        price: 'KES 6,500',
        amount: 6500,
        duration: '2 weeks',
        note: 'Page structure, semantics, responsive layouts and styling from scratch.',
      },
      {
        name: 'JavaScript',
        price: 'KES 8,500',
        amount: 8500,
        duration: '2 weeks',
        note: 'Variables, DOM, events and interactive pages — the language of the web.',
      },
      {
        name: 'Python Programming',
        price: 'KES 12,000',
        amount: 12000,
        duration: '3 weeks',
        note: 'Beginner-friendly syntax, logic, files and mini-projects (automation & data intro).',
      },
      // —— Application languages ——
      {
        name: 'Java',
        price: 'KES 15,000',
        amount: 15000,
        duration: '3 weeks',
        note: 'Object-oriented programming, classes, collections and practical apps.',
      },
      {
        name: 'C#',
        price: 'KES 12,000',
        amount: 12000,
        duration: '3 weeks',
        note: 'Core C# and .NET basics — desktop and game-dev friendly foundations.',
      },
      {
        name: 'PHP',
        price: 'KES 8,000',
        amount: 8000,
        duration: '2 weeks',
        note: 'Server-side basics, forms, sessions and powering dynamic sites.',
      },
      {
        name: 'SQL & Databases',
        price: 'KES 7,000',
        amount: 7000,
        duration: '2 weeks',
        note: 'MySQL/PostgreSQL fundamentals — tables, queries, joins and design.',
      },
      // —— Web career paths ——
      {
        name: 'Front-End Development',
        price: 'KES 20,000',
        amount: 20000,
        duration: '4 weeks',
        note: 'HTML, CSS and JavaScript combined — build and deploy responsive interfaces.',
      },
      {
        name: 'React',
        price: 'KES 15,000',
        amount: 15000,
        duration: '3 weeks',
        note: 'Components, state, props and modern UI development with React.',
      },
      {
        name: 'Node.js & APIs',
        price: 'KES 15,000',
        amount: 15000,
        duration: '3 weeks',
        note: 'Back-end with Express — REST APIs, auth and connecting to databases.',
      },
      {
        name: 'Full-Stack Web Development',
        price: 'KES 35,000',
        amount: 35000,
        duration: '8 weeks',
        note: 'Front-end + back-end + databases in one path — capstone project included.',
      },
    ],
  },
  {
    id: 'photography-classes',
    serviceValue: 'Photography Classes',
    category: 'Creative',
    title: 'Photography Classes',
    description: 'Learn to capture, compose and edit professional photos.',
    icon: Camera,
    duration: '1 – 4 weeks per unit',
    schedule: 'Weekday & weekend slots',
    format: 'In-person · Online',
    price: 'From KES 5,000',
    units: [
      {
        name: 'Camera Basics & Manual Exposure',
        price: 'KES 8,000',
        amount: 8000,
        duration: '2 weeks',
        note: 'Camera modes, aperture, shutter speed, ISO and shooting confidently in manual.',
      },
      {
        name: 'Composition & Visual Storytelling',
        price: 'KES 7,000',
        amount: 7000,
        duration: '2 weeks',
        note: 'Framing, leading lines, perspective and building a coherent photo story.',
      },
      {
        name: 'Lighting & Portraiture',
        price: 'KES 10,000',
        amount: 10000,
        duration: '2 weeks',
        note: 'Natural and studio light, posing clients and flattering portrait setups.',
      },
      {
        name: 'Photo Editing (Lightroom & Photoshop)',
        price: 'KES 15,000',
        amount: 15000,
        duration: '3 weeks',
        note: 'RAW processing, colour grading, retouching and a fast editing workflow.',
      },
      {
        name: 'Event & Wedding Photography',
        price: 'KES 12,000',
        amount: 12000,
        duration: '3 weeks',
        note: 'Coverage planning, candid moments, teamwork on location and delivery.',
      },
      {
        name: 'Product & Brand Photography',
        price: 'KES 9,000',
        amount: 9000,
        duration: '2 weeks',
        note: 'Tabletop setups, backgrounds and clean shots that sell online.',
      },
      {
        name: 'Photography Business & Client Work',
        price: 'KES 5,000',
        amount: 5000,
        duration: '1 week',
        note: 'Pricing, packages, contracts and turning shoots into repeat income.',
      },
    ],
  },
  {
    id: 'insurance-classes',
    serviceValue: 'Insurance Classes',
    category: 'Finance',
    title: 'Insurance Classes',
    description: 'Learn the essentials of insurance and how the industry works.',
    icon: ShieldCheck,
    duration: '2 – 4 weeks per unit',
    schedule: 'Weekday & weekend slots',
    format: 'In-person · Online',
    price: 'From KES 8,000',
    units: [
      {
        name: 'Insurance Fundamentals',
        price: 'KES 15,000',
        amount: 15000,
        duration: '4 weeks',
        note: 'Risk, insurable interest, policy types and how the insurance value chain works.',
      },
      {
        name: 'Motor & General Insurance',
        price: 'KES 12,000',
        amount: 12000,
        duration: '3 weeks',
        note: 'Motor, property and liability covers, premiums, excess and common exclusions.',
      },
      {
        name: 'Medical & Life Insurance',
        price: 'KES 12,000',
        amount: 12000,
        duration: '3 weeks',
        note: 'Health and life products, underwriting basics, claims and NHIA context.',
      },
      {
        name: 'Insurance Underwriting Basics',
        price: 'KES 12,000',
        amount: 12000,
        duration: '3 weeks',
        note: 'Risk assessment, rating, policy wording and accepting or declining risk.',
      },
      {
        name: 'Claims Handling & Policy Service',
        price: 'KES 12,000',
        amount: 12000,
        duration: '3 weeks',
        note: 'Claims intake, investigation, settlement and keeping customers served.',
      },
      {
        name: 'Insurance Sales & Brokerage',
        price: 'KES 15,000',
        amount: 15000,
        duration: '4 weeks',
        note: 'Prospecting, needs-based advice, closing and ethical selling (IRA rules).',
      },
      {
        name: 'Risk Management & Reinsurance Intro',
        price: 'KES 8,000',
        amount: 8000,
        duration: '2 weeks',
        note: 'Identifying risk, mitigation strategies and how reinsurance spreads exposure.',
      },
    ],
  },
];

export const classBannerMessage = "Hello M-TECH, I'd like to join a class.";

export function findClassById(id: string): ClassCourse | undefined {
  return classes.find((c) => c.id === id);
}

/** Formats a KES amount as "KES 25,000". */
export function formatKes(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}
