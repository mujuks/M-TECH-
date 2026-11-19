export type ProcessStepData = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStepData[] = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We listen to your ideas, understand your business, and identify your requirements.',
  },
  {
    step: '02',
    title: 'Planning & Design',
    description:
      'We develop a creative strategy and design a solution that matches your vision.',
  },
  {
    step: '03',
    title: 'Development',
    description:
      'We transform the approved design into a functional, responsive digital experience.',
  },
  {
    step: '04',
    title: 'Delivery',
    description:
      'We test, refine, and deliver your project, ensuring everything works as expected.',
  },
];
