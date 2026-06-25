'use client';

import { useState } from 'react';
import Image from 'next/image';

type Highlight = {
  title: string;
  description: string;
  image: string;
};

const highlights: Highlight[] = [
  {
    title: 'Functional Materials and Wearable Biosensors',
    description:
      'Research on functional materials, flexible devices, and wearable biosensing systems for healthcare monitoring.',
    image: '/F0.png',
  },
  {
    title: 'Graphene-Based Biointerface',
    description:
      'Graphene and graphene oxide interfaces for electrochemical biosensors and bio-interfaced sensing platforms.',
    image: '/Graphene.png',
  },
  {
    title: 'Molecularly Imprinted Polymer Biosensors',
    description:
      'MIP-based electrochemical biosensors for selective biomarker detection in saliva and other biofluids.',
    image: '/IMP.png',
  },
  {
    title: 'Flexible Printed Circuit and Device Integration',
    description:
      'Integration of sensing electrodes, flexible circuits, and wireless readout systems for wearable healthcare devices.',
    image: '/FPCB.png',
  },
  {
    title: 'Micro/Nano Structured Platforms',
    description:
      'Microstructured and nanostructured platforms for sensing, energy, and bio-integrated device applications.',
    image: '/MICRO.png',
  },
];

export default function ResearchHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentHighlight = highlights[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? highlights.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === highlights.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          <div className="relative min-h-[260px] md:min-h-[420px]">
            <Image
              src={currentHighlight.image}
              alt={currentHighlight.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            <button
              type="button"
              onClick={goPrev}
              className="absolute bottom-3 left-3 z-20 rounded-full bg-neutral-700/90 px-3 py-2 text-white transition-colors hover:bg-neutral-900"
              aria-label="Previous highlight"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute bottom-3 right-3 z-20 rounded-full bg-neutral-700/90 px-3 py-2 text-white transition-colors hover:bg-neutral-900"
              aria-label="Next highlight"
            >
              ›
            </button>
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
              Research Highlights
            </p>

            <h2 className="mb-4 text-2xl font-bold leading-tight text-primary md:text-3xl">
              {currentHighlight.title}
            </h2>

            <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {currentHighlight.description}
            </p>

            <div className="mt-6 flex gap-2">
              {highlights.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-accent'
                      : 'w-2.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600'
                  }`}
                  aria-label={`Go to highlight ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
