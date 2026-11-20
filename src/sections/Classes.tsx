import { useState } from 'react';
import { classes, classBannerMessage, type ClassCourse } from '../data/classes';
import { SectionHeading } from '../components/SectionHeading';
import { ClassCard } from '../components/ClassCard';
import { ClassEnrollModal } from '../components/ClassEnrollModal';
import { WhatsAppButton } from '../components/WhatsAppButton';

export function Classes() {
  const [enrolling, setEnrolling] = useState<ClassCourse | null>(null);

  return (
    <section id="classes" className="relative overflow-hidden bg-navy py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_10%,rgb(8_123_250_/_0.3),transparent_45%),radial-gradient(circle_at_85%_90%,rgb(10_86_181_/_0.4),transparent_45%)]"
      />

      <div className="container-site relative">
        <SectionHeading
          eyebrow="Classes & training"
          title="Learn new skills with M-TECH classes"
          highlight="M-TECH classes"
          subtitle="Practical, guided classes in coding, photography and insurance."
          tone="dark"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((course, i) => (
            <ClassCard
              key={course.id}
              course={course}
              index={i}
              onEnroll={setEnrolling}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-white/15 bg-white/5 p-6 backdrop-blur sm:flex-row sm:p-8">
          <p className="text-center font-display text-base font-bold text-white sm:text-left sm:text-lg">
            Ready to join a class? Message us for dates, details and registration.
          </p>
          <WhatsAppButton
            message={classBannerMessage}
            label="Ask on WhatsApp"
            variant="amber"
            className="shrink-0"
          />
        </div>
      </div>

      <ClassEnrollModal course={enrolling} onClose={() => setEnrolling(null)} />
    </section>
  );
}
