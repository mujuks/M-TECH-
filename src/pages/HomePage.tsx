import { Hero } from '../sections/Hero';
import { DeliverStrip } from '../sections/DeliverStrip';
import { Why } from '../sections/Why';
import { Process } from '../sections/Process';

export function HomePage() {
  return (
    <>
      <Hero />
      <DeliverStrip />
      <Why />
      <Process />
    </>
  );
}
