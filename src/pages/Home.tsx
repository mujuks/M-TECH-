import { Hero } from '../sections/Hero';
import { ServicesOverview } from '../sections/ServicesOverview';
import { WhyChoose } from '../sections/WhyChoose';
import { Process } from '../sections/Process';
import { CtaBanner } from '../sections/CtaBanner';
import { Seo } from '../components/Seo';

export function Home() {
  return (
    <>
      <Seo
        title="M-TECH | Website Development, Graphic Design & Digital Solutions"
        description="M-TECH is a creative digital agency building modern websites, graphic design, branding and custom digital solutions. Your Vision. Our Creativity. Digital Excellence."
      />
      <main>
        <Hero />
        <ServicesOverview />
        <WhyChoose />
        <Process />
        <CtaBanner />
      </main>
    </>
  );
}
