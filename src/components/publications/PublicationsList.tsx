'use client';

import { useState } from 'react';
import Image from 'next/image';

export type HighlightItem = {
  id?: number;
  title: string;
  image: string;
  summary?: string;
  description?: string;
  paper_title?: string;
  journal?: string;
  volume?: string;
  pages?: string;
  year?: string;
  link?: string;
};

interface ResearchHighlightsProps {
  items?: HighlightItem[];
}

const defaultHighlights: HighlightItem[] = [
  {
    id: 1,
    title: 'Functional Materials and Wearable Biosensors',
    description:
      'Research on functional materials, flexible devices, and wearable biosensing systems for healthcare monitoring.',
    image: '/F0.png',
  },
  {
    id: 2,
    title: 'Graphene-Based Biointerface',
    description:
      'Graphene and graphene oxide interfaces for electrochemical biosensors and bio-interfaced sensing platforms.',
    image: '/Graphene.png',
  },
  {
    id: 3,
    title: 'Molecularly Imprinted Polymer Biosensors',
    description:
      'MIP-based electrochemical biosensors for selective biomarker detection in saliva and other biofluids.',
    image: '/IMP.png',
  },
  {
    id: 4,
    title: 'Flexible Printed Circuit and Device Integration',
    description:
      'Integration of sensing electrodes, flexible circuits, and wireless readout systems for wearable healthcare devices.',
    image: '/FPCB.png',
  },
  {
    id: 5,
    title: 'Micro/Nano Structured Platforms',
    description:
      'Microstructured and nanostructured platforms for sensing, energy, and bio-integrated device applications.',
    image: '/MICRO.png',
  },
];

export default function ResearchHighlights({
  items,
}: ResearchHighlightsProps) {
  const highlights = items && items.length > 0 ? items : defaultHighlights;

  const [activeIndex, setActiveIndex] = useState(0);

  if (!highlights || highlights.length === 0) return null;

  const active = highlights[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? highlights.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActiveIndex((prev) =>
      prev === highlights.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full pt-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-2 border-b border-neutral-300 pb-1">
          <h2 className="text-2xl font-light tracking-tight text-neutral-900 md:text-3xl dark:text-neutral-100">
            Research Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-x-2 gap-y-2 lg:grid-cols-[minmax(0,1fr)_32px]">
          <div className="border border-neutral-300 bg-[#f4efdc] dark:border-neutral-800">
            <div className="grid h-auto grid-cols-1 lg:h-[520px] lg:grid-cols-12">
              <div className="relative h-[320px] overflow-hidden lg:col-span-5 lg:h-[520px]">
                {highlights.map((item, idx) => (
                  <Image
                    key={item.id ?? idx}
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      idx === activeIndex
                        ? 'z-10 opacity-100'
                        : 'z-0 opacity-0'
                    }`}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority={idx === 0}
                  />
                ))}

                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute bottom-3 left-3 z-20 bg-neutral-700/90 p-2 text-white hover:bg-neutral-900"
                  aria-label="Previous highlight"
                >
                  ‹
                </button>
              </div>

              <div className="relative flex h-auto flex-col overflow-hidden p-5 md:p-6 lg:col-span-7 lg:h-[520px] lg:p-7">
                <h3 className="mb-3 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl dark:text-neutral-100">
                  {active.title}
                </h3>

                <div className="mb-4 h-px bg-neutral-500" />

                <div className="flex-1 overflow-y-auto pr-2 text-neutral-900 dark:text-neutral-100">
                  <p className="text-base leading-relaxed md:text-lg">
                    {active.summary || active.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-neutral-700/90 p-2 text-white hover:bg-neutral-900"
                  aria-label="Next highlight"
                >
                  ›
                </button>

                {(active.paper_title ||
                  active.journal ||
                  active.volume ||
                  active.pages ||
                  active.year ||
                  active.link) && (
                  <div className="pt-4">
                    <p className="mb-1 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      Related paper
                    </p>

                    <p className="text-sm leading-relaxed text-neutral-800 md:text-base dark:text-neutral-300">
                      {active.paper_title}

                      {active.journal && (
                        <>
                          {active.paper_title ? ', ' : ''}
                          <span className="italic">{active.journal}</span>
                        </>
                      )}

                      {active.volume && ` ${active.volume}`}
                      {active.pages && `, ${active.pages}`}
                      {active.year && ` (${active.year})`}
                    </p>

                    {active.link && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
                      >
                        View paper
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-8 flex-row items-center gap-1 lg:flex-col">
            {highlights.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={item.id ?? idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-8 max-h-8 min-h-8 w-8 min-w-8 max-w-8 shrink-0 rounded-none border border-neutral-500 p-0 text-[11px] font-medium leading-none transition-colors ${
                    isActive
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-500 text-white hover:bg-neutral-700'
                  }`}
                  aria-label={`Go to highlight ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
