'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export interface HighlightItem {
  id: number;
  title: string;
  image: string;
  summary: string;
  paper_title?: string;
  journal?: string;
  volume?: string;
  pages?: string;
  year?: string;
  link?: string;
}

interface ResearchHighlightsProps {
  items: HighlightItem[];
}

export default function ResearchHighlights({ items }: ResearchHighlightsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const active = items[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full pt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-6 border-b border-neutral-300 pb-4">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Research Highlights
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-11 border border-neutral-300 bg-[#f4efdc]">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[520px] overflow-hidden">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />

                <button
                  onClick={goPrev}
                  className="absolute left-3 bottom-3 bg-neutral-700/90 hover:bg-neutral-900 text-white p-2"
                  aria-label="Previous highlight"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col relative">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-neutral-900 mb-5">
                  {active.title}
                </h3>

                <div className="h-px bg-neutral-500 mb-6" />

                <div className="space-y-6 text-neutral-900">
                  <p className="text-lg md:text-xl leading-relaxed">
                    {active.summary}
                  </p>
                </div>

                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-700/90 hover:bg-neutral-900 text-white p-2"
                  aria-label="Next highlight"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>

                <div className="mt-auto pt-10">
                  <p className="text-lg font-semibold text-neutral-900 mb-1">
                    Related paper
                  </p>

                  <p className="text-base md:text-lg text-neutral-800">
                    {active.paper_title}
                    {active.journal && (
                      <>
                        {', '}
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
                      className="inline-block mt-3 text-sm font-medium text-blue-700 hover:underline"
                    >
                      View paper
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-1 flex lg:flex-col gap-2">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-10 w-10 lg:h-11 lg:w-full text-sm font-medium border border-neutral-500 transition-colors ${
                    isActive
                      ? 'bg-neutral-800 text-white'
                      : 'bg-neutral-500 text-white hover:bg-neutral-700'
                  }`}
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
